from pydantic import BaseModel

class Sentence(BaseModel):
    sentence: str