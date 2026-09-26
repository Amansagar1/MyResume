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
    <section id="experience" className="py-24 lg:py-32 relative bg-black/80 overflow-hidden">
      {/* Decorative side blur */}
      <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-none bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none text-xs font-mono font-semibold bg-white/10 text-white border border-white/20 mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            CAREER TRAJECTORY
          </div>
          <Draggable>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white tracking-tight">Work Experience</h2>
          </Draggable>
          <Draggable>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-xl font-light">
              Hands-on engineering across AI agent integrations, high-throughput micredrvices, and distributed cloud systems.
            </p>
          </Draggable>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-none mt-3 mx-auto md:mx-0" />
        </div>

        {/* Timeline container (tighter spacing) */}
        <div className="relative border-l border-white/20 ml-3 md:ml-6 space-y-6">
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
              <div className="absolute -left-[15px] top-3.5 w-7 h-7 rounded-none bg-black border-2 border-white/20 group-hover:border-white/40 flex items-center justify-center transition-all duration-300  z-20">
                <Briefcase className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Highlight Pulse effect on dot */}
              <div className="absolute -left-[15px] top-3.5 w-7 h-7 rounded-none bg-white/20 scale-100 group-hover:scale-150 transition-transform duration-500 pointer-events-none -z-10" />

              {/* 3D Tilt Experience Card (Tighter padding & spacing) */}
              <Card3D depth={25} glowColor="rgba(0, 170, 255, 0.4)">
                <div className="p-4 sm:p-5 rounded-none bg-slate-900/60 hover:border-white/40 backdrop-blur-xl  transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-3.5">
                    <div>
                      <span className="text-[10px] font-mono font-medium text-white uppercase tracking-wider block mb-0.5">
                        Role 0{index + 1}
                      </span>
                      <Draggable>
                        <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white group-hover:text-blue-300 transition-colors">
                          {item.role}
                        </h3>
                      </Draggable>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-white" />
                        {item.company}
                      </div>
                    </div>

                    {/* Period badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none text-[11px] font-mono font-semibold bg-slate-900  text-slate-300 shadow-inner self-start">
                      <Calendar className="w-3 h-3 text-white" />
                      {item.period}
                    </span>
                  </div>

                  {/* Job Highlights */}
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
                        <Draggable><span>{point}</span></Draggable>
                      </li>
                    ))}
                  </ul>

                  {/* Skills / Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-850">
                    {getExperienceTags(index).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-none text-[10px] font-mono bg-transparent text-gray-500 hover:border-blue-500/30 hover:text-blue-300 transition-colors "
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
