"""
FastAPI Server for Kumar Aman Sagar's AI Avatar (Nexus)
Exposes RAG inference and LLM endpoints for the frontend cyber companion.
"""

import time
import os
from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_pipeline import rag_pipeline

app = FastAPI(
    title="Kumar Aman Sagar - AI Avatar RAG Microservice",
    description="Python FastAPI backend providing RAG vector retrieval and LLM responses for the 3D Avatar.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend and production URLs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    apiKey: Optional[str] = None
    provider: Optional[str] = "gemini"

class ChatResponse(BaseModel):
    text: str
    citations: List[str]
    suggestedAction: Optional[dict] = None
    providerUsed: str
    latencyMs: float

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "AI Avatar RAG Microservice",
        "engineer": "Kumar Aman Sagar",
        "runtime": "Python 3.11 + FastAPI + Uvicorn",
        "endpoints": {
            "POST /chat": "Submit query for RAG or LLM generation",
            "GET /health": "Health check and pipeline status"
        }
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "chunks_indexed": len(rag_pipeline.chunks),
        "avatar": "Nexus AI Scout",
        "timestamp": time.time()
    }

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    start_time = time.time()
    result = rag_pipeline.generate(
        query=req.message,
        api_key=req.apiKey,
        provider=req.provider or "gemini"
    )
    latency_ms = round((time.time() - start_time) * 1000, 1)

    return ChatResponse(
        text=result["text"],
        citations=result.get("citations", []),
        suggestedAction=result.get("suggestedAction"),
        providerUsed=result.get("providerUsed", "Python RAG Engine"),
        latencyMs=latency_ms
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8001, reload=False)
