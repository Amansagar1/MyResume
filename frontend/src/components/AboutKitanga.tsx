"use client";

import React from "react";
import { Sparkles, Terminal, Code2, Cpu } from "lucide-react";
import { PersonalInfo } from "../types/resume";

interface AboutKitangaProps {
  personal: PersonalInfo;
}

export default function AboutKitanga({ personal }: AboutKitangaProps) {
  return (
    <section id="about" className="py-24 relative bg-[#06060a]/80 overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-violet-600/10 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            ENGINEER IDENTITY &bull; 03
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            About
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
        </div>

        {/* 2025.kitanga.dev signature reading contrast typography */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-relaxed sm:leading-loose text-white space-y-6 max-w-5xl">
          <div>
            <span className="text-zinc-600 font-light">Hi, my name is </span>
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {personal.name}
            </span>
            <span className="text-zinc-600 font-light">, a </span>
            <span className="text-violet-300 font-black">
              Full Stack &amp; AI Application Engineer
            </span>
            <span className="text-zinc-600 font-light"> with </span>
            <span className="text-white">3+ years</span>
            <span className="text-zinc-600 font-light"> of production experience.</span>
          </div>

          <div>
            <span className="text-zinc-600 font-light">I architect </span>
            <span className="text-indigo-300 font-black">
              autonomous AI agent networks
            </span>
            <span className="text-zinc-600 font-light">, </span>
            <span className="text-fuchsia-300 font-black">
              enterprise RAG vector pipelines
            </span>
            <span className="text-zinc-600 font-light">, and </span>
            <span className="text-white">
              high-concurrency cloud distributed backends
            </span>
            <span className="text-zinc-600 font-light"> on AWS and Docker.</span>
          </div>

          <div>
            <span className="text-zinc-600 font-light">Core tech I wield daily: </span>
            <span className="text-violet-400 font-mono text-lg sm:text-xl lg:text-2xl font-semibold">
              TypeScript &bull; Next.js &bull; React &bull; Node.js &bull; Python &bull; FastAPI &bull; Docker &bull; AWS ECS &bull; Redis &bull; PostgreSQL &bull; MongoDB &bull; FAISS &bull; Three.js
            </span>
          </div>

          <div className="text-lg sm:text-xl font-normal text-zinc-500 pt-6 border-t border-zinc-850">
            <span className="text-zinc-600">Beyond production shipping, I explore </span>
            <span className="text-zinc-300 font-medium">3D computational physics</span>
            <span className="text-zinc-600">, </span>
            <span className="text-zinc-300 font-medium">real-time WebGL shaders</span>
            <span className="text-zinc-600">, and </span>
            <span className="text-zinc-300 font-medium">distributed consensus algorithms</span>
            <span className="text-zinc-600">.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
