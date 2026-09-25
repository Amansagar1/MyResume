"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, Cpu, Play, CheckCircle2, RefreshCw, Zap, Server } from "lucide-react";

import Draggable from "./Draggable";

export default function AgentTerminal3D() {
  const [activeTab, setActiveTab] = useState<"agent" | "micredrvices" | "telemetry">("agent");
  const [streamIndex, setStreamIndex] = useState(0);
  const [isQuerying, setIsQuerying] = useState(false);
  const [tabGlitch, setTabGlitch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

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

  const handleTabSwitch = (tab: "agent" | "micredrvices" | "telemetry") => {
    setActiveTab(tab);
    setTabGlitch(true);
    setTimeout(() => setTabGlitch(false), 150);
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
    <Draggable className="w-full max-w-xl mx-auto md:mx-0 group cursor-grab active:cursor-grabbing z-40">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-2xl bg-[#0d0d12]/90 border border-zinc-800/80 shadow-[0_25px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-red-500/50 group-hover:shadow-[0_20px_70px_rgba(239,68,68,0.3)]"
        >
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="ml-3 text-xs font-mono font-medium text-zinc-400 flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                agent-orchestrator.ts
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                Connected
              </span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center border-b border-zinc-850 px-2 bg-[#0a0a0f] text-xs font-mono select-none">
            <button
              onClick={() => handleTabSwitch("agent")}
              className={`px-3 py-2.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "agent"
                  ? "border-red-400 text-red-300 bg-red-500/10 font-bold shadow-[inset_0_-2px_10px_rgba(239,68,68,0.15)]"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              RAG Engine
            </button>
            <button
              onClick={() => handleTabSwitch("micredrvices")}
              className={`px-3 py-2.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "micredrvices"
                  ? "border-red-400 text-red-300 bg-red-500/10 font-bold shadow-[inset_0_-2px_10px_rgba(239,68,68,0.15)]"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              Architecture
            </button>
            <button
              onClick={() => handleTabSwitch("telemetry")}
              className={`px-3 py-2.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "telemetry"
                  ? "border-red-400 text-red-300 bg-red-500/10 font-bold shadow-[inset_0_-2px_10px_rgba(239,68,68,0.15)]"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Telemetry
            </button>
          </div>

          {/* Terminal Body with Line Numbers */}
          <div className="flex font-mono text-xs min-h-[260px]">
            {/* Line Numbers Gutter */}
            <div className="w-10 flex-shrink-0 bg-[#08080c] border-r border-zinc-800/60 flex flex-col items-end py-4 pr-2 select-none text-zinc-600">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="leading-[1.6rem]">{i + 1}</div>
              ))}
            </div>

            {/* Code Editor Content */}
            <div className={`p-4 flex-1 flex flex-col justify-between overflow-hidden transition-opacity duration-100 ${tabGlitch ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
              {activeTab === "agent" && (
                <div className="space-y-0 leading-[1.6rem]">
                  <div className="text-zinc-500 flex justify-between items-center mb-1">
                    <span className="italic text-zinc-500">/* Real-time AI Agent Resolution Pipeline */</span>
                    <span className="text-red-400/90 font-bold text-[10px] bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">SSE ACTIVE</span>
                  </div>

                  {agentLogs.slice(0, Math.max(streamIndex, 3)).map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 whitespace-nowrap"
                    >
                      <span className="text-red-500 select-none opacity-50">&gt;</span>
                      <span
                        className={
                          log.type === "success"
                            ? "text-red-400 font-bold"
                            : log.type === "llm"
                            ? "text-red-400 font-semibold"
                            : log.type === "stream"
                            ? "text-red-400 font-medium italic"
                            : "text-zinc-300"
                        }
                      >
                        {log.text}
                      </span>
                    </motion.div>
                  ))}

                  {isQuerying && (
                    <div className="flex items-center gap-2 text-red-400/80 animate-pulse pt-1 whitespace-nowrap">
                      <span className="text-red-500 opacity-50">&gt;</span>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Generating low-latency stream chunk...
                    </div>
                  )}
                  {!isQuerying && streamIndex >= agentLogs.length && (
                    <div className="flex items-center gap-2 text-zinc-600 pt-1">
                      <span className="text-red-500 opacity-50">&gt;</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "micredrvices" && (
                <div className="space-y-0 leading-[1.6rem] whitespace-pre">
                  <div className="italic text-zinc-500">/* AWS ECS Task Definition & Redis Config */</div>
                  <div><span className="text-red-400 font-bold">const</span> <span className="text-red-300">cluster</span> = <span className="text-red-300">&quot;production-ai-ecs&quot;</span>;</div>
                  <div><span className="text-red-400 font-bold">const</span> <span className="text-red-300">services</span> = {"{"}</div>
                  <div className="pl-4"><span className="text-zinc-300">api_gateway:</span> <span className="text-red-300">&quot;Node.js + TS (Port 3000)&quot;</span>,</div>
                  <div className="pl-4"><span className="text-zinc-300">agent_worker:</span> <span className="text-red-300">&quot;Python FastAPI + Celery&quot;</span>,</div>
                  <div className="pl-4"><span className="text-zinc-300">redis_queue:</span> <span className="text-red-300">&quot;Cluster Cache & Rate-Limiting&quot;</span></div>
                  <div>{"}"};</div>
                  <div className="mt-2 text-red-400 flex items-center gap-1.5 bg-red-500/10 w-fit px-2 py-0.5 rounded border border-red-500/20">
                    <CheckCircle2 className="w-3 h-3 text-red-400" />
                    Zero-downtime rolling update verified
                  </div>
                </div>
              )}

              {activeTab === "telemetry" && (
                <div className="space-y-0 leading-[1.6rem]">
                  <div className="italic text-zinc-500 mb-2">/* Production Performance Benchmark */</div>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <div className="p-3 rounded-lg bg-[#0f0f15] border border-zinc-800/80 shadow-inner">
                      <span className="text-[10px] text-zinc-500 uppercase block font-bold tracking-wider">Pre-Cache Latency</span>
                      <span className="text-lg font-black text-red-400/90">220 ms</span>
                    </div>
                    <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 shadow-[inset_0_0_15px_rgba(239,68,68,0.1)]">
                      <span className="text-[10px] text-red-400 uppercase block font-bold tracking-wider">Post-Redis Latency</span>
                      <span className="text-lg font-black text-red-300">128 ms <span className="text-[10px] text-red-400 ml-1 bg-red-500/10 px-1 py-0.5 rounded">-42%</span></span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0f0f15] border border-zinc-800/80 shadow-inner">
                      <span className="text-[10px] text-zinc-500 uppercase block font-bold tracking-wider">Availability SLA</span>
                      <span className="text-lg font-black text-red-400/90">99.98%</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0f0f15] border border-zinc-800/80 shadow-inner">
                      <span className="text-[10px] text-zinc-500 uppercase block font-bold tracking-wider">Bundle Reduction</span>
                      <span className="text-lg font-black text-red-300/90">-30% Size</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Trigger Button */}
              <div className="pt-3 mt-2 flex items-center justify-between border-t border-zinc-800/60 border-dashed">
                <span className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Terminal Interactive - Drag to move
                </span>
                <button
                  onClick={handleTriggerQuery}
                  disabled={isQuerying}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  Simulate AI Stream
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Draggable>
  );
}
