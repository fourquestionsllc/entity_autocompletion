from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from difflib import get_close_matches
from typing import List

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample keywords
KEYWORDS = ["Machine Learning", "Gen AI", "Big Data", "Data Engineering", "Spark", "Python",]

class KeywordRequest(BaseModel):
    query: str

@app.post("/match_keywords")
def match_keywords(request: KeywordRequest):
    matches = get_close_matches(request.query, KEYWORDS, n=5, cutoff=0.1)
    return {"matches": matches}
