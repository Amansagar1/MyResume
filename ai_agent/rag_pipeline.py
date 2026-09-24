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
        """Conversational ChatGPT-style persona generator for Amnu"""
        q = query.lower().strip()
        citations = [c["title"] for c in retrieved_chunks]

        # 1. Greetings & Identity ("hi", "who are you", "what can you do")
        if any(w in q for w in ["who are you", "who r u", "your name", "what is your name", "introduce yourself", "tell me about yourself"]) or q in ["hi", "hello", "hey", "hola", "yo", "sup"]:
            return {
                "text": "Hello there! 👋 I'm **Amnu**, the personal AI Avatar and Assistant for **Kumar Aman Sagar**.\n\nThink of me like your interactive guide to Kumar's engineering career! I can walk you through his **3+ years of experience** building AI agent architectures, his work at **I2 Global**, his production tech stack (React, Next.js, Node.js, Python, AWS ECS, Redis), or his availability for full-time opportunities in Bengaluru.\n\nWhat would you like to explore first?",
                "citations": ["Kumar Aman Sagar - Overview & Bio"],
                "suggestedAction": {"label": "Explore Kumar's Story ↗", "href": "#about"}
            }

        # 2. Why hire Kumar / What makes him great
        if any(w in q for w in ["why hire", "why should", "great", "stand out", "unique", "special", "strengths"]):
            return {
                "text": "What makes Kumar stand out is his battle-tested blend of **deep full-stack fundamentals** and **modern AI agent engineering**:\n\n• ⚡ **Production AI Integration:** He architected an interactive AI assistant with LLM APIs & Server-Sent Events (SSE) for low-latency streaming responses.\n• 🚀 **High-Concurrency Systems:** Built microservices on AWS ECS sustaining 99.9% uptime and configured Redis caching to cut latency by 40% (220ms → 128ms).\n• 📦 **Frontend Performance:** Reduced React client-side bundles by 30% for ultra-fast load times.\n• ⏱️ **Immediate Availability:** He is an immediate joiner (< 15 days notice) based in Bengaluru, open to Hybrid, On-site, or Remote roles!\n\nWould you like his direct contact details?",
                "citations": ["I2 Global Virtual Learning", "Full Stack Tech Stack", "Availability & Notice Period"],
                "suggestedAction": {"label": "Contact Kumar Directly ↗", "href": "#contact"}
            }

        # 3. Availability, notice period, location, salary
        if any(w in q for w in ["available", "notice", "hire", "join", "immediate", "salary", "bengaluru", "relocat", "open to work"]):
            return {
                "text": "Yes! Kumar Aman Sagar is actively **AVAILABLE FOR FULL-TIME ROLES** in **Bengaluru**! 🚀\n\nHere are his hiring parameters:\n• ⏱️ **Notice Period:** Immediate Joiner (< 15 days available)\n• 📍 **Location:** Bengaluru, Karnataka (Open to Relocation)\n• 💼 **Preferred Modes:** On-Site, Hybrid, or Global Remote\n• 🎯 **Target Positions:** Full Stack Engineer, AI Application Developer, Frontend Specialist, or Microservices Architect.\n\nYou can reach him directly via email at `kumaramansagar01@gmail.com` or call `+91 8434120273`.",
                "citations": ["Availability & Notice Period", "Contact Information & Coordinates"],
                "suggestedAction": {"label": "Initiate Discussion ↗", "href": "#contact"}
            }

        # 4. Work Experience & I2 Global
        if any(w in q for w in ["i2", "experience", "current", "job", "work", "latency", "redis", "company", "career"]):
            return {
                "text": "Kumar has **3+ years** of professional experience delivering scalable production software:\n\n1. **I2 Global Virtual Learning (Nov 2025 – Present | Full Stack & AI Developer):**\n   • Engineered an AI student assistant with LLM APIs and SSE streaming for sub-second responses.\n   • Deployed containerized microservices on AWS ECS maintaining 99.9% platform availability.\n   • Cut API latency by 40% using Redis caching and PostgreSQL query optimization.\n   • Automated zero-downtime CI/CD workflows using Docker and GitHub Actions.\n\n2. **Digital-Sync Technologies (Feb 2024 – Nov 2025 | Full Stack Developer):**\n   • Built real-time IoT energy monitoring dashboards and ingestion pipelines with Redis rate-limiting.\n\n3. **Achintya Solutions (Jun 2023 – Feb 2024 | Web Developer Intern):**\n   • Developed responsive React.js interfaces and consumed RESTful APIs.",
                "citations": ["I2 Global Virtual Learning - Full Stack & AI Developer", "Digital-Sync Technologies"],
                "suggestedAction": {"label": "View Career Timeline ↗", "href": "#experience"}
            }

        # 5. AI, LLM, RAG, and Agents
        if any(w in q for w in ["ai", "llm", "rag", "agent", "prompt", "vector", "embedding", "openai", "gemini", "claude"]):
            return {
                "text": "Kumar has dedicated hands-on expertise in **AI Engineering & LLM Orchestration**! 🧠\n\nHere is what he builds with AI:\n• **RAG Pipelines:** Designs vector indexing and contextual document augmentation using Pinecone and pgvector embeddings.\n• **LLM API Integration:** Seamless orchestration with Google Gemini, OpenAI GPT-4, and Anthropic Claude, utilizing structured tool/function calling.\n• **Real-Time Streaming:** Implements Server-Sent Events (SSE) and WebSockets so users get instant streaming tokens without long waiting times.\n• **Autonomous AI Workflows:** Automated content customization and query resolution bots.",
                "citations": ["AI Engineering & LLM Orchestration Skills", "Enterprise AI Automation Platform"],
                "suggestedAction": {"label": "View AI Skill Stack ↗", "href": "#skills"}
            }

        # 6. Tech Stack, Frontend, Backend, Cloud
        if any(w in q for w in ["skill", "stack", "react", "next", "python", "node", "aws", "docker", "tech", "database", "postgres", "mongo"]):
            return {
                "text": "Here is an overview of Kumar's production tech stack: 💻\n\n• **Frontend:** React.js, Next.js (App Router, Server Components), TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, Three.js WebGL.\n• **Backend & APIs:** Python (FastAPI, Flask), Node.js, Express.js, REST microservices, asynchronous task queues.\n• **Databases & Cache:** PostgreSQL, MongoDB, Redis (caching, pub/sub, rate-limiting), MySQL.\n• **Cloud & DevOps:** AWS (ECS, S3, RDS, Lambda, CloudWatch), Docker, Kubernetes, GitHub Actions CI/CD, Terraform, Linux.\n\nEverything is built with clean architecture, strict TypeScript typing, and high availability in mind!",
                "citations": ["Full Stack Tech Stack", "Cloud Architecture & DevOps Systems"],
                "suggestedAction": {"label": "Inspect Full Tech Stack ↗", "href": "#skills"}
            }

        # 7. Projects
        if any(w in q for w in ["project", "built", "portfolio", "smartdoc", "automation", "pipeline"]):
            return {
                "text": "Kumar has engineered several impressive production-grade projects: 🛠️\n\n1. **Enterprise AI Automation & Agent Platform:**\n   • A full-stack automation system featuring a Next.js frontend and an asynchronous Python/Flask backend.\n   • Integrates LLM APIs with high-throughput Redis task queues and MongoDB to process distributed agent tasks smoothly.\n\n2. **Cloud-Native Automated CI/CD & AI Microservices Pipeline:**\n   • End-to-end continuous deployment architecture using GitHub Actions, Docker, and AWS ECS.\n   • Deploys containerized endpoints with zero downtime and automated Terraform cloud provisioning.\n\nWould you like me to take you to the live project showcase?",
                "citations": ["Enterprise AI Automation Platform", "Cloud-Native CI/CD Pipeline"],
                "suggestedAction": {"label": "Inspect Projects ↗", "href": "#projects"}
            }

        # 8. Certifications & Education
        if any(w in q for w in ["certif", "oracle", "degree", "education", "college", "university", "mca", "study"]):
            return {
                "text": "Kumar has backed his practical skills with verified credentials: 🎓\n\n• 🏆 **Oracle Cloud Infrastructure (OCI) 2025 Certified AI Foundations Associate**\n• 🏆 **Oracle Fusion AI Agent Studio Certified Foundations Associate**\n• 📜 **React JS Developer Certification** — EdYoda Digital University\n• 🎓 **Master of Computer Applications (MCA)** — IGNOU (Bangalore Institute of Technology Center) [Pursuing]\n• 🎓 **Executive Certification in Full Stack Engineering** — EdYoda (Score: 89%)\n• 🎓 **Bachelor of Arts (BA)** — Muslim Minority Degree College\n\nHis certifications validate both his cloud infrastructure readiness and applied AI mastery!",
                "citations": ["Industry Certifications", "Formal Education"],
                "suggestedAction": {"label": "View Credentials ↗", "href": "#skills"}
            }

        # 9. Contact details
        if any(w in q for w in ["contact", "email", "phone", "reach", "linkedin", "github", "connect"]):
            return {
                "text": "You can connect with Kumar directly through any of these channels: 📬\n\n• 📧 **Email:** kumaramansagar01@gmail.com\n• 📱 **Phone:** +91 8434120273\n• 🌐 **LinkedIn:** [linkedin.com/in/kumaramansagar](https://linkedin.com/in/kumaramansagar)\n• 💻 **GitHub:** [github.com/Amansagar1](https://github.com/Amansagar1)\n• 📍 **Location:** Bengaluru, Karnataka\n\nHe responds quickly to messages and emails!",
                "citations": ["Contact Information & Coordinates"],
                "suggestedAction": {"label": "Send Message Now ↗", "href": "#contact"}
            }

        # Conversational contextual synthesis for any other query
        highlights = "\n".join([f"• **{c['title']}:** {c['content'][:180]}..." for c in retrieved_chunks[:2]])
        return {
            "text": f"That's a great question! Based on Kumar Aman Sagar's verified background:\n\n{highlights}\n\nIs there a specific project, technical skill, or aspect of his work you'd like me to dive deeper into?",
            "citations": citations[:2],
            "suggestedAction": {"label": "Explore Portfolio ↗", "href": "#about"}
        }

    def generate(self, query: str, api_key: Optional[str] = None, provider: str = "gemini") -> Dict[str, Any]:
        """RAG Generation with Google Gemini, OpenAI, or high-speed ChatGPT model"""
        retrieved_chunks = self.retrieve(query, top_k=4)
        citations = [c["title"] for c in retrieved_chunks]
        context = "\n\n".join([f"[DOCUMENT: {c['title']}]\n{c['content']}" for c in retrieved_chunks])

        system_prompt = (
            "You are 'Amnu', the intelligent, charismatic, and expert AI Avatar for Kumar Aman Sagar.\n"
            "Kumar is a Full Stack & AI Application Engineer with 3+ years experience based in Bengaluru.\n"
            "Respond naturally just like ChatGPT: conversational, smart, articulate, and helpful.\n"
            "Speak as Amnu ('I can share that Kumar...', 'Kumar and our team engineered...').\n"
            "Use the verified resume context below to provide accurate, production-level details.\n"
            "If asked about hiring/availability, emphasize he is an immediate joiner (< 15 days notice) in Bengaluru, open to Hybrid, On-site, or Remote.\n"
            "Format your answers with clean markdown points and bold highlights.\n\n"
            f"VERIFIED RESUME CONTEXT:\n{context}"
        )

        key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")

        # 1. Custom Google Gemini Key if provided
        if key and (provider == "gemini" or "AIza" in key):
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
                payload = {
                    "contents": [{
                        "role": "user",
                        "parts": [{"text": f"{system_prompt}\n\nUSER QUESTION: {query}"}]
                    }],
                    "generationConfig": {
                        "temperature": 0.4,
                        "maxOutputTokens": 600
                    }
                }
                res = requests.post(url, json=payload, timeout=9)
                if res.status_code == 200:
                    data = res.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"]
                    return {
                        "text": text,
                        "citations": citations,
                        "providerUsed": "Google Gemini 1.5 Flash (Python RAG)"
                    }
            except Exception as e:
                print(f"[RAG Gemini error]: {e}")

        # 2. Custom OpenAI Key if provided
        if key and (provider == "openai" or key.startswith("sk-")):
            try:
                url = "https://api.openai.com/v1/chat/completions"
                headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
                payload = {
                    "model": "gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": query}
                    ],
                    "temperature": 0.4,
                    "max_tokens": 600
                }
                res = requests.post(url, headers=headers, json=payload, timeout=9)
                if res.status_code == 200:
                    data = res.json()
                    text = data["choices"][0]["message"]["content"]
                    return {
                        "text": text,
                        "citations": citations,
                        "providerUsed": "OpenAI GPT-4o-mini (Python RAG)"
                    }
            except Exception as e:
                print(f"[RAG OpenAI error]: {e}")

        # 3. Fast Online LLM Attempt if reachable within 3.5s
        try:
            chatgpt_url = "https://text.pollinations.ai/"
            chatgpt_payload = {
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query}
                ],
                "model": "openai",
                "seed": 42
            }
            res = requests.post(chatgpt_url, json=chatgpt_payload, timeout=3.5)
            if res.status_code == 200 and res.text.strip():
                return {
                    "text": res.text.strip(),
                    "citations": citations,
                    "providerUsed": "ChatGPT (OpenAI GPT-4o Engine • Python RAG)"
                }
        except Exception:
            pass

        # 4. Instant Conversational RAG Generation
        local_ans = self.synthesize_local(query, retrieved_chunks)
        return {
            "text": local_ans["text"],
            "citations": citations,
            "suggestedAction": local_ans.get("suggestedAction"),
            "providerUsed": "Amnu AI • Python RAG Engine"
        }

rag_pipeline = PythonRAGPipeline()
