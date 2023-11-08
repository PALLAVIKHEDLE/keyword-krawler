from fastapi import FastAPI, Request, HTTPException
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Algorithms ***************************************************************************************************************************

class RabinKarp:
    def __init__(self, text, pattern):
        self.text = text
        self.pattern = pattern
        self.text_length = len(text)
        self.pattern_length = len(pattern)
        self.hash_value = 0
        self.pattern_hash_value = 0
        self.window = []
        self.base = 256 
        self.prime = 101 
        self.occurrences = []
    def calculate_hash_value(self, string, length):
        value = 0
        for i in range(length):
            value = (self.base * value + ord(string[i])) % self.prime
        return value
    def recalculate_hash_value(self, old_hash, old_char, new_char):
        new_hash = (self.base * (old_hash - ord(old_char) * (self.base **(self.pattern_length - 1))) + ord(new_char)) % self.prime
        return new_hash
    def search_pattern(self):
        self.pattern_hash_value = self.calculate_hash_value(self.pattern,
        self.pattern_length)
        self.hash_value = self.calculate_hash_value(self.text, self.pattern_length)
        pattern_found = False 
        for i in range(self.text_length - self.pattern_length + 1):
            if self.pattern_hash_value == self.hash_value:
                for j in range(self.pattern_length):
                    if self.text[i + j] != self.pattern[j]:
                        break
                else:
                    self.occurrences.append(i)
                    pattern_found = True
            if i < self.text_length - self.pattern_length:
                self.hash_value = self.recalculate_hash_value(self.hash_value, self.text[i], self.text[i + self.pattern_length])
        if not pattern_found:
            print("Pattern not found in the text.")
        return len(self.occurrences)


def rabin_karp(text, pattern):
    rk_search = RabinKarp(text, pattern)
    return rk_search.search_pattern()


def naive(text, pattern):
    n = len(text)
    m = len(pattern)
    occurrences = [] 
    for i in range(n - m + 1):
        if text[i:i+m] == pattern:
            occurrences.append(i)
    return len(occurrences)

def compute_prefix_function(pattern):
    m = len(pattern)
    pi = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]:
            j = pi[j-1]
        if pattern[i] == pattern[j]:
            j += 1
        pi[i] = j
    return pi

def kmp(text, pattern):
    n = len(text)
    m = len(pattern)
    pi = compute_prefix_function(pattern)
    j = 0 
    occurrences = []
    for i in range(n):
        while j > 0 and text[i] != pattern[j]:
            j = pi[j-1] 
        if text[i] == pattern[j]:
            j += 1 
        if j == m: 
            occurrences.append(i - m + 1)
            j = pi[j-1] 
    return len(occurrences)


class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    

class SuffixTree:
    def __init__(self, text):
        self.text = text
        self.trie = Trie()
        self.build()
    def build(self):
        for i in range(len(self.text)):
            self.trie.insert(self.text[i:])
    def display(self, node=None, prefix=''):
        node = node or self.trie.root
        if not node.children:
            print(prefix)
        else:
            for char, child in node.children.items():
                self.display(child, prefix + char)

def construct_suffix_tree(scrapped_content):
    from suffix_tree import Tree
    return Tree({"A": scrapped_content})


def suffix_tree(suffix_tree, pattern):
    return len(suffix_tree.find_all(pattern))          

def construct_suffix_array(text):
    n = len(text)
    suffixes = [(text[i:], i) for i in range(n)]
    suffixes.sort()
    suffix_array = [item[1] for item in suffixes]
    return suffix_array

def search_pattern_with_suffix_array(text, pattern, suffix_array): #Using bst against suffix array
    n = len(text)
    m = len(pattern)
    left, right = 0, n - 1
    positions = []
    while left <= right:
        mid = (left + right) // 2
        suffix = suffix_array[mid]
        if text[suffix:suffix + m] == pattern:
            positions.append(suffix)
            i = mid - 1
            while i >= left and text[suffix_array[i]:suffix_array[i] + m] == pattern:
                positions.append(suffix_array[i])
                i -= 1
            i = mid + 1
            while i <= right and text[suffix_array[i]:suffix_array[i] + m] == pattern:
                positions.append(suffix_array[i])
                i += 1
            return len(positions)
        elif text[suffix:suffix + m] < pattern:
            left = mid + 1
        else:
            right = mid - 1
    return len(positions)


# ************************************************************************************************************************************


# Cache Store **********************************************************************************************************************

import redis
import json

def get_redis_connection():
    return redis.Redis(host="redis", port=6379, db=0)

def push_to_redis(key, response):
    logger.info(f"Pushing to Cache Store {response}")
    try:
        redis_connection = get_redis_connection()
        redis_connection.hset(key, "response", json.dumps(response))
        return True
    except Exception as e:
        logger.error(f"Error while pushing to Redis: {e}")

def check_in_redis(key):
    logger.info("Checking in our precious Cache Store")
    try:
        redis_connection = get_redis_connection()
        response = redis_connection.hget(key, "response")
        if response:
            logger.info("Match found, returning from Cache Store")
            return json.loads(response)
        else:
            return False
    except Exception as e:
        logger.error(f"Error while checking in Redis: {e}")
        return False
    
# ************************************************************************************************************************************

# Parsing Engine ***************************************************************************************************************************
import time
def get_keywords(algo_choice, scrapped_content):
    keywords_and_count = []
    existing_keywords = []
    start_time = time.time()
    if algo_choice == "suffix_array":
        logger.info("Triggered Suffix Arrays")
        suffix_array = construct_suffix_array(scrapped_content)
        for each_word in scrapped_content.split(" "):
            if each_word == "":
                continue
            elif not each_word.isalpha():
                continue
            else:
                if each_word not in existing_keywords:
                    occurences = search_pattern_with_suffix_array(scrapped_content, each_word, suffix_array)
                    keywords_and_count.append({"originalKeyword": each_word, "count": occurences})
                    existing_keywords.append(each_word)
        return keywords_and_count, (time.time()-start_time)
    if algo_choice == "suffix_tree":
        logger.info("Triggered Suffix Trees")
        start_time = time.time()
        keywords_and_count = []
        existing_keywords = []
        constructed_suffix_tree = construct_suffix_tree(scrapped_content)
        try: 
            for each_word in scrapped_content.split(" "):
                if each_word == "":
                    continue
                elif not each_word.isalpha():
                    continue
                else:
                    if each_word not in existing_keywords:
                        occurences = suffix_tree(constructed_suffix_tree, each_word)
                        keywords_and_count.append({"originalKeyword": each_word, "count": occurences})
                        existing_keywords.append(each_word)
            return keywords_and_count, time.time() - start_time
        except Exception as e:
            logger.error(f"Error while parsing suffix tree: {e}")
            return None
    for eachword in scrapped_content.split(" "):
        if eachword == "":
            continue
        elif not eachword.isalpha():
            continue
        else:
            if eachword not in existing_keywords:
                keywords_and_count.append({"originalKeyword": eachword, "count": eval(f"{algo_choice}(scrapped_content, eachword)")})
                existing_keywords.append(eachword)
    return keywords_and_count, time.time() - start_time

def get_top_keywords(keywords_and_count):
    keywords_and_count.sort(key=lambda x: x["count"], reverse=True)
    try:
        return keywords_and_count[:12]
    except Exception as exc:
        logger.error(f"Error while getting top keywords: {exc}")
        return exc
# ******************************************************************************************************************************************

# API Endpoints ***************************************************************************************************************************


@app.post('/api/v1/keyword/')
async def keyword_api(request: Request):
    payload = await request.json()
    url = payload['url'].strip('/') if payload['url'].endswith('/') else payload['url']
    try:
        wait_iterator = 0
        while True:
            data = check_in_redis(url)
            if data:
                logger.info("Found in Cache Store, Checking if this algo is already executed")
                algo_exists = check_in_redis(url + payload["algoChoice"])
                if algo_exists:
                    logger.info("Cache Store already has recorded this algo, here you go!")
                    return algo_exists
                break
            else:
                logger.info("Let's give that scrapper engine, a tad bit more time")
                if wait_iterator > 3:
                    raise HTTPException(status_code=503, detail="Scrapper Engine is taking too long, please try again later")
                wait_iterator += 1
                time.sleep(5)
        logger.info("Calling for parsing")
        keywords, execution_time = get_keywords(payload["algoChoice"],data["scrapedContent"])
        final_response = { "topKeywordListings": get_top_keywords(keywords), "alogirthmExecutionTime": execution_time}
        logger.info("Quickly pushing to Cache Store")
        push_to_redis(url + payload["algoChoice"],final_response)
        return final_response
    except Exception as e:
        logger.error(f"Error while parsing: {e}")
        raise HTTPException(status_code=503, detail="Hello, I am the parser engine, Scrapper is taking too long, please try again later")

@app.post('/api/v1/multi-algo/')
async def multialgo_api(request: Request):
    payload = await request.json()
    url = payload['url'].strip('/') if payload['url'].endswith('/') else payload['url']
    algo_choices = [ "kmp", "suffix_array", "suffix_tree"]
    final_response = {"data": []}
    wait_iterator = 0
    try:
        while True:
            data = check_in_redis(url)
            if data:
                logger.info("Multi algo found in Cache Store, Checking if this function for multi-algo is already executed")
                algo_exists = check_in_redis(url + "multi-algo")
                if algo_exists:
                    logger.info("Cache Store already has recorded this multi-algo, here you go!")
                    return algo_exists
                break
            else:
                logger.info("Let's give that scrapper engine, a tad bit more time")
                if wait_iterator > 3:
                    raise HTTPException(status_code=503, detail="Scrapper Engine is taking too long, please try again later")
                wait_iterator += 1
                time.sleep(5)
        for each_algo in algo_choices:
                logger.info("Checking if said algo exists")
                logger.info(f"Running for {each_algo}")
                algo_exists = check_in_redis(url + each_algo)
                if algo_exists:
                    logger.info("Cache Store already has recorded this algo, here you go!")
                    final_response["data"].append({"algoName": each_algo, "algoExecutionTime": algo_exists["alogirthmExecutionTime"]})
                else:
                    logger.info("Calling for parsing")
                    keywords, execution_time = get_keywords(each_algo,data["scrapedContent"])
                    intermediate_response = { "topKeywordListings": get_top_keywords(keywords), "alogirthmExecutionTime": execution_time}
                    logger.info("Quickly pushing to Cache Store")
                    push_to_redis(url + each_algo,intermediate_response)
                    final_response["data"].append({"algoName": each_algo, "algoExecutionTime": execution_time})
        print(final_response)
        push_to_redis(url + "multi-algo",final_response)
        return final_response
    except Exception as e:
        raise HTTPException(status_code=503, detail="Hello, I am the parser engine, Scrapper is taking too long, please try again later")


# ************************************************************************************************************************************


if __name__ == '__main__':
    uvicorn.run("parser:app", host='0.0.0.0', port=8001, reload=True)