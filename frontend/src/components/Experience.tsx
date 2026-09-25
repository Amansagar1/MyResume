"use client";

import React from "react";
import { Briefcase, Calendar, CheckCircle2, Building2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ExperienceItem } from "../types/resume";
import Card3D from "./Card3D";
import Draggable from "./Draggable";

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  // Associated skills/tech tags inferred per role for quick visual scanning
  const getExperienceTags = (index: number) => {
    switch (index) {
      case 0:
        return ["LLM APIs", "Server-Sent Events (SSE)", "AWS ECS", "Node.js", "TypeScript", "Redis Caching", "Docker CI/CD"];
      case 1:
        return ["IoT Telemetry", "Python FastAPI", "Node.js", "Redis Rate-Limiting", "AWS CloudWatch", "Kubernetes", "Docker"];
      case 2:
        return ["React.js", "JavaScript (ES6+)", "Figma UI", "REST APIs", "Context API", "Agile Sprints"];
      default:
        return [];
    }
  };

  return (
    <section id="experience" className="py-20 relative bg-[#06060a]/80 overflow-hidden">
      {/* Decorative side blur */}
      <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-red-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            CAREER TRAJECTORY
          </div>
          <Draggable>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Work Experience</h2>
          </Draggable>
          <Draggable>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-xl font-light">
              Hands-on engineering across AI agent integrations, high-throughput micredrvices, and distributed cloud systems.
            </p>
          </Draggable>
          <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-500 rounded-full mt-3 mx-auto md:mx-0" />
        </div>

        {/* Timeline container (tighter spacing) */}
        <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-6">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative pl-6 md:pl-9 group"
            >
              {/* Glowing Timeline Dot */}
              <div className="absolute -left-[15px] top-3.5 w-7 h-7 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-red-400 flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] z-20">
                <Briefcase className="w-3 h-3 text-zinc-400 group-hover:text-red-400 transition-colors duration-300" />
              </div>

              {/* Highlight Pulse effect on dot */}
              <div className="absolute -left-[15px] top-3.5 w-7 h-7 rounded-full bg-red-400/20 scale-100 group-hover:scale-150 transition-transform duration-500 pointer-events-none -z-10" />

              {/* 3D Tilt Experience Card (Tighter padding & spacing) */}
              <Card3D depth={6} glowColor="rgba(239, 68, 68, 0.15)">
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-red-500/50 backdrop-blur-xl shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-3.5">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider block mb-0.5">
                        Role 0{index + 1}
                      </span>
                      <Draggable>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-red-300 transition-colors">
                          {item.role}
                        </h3>
                      </Draggable>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-red-400" />
                        {item.company}
                      </div>
                    </div>

                    {/* Period badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-inner self-start">
                      <Calendar className="w-3 h-3 text-red-400" />
                      {item.period}
                    </span>
                  </div>

                  {/* Job Highlights */}
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-2.5 text-xs text-zinc-350 leading-relaxed font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        <Draggable><span>{point}</span></Draggable>
                      </li>
                    ))}
                  </ul>

                  {/* Skills / Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-850">
                    {getExperienceTags(index).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-800/80 hover:border-red-500/30 hover:text-red-300 transition-colors shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
