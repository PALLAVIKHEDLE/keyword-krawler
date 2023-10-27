from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
app = FastAPI()
from seoanalyzer import analyze


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def analyze_url(url):
    output = analyze(url, follow_links=False, analyze_headings=True, analyze_extra_tags=True)
    return output


@app.post('/api/v1/analyzer/')
async def root(request: Request):
    try: 
        payload = await request.json()
        return analyze_url(payload['url'])
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while analyzing")


if __name__ == '__main__':
    uvicorn.run("analyzer:app", host='0.0.0.0', port=8000, reload=True)