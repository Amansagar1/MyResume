"use client";

import React from "react";
import { Sparkles, Terminal, Code2, Cpu, Cloud, Layers, CheckCircle2 } from "lucide-react";
import { PersonalInfo } from "../types/resume";
import Draggable from "./Draggable";

interface AboutKitangaProps {
  personal: PersonalInfo;
}

export default function AboutKitanga({ personal }: AboutKitangaProps) {
  const pillars = [
    {
      title: "Autonomous AI Agents & RAG",
      desc: "Architecting low-latency LLM agent workflows, vector retrieval with pgvector/Pinecone, and real-time Server-Sent Events (SSE) streaming.",
      icon: <Cpu className="w-4 h-4 text-red-400" />,
      tag: "LLM Orchestration",
    },
    {
      title: "High-Concurrency Cloud Systems",
      desc: "Deploying resilient containerized micredrvices on AWS ECS, Docker, and Redis caching layers that sustain 99.9% uptime under high traffic.",
      icon: <Cloud className="w-4 h-4 text-red-400" />,
      tag: "Cloud & DevOps",
    },
    {
      title: "Modern Full Stack Engineering",
      desc: "Building typed, high-performance web applications using React, Next.js, TypeScript, and FastAPI with clean domain-driven architecture.",
      icon: <Layers className="w-4 h-4 text-red-400" />,
      tag: "Next.js & FastAPI",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 relative bg-[#06060a]/90 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            <Sparkles className="w-3 h-3 text-red-400" />
            ENGINEERING PHILOSOPHY &bull; OVERVIEW
          </div>
          <Draggable>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              About Kumar
            </h2>
          </Draggable>
          <div className="h-0.5 w-12 bg-gradient-to-r from-red-500 to-red-500 rounded-full" />
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-zinc-350 leading-relaxed font-light">
            <Draggable>
              <p>
                I am a <strong className="text-white font-semibold">Full Stack &amp; AI Application Engineer</strong> based in Bengaluru with <strong className="text-white font-semibold">3+ years</strong> of battle-tested experience building and scaling software systems.
              </p>
            </Draggable>
            <Draggable>
              <p>
                My focus centers on combining modern web user interfaces with intelligent backend agent systems. At I2 Global Virtual Learning, I engineered an AI assistant platform utilizing streaming LLM APIs that reduced API response times by 40% and improved concurrency across distributed cloud services.
              </p>
            </Draggable>
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 space-y-2 text-xs font-mono">
              <span className="text-red-400 font-semibold block">// Production Stack</span>
              <p className="text-zinc-350 leading-normal">
                TypeScript &bull; Next.js &bull; React &bull; Node.js &bull; Python &bull; FastAPI &bull; Docker &bull; AWS ECS &bull; Redis &bull; PostgreSQL &bull; MongoDB
              </p>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-6 space-y-3">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-850 hover:border-red-500/40 transition-all hover:bg-zinc-900/50 group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-red-400 group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <Draggable>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                        {pillar.title}
                      </h3>
                    </Draggable>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {pillar.tag}
                  </span>
                </div>
                <Draggable>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed pl-8">
                    {pillar.desc}
                  </p>
                </Draggable>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
