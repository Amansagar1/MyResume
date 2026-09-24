<?php
// d:\resume\backend\api\chat.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$query = trim($input['message'] ?? '');
$apiKey = $input['apiKey'] ?? getenv('GEMINI_API_KEY');

if (empty($query)) {
    http_response_code(400);
    echo json_encode(["error" => "Message is required"]);
    exit;
}

// 1. RAG Context Extraction (from Kumar Aman Sagar's verified profile)
$ragChunks = [
    "personal" => "Kumar Aman Sagar is a Full Stack & AI Application Engineer with 3+ years experience building web apps, real-time AI agents, and microservices backends using React.js, Next.js, Node.js, TypeScript, and Python. Cloud deployment on AWS ECS, Redis caching, and Docker CI/CD.",
    "contact" => "Email: kumaramansagar01@gmail.com | Phone: +91 8434120273 | Location: Bengaluru, Karnataka | LinkedIn: linkedin.com/in/kumaramansagar | GitHub: github.com/Amansagar1",
    "availability" => "Actively AVAILABLE FOR FULL-TIME ROLES in Bengaluru. Immediate joiner (< 15 days). Open to On-site, Hybrid, or Remote.",
    "i2_global" => "Full Stack & AI Developer at I2 Global Virtual Learning (Nov 2025 – Present | Bengaluru). Architected interactive AI assistant using LLM APIs & SSE streaming. Built AWS ECS microservices (99.9% uptime). Redis caching reduced latency from 220ms to 128ms (-42%).",
    "digital_sync" => "Full Stack Developer at Digital-Sync Technologies (Feb 2024 – Nov 2025 | Bengaluru). Built real-time IoT energy dashboards with React, Python ingestion pipelines, Redis rate-limiting, Docker containerization.",
    "skills" => "AI & LLM Orchestration (OpenAI, Gemini, Claude, RAG, AI Agents, SSE Streaming, Pinecone, pgvector). Frontend: React.js, Next.js, TypeScript, Tailwind. Backend: Node.js, Express, Python FastAPI, PostgreSQL, MongoDB, Redis. Cloud: AWS ECS, S3, RDS, Lambda, Docker, GitHub Actions.",
    "projects" => "1. Enterprise AI Automation & Agent Workflow Platform (Next.js, Python, Flask, LLM APIs, Redis Queues, MongoDB). 2. Cloud-Native CI/CD & AI Microservices Pipeline (AWS ECS, Docker, Terraform).",
    "certifications" => "Oracle Cloud Infrastructure (OCI) 2025 AI Foundations Associate, Oracle Fusion AI Agent Studio Certified Associate, React JS Developer (EdYoda)."
];

$matchedChunks = [];
$qLower = strtolower($query);

foreach ($ragChunks as $key => $chunk) {
    if (strpos($qLower, $key) !== false || 
        ($key === 'availability' && (strpos($qLower, 'notice') !== false || strpos($qLower, 'join') !== false || strpos($qLower, 'hire') !== false)) ||
        ($key === 'skills' && (strpos($qLower, 'tech') !== false || strpos($qLower, 'stack') !== false || strpos($qLower, 'python') !== false || strpos($qLower, 'react') !== false)) ||
        ($key === 'i2_global' && strpos($qLower, 'experience') !== false)) {
        $matchedChunks[] = $chunk;
    }
}

if (empty($matchedChunks)) {
    $matchedChunks[] = $ragChunks['personal'];
    $matchedChunks[] = $ragChunks['availability'];
}

$context = implode("\n\n", $matchedChunks);

// 2. Call Google Gemini if API Key provided
if (!empty($apiKey)) {
    $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . urlencode($apiKey);
    $prompt = "You are Amnu, the AI Avatar and Assistant for Kumar Aman Sagar (Full Stack & AI Application Engineer with 3+ years experience in Bengaluru).\n" .
              "Answer concisely, enthusiastically, and professionally based strictly on the verified context below:\n\n" .
              "CONTEXT:\n$context\n\n" .
              "USER QUESTION: $query";

    $payload = json_encode([
        "contents" => [
            ["role" => "user", "parts" => [["text" => $prompt]]]
        ],
        "generationConfig" => [
            "temperature" => 0.3,
            "maxOutputTokens" => 500
        ]
    ]);

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $result = json_decode($response, true);
        $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;
        if (!empty($text)) {
            echo json_encode([
                "text" => $text,
                "citations" => array_keys($matchedChunks),
                "providerUsed" => "Google Gemini 1.5 Flash (via PHP Microservice)"
            ]);
            exit;
        }
    }
}

// 3. Fallback: Intelligent Local RAG Synthesis
$answer = "";
if (strpos($qLower, 'available') !== false || strpos($qLower, 'notice') !== false || strpos($qLower, 'hire') !== false) {
    $answer = "Kumar Aman Sagar is **AVAILABLE FOR FULL-TIME ROLES** in Bengaluru. He is an **immediate joiner** (< 15 days notice) and open to Hybrid, Remote, or On-site roles.";
} elseif (strpos($qLower, 'experience') !== false || strpos($qLower, 'i2') !== false || strpos($qLower, 'work') !== false) {
    $answer = "Kumar has **3+ years** of hands-on production experience. He currently works as a **Full Stack & AI Developer at I2 Global Virtual Learning** (Bengaluru), where he engineered an AI student query assistant with LLM APIs & SSE streaming, built AWS ECS microservices (99.9% uptime), and implemented Redis caching to cut latency by 40%.";
} elseif (strpos($qLower, 'ai') !== false || strpos($qLower, 'llm') !== false || strpos($qLower, 'rag') !== false) {
    $answer = "Kumar specializes in **AI Engineering & LLM Orchestration**, including building end-to-end **RAG pipelines**, tool calling with OpenAI, Gemini, and Claude, vector embeddings with Pinecone/pgvector, and real-time streaming interfaces via Server-Sent Events.";
} elseif (strpos($qLower, 'contact') !== false || strpos($qLower, 'email') !== false || strpos($qLower, 'phone') !== false) {
    $answer = "Reach Kumar directly via:\n• 📧 **Email:** kumaramansagar01@gmail.com\n• 📱 **Phone:** +91 8434120273\n• 🌐 **LinkedIn:** linkedin.com/in/kumaramansagar\n• 💻 **GitHub:** github.com/Amansagar1";
} else {
    $answer = "Kumar Aman Sagar is a Full Stack & AI Application Engineer with 3+ years experience specializing in React.js, Next.js, Node.js, Python, AWS ECS, Redis caching, and RAG pipelines. He is available immediately for full-time positions in Bengaluru.";
}

echo json_encode([
    "text" => $answer,
    "citations" => ["Verified Resume Knowledge Base"],
    "providerUsed" => "PHP Local RAG Microservice"
], JSON_PRETTY_PRINT);
