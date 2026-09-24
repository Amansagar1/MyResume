"""
Python RAG (Retrieval-Augmented Generation) Pipeline for Kumar Aman Sagar's AI Avatar
Orchestrates vector chunk retrieval, keyword scoring, and LLM API generation (Gemini / OpenAI).
"""

import os
import re
import math
import json
import time
import requests
from typing import List, Dict, Any, Optional

KNOWLEDGE_CHUNKS = [
    {
        "id": "personal_overview",
        "category": "personal",
        "title": "Kumar Aman Sagar - Overview & Bio",
        "keywords": ["who", "about", "kumar", "aman", "sagar", "summary", "background", "intro", "bio", "profile", "developer", "experience"],
        "content": "Kumar Aman Sagar is a Full Stack & AI Application Engineer with 3+ years of experience engineering scalable web applications, real-time AI agent integrations, and microservices backends using React.js, Next.js, Node.js, TypeScript, and Python. Proven expertise orchestrating LLM APIs, RAG pipelines, and automated AI workflows, backed by hands-on cloud deployment on AWS (ECS, Lambda, S3), Redis caching, and Dockerized CI/CD systems.",
        "sectionLink": "#about"
    },
    {
        "id": "contact_info",
        "category": "personal",
        "title": "Contact Information & Coordinates",
        "keywords": ["contact", "email", "phone", "number", "call", "reach", "linkedin", "github", "hire", "message", "bengaluru", "location"],
        "content": "Email: kumaramansagar01@gmail.com | Phone: +91 8434120273 | Location: Bengaluru, Karnataka | LinkedIn: https://linkedin.com/in/kumaramansagar (kumaramansagar) | GitHub: https://github.com/Amansagar1 (Amansagar1)",
        "sectionLink": "#contact"
    },
    {
        "id": "availability_status",
        "category": "availability",
        "title": "Availability & Notice Period",
        "keywords": ["available", "notice", "period", "joining", "join", "immediate", "role", "full-time", "bengaluru", "relocate", "relocation", "remote", "hybrid", "salary", "hire"],
        "content": "Kumar is actively AVAILABLE FOR FULL-TIME ROLES in Bengaluru. Notice Period: Immediate Joiner (< 15 days). Preferred Work Modes: Hybrid, On-Site (Bengaluru), or Remote. Target Roles: Full Stack Engineer, AI Application Developer, Frontend Specialist, Backend / Microservices Engineer.",
        "sectionLink": "#contact"
    },
    {
        "id": "exp_i2_global",
        "category": "experience",
        "title": "I2 Global Virtual Learning - Full Stack & AI Developer",
        "keywords": ["i2", "global", "experience", "current", "job", "work", "role", "ai assistant", "sse", "streaming", "aws", "ecs", "redis", "latency", "bundle"],
        "content": "Role: Full Stack & AI Developer at I2 Global Virtual Learning Pvt. Ltd. (Nov 2025 – Present | Bengaluru).\nKey Achievements:\n1. Architected and integrated an interactive AI assistant into the core learning platform, automating student query resolution using LLM APIs and Server-Sent Events (SSE) for low-latency streaming responses.\n2. Engineered scalable backend microservices using Node.js and TypeScript on AWS ECS, sustaining 99.9% platform availability across multi-tenant production systems.\n3. Developed responsive learning dashboards with React.js & TypeScript, reducing client-side bundle size and accelerating initial page load by 30%.\n4. Implemented Redis caching and PostgreSQL query indexing, reducing API latency from 220ms to under 130ms (40% gain).\n5. Constructed automated CI/CD pipelines via GitHub Actions and Docker with zero-downtime rolling updates.",
        "sectionLink": "#experience"
    },
    {
        "id": "exp_digital_sync",
        "category": "experience",
        "title": "Digital-Sync Technologies - Full Stack Developer",
        "keywords": ["digital-sync", "digital", "sync", "experience", "previous", "iot", "energy", "telemetry", "python", "dashboard", "cloudwatch", "s3"],
        "content": "Role: Full Stack Developer at Digital-Sync Technologies & Services Pvt. Ltd. (Feb 2024 – Nov 2025 | Bengaluru).\nKey Achievements:\n1. Built responsive, data-intensive telemetry dashboards using React.js and Tailwind CSS to track and visualize IoT smart energy usage in real time.\n2. Designed Python and Node.js RESTful data ingestion pipelines to process, parse, and store high-frequency sensor readings with Redis rate-limiting.\n3. Automated anomaly detection alerts on sensor streams using background Python workers and AWS CloudWatch notifications.\n4. Containerized application microservices with Docker across staging and production Kubernetes.\n5. Configured AWS S3 and RDS automated backup policies to guarantee zero data loss.",
        "sectionLink": "#experience"
    },
    {
        "id": "exp_achintya",
        "category": "experience",
        "title": "Achintya Solutions - Web Developer Intern",
        "keywords": ["achintya", "solutions", "intern", "internship", "junior", "frontend", "figma", "react"],
        "content": "Role: Web Developer Intern at Achintya Solutions (Jun 2023 – Feb 2024 | Bengaluru).\nEngineered modular, mobile-responsive interfaces using React.js and modern JavaScript based on Figma designs. Integrated third-party REST APIs and managed component state using React Context API.",
        "sectionLink": "#experience"
    },
    {
        "id": "skills_ai_llm",
        "category": "skills",
        "title": "AI Engineering & LLM Orchestration Skills",
        "keywords": ["ai", "llm", "rag", "agents", "openai", "gemini", "claude", "prompt", "function calling", "vector", "embeddings", "pinecone", "pgvector", "orchestration"],
        "content": "AI Engineering Skills: LLM API Orchestration (OpenAI GPT-4, Google Gemini, Anthropic Claude), Prompt Engineering, RAG (Retrieval-Augmented Generation) vector pipelines, AI Agents & Tool Calling, Streaming Responses (SSE / WebSockets), Vector Search & Embeddings with Pinecone and pgvector.",
        "sectionLink": "#skills"
    },
    {
        "id": "skills_fullstack",
        "category": "skills",
        "title": "Full Stack Tech Stack (Frontend, Backend, Databases)",
        "keywords": ["frontend", "backend", "full stack", "react", "next.js", "typescript", "javascript", "node.js", "express", "python", "fastapi", "flask", "postgresql", "mongodb", "mysql", "redis", "tailwind"],
        "content": "Full Stack Tech Stack:\n- Frontend: React.js, Next.js (App Router / SSR), TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, Framer Motion, Three.js / WebGL.\n- Backend & APIs: Node.js, Express.js, Python (FastAPI, Flask), RESTful APIs, Microservices Architecture, Async Celery Workers.\n- Databases & Caching: PostgreSQL, MongoDB, MySQL, Redis (in-memory caching, task queues, rate-limiting).",
        "sectionLink": "#skills"
    },
    {
        "id": "skills_cloud_devops",
        "category": "skills",
        "title": "Cloud Architecture & DevOps Systems",
        "keywords": ["cloud", "devops", "aws", "ecs", "docker", "kubernetes", "github actions", "ci/cd", "s3", "lambda", "rds", "cloudwatch", "linux", "terraform"],
        "content": "Cloud & DevOps Stack: AWS (ECS, S3, RDS, Lambda, CloudWatch, EC2), Docker containerization, Kubernetes, GitHub Actions CI/CD pipelines, Linux Administration, Terraform Infrastructure-as-Code.",
        "sectionLink": "#skills"
    },
    {
        "id": "proj_ai_platform",
        "category": "projects",
        "title": "Enterprise AI Automation & Agent Workflow Platform",
        "keywords": ["project", "enterprise", "smartdoc", "automation", "agent workflow", "flask", "next.js", "async", "redis queue", "demo"],
        "content": "Project: Enterprise AI Automation & Agent Workflow Platform.\nA full-stack automation platform featuring a Next.js UI and an asynchronous Python/Flask backend integrated with LLM APIs for automated content customization and document intelligence. Implemented high-throughput Redis task queues and MongoDB to process distributed asynchronous dispatches without blocking the main event loop.\nTech: Next.js, Python, Flask, LLM APIs, Redis, MongoDB, Async Queues.",
        "sectionLink": "#projects"
    },
    {
        "id": "proj_cloud_cicd",
        "category": "projects",
        "title": "Cloud-Native Automated CI/CD & AI Microservices Pipeline",
        "keywords": ["project", "cicd", "ci/cd", "pipeline", "docker", "ecs", "terraform", "microservices", "infrastructure"],
        "content": "Project: Cloud-Native Automated CI/CD & AI Microservices Pipeline.\nAn enterprise-grade CI/CD pipeline using GitHub Actions, Docker, and AWS ECS to deploy containerized full-stack and AI service endpoints with zero-downtime rolling updates. Automated cloud infrastructure provisioning using modular Terraform configurations with fine-grained AWS IAM security policies.\nTech: AWS ECS, Docker, GitHub Actions, Terraform, AWS IAM, Microservices.",
        "sectionLink": "#projects"
    },
    {
        "id": "certifications",
        "category": "certifications",
        "title": "Industry Certifications",
        "keywords": ["certification", "certifications", "oracle", "oci", "foundations", "agent studio", "edyoda", "degree", "credential"],
        "content": "Certifications:\n1. Oracle Cloud Infrastructure (OCI) 2025 AI Foundations Associate.\n2. Oracle Fusion AI Agent Studio Certified Foundations Associate.\n3. React JS Developer Certification — EdYoda Digital University.",
        "sectionLink": "#skills"
    },
    {
        "id": "education",
        "category": "education",
        "title": "Formal Education",
        "keywords": ["education", "degree", "mca", "college", "university", "ignou", "bit", "bachelor", "master", "school"],
        "content": "Education:\n1. Master of Computer Applications (MCA) — IGNOU (Bangalore Institute of Technology Center) [Pursuing].\n2. Executive Certification in Full Stack Engineering — EdYoda Digital University (Score: 89%).\n3. Bachelor of Arts (BA) — Muslim Minority Degree College.",
        "sectionLink": "#skills"
    }
]

class PythonRAGPipeline:
    def __init__(self):
        self.chunks = KNOWLEDGE_CHUNKS

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """TF-IDF and Semantic Keyword scoring retriever"""
        q_norm = query.lower()
        tokens = [t for t in re.split(r'\W+', q_norm) if len(t) > 2]

        scored = []
        for chunk in self.chunks:
            score = 0.0

            # Title matches
            if q_norm in chunk["title"].lower():
                score += 8.0

            # Keyword matches
            for kw in chunk["keywords"]:
                if kw in q_norm:
                    score += 4.5
                for token in tokens:
                    if token in kw:
                        score += 2.0

            # Content occurrences
            content_lower = chunk["content"].lower()
            for token in tokens:
                count = content_lower.count(token)
                score += min(count * 1.2, 5.0)

            scored.append((score, chunk))

        scored.sort(key=lambda x: x[0], reverse=True)
        top_matches = [item[1] for item in scored if item[0] > 0][:top_k]

        if not top_matches:
            return [self.chunks[0], self.chunks[2]]

        return top_matches

    def synthesize_local(self, query: str, retrieved_chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """High-accuracy fallback answer generator without external API dependencies"""
        q = query.lower()
        citations = [c["title"] for c in retrieved_chunks]

        if any(w in q for w in ["available", "notice", "hire", "join", "immediate", "salary", "bengaluru", "relocat"]):
            return {
                "text": "Kumar Aman Sagar is actively **AVAILABLE FOR FULL-TIME ROLES** in **Bengaluru**! He is an **immediate joiner** (< 15 days notice) and open to On-site in Bengaluru, Hybrid, or Global Remote roles as a Full Stack or AI Application Engineer.",
                "citations": ["Availability & Notice Period", "Contact Information & Coordinates"],
                "suggestedAction": {"label": "Contact Kumar Directly ↗", "href": "#contact"}
            }

        if any(w in q for w in ["i2", "experience", "current", "job", "work", "latency", "redis"]):
            return {
                "text": "Kumar has **3+ years** of production engineering experience. Currently, he is a **Full Stack & AI Developer at I2 Global Virtual Learning** (Bengaluru), where he architected an interactive AI student assistant using LLM APIs & Server-Sent Events (SSE), built microservices on AWS ECS (99.9% uptime), and implemented Redis caching to cut query latency by 40% (220ms → 128ms).",
                "citations": ["I2 Global Virtual Learning - Full Stack & AI Developer"],
                "suggestedAction": {"label": "Explore Experience Section ↗", "href": "#experience"}
            }

        if any(w in q for w in ["ai", "llm", "rag", "agent", "prompt", "vector", "embedding", "openai", "gemini", "claude"]):
            return {
                "text": "Kumar specializes in **AI Engineering & LLM Orchestration**!\n• **RAG Pipelines:** Vector search and document context augmentation using Pinecone and pgvector.\n• **LLM APIs:** OpenAI GPT-4, Google Gemini, Anthropic Claude with structured function calling.\n• **Autonomous AI Agents:** Automated student query resolution and low-latency streaming via SSE.",
                "citations": ["AI Engineering & LLM Orchestration Skills"],
                "suggestedAction": {"label": "View AI Skill Stack ↗", "href": "#skills"}
            }

        if any(w in q for w in ["skill", "stack", "react", "next", "python", "node", "aws", "docker", "tech"]):
            return {
                "text": "Kumar's production tech stack includes:\n• **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, WebGL.\n• **Backend:** Python (FastAPI, Flask), Node.js, Express.js, RESTful microservices.\n• **Databases & Caching:** PostgreSQL, MongoDB, Redis (task queues & caching).\n• **Cloud & DevOps:** AWS (ECS, S3, RDS, Lambda), Docker, GitHub Actions CI/CD.",
                "citations": ["Full Stack Tech Stack", "Cloud Architecture & DevOps Systems"],
                "suggestedAction": {"label": "Inspect Full Tech Stack ↗", "href": "#skills"}
            }

        if any(w in q for w in ["project", "built", "portfolio", "smartdoc", "automation"]):
            return {
                "text": "Kumar has engineered production-proven systems:\n1. **Enterprise AI Automation & Agent Platform:** Next.js + Python/Flask with LLM APIs, async Redis queues, and MongoDB.\n2. **Cloud-Native Automated CI/CD & AI Microservices:** Containerized AWS ECS deployment via Docker, GitHub Actions, and Terraform.",
                "citations": ["Enterprise AI Automation & Agent Workflow Platform", "Cloud-Native Automated CI/CD Pipeline"],
                "suggestedAction": {"label": "Inspect Projects ↗", "href": "#projects"}
            }

        if any(w in q for w in ["contact", "email", "phone", "reach", "linkedin", "github"]):
            return {
                "text": "Connect with Kumar directly:\n• 📧 **Email:** kumaramansagar01@gmail.com\n• 📱 **Phone:** +91 8434120273\n• 🌐 **LinkedIn:** linkedin.com/in/kumaramansagar\n• 💻 **GitHub:** github.com/Amansagar1\n• 📍 **Location:** Bengaluru, Karnataka",
                "citations": ["Contact Information & Coordinates"],
                "suggestedAction": {"label": "Send Message ↗", "href": "#contact"}
            }

        # Fallback to direct chunk compilation
        content = "\n\n".join([f"• **{c['title']}:** {c['content']}" for c in retrieved_chunks])
        return {
            "text": f"Here is the verified information regarding your query:\n\n{content}",
            "citations": citations,
            "suggestedAction": {"label": "View Portfolio ↗", "href": "#about"}
        }

    def generate(self, query: str, api_key: Optional[str] = None, provider: str = "gemini") -> Dict[str, Any]:
        """RAG Generation with Google Gemini or OpenAI, or fallback to local semantic RAG"""
        retrieved_chunks = self.retrieve(query, top_k=4)
        citations = [c["title"] for c in retrieved_chunks]
        context = "\n\n".join([f"[DOCUMENT: {c['title']}]\n{c['content']}" for c in retrieved_chunks])

        # If no API key provided, look up environment variables or fallback
        key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")
        if not key:
            local_ans = self.synthesize_local(query, retrieved_chunks)
            return {
                "text": local_ans["text"],
                "citations": citations,
                "suggestedAction": local_ans.get("suggestedAction"),
                "providerUsed": "Python Local RAG Engine"
            }

        system_prompt = (
            "You are 'Nexus', the intelligent and friendly AI Avatar and Assistant for Kumar Aman Sagar.\n"
            "Kumar is a Full Stack & AI Application Engineer with 3+ years experience based in Bengaluru.\n"
            "Answer the question concisely, enthusiastically, and accurately using ONLY the verified resume context below.\n"
            "If asked about hiring, emphasize he is an immediate joiner (< 15 days) in Bengaluru, open to Hybrid, On-site, or Remote.\n"
            "Use clear markdown bullet points where helpful.\n\n"
            f"VERIFIED RESUME CONTEXT:\n{context}"
        )

        try:
            if provider == "gemini" or (not provider and "AIza" in key):
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
                payload = {
                    "contents": [{
                        "role": "user",
                        "parts": [{"text": f"{system_prompt}\n\nUSER QUESTION: {query}"}]
                    }],
                    "generationConfig": {
                        "temperature": 0.3,
                        "maxOutputTokens": 500
                    }
                }
                res = requests.post(url, json=payload, timeout=8)
                if res.status_code == 200:
                    data = res.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"]
                    return {
                        "text": text,
                        "citations": citations,
                        "providerUsed": "Google Gemini 1.5 Flash (Python RAG)"
                    }
            else:
                # OpenAI
                url = "https://api.openai.com/v1/chat/completions"
                headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
                payload = {
                    "model": "gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": query}
                    ],
                    "temperature": 0.3,
                    "max_tokens": 500
                }
                res = requests.post(url, headers=headers, json=payload, timeout=8)
                if res.status_code == 200:
                    data = res.json()
                    text = data["choices"][0]["message"]["content"]
                    return {
                        "text": text,
                        "citations": citations,
                        "providerUsed": "OpenAI GPT-4o-mini (Python RAG)"
                    }
        except Exception as e:
            print(f"[RAG Pipeline] API Call exception: {e}")

        # Fallback if API fails
        local_ans = self.synthesize_local(query, retrieved_chunks)
        return {
            "text": local_ans["text"],
            "citations": citations,
            "suggestedAction": local_ans.get("suggestedAction"),
            "providerUsed": "Python Local RAG Engine (Fallback)"
        }

rag_pipeline = PythonRAGPipeline()
