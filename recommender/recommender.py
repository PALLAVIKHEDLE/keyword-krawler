from fastapi import FastAPI, Request, HTTPException
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import logging
import requests
import better_profanity
import time
import redis
import json

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

# API Endpoints ***************************************************************************************************************************


@app.post('/api/v1/keyword-recommendations/')
async def keyword_recommendations_api(request: Request):
    payload = await request.json()
    url = payload['url'].strip('/') if payload['url'].endswith('/') else payload['url']
    try:   
        wait_iterator = 0
        while True: 
            data = check_in_redis(url)
            if data:
                logger.info("Found in Cache Store, Checking if this algo is already executed")
                existing_algo_data = check_in_redis(url + payload["algoChoice"])
                logger.info(f"Existing Algo Data: {existing_algo_data}")
                if existing_algo_data:
                    logger.info("Cache store found this entry, checking if recommendations already exists")
                    if existing_algo_data["topKeywordListings"][0].get("mostSearchedAlternatives"):
                        logger.info("Recommendations exist, returning my precious data without changes")
                        return existing_algo_data
                    logger.info("Recommendations not found, generating recommendations")
                    all_keywords = existing_algo_data["topKeywordListings"]
                    modified_keywords = generate_recommendations(all_keywords)
                    existing_algo_data["topKeywordListings"] = modified_keywords
                    logger.info("Revalidating the cache with recommendations")
                    push_to_redis(url + payload["algoChoice"],existing_algo_data)
                    return existing_algo_data
            else:
                logger.info("Let's give that scrapper and parser engines, a tad bit more time")
                if wait_iterator > 4:
                    raise HTTPException(status_code=503, detail="Scrapper and Parser Engines are taking too long, please try again later")
                wait_iterator += 1
                time.sleep(7)
    except Exception as e:
        logger.error(f"Error while generating recommendations: {e}")
        raise HTTPException(status_code=503, detail="Hello, I am the Recommender, Scrapper and Parser are taking too long, please try again later")

# ************************************************************************************************************************************


if __name__ == '__main__':
    uvicorn.run("recommender:app", host='0.0.0.0', port=8003, reload=True)