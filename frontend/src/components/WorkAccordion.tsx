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

  // Gradient visuals for projects (Electric red / red / red / red)
  const projectGradients = [
    "from-blue-950/70 via-slate-950 to-slate-950",
    "from-blue-950/70 via-slate-950 to-slate-950",
    "from-blue-950/70 via-slate-950 to-slate-950",
    "from-blue-950/70 via-slate-950 to-slate-950",
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
              className={`relative rounded-none overflow-hidden border cursor-pointer transition-all duration-500 flex flex-col justify-between p-5 ${
                isActive
                  ? "col-span-6 bg-transparent border-white/40 "
                  : "col-span-2 bg-black/60 border-white/20/40 hover:border-blue-500/30 hover:bg-slate-900/50"
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
                  className={`text-[11px] font-mono font-medium tracking-widest transition-opacity duration-300 ${
                    isActive ? "text-white opacity-100" : "text-slate-500 opacity-50"
                  }`}
                >
                  {projectYears[index] || "2024"}
                </span>

                <div className="flex items-center gap-2">
                  {project.demo && isActive && (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-none text-[10px] font-mono bg-white/20 text-blue-300 border border-white/40 animate-pulse">
                      <Radio className="w-2.5 h-2.5" />
                      LIVE
                    </span>
                  )}
                  <span
                    className={`text-xs font-mono transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-600"
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
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none text-[10px] font-mono font-medium bg-white/10 text-blue-300 border border-blue-500/30">
                      <Cpu className="w-3 h-3" />
                      PRODUCTION ARCHITECTURE
                    </div>

                    <h3 className="text-2xl font-medium tracking-tight tracking-tight text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-300 font-light leading-relaxed max-w-lg">
                      {project.description}
                    </p>

                    {/* Key Architecture Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-white font-medium">&bull;</span>
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
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none text-xs font-medium bg-gradient-to-r bg-white text-black text-white hover:brightness-110 transition-all "
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
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none text-xs font-semibold bg-slate-900 text-slate-200  hover:text-white hover:border-white/40 transition-all"
                        >
                          <GithubIcon className="w-3 h-3 text-gray-500" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-2 py-4">
                    <div className="w-10 h-10 rounded-none bg-transparent  flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                      {index % 2 === 0 ? <Cpu className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                    </div>
                    <div className="text-sm font-medium text-slate-300 writing-mode-vertical tracking-wide">
                      {project.title.split(" - ")[0]}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Row: Tech Stack Tags */}
              <div className="relative z-10 pt-3 border-t border-slate-850">
                {isActive ? (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-none text-[10px] font-mono bg-transparent text-blue-300 "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-[10px] font-mono text-slate-500 text-center truncate">
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
            className="p-5 rounded-none bg-slate-900/60 /40 space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono text-white">
              <span>{projectYears[index] || "2024"}</span>
              <span>0{index + 1}</span>
            </div>
            <h3 className="text-lg font-medium text-white">{project.title}</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {project.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 rounded-none text-[10px] font-mono bg-slate-900 text-blue-300 "
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-none text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-500 text-white"
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-none text-xs font-semibold bg-slate-900 text-slate-200 "
                >
                  <GithubIcon className="w-3.5 h-3.5 text-gray-500" />
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
          className="px-7 py-3 rounded-none bg-white text-slate-950 font-medium tracking-tight text-sm sm:text-base inline-flex items-center justify-center gap-2.5 hover:bg-slate-200 active:scale-95 transition-all  cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-950" />
          Download Resume (PDF)
        </a>

        <a
          href="#contact"
          className="px-7 py-3 rounded-none bg-transparent text-white border-2 border-white/20 hover:border-white/40 font-medium tracking-tight text-sm sm:text-base inline-flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4 text-white" />
          Get In Touch
        </a>
      </div>
    </div>
  );
}
