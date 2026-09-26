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
      icon: <Cpu className="w-4 h-4 text-white" />,
      tag: "LLM Orchestration",
    },
    {
      title: "High-Concurrency Cloud Systems",
      desc: "Deploying resilient containerized micredrvices on AWS ECS, Docker, and Redis caching layers that sustain 99.9% uptime under high traffic.",
      icon: <Cloud className="w-4 h-4 text-white" />,
      tag: "Cloud & DevOps",
    },
    {
      title: "Modern Full Stack Engineering",
      desc: "Building typed, high-performance web applications using React, Next.js, TypeScript, and FastAPI with clean domain-driven architecture.",
      icon: <Layers className="w-4 h-4 text-white" />,
      tag: "Next.js & FastAPI",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 relative bg-black/90 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-none text-xs font-mono font-semibold bg-white/10 text-white border border-white/20">
            <Sparkles className="w-3 h-3 text-white" />
            ENGINEERING PHILOSOPHY &bull; OVERVIEW
          </div>
          <Draggable>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight tracking-tight text-white tracking-tight">
              About Kumar
            </h2>
          </Draggable>
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-500 rounded-none" />
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-gray-400 leading-relaxed font-light">
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
            <div className="p-4 rounded-none bg-slate-900/50 border border-slate-850 space-y-2 text-xs font-mono">
              <span className="text-white font-semibold block">// Production Stack</span>
              <p className="text-gray-400 leading-normal">
                TypeScript &bull; Next.js &bull; React &bull; Node.js &bull; Python &bull; FastAPI &bull; Docker &bull; AWS ECS &bull; Redis &bull; PostgreSQL &bull; MongoDB
              </p>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-6 space-y-3">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-none bg-black/70 border border-slate-850 hover:border-white/40 transition-all hover:bg-slate-900/50 group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-none bg-slate-900  text-white group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <Draggable>
                      <h3 className="text-xs sm:text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                        {pillar.title}
                      </h3>
                    </Draggable>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-slate-900  text-gray-500">
                    {pillar.tag}
                  </span>
                </div>
                <Draggable>
                  <p className="text-xs text-gray-500 font-light leading-relaxed pl-8">
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
