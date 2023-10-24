from fastapi import FastAPI, Request
import requests
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from bs4 import BeautifulSoup

def get_urls(base_url):
    response = requests.get(base_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    links = set()
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and not href.startswith('http') and '.' not in href:
            links.add(base_url+href)
    return list(links)

def scrape(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup.get_text()

def scrape_all(url):
    links = get_urls(url)
    text = ''
    for link in links:
        text += scrape(link)
    return links, text

import nltk
import numpy
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk

nltk.download('punkt')
nltk.download('words')
nltk.download('stopwords')
nltk.download('pos_tag')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')

def remove_pronouns_nouns(text):
    # Tokenize the text into words
    words = word_tokenize(text)

    # Remove stop words from the words list
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word.lower() not in stop_words]

    # Tag the parts of speech of each word
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

@app.post('/api/v1/scraping/')
async def root(request: Request):
    payload = await request.json()
    try:
        scrapped_urls, scrapped_text = scrape_all(payload['url'])
    except Exception as e:
        return {"503": f"{e}"}
    final_text, removed_text = remove_pronouns_nouns(scrapped_text)
    return {
    "scrapedContent": final_text,
    "scrappedUrls": scrapped_urls,
    "removedContent": removed_text
    }

if __name__ == '__main__':
    uvicorn.run("scrapper:app", host='0.0.0.0', port=8000, reload=True)