from fastapi import FastAPI
import uvicorn
from bs4 import BeautifulSoup
import requests
import aiohttp
import asyncio





app = FastAPI(debug=True)

def scrape():
    URL = "https://medium.com/gitconnected/react-native-vs-flutter-2023-a84d2129bab5/"
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")
    print('soup',soup)
    # return str(soup)
    return soup

@app.get('/')
async def root():
    #  pages = await scrape()
     content = scrape()
     print(content)
    # return 'Hello Pallavi, How are you today?' + str(b-5)
     return str(content)




if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True )