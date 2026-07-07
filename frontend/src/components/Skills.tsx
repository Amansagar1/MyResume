"use client";

import React, { useState } from "react";
import { Cpu, Award, GraduationCap, ArrowRight, Code2, Database, Terminal, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skills as SkillsType, EducationItem } from "../types/resume";

interface SkillsProps {
  skills: SkillsType;
  certifications: string[];
  education: EducationItem[];
}

export default function Skills({ skills, certifications, education }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<"skills" | "certifications">("skills");

  // Map icons to skill groups
  const getGroupIcon = (category: string) => {
    switch (category) {
      case "languages":
        return <Terminal className="w-5 h-5 text-teal-400" />;
      case "frontend":
        return <Code2 className="w-5 h-5 text-teal-400" />;
      case "backend":
        return <Cpu className="w-5 h-5 text-teal-400" />;
      case "database":
        return <Database className="w-5 h-5 text-teal-400" />;
      default:
        return <Settings className="w-5 h-5 text-teal-400" />;
    }
  };

  const getGroupTitle = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <section id="skills" className="py-24 relative bg-zinc-950/60 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header and Tab Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-2">Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Skills & Credentials</h3>
            <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mt-4 mx-auto md:mx-0" />
          </div>

          {/* Dynamic Navigation Tabs */}
          <div className="flex justify-center md:justify-end gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-full max-w-sm mx-auto md:mx-0">
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "skills"
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-zinc-950 shadow-md"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Cpu className="w-4 h-4" />
              Skills
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "certifications"
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-zinc-950 shadow-md"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Award className="w-4 h-4" />
              Credentials
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            {activeTab === "skills" ? (
              <motion.div
                key="skills-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Dynamically render skill categories */}
                {Object.entries(skills).map(([category, items], index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/60 transition-colors shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {getGroupIcon(category)}
                      <h4 className="text-lg font-bold text-zinc-150 capitalize">{getGroupTitle(category)}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {items.map((skill: string, itemIdx: number) => (
                        <span
                          key={itemIdx}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-950 text-zinc-300 border border-zinc-800/80 hover:border-teal-500/30 hover:text-teal-400 transition-all duration-300 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="certs-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Certifications Block */}
                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-lg">
                  <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-3">
                    <Award className="w-5 h-5 text-teal-400" />
                    <h4 className="text-lg font-bold text-zinc-150">Professional Certifications</h4>
                  </div>

                  <ul className="space-y-4">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                        <span className="text-sm text-zinc-300 font-medium leading-relaxed">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Education Block */}
                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-3">
                      <GraduationCap className="w-5 h-5 text-teal-400" />
                      <h4 className="text-lg font-bold text-zinc-150">Education History</h4>
                    </div>

                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <div key={index} className="relative pl-4 border-l border-zinc-800">
                          <span className="text-sm font-bold text-zinc-100">{edu.institution}</span>
                          <p className="text-xs text-zinc-400 mt-1">{edu.degree}</p>
                          {edu.details && (
                            <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                              {edu.details}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-800 text-xs text-zinc-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                    Committed to continuous learning and technical excellence.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
