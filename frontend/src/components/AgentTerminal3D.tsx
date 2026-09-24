"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, Cpu, Play, CheckCircle2, RefreshCw, Zap, Server } from "lucide-react";

export default function AgentTerminal3D() {
  const [activeTab, setActiveTab] = useState<"agent" | "microservices" | "telemetry">("agent");
  const [streamIndex, setStreamIndex] = useState(0);
  const [isQuerying, setIsQuerying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Streaming log lines
  const agentLogs = [
    { type: "sys", text: "[RAG_PIPELINE] Vector query: 'student curriculum context'" },
    { type: "info", text: "✓ Pinecone/pgvector returned top-3 chunks (similarity: 0.94)" },
    { type: "llm", text: "⚡ LLM Orchestrator: Invoking Claude 3.5 Sonnet / Gemini API" },
    { type: "stream", text: "▶ Streaming SSE response to client (latency: 128ms)" },
    { type: "success", text: "✓ Query resolved in 240ms. Redis cache updated (TTL: 3600s)" },
  ];

  const handleTriggerQuery = () => {
    setIsQuerying(true);
    setStreamIndex(0);
  };

  useEffect(() => {
    if (!isQuerying) return;
    if (streamIndex < agentLogs.length) {
      const timer = setTimeout(() => {
        setStreamIndex((prev) => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setIsQuerying(false);
    }
  }, [isQuerying, streamIndex, agentLogs.length]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="w-full max-w-xl mx-auto md:mx-0 group cursor-default"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl bg-zinc-950/85 border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden transition-shadow duration-300 group-hover:border-violet-500/40 group-hover:shadow-[0_20px_60px_rgba(139,92,246,0.18)]"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/40" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400/40" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
            <span className="ml-3 text-xs font-mono font-medium text-zinc-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-violet-400" />
              agent-orchestrator.ts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              99.9% Uptime
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-zinc-850 px-3 bg-zinc-950/60 text-xs font-mono">
          <button
            onClick={() => setActiveTab("agent")}
            className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "agent"
                ? "border-violet-400 text-violet-300 bg-violet-500/10 font-semibold"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            RAG & LLM Engine
          </button>
          <button
            onClick={() => setActiveTab("microservices")}
            className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "microservices"
                ? "border-violet-400 text-violet-300 bg-violet-500/10 font-semibold"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            AWS ECS Pipeline
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`px-3 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "telemetry"
                ? "border-violet-400 text-violet-300 bg-violet-500/10 font-semibold"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Telemetry
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 font-mono text-xs text-zinc-300 min-h-[230px] flex flex-col justify-between">
          {activeTab === "agent" && (
            <div className="space-y-2 leading-relaxed">
              <div className="text-zinc-500 text-[11px] pb-1 border-b border-zinc-900 flex justify-between items-center">
                <span>// Real-time AI Agent Resolution Pipeline</span>
                <span className="text-violet-400/90 font-bold">SSE STREAM ACTIVE</span>
              </div>

              {agentLogs.slice(0, Math.max(streamIndex, 3)).map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-violet-400 select-none">&gt;</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-emerald-400 font-semibold"
                        : log.type === "llm"
                        ? "text-indigo-300"
                        : log.type === "stream"
                        ? "text-violet-300 font-medium"
                        : "text-zinc-300"
                    }
                  >
                    {log.text}
                  </span>
                </motion.div>
              ))}

              {isQuerying && (
                <div className="flex items-center gap-2 text-violet-400 animate-pulse text-[11px] pt-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Generating low-latency stream chunk...
                </div>
              )}
            </div>
          )}

          {activeTab === "microservices" && (
            <div className="space-y-1.5 text-zinc-300 leading-relaxed text-[11px]">
              <div className="text-violet-400 font-bold">// AWS ECS Task Definition & Redis Config</div>
              <p className="text-zinc-500">cluster: <span className="text-white">&quot;production-ai-ecs&quot;</span></p>
              <p className="text-zinc-500">services:</p>
              <p className="pl-4 text-emerald-400">- api_gateway: <span className="text-zinc-400">Node.js + TS (Port 3000)</span></p>
              <p className="pl-4 text-indigo-300">- agent_worker: <span className="text-zinc-400">Python FastAPI + Celery</span></p>
              <p className="pl-4 text-fuchsia-400">- redis_queue: <span className="text-zinc-400">Cluster Cache &amp; Rate-Limiting</span></p>
              <p className="text-zinc-500">ci_cd: <span className="text-white">&quot;GitHub Actions &rarr; Docker ECR &rarr; ECS Deploy&quot;</span></p>
              <p className="emerald-400 flex items-center gap-1.5 pt-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Zero-downtime rolling update verified</span>
              </p>
            </div>
          )}

          {activeTab === "telemetry" && (
            <div className="space-y-2 text-[11px]">
              <div className="text-zinc-500 pb-1 border-b border-zinc-900">// Production Performance Benchmark</div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Pre-Cache Latency</span>
                  <span className="text-base font-bold text-red-400">220 ms</span>
                </div>
                <div className="p-2.5 rounded-lg bg-violet-950/30 border border-violet-500/30">
                  <span className="text-[10px] text-violet-400 uppercase block font-semibold">Post-Redis Latency</span>
                  <span className="text-base font-bold text-violet-300">128 ms (-42%)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Availability SLA</span>
                  <span className="text-base font-bold text-emerald-400">99.98%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Bundle Reduction</span>
                  <span className="text-base font-bold text-fuchsia-300">-30% Size</span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Trigger Button */}
          <div className="pt-4 mt-3 border-t border-zinc-900/80 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500">
              Interactive 3D Glimpse &bull; Hover to Tilt
            </span>
            <button
              onClick={handleTriggerQuery}
              disabled={isQuerying}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30 hover:bg-violet-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-violet-400 text-violet-400" />
              Simulate AI Stream
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
