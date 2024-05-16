from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.type import Sentence
import numpy as np
from transformers import pipeline

LABELS = ["Turn On", "Turn Off", "Not recognized"]

app = FastAPI()
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/process")
async def upload(sentence: Sentence):
    result = classifier(sentence.sentence, candidate_labels=LABELS)
    index = np.argmax(np.array(result['scores']))
    return {"command": result['labels'][index]}