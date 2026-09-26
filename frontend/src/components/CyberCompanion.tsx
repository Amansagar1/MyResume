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
  // Floating Avatar Position & Roaming state
  const [pos, setPos] = useState({ x: 86, y: 70 });
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [speech, setSpeech] = useState<string | null>("Hey! 👋 Click me to chat with Python RAG!");
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
      text: "Greetings! 🤖 I'm **Amnu**, Kumar Aman Sagar's personal AI Avatar.\n\nI'm powered by a **Python 3.11 FastAPI RAG engine** supporting open-source models (Ollama, Groq Llama 3.3, DeepSeek R1) and cloud LLMs.\n\nAsk me anything about Kumar's background, AI projects, tech stack, or full-time availability!",
      citations: ["Python RAG Knowledge Base"],
      providerUsed: "Python FastAPI RAG Micredrvice"
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

  // Auto-dismiss initial greeting after 6 seconds
  useEffect(() => {
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, 6000);
    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    };
  }, []);

  // Roaming floating motion across the peripheral viewport
  useEffect(() => {
    if (isChatOpen || isHovered) return;

    const roamInterval = setInterval(() => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const minX = isMobile ? 68 : 65;
      const maxX = isMobile ? 86 : 88;
      const minY = 28;
      const maxY = 76;

      const nextX = minX + Math.random() * (maxX - minX);
      const nextY = minY + Math.random() * (maxY - minY);

      const deltaX = nextX - pos.x;
      setRotation(deltaX > 0 ? 8 : -8);
      setPos({ x: nextX, y: nextY });

      setTimeout(() => setRotation(0), 1600);
    }, 7500);

    return () => clearInterval(roamInterval);
  }, [pos.x, isChatOpen, isHovered]);

  // Dynamic scroll reaction: aerodynamic tilt and thruster speed
  useEffect(() => {
    if (isChatOpen) return;

    let lastScrollY = window.scrollY;
    let scrollTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      setRotation(isScrollingDown ? 12 : -12);
      setFaceExpression("speed");

      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setRotation(0);
        setFaceExpression("normal");
      }, 400);
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

      // 1. Try Python FastAPI Micredrvice first if in local development or if NEXT_PUBLIC_AI_API_URL is configured
      const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
      const configuredAiUrl = process.env.NEXT_PUBLIC_AI_API_URL;

      if (configuredAiUrl || isLocalhost) {
        try {
          const endpoint = configuredAiUrl ? `${configuredAiUrl}/chat` : "http://127.0.0.1:8001/chat";
          const pyRes = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: query,
              apiKey: apiKey || undefined,
              provider: provider
            }),
            signal: AbortSignal.timeout(3500)
          });

          if (pyRes.ok) {
            responseData = await pyRes.json();
          }
        } catch (pyErr) {
          console.warn("Python backend unreachable, using Vercel Next.js API:", pyErr);
        }
      }

      // 2. Native Vercel Serverless Route (/api/chat)
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
      {/* 1. Floating Autonomous Cyber Companion ("Amnu") */}
      <motion.div
        drag
        dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
        dragElastic={0.2}
        className={`fixed z-[75] select-none transition-opacity duration-300 ${
          isChatOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
        animate={{
          left: `${pos.x}vw`,
          top: `${pos.y}vh`,
        }}
        transition={{
          type: "spring",
          stiffness: 45,
          damping: 18,
          mass: 0.8,
        }}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative group cursor-pointer" onClick={handleBotClick}>
          {/* Interactive Non-Intrusive Speech Bubble / Tooltip */}
          <AnimatePresence>
            {!isChatOpen && (speech || isHovered) && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.92 }}
                className="absolute bottom-full right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 mb-3 w-56 p-3 rounded-none bg-black/95 border border-white/40  backdrop-blur-xl text-left"
              >
                <div className="flex items-start justify-between gap-1.5 mb-1">
                  <span className="text-[10px] font-mono font-medium text-white flex items-center gap-1 uppercase tracking-wider">
                    <Cpu className="w-3 h-3" />
                    AMNU • FLOATING AI
                  </span>
                  {speech && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpeech(null);
                      }}
                      className="text-slate-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed">
                  {speech || "Floating companion ready! Click me to chat with Python RAG & Open-Source LLMs."}
                </p>
                <div className="mt-2 pt-1 border-t border-slate-850 flex items-center justify-between text-[10px] text-white font-mono font-semibold">
                  <span>CLICK OR DRAG</span>
                  <span>⚡</span>
                </div>
                {/* Pointer triangle */}
                <div className="absolute top-full right-1/2 -translate-x-1/2 sm:right-6 sm:translate-x-0 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-slate-950" />
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
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              rotate: isSpinning ? { duration: 0.6, ease: "easeInOut" } : { duration: 1.0 },
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              setFaceExpression("happy");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setFaceExpression("normal");
            }}
            className="relative w-15 h-15 sm:w-16 sm:h-16 flex items-center justify-center filter drop- cursor-grab active:cursor-grabbing"
            title="Amnu Floating AI Companion (Click to chat, Drag to move)"
          >
            {/* Outer Halo Pulsing Ring */}
            <div className="absolute inset-0 rounded-none border border-blue-500/30 animate-ping opacity-25" />
            <div className="absolute -inset-1 rounded-none bg-gradient-to-tr from-blue-600/30 via-blue-600/20 to-blue-600/30 blur-md pointer-events-none" />

            {/* Bot Body (Aerodynamic Cyber Sphere) */}
            <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-none bg-gradient-to-b from-slate-850 via-slate-900 to-black border-2 border-white/40/60 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Top Antenna Beacon */}
              <div className="absolute -top-1 w-2.5 h-1.5 rounded-none bg-white animate-pulse" />

              {/* Glowing Visor */}
              <div className="w-9 sm:w-11 h-5 sm:h-6 rounded-none bg-black/90 border border-white/40 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute -top-2 -left-2 w-8 h-4 bg-white/20 rounded-none rotate-12 blur-[1px]" />
                <div className="flex items-center gap-1.5 font-mono font-medium tracking-tight tracking-tight text-xs select-none">
                  {faceExpression === "normal" && (
                    <span className="text-white animate-pulse tracking-widest">&bull; &bull;</span>
                  )}
                  {faceExpression === "happy" && (
                    <span className="text-white tracking-wider">^ _ ^</span>
                  )}
                  {faceExpression === "speed" && (
                    <span className="text-amber-400 tracking-widest">&gt; &lt;</span>
                  )}
                  {faceExpression === "sparkle" && (
                    <span className="text-blue-300 tracking-wider">★ ★</span>
                  )}
                </div>
              </div>

              {/* Micro Chest Core Light */}
              <div className="mt-0.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-none bg-white animate-ping" />
                <span className="w-3.5 h-0.5 rounded-none bg-white/60" />
              </div>
            </div>

            {/* Levitating Micro Thruster Flame with Jet Glow */}
            <div className="absolute -bottom-1.5 flex gap-1.5">
              <span className="w-1.5 h-3 rounded-none bg-gradient-to-b from-blue-400 to-transparent animate-pulse" />
              <span className="w-1.5 h-4 rounded-none bg-gradient-to-b from-blue-400 to-transparent animate-bounce" />
              <span className="w-1.5 h-3 rounded-none bg-gradient-to-b from-blue-400 to-transparent animate-pulse" />
            </div>

            {/* Floating Tag */}
            {!isChatOpen && isHovered && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-6 px-2 py-0.5 rounded-none bg-gradient-to-r from-blue-600 to-blue-600 text-white font-medium text-[9px] font-mono tracking-wider  flex items-center gap-1 whitespace-nowrap"
              >
                <Zap className="w-2 h-2 text-amber-300 fill-amber-300" />
                CHAT
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* 2. Interactive Python RAG & LLM Chat Terminal Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[80] w-[calc(100vw-32px)] sm:w-[460px] h-[580px] max-h-[85vh] rounded-none bg-black/95 border border-white/40 backdrop-blur-2xl  flex flex-col overflow-hidden font-mono"
          >
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-transparent border-b border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-none bg-blue-950/60 border border-white/40 flex items-center justify-center shadow-inner">
                  <Bot className="w-4 h-4 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-none bg-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-medium text-white font-heading">Amnu AI Avatar</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/20 text-blue-300 border border-blue-500/30">
                      Python 3.11 RAG
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono">
                    Online &bull; Kumar Aman Sagar Knowledge Base
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  title="Configure LLM Provider / API Key"
                  className="p-1.5 rounded-none text-gray-500 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  title="Minimize Chat"
                  className="p-1.5 rounded-none text-gray-500 hover:text-white hover:bg-slate-800 transition-colors"
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
                  className="px-4 py-3 bg-slate-900/95 border-b border-white/20 text-xs space-y-2.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <Key className="w-3.5 h-3.5" />
                      LLM API Key (Optional)
                    </span>
                    <span className="text-[10px] text-slate-500">Stored in browser localStorage</span>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      className="px-2 py-1.5 rounded-none bg-black  text-slate-200 text-xs outline-none cursor-pointer"
                    >
                      <option value="gemini">Google Gemini (Free Cloud)</option>
                      <option value="llama3">Meta Llama 3.3 (Groq Open Source)</option>
                      <option value="deepseek">DeepSeek R1 (Open Source)</option>
                      <option value="ollama">Ollama (Local Open Source)</option>
                      <option value="openai">OpenAI GPT-4o-mini</option>
                      <option value="huggingface">HuggingFace Open Source</option>
                    </select>
                    {provider === "ollama" ? (
                      <div className="flex-1 px-2.5 py-1.5 rounded-none bg-black  text-white font-mono text-[10px] flex items-center">
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
                        className="flex-1 px-3 py-1.5 rounded-none bg-black  text-slate-200 placeholder-slate-600 text-xs outline-none focus:border-blue-500"
                      />
                    )}
                    <button
                      onClick={() => handleSaveApiKey(apiKey, provider)}
                      className="px-3 py-1.5 rounded-none bg-blue-600 text-white font-semibold text-xs hover:bg-white active:scale-95 cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-tight">
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
                    className={`max-w-[88%] p-3.5 rounded-none leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-tr-sm "
                        : "bg-transparent text-slate-200  rounded-tl-sm "
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* Citations Pill Bar */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-white/20/40 flex flex-wrap items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                        <span className="text-white font-medium">RAG Sources:</span>
                        {msg.citations.slice(0, 2).map((cit, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-slate-900/50  text-slate-300"
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
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-none bg-white/20 hover:bg-white/30 text-blue-300 font-mono text-[10px] font-semibold border border-blue-500/30 transition-all active:scale-95"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Provider & Latency telemetry tag */}
                  {msg.providerUsed && (
                    <div className="mt-1 px-1 text-[9px] font-mono text-slate-500 flex items-center gap-2">
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
                <div className="flex items-center gap-2 p-3 rounded-none bg-transparent border border-blue-500/30 text-white text-xs font-mono max-w-[75%]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Python RAG searching vector chunks...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Pill Carousel */}
            <div className="px-3 py-1.5 bg-black/70 border-t border-slate-850 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isGenerating}
                  className="whitespace-nowrap px-2.5 py-1 rounded-none bg-slate-900  hover:border-white/40 hover:text-white text-gray-500 text-[10px] font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
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
              className="p-3 bg-transparent border-t border-white/20 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Amnu about Kumar's AI skills, projects..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isGenerating}
                className="flex-1 px-3.5 py-2 rounded-none bg-black  focus:border-blue-500 text-white placeholder-slate-500 text-xs outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isGenerating}
                className="p-2 rounded-none bg-gradient-to-r from-blue-600 to-blue-600 text-white hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all  shadow-blue-500/25 cursor-pointer"
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
