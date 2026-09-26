"use client";

import React, { useState } from "react";
import { FolderGit2, ArrowUpRight, CheckCircle2, Sparkles, Layers, Cpu, Radio } from "lucide-react";
import { GithubIcon } from "./Icons";
import { motion } from "framer-motion";
import { ProjectItem } from "../types/resume";
import Card3D from "./Card3D";
import WorkAccordion from "./WorkAccordion";
import Draggable from "./Draggable";

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [viewMode, setViewMode] = useState<"accordion" | "grid">("accordion");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 80, damping: 14 },
    },
  };

  return (
    <section id="projects" className="py-24 lg:py-32 relative bg-black/80 overflow-hidden">
      {/* Decorative top blur */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-none bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-none bg-blue-600/10 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none text-xs font-mono font-semibold bg-white/10 text-white border border-white/20 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              ENGINEERED SYSTEMS &bull; WORK SHOWCASE
            </div>
            <Draggable>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight tracking-tight text-white tracking-tight">Key Projects</h2>
            </Draggable>
            <Draggable>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-xl font-light">
                Production-grade systems highlighting AI automation, distributed queue pipelines, and cloud micredrvices.
              </p>
            </Draggable>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-none mt-3 mx-auto md:mx-0" />
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-1 p-1 bg-transparent  rounded-none  self-center md:self-end">
            <button
              onClick={() => setViewMode("accordion")}
              className={`px-3.5 py-1.5 rounded-none text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "accordion"
                  ? "bg-gradient-to-r from-blue-500 to-blue-500 text-white font-medium  shadow-blue-500/25"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Interactive Stage
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-1.5 rounded-none text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-blue-500 to-blue-500 text-white font-medium  shadow-blue-500/25"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              3D Architecture Cards
            </button>
          </div>
        </div>

        {/* Dynamic Display based on Mode */}
        {viewMode === "accordion" ? (
          <WorkAccordion projects={projects} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <Card3D depth={25} glowColor="rgba(0, 170, 255, 0.4)" className="h-full">
                <div className="flex flex-col h-full rounded-none bg-slate-900/60 /40 hover:border-white/40 backdrop-blur-xl shadow-xl overflow-hidden p-5 sm:p-6 transition-all duration-300">
                  {/* Top Bar: Icon + Action Links */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-850 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-none bg-white/10 border border-blue-500/25 text-white ">
                        {index === 0 ? <Cpu className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-medium text-white uppercase tracking-widest block">
                          Featured System 0{index + 1}
                        </span>
                        <span className="text-[11px] text-gray-500 font-mono">
                          {index === 0 ? "AI Orchestration & Queues" : "Cloud-Native Infrastructure"}
                        </span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-1.5">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none text-[11px] font-semibold bg-white/15 text-blue-300 border border-white/40 hover:bg-white/25 transition-all  group/link"
                          id={`project-demo-${index}`}
                        >
                          <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
                          Live Demo
                          <ArrowUpRight className="w-3 h-3 group-link:translate-x-0.5 group-link:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none text-[11px] font-semibold bg-slate-900 text-slate-300  hover:border-white/20 hover:text-white transition-all  group/gh"
                          id={`project-github-${index}`}
                        >
                          <GithubIcon className="w-3 h-3 text-gray-500 group-hover/gh:text-white transition-colors" />
                          GitHub
                          <ArrowUpRight className="w-3 h-3 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Body: Title & Description */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <Draggable>
                        <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {project.title}
                        </h3>
                      </Draggable>
                      <Draggable>
                        <p className="text-xs text-gray-500 mb-4 font-light leading-relaxed">
                          {project.description}
                        </p>
                      </Draggable>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-850">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-none text-[11px] font-mono bg-transparent text-slate-300  hover:border-white/40 hover:text-blue-300 transition-colors "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}
