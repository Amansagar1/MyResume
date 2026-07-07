"use client";

import React from "react";
import { FolderGit2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectItem } from "../types/resume";

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="projects" className="py-24 relative bg-zinc-950 overflow-hidden">
      {/* Decorative top blur */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-2">My Work</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects</h3>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900 transition-all duration-300 shadow-xl overflow-hidden group hover:-translate-y-2 h-full"
            >
              {/* Card Header Illustration/Header */}
              <div className="p-6 pb-0 flex justify-between items-start">
                <div className="p-3 rounded-lg bg-zinc-800 text-teal-400 group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-colors duration-300">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                {/* Simulated Link Icon */}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-teal-400 hover:scale-110 transition-all duration-300 cursor-pointer"
                    id={`project-link-${index}`}
                    aria-label={`Visit project link for ${project.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                ) : (
                  <div className="text-zinc-600">
                    <ArrowUpRight className="w-5 h-5 opacity-30" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-zinc-100 group-hover:text-white mb-2 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-sm text-zinc-400 mb-6 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2.5 mb-6">
                    {project.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500/80 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/60">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-800 text-zinc-350 border border-zinc-700/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
