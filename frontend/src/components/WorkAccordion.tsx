"use client";

import React, { useState } from "react";
import { ArrowUpRight, Radio, ExternalLink, Cpu, Layers, Terminal, Sparkles, Download, Mail } from "lucide-react";
import { GithubIcon } from "./Icons";
import { ProjectItem } from "../types/resume";

interface WorkAccordionProps {
  projects: ProjectItem[];
}

export default function WorkAccordion({ projects }: WorkAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Gradient visuals for projects (Electric Violet / Indigo / Fuchsia / Purple)
  const projectGradients = [
    "from-violet-950/70 via-zinc-950 to-zinc-950",
    "from-indigo-950/70 via-zinc-950 to-zinc-950",
    "from-fuchsia-950/70 via-zinc-950 to-zinc-950",
    "from-purple-950/70 via-zinc-950 to-zinc-950",
  ];

  const projectYears = ["2024 - PRESENT", "2023 - 2024", "2023", "2022"];

  return (
    <div className="w-full space-y-5">
      {/* Kitanga-style Horizontal Expandable Accordion Grid (Tighter & Sleeker) */}
      <div className="hidden lg:grid grid-cols-12 gap-2.5 h-[460px] w-full transition-all duration-500 ease-out">
        {projects.map((project, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 flex flex-col justify-between p-5 ${
                isActive
                  ? "col-span-6 bg-zinc-900/90 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                  : "col-span-2 bg-zinc-950/60 border-zinc-800/80 hover:border-violet-500/30 hover:bg-zinc-900/50"
              }`}
            >
              {/* Background ambient gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${
                  projectGradients[index % projectGradients.length]
                } opacity-70 pointer-events-none transition-opacity duration-500 ${
                  isActive ? "opacity-90" : "opacity-30"
                }`}
              />

              {/* Decorative grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

              {/* Top Row: Year/Period & Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`text-[11px] font-mono font-bold tracking-widest transition-opacity duration-300 ${
                    isActive ? "text-violet-400 opacity-100" : "text-zinc-500 opacity-50"
                  }`}
                >
                  {projectYears[index] || "2024"}
                </span>

                <div className="flex items-center gap-2">
                  {project.demo && isActive && (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 animate-pulse">
                      <Radio className="w-2.5 h-2.5" />
                      LIVE
                    </span>
                  )}
                  <span
                    className={`text-xs font-mono transition-colors duration-300 ${
                      isActive ? "text-violet-400" : "text-zinc-600"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Middle Section: Expanded view shows full architecture + highlights, collapsed shows vertical/compact */}
              <div className="relative z-10 my-auto">
                {isActive ? (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-300 border border-violet-500/30">
                      <Cpu className="w-3 h-3" />
                      PRODUCTION ARCHITECTURE
                    </div>

                    <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-lg">
                      {project.description}
                    </p>

                    {/* Key Architecture Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-350">
                          <span className="text-violet-400 font-bold">&bull;</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2.5 pt-2">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 text-white hover:brightness-110 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        >
                          Launch Demo
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 hover:text-white hover:border-violet-500/40 transition-all"
                        >
                          <GithubIcon className="w-3 h-3 text-zinc-400" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-2 py-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                      {index % 2 === 0 ? <Cpu className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                    </div>
                    <div className="text-sm font-bold text-zinc-300 writing-mode-vertical tracking-wide">
                      {project.title.split(" - ")[0]}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Row: Tech Stack Tags */}
              <div className="relative z-10 pt-3 border-t border-zinc-850">
                {isActive ? (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900/90 text-violet-300 border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-[10px] font-mono text-zinc-500 text-center truncate">
                    {project.technologies[0]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stacked View (For smaller screens) */}
      <div className="lg:hidden space-y-3.5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono text-violet-400">
              <span>{projectYears[index] || "2024"}</span>
              <span>0{index + 1}</span>
            </div>
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {project.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900 text-violet-300 border border-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
                >
                  Live Demo
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-200 border border-zinc-800"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Kitanga-style Big Pill Action Buttons (Check CV & Contact) */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-6">
        <a
          href="/resume.pdf"
          target="_blank"
          download="Kumar_Aman_Sagar_Resume.pdf"
          className="px-7 py-3 rounded-2xl bg-white text-zinc-950 font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] cursor-pointer"
        >
          <Download className="w-4 h-4 text-zinc-950" />
          Download Resume (PDF)
        </a>

        <a
          href="#contact"
          className="px-7 py-3 rounded-2xl bg-transparent text-white border-2 border-zinc-700 hover:border-violet-400 font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4 text-violet-400" />
          Get In Touch
        </a>
      </div>
    </div>
  );
}
