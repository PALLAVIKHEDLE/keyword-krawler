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
                
def construct_suffix_array(text):
    suffixes = [(text[i:], i) for i in range(len(text))]
    suffixes.sort(key=lambda x: x[0])
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
            return positions
        elif text[suffix:suffix + m] < pattern:
            left = mid + 1
        else:
            right = mid - 1
    return positions

def suffix_array(text, pattern):
    print("Invoked Suffix Array")
    suffix_array_structure = construct_suffix_array(text)
    occurrences = search_pattern_with_suffix_array(text, pattern, suffix_array_structure)
    return len(occurrences)
    

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

# Recommendations Generator ***********************************************************************************************************
import requests
import better_profanity

def get_seo_recommendation(keyword):
    url = "https://www.spyfu.com/NsaApi/RelatedKeyword/GetPhraseMatchedKeywords"
    payload = f"{{\"query\":\"{keyword}\",\"pageSize\":10,\"isOverview\":true,\"countryCode\":\"US\"}}"
    headers = {
    'content-type': 'application/json;charset=UTF-8',
    'Cookie': 'ASP.NET_SessionId=rutmlg02sfx4yakg0nd0asxw'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    alternate_keywords = []
    for each in response.json()["keywords"]:
        if not better_profanity.profanity.contains_profanity(each["keyword"]):
            alternate_keywords.append(each["keyword"])
    return alternate_keywords


def get_suggested_replacements(keyword):
    url = f"https://api.datamuse.com/words?rel_syn={keyword}"
    response = requests.get(url)
    if response.status_code == 200:
        synonyms = [word['word'] for word in response.json()][:2]
        return synonyms
    else:
        return None

def generate_recommendations(keywords_and_count):
    for each in keywords_and_count:
        each["mostSearchedAlternatives"] = get_seo_recommendation(each["originalKeyword"])
        each["probableReplacements"] = get_suggested_replacements(each["originalKeyword"])
    return keywords_and_count


# ************************************************************************************************************************************


# Parsing Engine ***************************************************************************************************************************
import time
def get_keywords(algo_choice, scrapped_content):
    keywords_and_count = []
    existing_keywords = []
    start_time = time.time()
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
        raise HTTPException(status_code=503, detail="Hello, I am the parser engine, Scrapper is taking too long, please try again later")

@app.post('/api/v1/keyword-recommendations/')
async def keyword_recommendations_api(request: Request):
    payload = await request.json()
    url = payload['url'].strip('/') if payload['url'].endswith('/') else payload['url']
    try:
            data = check_in_redis(url)
            if data:
                logger.info("Found in Cache Store, Checking if this algo is already executed")
                existing_algo_data = check_in_redis(url + payload["algoChoice"])
                if existing_algo_data:
                    logger.info("Cache store found this entry, checking if recommendations already exists")
                    if existing_algo_data["topKeywordListings"][0].get("mostSearchedAlternatives"):
                        logger.info("Recommendations exist, returning my precious data without changes")
                        return existing_algo_data
                    all_keywords = existing_algo_data["topKeywordListings"]
                    modified_keywords = generate_recommendations(all_keywords)
                    existing_algo_data["topKeywordListings"] = modified_keywords
                    logger.info("Revalidating the cache with recommendations")
                    push_to_redis(url + payload["algoChoice"],existing_algo_data)
                    return existing_algo_data
            else:
                raise HTTPException(status_code=503, detail="Scrapper Engine is taking too long, please try again later")
    except Exception as e:
        raise HTTPException(status_code=503, detail="Hello, I am the parser engine, Scrapper is taking too long, please try again later")

@app.post('/api/v1/multi-algo/')
async def multialgo_api(request: Request):
    payload = await request.json()
    url = payload['url'].strip('/') if payload['url'].endswith('/') else payload['url']
    algo_choices = ["rabin_karp", "naive", "kmp"]
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