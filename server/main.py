from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import whisper
import tempfile
import os
from transformers import pipeline

LABELS = ["Turn On", "Turn Off", "Not recognized"]

app = FastAPI()
transcriber = whisper.load_model("base.en")
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
async def upload(audio_data: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await audio_data.read())
            tmp_path = tmp.name

        transcribed_text = transcriber.transcribe(tmp_path, language="english", fp16=False)["text"]
        
        if len(transcribed_text) == 0:
            return {"error": "No transcribed text found."}
        
        result = classifier(transcribed_text, candidate_labels=LABELS)
        index = np.argmax(np.array(result['scores']))
        command = result['labels'][index]
        print(command)
        return command
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
