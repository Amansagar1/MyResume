"use client";

import React from "react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ExperienceItem } from "../types/resume";

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 relative bg-zinc-950/60 overflow-hidden">
      {/* Decorative side blur */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-2">My Journey</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Work Experience</h3>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-zinc-800 ml-4 md:ml-6 space-y-12">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Glowing Timeline Dot */}
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-teal-400 flex items-center justify-center transition-colors duration-300 shadow-md">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500 group-hover:text-teal-400 transition-colors duration-300" />
              </div>
              
              {/* Highlight Pulse effect on dot */}
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-teal-400/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 pointer-events-none -z-10" />

              {/* Experience Card */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900 transition-all duration-300 shadow-xl relative overflow-hidden group-hover:-translate-y-1">
                {/* Decorative card background glow */}
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-teal-500/5 group-hover:bg-teal-500/10 blur-3xl transition-all duration-500" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                      {item.role}
                    </h4>
                    <span className="text-sm font-semibold text-zinc-400 mt-1 block">
                      {item.company}
                    </span>
                  </div>
                  
                  {/* Period badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60 self-start sm:self-center">
                    <Calendar className="w-3 h-3 text-teal-400" />
                    {item.period}
                  </span>
                </div>

                {/* Job Highlights */}
                <ul className="space-y-3">
                  {item.highlights.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3 text-sm text-zinc-350 leading-relaxed">
                      <CheckCircle2 className="w-4.5 h-4.5 text-teal-500/85 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
