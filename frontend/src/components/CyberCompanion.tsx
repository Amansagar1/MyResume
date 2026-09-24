"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Cpu, 
  Zap, 
  Send, 
  Bot, 
  Terminal, 
  Key, 
  ArrowUpRight, 
  RefreshCw,
  Sliders,
  CheckCircle2
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  citations?: string[];
  suggestedAction?: { label: string; href: string };
  providerUsed?: string;
  latencyMs?: number;
}

const suggestedPrompts = [
  "What are Kumar's core AI & LLM skills?",
  "Tell me about his work at I2 Global",
  "What is his notice period & location?",
  "What did he build with Redis & AWS ECS?"
];

export default function CyberCompanion() {
  // Avatar position state
  const [pos, setPos] = useState({ x: 84, y: 72 });
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [speech, setSpeech] = useState<string | null>("Hi! 👋 Click me to test Python RAG!");
  const [faceExpression, setFaceExpression] = useState<"normal" | "happy" | "speed" | "sparkle">("normal");
  const [isSpinning, setIsSpinning] = useState(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Chat Terminal State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [provider, setProvider] = useState<string>("gemini");
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Greetings! 🤖 I'm **Amnu**, Kumar Aman Sagar's personal AI Avatar.\n\nI am powered by a **Python 3.11 FastAPI RAG engine** supporting open-source models (Llama 3.3, DeepSeek R1, Ollama) and LLMs.\n\nAsk me anything about Kumar's background, AI projects, tech stack, or availability!",
      citations: ["Python RAG Knowledge Base"],
      providerUsed: "Python FastAPI RAG Microservice"
    }
  ]);

  // Read saved API key if previously entered
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("amnu_avatar_llm_key");
      if (savedKey) setApiKey(savedKey);
      const savedProvider = localStorage.getItem("amnu_avatar_llm_provider");
      if (savedProvider) setProvider(savedProvider);
    }
  }, []);

  const handleSaveApiKey = (key: string, prov: string) => {
    setApiKey(key);
    setProvider(prov);
    if (typeof window !== "undefined") {
      localStorage.setItem("amnu_avatar_llm_key", key);
      localStorage.setItem("amnu_avatar_llm_provider", prov);
    }
    setShowSettings(false);
  };

  // Scroll to bottom of chat when new message arrives
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  // 1. Roaming behavior across the window (paused when chat is open)
  useEffect(() => {
    if (isChatOpen) return;

    const roamInterval = setInterval(() => {
      const isMobile = window.innerWidth < 768;
      const minX = isMobile ? 65 : 45;
      const maxX = isMobile ? 85 : 88;
      const minY = 35;
      const maxY = 80;

      const nextX = minX + Math.random() * (maxX - minX);
      const nextY = minY + Math.random() * (maxY - minY);

      const deltaX = nextX - pos.x;
      setRotation(deltaX > 0 ? 8 : -8);
      setPos({ x: nextX, y: nextY });

      setTimeout(() => setRotation(0), 1800);
    }, 9000);

    return () => clearInterval(roamInterval);
  }, [pos.x, isChatOpen]);

  // 2. Scroll interaction
  useEffect(() => {
    if (isChatOpen) return;

    let lastScrollY = window.scrollY;
    let scrollTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      setRotation(isScrollingDown ? 10 : -10);
      setFaceExpression("speed");

      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setRotation(0);
        setFaceExpression("normal");
      }, 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [isChatOpen]);

  const triggerSpeech = (text: string) => {
    setSpeech(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, 5500);
  };

  // Click on avatar opens the RAG chat terminal
  const handleBotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpinning(true);
    setFaceExpression("sparkle");

    setTimeout(() => {
      setIsSpinning(false);
      setIsChatOpen(true);
      setSpeech(null);
      setFaceExpression("happy");
    }, 400);
  };

  // Submit Query to Python FastAPI RAG Service (with Next.js fallback)
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsGenerating(true);
    setFaceExpression("speed");

    const startTime = performance.now();

    try {
      let responseData: any = null;

      // 1. Try Python FastAPI Microservice first (Port 8001)
      try {
        const pyRes = await fetch("http://127.0.0.1:8001/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: query,
            apiKey: apiKey || undefined,
            provider: provider
          })
        });

        if (pyRes.ok) {
          responseData = await pyRes.json();
        }
      } catch (pyErr) {
        console.warn("Python backend unreachable, falling back to Next.js API:", pyErr);
      }

      // 2. Fallback to Next.js API route (/api/chat) if Python microservice is not responding
      if (!responseData) {
        const nextRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: query,
            apiKey: apiKey || undefined,
            provider: provider
          })
        });

        if (nextRes.ok) {
          responseData = await nextRes.json();
        } else {
          throw new Error("Chat APIs unreachable");
        }
      }

      const latency = Math.round(performance.now() - startTime);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseData.text,
        citations: responseData.citations || ["Kumar Aman Sagar Portfolio"],
        suggestedAction: responseData.suggestedAction,
        providerUsed: responseData.providerUsed || "Python 3.11 RAG Pipeline",
        latencyMs: responseData.latencyMs || latency
      };

      setMessages(prev => [...prev, botMsg]);
      setFaceExpression("happy");
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "Kumar Aman Sagar is actively **AVAILABLE FOR FULL-TIME ROLES** in **Bengaluru**! He is an **immediate joiner** with 3+ years experience across React, Next.js, Node.js, Python, AWS ECS, and RAG pipelines.",
          citations: ["Fallback Knowledge Base"],
          providerUsed: "Local Failover RAG"
        }
      ]);
      setFaceExpression("normal");
    } finally {
      setIsGenerating(false);
      setTimeout(() => setFaceExpression("normal"), 2000);
    }
  };

  return (
    <>
      {/* 1. Roaming Drone Companion */}
      <div
        className={`fixed z-[70] select-none transition-all duration-[2200ms] ease-out ${
          isChatOpen ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{
          left: isChatOpen ? "calc(100vw - 120px)" : `${pos.x}vw`,
          top: isChatOpen ? "calc(100vh - 120px)" : `${pos.y}vh`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative group cursor-pointer" onClick={handleBotClick}>
          {/* Interactive Speech Bubble */}
          <AnimatePresence>
            {!isChatOpen && speech && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="absolute bottom-full mb-3 right-1/2 translate-x-1/2 w-52 sm:w-60 p-3 rounded-2xl bg-zinc-950/95 border border-violet-500/40 shadow-[0_0_30px_rgba(139,92,246,0.35)] backdrop-blur-xl text-left"
              >
                <div className="flex items-start justify-between gap-1.5 mb-1">
                  <span className="text-[10px] font-mono font-bold text-violet-400 flex items-center gap-1 uppercase tracking-wider">
                    <Cpu className="w-3 h-3" />
                    PYTHON RAG AGENT
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSpeech(null);
                    }}
                    className="text-zinc-500 hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                  {speech}
                </p>
                <div className="mt-2 pt-1 border-t border-zinc-800 flex items-center justify-between text-[10px] text-violet-400 font-mono font-semibold">
                  <span>TAP TO CHAT WITH AI</span>
                  <span>⚡</span>
                </div>
                {/* Pointer triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-zinc-950" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Drone Sphere */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: isSpinning ? [0, 360] : rotation,
            }}
            transition={{
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotate: isSpinning ? { duration: 0.6, ease: "easeInOut" } : { duration: 1.2 },
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              setFaceExpression("happy");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setFaceExpression("normal");
            }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            title="Click to Chat with Kumar's Python RAG AI Avatar!"
          >
            {/* Outer Halo Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-ping opacity-30" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-violet-600/30 via-fuchsia-600/20 to-indigo-600/30 blur-md pointer-events-none" />

            {/* Bot Body (Aerodynamic Cyber Sphere) */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-zinc-850 via-zinc-900 to-black border-2 border-violet-400/60 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Top Antenna Beacon */}
              <div className="absolute -top-1 w-2.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />

              {/* Glowing Visor */}
              <div className="w-10 sm:w-12 h-6 sm:h-7 rounded-xl bg-black/90 border border-violet-500/50 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute -top-2 -left-2 w-8 h-4 bg-white/20 rounded-full rotate-12 blur-[1px]" />
                <div className="flex items-center gap-2 font-mono font-black text-xs sm:text-sm select-none">
                  {faceExpression === "normal" && (
                    <span className="text-violet-400 animate-pulse tracking-widest">&bull; &bull;</span>
                  )}
                  {faceExpression === "happy" && (
                    <span className="text-fuchsia-400 tracking-wider">^ _ ^</span>
                  )}
                  {faceExpression === "speed" && (
                    <span className="text-amber-400 tracking-widest">&gt; &lt;</span>
                  )}
                  {faceExpression === "sparkle" && (
                    <span className="text-cyan-300 tracking-wider">★ ★</span>
                  )}
                </div>
              </div>

              {/* Micro Chest Core Light */}
              <div className="mt-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-violet-400 animate-ping" />
                <span className="w-4 h-0.5 rounded-full bg-violet-500/60" />
              </div>
            </div>

            {/* Levitating Micro Thruster Flame */}
            <div className="absolute -bottom-1.5 flex gap-2">
              <span className="w-1.5 h-3 rounded-full bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
              <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-fuchsia-400 to-transparent animate-bounce" />
              <span className="w-1.5 h-3 rounded-full bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
            </div>

            {/* Prompt Tag */}
            {!isChatOpen && isHovered && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-[9px] font-mono tracking-wider shadow-lg flex items-center gap-1 whitespace-nowrap"
              >
                <Zap className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                CHAT WITH AI
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 2. Interactive Python RAG & LLM Chat Terminal Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[80] w-[calc(100vw-32px)] sm:w-[460px] h-[580px] max-h-[85vh] rounded-3xl bg-zinc-950/95 border border-violet-500/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(139,92,246,0.25)] flex flex-col overflow-hidden font-sans"
          >
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-center justify-center shadow-inner">
                  <Bot className="w-4 h-4 text-violet-400" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-white font-heading">Amnu AI Avatar</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Python 3.11 RAG
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Online &bull; Kumar Aman Sagar Knowledge Base
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  title="Configure LLM Provider / API Key"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  title="Minimize Chat"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional Settings Panel (LLM Provider & BYOK) */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-3 bg-zinc-900/95 border-b border-zinc-800 text-xs space-y-2.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between text-zinc-300 font-mono text-[11px]">
                    <span className="flex items-center gap-1.5 text-violet-400 font-bold">
                      <Key className="w-3.5 h-3.5" />
                      LLM API Key (Optional)
                    </span>
                    <span className="text-[10px] text-zinc-500">Stored in browser localStorage</span>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      className="px-2 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs outline-none cursor-pointer"
                    >
                      <option value="gemini">Google Gemini (Free Cloud)</option>
                      <option value="llama3">Meta Llama 3.3 (Groq Open Source)</option>
                      <option value="deepseek">DeepSeek R1 (Open Source)</option>
                      <option value="ollama">Ollama (Local Open Source)</option>
                      <option value="openai">OpenAI GPT-4o-mini</option>
                      <option value="huggingface">HuggingFace Open Source</option>
                    </select>
                    {provider === "ollama" ? (
                      <div className="flex-1 px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-[10px] flex items-center">
                        localhost:11434 (No key needed)
                      </div>
                    ) : (
                      <input
                        type="password"
                        placeholder={
                          provider === "gemini" ? "AIzaSy..." :
                          provider === "llama3" || provider === "deepseek" ? "Groq key (gsk_...)" :
                          provider === "huggingface" ? "HF key (hf_...)" : "sk-..."
                        }
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-xs outline-none focus:border-violet-500"
                      />
                    )}
                    <button
                      onClick={() => handleSaveApiKey(apiKey, provider)}
                      className="px-3 py-1.5 rounded-lg bg-violet-600 text-white font-semibold text-xs hover:bg-violet-500 active:scale-95 cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-tight">
                    * Supports open-source AI (Llama 3.3, DeepSeek R1, Ollama) and cloud LLMs. Without a key, Amnu uses the built-in <strong>Python Local RAG Engine</strong>!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Scroll View */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-sm shadow-md"
                        : "bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* Citations Pill Bar */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                        <span className="text-violet-400 font-bold">RAG Sources:</span>
                        {msg.citations.slice(0, 2).map((cit, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-zinc-300"
                          >
                            {cit}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Direct Action Link */}
                    {msg.suggestedAction && (
                      <div className="mt-2.5 pt-1">
                        <a
                          href={msg.suggestedAction.href}
                          onClick={() => setIsChatOpen(false)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 font-mono text-[10px] font-semibold border border-violet-500/30 transition-all active:scale-95"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Provider & Latency telemetry tag */}
                  {msg.providerUsed && (
                    <div className="mt-1 px-1 text-[9px] font-mono text-zinc-500 flex items-center gap-2">
                      <span>{msg.providerUsed}</span>
                      {msg.latencyMs !== undefined && (
                        <span>&bull; {msg.latencyMs}ms</span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Generating Thinking Animation */}
              {isGenerating && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-900/80 border border-violet-500/30 text-violet-400 text-xs font-mono max-w-[75%]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Python RAG searching vector chunks...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Pill Carousel */}
            <div className="px-3 py-1.5 bg-zinc-950/70 border-t border-zinc-850 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isGenerating}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-violet-500/40 hover:text-white text-zinc-400 text-[10px] font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Amnu about Kumar's AI skills, projects..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isGenerating}
                className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 text-zinc-100 placeholder-zinc-500 text-xs outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isGenerating}
                className="p-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-violet-500/25 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
