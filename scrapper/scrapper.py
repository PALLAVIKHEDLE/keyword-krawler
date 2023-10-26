from fastapi import FastAPI, Request
import requests
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time
import logging
import nltk
import numpy
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.tag import pos_tag




nltk.download('punkt')
nltk.download('words')
nltk.download('stopwords')
nltk.download('pos_tag')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')

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




# Cache Store **********************************************************************************************************************

import redis
import json
from scrapper import logger

def get_redis_connection():
    return redis.Redis(host="localhost", port=6379, db=0)

def push_to_redis(key, response):
    logger.info("Pushing to Cache Store")
    try:
        redis_connection = get_redis_connection()
        redis_connection.hset(key, "response", json.dumps(response))
        return True
    except Exception as e:
        logger.error(f"Error while pushing to Redis: {e}")

def check_in_redis(links, key):
    logger.info("Checking in our precious Cache Store")
    try:
        redis_connection = get_redis_connection()
        response = redis_connection.hget(key, "response")
        if response:
            logger.info("Found a match, Checking if this is latest")
            if json.loads(response)["scrappedUrls"] == links:
                logger.info("Perfect match found, returning from Cache Store")
                return json.loads(response)
        else:
            return False
    except Exception as e:
        logger.error(f"Error while checking in Redis: {e}")
        return False
    
# ************************************************************************************************************************************


# Scraping Engine ***************************************************************************************************************************

def get_urls(base_url):
    response = requests.get(base_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    links = set()
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and not href.startswith('http') and '.' not in href and len(links) < 5:
            links.add(base_url+href)
    return list(links)

def scrape(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup.get_text()

def scrape_all(url):
    links = get_urls(url)
    text = ''
    cache = check_in_redis(links,url)
    if cache:
        logger.info("Found in Cache")
        return True, cache["scrappedUrls"], cache["scrapedContent"]
    logger.info("Not Found in Cache, Scraping New")
    for link in links:
        text += scrape(link)
    return False, links, text

def remove_pronouns_nouns(text):
    import re
    text = re.sub(r'[^\w\s]', ' ', text)
    words = text.split()
    words = [word for word in words if len(word) > 2 and not word.isdigit()]
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word.lower() not in stop_words]
    tagged_words = pos_tag(words)
    filtered_words = []
    removed_words = []
    for word, tag in tagged_words:
        if tag in []:
            removed_words.append(word)
        else:
            filtered_words.append(word)

    filtered_text = ' '.join(filtered_words)
    removed_text = ' '.join(removed_words)

    return filtered_text, removed_text

# *********************************************************************************************************************************************


# API Endpoints *********************************************************************************************************************************

@app.post('/api/v1/scraping/')
async def root(request: Request):
    payload = await request.json()
    url = payload['url'].strip('/') if payload['url'].endswith('/') else payload['url']
    try:
        cacheExists, scrapped_urls, scrapped_text = scrape_all(url)
    except Exception as e:
        return {"503": f"{e}"}
    final_text, removed_text = remove_pronouns_nouns(scrapped_text)
    response = { "scrapedContent": final_text, "scrappedUrls": scrapped_urls, "removedContent": removed_text, "returnedFromCache": True if cacheExists else False }
    if not cacheExists:
        logger.info("That's new to me, populating Cache Store right away!")
        push_to_redis(url,response)
    return response

# ************************************************************************************************************************************************

if __name__ == '__main__':
    uvicorn.run("scrapper:app", host='0.0.0.0', port=8000, reload=True)