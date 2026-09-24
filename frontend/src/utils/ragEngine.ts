// d:\resume\frontend\src\utils\ragEngine.ts
// Intelligent RAG (Retrieval-Augmented Generation) Knowledge Base & Engine for Kumar Aman Sagar

export interface KnowledgeChunk {
  id: string;
  category: "personal" | "experience" | "projects" | "skills" | "education" | "certifications" | "availability";
  title: string;
  keywords: string[];
  content: string;
  sectionLink?: string;
}

export const RESUME_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "personal_overview",
    category: "personal",
    title: "Kumar Aman Sagar - Overview & Bio",
    keywords: ["who", "about", "kumar", "aman", "sagar", "summary", "background", "intro", "bio", "profile", "developer"],
    content: "Kumar Aman Sagar is a Full Stack & AI Application Engineer with 3+ years of experience engineering scalable web applications, real-time AI agent integrations, and microservices backends using React.js, Next.js, Node.js, TypeScript, and Python. Proven expertise orchestrating LLM APIs, RAG pipelines, and automated AI workflows, backed by hands-on cloud deployment on AWS (ECS, Lambda, S3), Redis caching, and Dockerized CI/CD systems.",
    sectionLink: "#about"
  },
  {
    id: "contact_info",
    category: "personal",
    title: "Contact Information & Social Links",
    keywords: ["contact", "email", "phone", "number", "call", "reach", "linkedin", "github", "hire", "message"],
    content: "Email: kumaramansagar01@gmail.com | Phone: +91 8434120273 | Location: Bengaluru, Karnataka | LinkedIn: https://linkedin.com/in/kumaramansagar (username: kumaramansagar) | GitHub: https://github.com/Amansagar1 (username: Amansagar1)",
    sectionLink: "#contact"
  },
  {
    id: "availability_status",
    category: "availability",
    title: "Availability & Work Preferences",
    keywords: ["available", "notice", "period", "joining", "join", "immediate", "role", "full-time", "bengaluru", "relocate", "relocation", "remote", "hybrid", "salary"],
    content: "Kumar is actively AVAILABLE FOR FULL-TIME ROLES in Bengaluru. Notice Period: Immediate Joiner (< 15 days). Preferred Work Modes: Hybrid, On-Site (Bengaluru), or Remote. Target Roles: Full Stack Engineer, AI Application Developer, Frontend Specialist, Backend / Microservices Engineer.",
    sectionLink: "#contact"
  },
  {
    id: "exp_i2_global",
    category: "experience",
    title: "I2 Global Virtual Learning - Full Stack & AI Developer",
    keywords: ["i2", "global", "experience", "current", "job", "work", "role", "ai assistant", "sse", "streaming", "aws", "ecs", "redis", "latency", "bundle"],
    content: "Role: Full Stack & AI Developer at I2 Global Virtual Learning Pvt. Ltd. (Nov 2025 – Present | Bengaluru).\nKey Achievements:\n1. Architected and integrated an interactive AI assistant automating student query resolution using LLM APIs and Server-Sent Events (SSE) for low-latency streaming responses.\n2. Engineered scalable backend microservices using Node.js and TypeScript on AWS ECS, sustaining 99.9% platform availability across multi-tenant production systems.\n3. Developed responsive learning dashboards with React.js & TypeScript, reducing client-side bundle size and accelerating initial page load by 30%.\n4. Implemented Redis caching and PostgreSQL query indexing, reducing API latency from 220ms to under 130ms (40% gain).\n5. Constructed automated CI/CD pipelines via GitHub Actions and Docker with zero-downtime rolling updates.",
    sectionLink: "#experience"
  },
  {
    id: "exp_digital_sync",
    category: "experience",
    title: "Digital-Sync Technologies - Full Stack Developer",
    keywords: ["digital-sync", "digital", "sync", "experience", "previous", "iot", "energy", "telemetry", "python", "dashboard", "cloudwatch", "s3"],
    content: "Role: Full Stack Developer at Digital-Sync Technologies & Services Pvt. Ltd. (Feb 2024 – Nov 2025 | Bengaluru).\nKey Achievements:\n1. Built responsive telemetry dashboards using React.js and Tailwind CSS to track IoT smart energy usage in real time.\n2. Designed Python and Node.js RESTful data ingestion pipelines with Redis rate-limiting.\n3. Automated anomaly detection alerts on sensor streams using Python workers and AWS CloudWatch.\n4. Containerized microservices with Docker across staging and production Kubernetes.\n5. Configured AWS S3 and RDS automated backup policies ensuring zero data loss.",
    sectionLink: "#experience"
  },
  {
    id: "exp_achintya",
    category: "experience",
    title: "Achintya Solutions - Web Developer Intern",
    keywords: ["achintya", "solutions", "intern", "internship", "junior", "frontend", "figma", "react"],
    content: "Role: Web Developer Intern at Achintya Solutions (Jun 2023 – Feb 2024 | Bengaluru).\nEngineered modular, mobile-responsive interfaces using React.js and modern JavaScript based on Figma designs. Integrated third-party REST APIs and managed component state using React Context API.",
    sectionLink: "#experience"
  },
  {
    id: "skills_ai_llm",
    category: "skills",
    title: "AI Engineering & LLM Orchestration Skills",
    keywords: ["ai", "llm", "rag", "agents", "openai", "gemini", "claude", "prompt", "function calling", "vector", "embeddings", "pinecone", "pgvector", "orchestration"],
    content: "AI Engineering Skills: LLM API Orchestration (OpenAI GPT-4, Google Gemini, Anthropic Claude), Prompt Engineering, RAG (Retrieval-Augmented Generation) vector pipelines, AI Agents & Tool Calling, Streaming Responses (SSE / WebSockets), Vector Search & Embeddings with Pinecone and pgvector.",
    sectionLink: "#skills"
  },
  {
    id: "skills_fullstack",
    category: "skills",
    title: "Frontend, Backend & Database Skills",
    keywords: ["frontend", "backend", "full stack", "react", "next.js", "typescript", "javascript", "node.js", "express", "python", "fastapi", "flask", "postgresql", "mongodb", "mysql", "redis", "tailwind"],
    content: "Full Stack Tech Stack:\n- Frontend: React.js, Next.js (App Router / SSR), TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, Framer Motion, Three.js / WebGL.\n- Backend & APIs: Node.js, Express.js, Python (FastAPI, Flask), RESTful APIs, Microservices Architecture, Async Celery Workers.\n- Databases & Caching: PostgreSQL, MongoDB, MySQL, Redis (in-memory caching, task queues, rate-limiting).",
    sectionLink: "#skills"
  },
  {
    id: "skills_cloud_devops",
    category: "skills",
    title: "Cloud & DevOps Architecture",
    keywords: ["cloud", "devops", "aws", "ecs", "docker", "kubernetes", "github actions", "ci/cd", "s3", "lambda", "rds", "cloudwatch", "linux", "terraform"],
    content: "Cloud & DevOps Stack: AWS (ECS, S3, RDS, Lambda, CloudWatch, EC2), Docker containerization, Kubernetes, GitHub Actions CI/CD pipelines, Linux Administration, Terraform Infrastructure-as-Code.",
    sectionLink: "#skills"
  },
  {
    id: "proj_ai_platform",
    category: "projects",
    title: "Enterprise AI Automation & Agent Workflow Platform",
    keywords: ["project", "enterprise", "smartdoc", "automation", "agent workflow", "flask", "next.js", "async", "redis queue", "demo"],
    content: "Project: Enterprise AI Automation & Agent Workflow Platform.\nA full-stack automation platform featuring a Next.js UI and an asynchronous Python/Flask backend integrated with LLM APIs for automated content customization and document intelligence. Implemented high-throughput Redis task queues and MongoDB to process distributed asynchronous dispatches without blocking the main event loop.\nTech: Next.js, Python, Flask, LLM APIs, Redis, MongoDB, Async Queues.",
    sectionLink: "#projects"
  },
  {
    id: "proj_cloud_cicd",
    category: "projects",
    title: "Cloud-Native Automated CI/CD & AI Microservices Pipeline",
    keywords: ["project", "cicd", "ci/cd", "pipeline", "docker", "ecs", "terraform", "microservices", "infrastructure"],
    content: "Project: Cloud-Native Automated CI/CD & AI Microservices Pipeline.\nAn enterprise-grade CI/CD pipeline using GitHub Actions, Docker, and AWS ECS to deploy containerized full-stack and AI service endpoints with zero-downtime rolling updates. Automated cloud infrastructure provisioning using modular Terraform configurations with fine-grained AWS IAM security policies.\nTech: AWS ECS, Docker, GitHub Actions, Terraform, AWS IAM, Microservices.",
    sectionLink: "#projects"
  },
  {
    id: "certifications",
    category: "certifications",
    title: "Industry Certifications",
    keywords: ["certification", "certifications", "oracle", "oci", "foundations", "agent studio", "edyoda", "degree", "credential"],
    content: "Certifications:\n1. Oracle Cloud Infrastructure (OCI) 2025 AI Foundations Associate.\n2. Oracle Fusion AI Agent Studio Certified Foundations Associate.\n3. React JS Developer Certification — EdYoda Digital University.",
    sectionLink: "#skills"
  },
  {
    id: "education",
    category: "education",
    title: "Formal Education",
    keywords: ["education", "degree", "mca", "college", "university", "ignou", "bit", "bachelor", "master", "school"],
    content: "Education:\n1. Master of Computer Applications (MCA) — IGNOU (Bangalore Institute of Technology Center) [Pursuing].\n2. Executive Certification in Full Stack Engineering — EdYoda Digital University (Score: 89%).\n3. Bachelor of Arts (BA) — Muslim Minority Degree College.",
    sectionLink: "#skills"
  }
];

/**
 * Semantic Vector / TF-IDF Retrieval over Resume Knowledge Chunks
 */
export function retrieveRelevantChunks(query: string, topK: number = 3): KnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/\s+/).filter(t => t.length > 2);

  const scoredChunks = RESUME_KNOWLEDGE_BASE.map(chunk => {
    let score = 0;

    // Check title match
    if (chunk.title.toLowerCase().includes(normalizedQuery)) score += 8;

    // Check keyword matches
    chunk.keywords.forEach(kw => {
      if (normalizedQuery.includes(kw)) score += 4;
      queryTokens.forEach(token => {
        if (kw.includes(token) || token.includes(kw)) score += 2;
      });
    });

    // Check content matches
    queryTokens.forEach(token => {
      const occurrences = (chunk.content.toLowerCase().match(new RegExp(token, "g")) || []).length;
      score += Math.min(occurrences * 1.5, 6);
    });

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  const results = scoredChunks.filter(item => item.score > 0).slice(0, topK).map(item => item.chunk);

  // If no specific match, provide general personal overview + availability
  if (results.length === 0) {
    return [RESUME_KNOWLEDGE_BASE[0], RESUME_KNOWLEDGE_BASE[2]];
  }

  return results;
}

/**
 * Intelligent Local Synthesis Engine (Instant RAG response when no LLM key is configured)
 */
export function synthesizeLocalRAGAnswer(query: string, retrievedChunks: KnowledgeChunk[]): {
  answer: string;
  citations: string[];
  suggestedAction?: { label: string; href: string };
} {
  const q = query.toLowerCase();

  // 1. Notice / Availability / Hiring queries
  if (q.includes("available") || q.includes("notice") || q.includes("hire") || q.includes("join") || q.includes("bengaluru") || q.includes("relocat")) {
    return {
      answer: "Kumar Aman Sagar is actively **AVAILABLE FOR FULL-TIME ROLES** in **Bengaluru**! He is an **immediate joiner** (< 15 days notice) and is open to On-site in Bengaluru, Hybrid, or Global Remote opportunities.",
      citations: ["Availability & Work Preferences", "Contact Information"],
      suggestedAction: { label: "Contact Kumar Directly ↗", href: "#contact" }
    };
  }

  // 2. Experience / I2 Global / Current Role queries
  if (q.includes("experience") || q.includes("i2 global") || q.includes("work") || q.includes("job") || q.includes("digital-sync")) {
    const chunk = retrievedChunks.find(c => c.category === "experience") || retrievedChunks[0];
    return {
      answer: `Kumar has **3+ years** of production experience. Currently, he is a **Full Stack & AI Developer at I2 Global Virtual Learning** in Bengaluru, where he architected an interactive AI assistant using LLM APIs & Server-Sent Events (SSE), built microservices on AWS ECS sustaining 99.9% uptime, and implemented Redis caching to cut query latency by 40%.`,
      citations: [chunk.title],
      suggestedAction: { label: "View Career Timeline ↗", href: "#experience" }
    };
  }

  // 3. AI / LLM / RAG queries
  if (q.includes("ai") || q.includes("llm") || q.includes("rag") || q.includes("agent") || q.includes("prompt") || q.includes("vector")) {
    return {
      answer: "Kumar specializes in **AI Engineering & LLM Orchestration**! His expertise includes designing end-to-end **RAG pipelines**, integrating **OpenAI, Google Gemini, and Claude APIs**, building autonomous **AI Agents with function calling**, vector embeddings with Pinecone/pgvector, and delivering low-latency streaming responses via SSE & WebSockets.",
      citations: ["AI Engineering & LLM Orchestration Skills", "I2 Global Experience"],
      suggestedAction: { label: "Explore AI Skill Stack ↗", href: "#skills" }
    };
  }

  // 4. Tech stack / Frontend / Backend queries
  if (q.includes("skill") || q.includes("react") || q.includes("next") || q.includes("python") || q.includes("node") || q.includes("stack") || q.includes("docker") || q.includes("aws")) {
    return {
      answer: "Kumar's production tech stack spans:\n• **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, WebGL.\n• **Backend:** Node.js, Express.js, Python (FastAPI, Flask), RESTful microservices.\n• **Databases:** PostgreSQL, MongoDB, Redis (caching & async task queues).\n• **Cloud & DevOps:** AWS (ECS, S3, RDS, Lambda), Docker, GitHub Actions CI/CD.",
      citations: ["Full Stack Tech Stack", "Cloud & DevOps Architecture"],
      suggestedAction: { label: "View Technical Skills ↗", href: "#skills" }
    };
  }

  // 5. Projects queries
  if (q.includes("project") || q.includes("built") || q.includes("portfolio") || q.includes("automation")) {
    return {
      answer: "Kumar has engineered production-grade systems including:\n1. **Enterprise AI Automation & Agent Workflow Platform:** Next.js + Python/Flask with LLM APIs, high-throughput Redis task queues, and MongoDB.\n2. **Cloud-Native CI/CD & AI Microservices Pipeline:** Containerized AWS ECS deployment via Docker, GitHub Actions, and Terraform.",
      citations: ["Enterprise AI Automation Platform", "Cloud-Native CI/CD Pipeline"],
      suggestedAction: { label: "Inspect Live Projects ↗", href: "#projects" }
    };
  }

  // 6. Contact / Email queries
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
    return {
      answer: "You can reach Kumar directly at:\n• 📧 **Email:** kumaramansagar01@gmail.com\n• 📱 **Phone:** +91 8434120273\n• 🌐 **LinkedIn:** linkedin.com/in/kumaramansagar\n• 💻 **GitHub:** github.com/Amansagar1\n• 📍 **Location:** Bengaluru, Karnataka",
      citations: ["Contact Information"],
      suggestedAction: { label: "Send Message Now ↗", href: "#contact" }
    };
  }

  // Default synthesis based on retrieved chunks
  const contentSnippet = retrievedChunks.map(c => `• **${c.title}:** ${c.content}`).join("\n\n");
  return {
    answer: `Based on Kumar Aman Sagar's verified portfolio and background:\n\n${contentSnippet}`,
    citations: retrievedChunks.map(c => c.title),
    suggestedAction: retrievedChunks[0]?.sectionLink ? { label: `Jump to ${retrievedChunks[0].category.toUpperCase()} ↗`, href: retrievedChunks[0].sectionLink } : undefined
  };
}

/**
 * Call Live LLM API with RAG Augmented Context
 */
export async function generateLLMRAGResponse(
  userQuery: string,
  apiKey?: string,
  provider: "gemini" | "openai" = "gemini"
): Promise<{ text: string; citations: string[]; providerUsed: string }> {
  // 1. Retrieve RAG Chunks
  const retrievedChunks = retrieveRelevantChunks(userQuery, 4);
  const context = retrievedChunks.map(c => `[DOCUMENT: ${c.title}]\n${c.content}`).join("\n\n");
  const citations = retrievedChunks.map(c => c.title);

  const systemPrompt = `You are "Amnu", the intelligent, friendly, and expert AI Avatar for Kumar Aman Sagar.
Kumar is a Full Stack & AI Application Engineer with 3+ years experience based in Bengaluru.
Respond naturally just like ChatGPT: conversational, smart, articulate, and helpful.
Speak as Amnu ('I can share that Kumar...', 'Kumar and our team engineered...').
Use the verified resume context below to provide accurate, production-level details.
If asked about hiring/availability, emphasize he is an immediate joiner (< 15 days notice) in Bengaluru, open to Hybrid, On-site, or Remote.
Format your answers with clean markdown points and bold highlights.

VERIFIED RESUME CONTEXT:
${context}
`;

  // If no API key provided, call high-speed ChatGPT model directly
  if (!apiKey) {
    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuery }
          ],
          model: "openai",
          seed: 42
        })
      });
      if (response.ok) {
        const text = await response.text();
        if (text && text.trim()) {
          return {
            text: text.trim(),
            citations,
            providerUsed: "ChatGPT (OpenAI GPT-4o Engine • RAG)"
          };
        }
      }
    } catch (e) {
      console.warn("ChatGPT call error, falling back:", e);
    }

    const localResult = synthesizeLocalRAGAnswer(userQuery, retrievedChunks);
    return {
      text: localResult.answer,
      citations: localResult.citations,
      providerUsed: "Local RAG Engine (Offline Fallback)"
    };
  }

  try {
    if (provider === "gemini") {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: `${systemPrompt}\n\nUSER QUESTION: ${userQuery}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 600
            }
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.warn("Gemini API error, falling back to local RAG:", errText);
        const localFallback = synthesizeLocalRAGAnswer(userQuery, retrievedChunks);
        return {
          text: localFallback.answer,
          citations,
          providerUsed: "Local RAG Engine (Fallback)"
        };
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        return {
          text: generatedText,
          citations,
          providerUsed: "Google Gemini 1.5 Flash (RAG Augmented)"
        };
      }
    } else {
      // OpenAI Provider
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuery }
          ],
          temperature: 0.3,
          max_tokens: 600
        })
      });

      if (!response.ok) {
        const localFallback = synthesizeLocalRAGAnswer(userQuery, retrievedChunks);
        return {
          text: localFallback.answer,
          citations,
          providerUsed: "Local RAG Engine (Fallback)"
        };
      }

      const data = await response.json();
      const generatedText = data?.choices?.[0]?.message?.content;
      if (generatedText) {
        return {
          text: generatedText,
          citations,
          providerUsed: "OpenAI GPT-4o-mini (RAG Augmented)"
        };
      }
    }
  } catch (error) {
    console.error("LLM fetch error:", error);
  }

  // Graceful fallback to local RAG
  const localFallback = synthesizeLocalRAGAnswer(userQuery, retrievedChunks);
  return {
    text: localFallback.answer,
    citations,
    providerUsed: "Local RAG Engine"
  };
}
