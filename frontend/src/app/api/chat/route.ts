import { NextRequest, NextResponse } from "next/server";
import { generateLLMRAGResponse } from "../../../utils/ragEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, apiKey, provider } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message string is required" },
        { status: 400 }
      );
    }

    // Use environment variable if set on server, otherwise use client key
    const activeKey =
      apiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GROQ_API_KEY ||
      undefined;

    const activeProvider = provider || (process.env.OPENAI_API_KEY && !apiKey ? "openai" : "gemini");

    const result = await generateLLMRAGResponse(message, activeKey, activeProvider);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      {
        text: "I encountered a minor network glitch, but I'm here! Kumar Aman Sagar is a Full Stack & AI Application Engineer with 3+ years experience, available immediately in Bengaluru.",
        citations: ["System Fallback"],
        providerUsed: "Failover Engine"
      },
      { status: 200 }
    );
  }
}
