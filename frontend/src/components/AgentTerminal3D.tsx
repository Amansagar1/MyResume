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
          className="relative rounded-none bg-[#0d0d12]/90 /40  backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-white/40 group-hover:"
        >
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-white/20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-none bg-white hover:bg-white transition-colors cursor-pointer " />
              <span className="w-3 h-3 rounded-none bg-gray-500 hover:bg-yellow-400 transition-colors cursor-pointer " />
              <span className="w-3 h-3 rounded-none bg-white hover:bg-white transition-colors cursor-pointer " />
              <span className="ml-3 text-xs font-mono font-medium text-gray-500 flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                <Terminal className="w-3.5 h-3.5 text-white" />
                agent-orchestrator.ts
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none text-[10px] font-mono font-medium bg-white/10 text-white border border-white/30 ">
                <span className="w-1.5 h-1.5 rounded-none bg-white animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                Connected
              </span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center border-b border-slate-850 px-2 bg-[#0a0a0f] text-xs font-mono select-none">
            <button
              onClick={() => handleTabSwitch("agent")}
              className={`px-3 py-2.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "agent"
                  ? "border-white/40 text-white bg-white/10 font-medium "
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              RAG Engine
            </button>
            <button
              onClick={() => handleTabSwitch("micredrvices")}
              className={`px-3 py-2.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "micredrvices"
                  ? "border-white/40 text-white bg-white/10 font-medium "
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              Architecture
            </button>
            <button
              onClick={() => handleTabSwitch("telemetry")}
              className={`px-3 py-2.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "telemetry"
                  ? "border-white/40 text-white bg-white/10 font-medium "
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Telemetry
            </button>
          </div>

          {/* Terminal Body with Line Numbers */}
          <div className="flex font-mono text-xs min-h-[260px]">
            {/* Line Numbers Gutter */}
            <div className="w-10 flex-shrink-0 bg-[#08080c] border-r border-white/20/60 flex flex-col items-end py-4 pr-2 select-none text-slate-600">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="leading-[1.6rem]">{i + 1}</div>
              ))}
            </div>

            {/* Code Editor Content */}
            <div className={`p-4 flex-1 flex flex-col justify-between overflow-hidden transition-opacity duration-100 ${tabGlitch ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
              {activeTab === "agent" && (
                <div className="space-y-0 leading-[1.6rem]">
                  <div className="text-slate-500 flex justify-between items-center mb-1">
                    <span className="italic text-slate-500">/* Real-time AI Agent Resolution Pipeline */</span>
                    <span className="text-white/90 font-medium text-[10px] bg-white/10 px-2 py-0.5 rounded-none border border-white/20">SSE ACTIVE</span>
                  </div>

                  {agentLogs.slice(0, Math.max(streamIndex, 3)).map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 whitespace-nowrap"
                    >
                      <span className="text-white select-none opacity-50">&gt;</span>
                      <span
                        className={
                          log.type === "success"
                            ? "text-white font-medium"
                            : log.type === "llm"
                            ? "text-white font-semibold"
                            : log.type === "stream"
                            ? "text-white font-medium italic"
                            : "text-slate-300"
                        }
                      >
                        {log.text}
                      </span>
                    </motion.div>
                  ))}

                  {isQuerying && (
                    <div className="flex items-center gap-2 text-white/80 animate-pulse pt-1 whitespace-nowrap">
                      <span className="text-white opacity-50">&gt;</span>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Generating low-latency stream chunk...
                    </div>
                  )}
                  {!isQuerying && streamIndex >= agentLogs.length && (
                    <div className="flex items-center gap-2 text-slate-600 pt-1">
                      <span className="text-white opacity-50">&gt;</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "micredrvices" && (
                <div className="space-y-0 leading-[1.6rem] whitespace-pre">
                  <div className="italic text-slate-500">/* AWS ECS Task Definition & Redis Config */</div>
                  <div><span className="text-white font-medium">const</span> <span className="text-white">cluster</span> = <span className="text-white">&quot;production-ai-ecs&quot;</span>;</div>
                  <div><span className="text-white font-medium">const</span> <span className="text-white">services</span> = {"{"}</div>
                  <div className="pl-4"><span className="text-slate-300">api_gateway:</span> <span className="text-white">&quot;Node.js + TS (Port 3000)&quot;</span>,</div>
                  <div className="pl-4"><span className="text-slate-300">agent_worker:</span> <span className="text-white">&quot;Python FastAPI + Celery&quot;</span>,</div>
                  <div className="pl-4"><span className="text-slate-300">redis_queue:</span> <span className="text-white">&quot;Cluster Cache & Rate-Limiting&quot;</span></div>
                  <div>{"}"};</div>
                  <div className="mt-2 text-white flex items-center gap-1.5 bg-white/10 w-fit px-2 py-0.5 rounded border border-white/20">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    Zero-downtime rolling update verified
                  </div>
                </div>
              )}

              {activeTab === "telemetry" && (
                <div className="space-y-0 leading-[1.6rem]">
                  <div className="italic text-slate-500 mb-2">/* Production Performance Benchmark */</div>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <div className="p-3 rounded-none bg-[#0f0f15] /40 shadow-inner">
                      <span className="text-[10px] text-slate-500 uppercase block font-medium tracking-wider">Pre-Cache Latency</span>
                      <span className="text-lg font-medium tracking-tight tracking-tight text-white/90">220 ms</span>
                    </div>
                    <div className="p-3 rounded-none bg-white/5 border border-white/30 ">
                      <span className="text-[10px] text-white uppercase block font-medium tracking-wider">Post-Redis Latency</span>
                      <span className="text-lg font-medium tracking-tight tracking-tight text-white">128 ms <span className="text-[10px] text-white ml-1 bg-white/10 px-1 py-0.5 rounded">-42%</span></span>
                    </div>
                    <div className="p-3 rounded-none bg-[#0f0f15] /40 shadow-inner">
                      <span className="text-[10px] text-slate-500 uppercase block font-medium tracking-wider">Availability SLA</span>
                      <span className="text-lg font-medium tracking-tight tracking-tight text-white/90">99.98%</span>
                    </div>
                    <div className="p-3 rounded-none bg-[#0f0f15] /40 shadow-inner">
                      <span className="text-[10px] text-slate-500 uppercase block font-medium tracking-wider">Bundle Reduction</span>
                      <span className="text-lg font-medium tracking-tight tracking-tight text-white/90">-30% Size</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Trigger Button */}
              <div className="pt-3 mt-2 flex items-center justify-between border-t border-white/20/60 border-dashed">
                <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-white animate-pulse" />
                  Terminal Interactive - Drag to move
                </span>
                <button
                  onClick={handleTriggerQuery}
                  disabled={isQuerying}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[11px] font-medium bg-white/15 text-white border border-white/30 hover:bg-white/30 hover: active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
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
