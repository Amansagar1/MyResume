"use client";

import React, { useState } from "react";
import { Cpu, Award, GraduationCap, ArrowRight, Code2, Database, Terminal, Settings, Sparkles, Cloud, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skills as SkillsType, EducationItem } from "../types/resume";
import Card3D from "./Card3D";

interface SkillsProps {
  skills: SkillsType;
  certifications: string[];
  education: EducationItem[];
}

export default function Skills({ skills, certifications, education }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<"skills" | "certifications">("skills");

  // Map icons to skill groups
  const getGroupIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("ai") || cat.includes("integration")) {
      return <Sparkles className="w-4 h-4 text-violet-400" />;
    }
    if (cat.includes("front") || cat.includes("ui")) {
      return <Code2 className="w-4 h-4 text-violet-400" />;
    }
    if (cat.includes("back") || cat.includes("api")) {
      return <Terminal className="w-4 h-4 text-violet-400" />;
    }
    if (cat.includes("data") || cat.includes("cache") || cat.includes("caching")) {
      return <Database className="w-4 h-4 text-violet-400" />;
    }
    if (cat.includes("cloud") || cat.includes("devops")) {
      return <Cloud className="w-4 h-4 text-violet-400" />;
    }
    return <Cpu className="w-4 h-4 text-violet-400" />;
  };

  const getGroupTitle = (category: string) => {
    return category;
  };

  return (
    <section id="skills" className="py-20 relative bg-[#06060a]/80 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header and Tab Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              CAPABILITIES &bull; PROFICIENCIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Technical Arsenal</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-xl font-light">
              Core technologies, architectural patterns, and verified engineering credentials.
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mt-3 mx-auto md:mx-0" />
          </div>

          {/* Dynamic Navigation Tabs */}
          <div className="flex justify-center md:justify-end gap-1 p-1 bg-zinc-900/80 border border-zinc-800 rounded-full max-w-sm mx-auto md:mx-0 backdrop-blur-md shadow-inner">
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "skills"
                  ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Core Skills
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "certifications"
                  ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Credentials &amp; Education
            </button>
          </div>
        </div>

        {/* Tab Content Panels (Tighter grid) */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            {activeTab === "skills" ? (
              <motion.div
                key="skills-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {/* Dynamically render skill categories with tighter 3D tilt cards */}
                {Object.entries(skills).map(([category, items], index) => {
                  const isAiCategory = category.toLowerCase().includes("ai");
                  return (
                    <div key={index} className={isAiCategory ? "md:col-span-2 lg:col-span-2" : ""}>
                      <Card3D depth={8} glowColor={isAiCategory ? "rgba(139, 92, 246, 0.22)" : "rgba(139, 92, 246, 0.12)"} className="h-full">
                        <div
                          className={`p-4 sm:p-5 rounded-2xl h-full flex flex-col justify-between bg-zinc-950/90 border backdrop-blur-xl shadow-lg transition-all duration-300 ${
                            isAiCategory
                              ? "border-violet-500/40 bg-gradient-to-br from-violet-950/20 via-zinc-950/90 to-zinc-950/90 shadow-[0_0_25px_rgba(139,92,246,0.12)]"
                              : "border-zinc-800/80 hover:border-violet-500/40"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3.5">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`p-2 rounded-xl border ${
                                    isAiCategory
                                      ? "bg-violet-500/20 border-violet-500/40 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                                      : "bg-zinc-900/80 border-zinc-800 text-violet-400"
                                  }`}
                                >
                                  {getGroupIcon(category)}
                                </div>
                                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                                  {getGroupTitle(category)}
                                </h3>
                              </div>

                              {isAiCategory && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                                  CORE FOCUS
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {items.map((skill: string, itemIdx: number) => (
                                <span
                                  key={itemIdx}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all duration-150 shadow-sm cursor-default hover:scale-105 ${
                                    isAiCategory
                                      ? "bg-violet-950/30 text-violet-200 border-violet-500/30 hover:border-violet-400 hover:bg-violet-500/20"
                                      : "bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-violet-500/40 hover:text-violet-300 hover:bg-zinc-850"
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 mt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                            <span>{items.length} proficiencies</span>
                            <span className="text-violet-400">Production Verified</span>
                          </div>
                        </div>
                      </Card3D>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="certs-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Certifications Block with 3D Tilt */}
                <Card3D depth={8} glowColor="rgba(139, 92, 246, 0.15)">
                  <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-violet-500/40 backdrop-blur-xl shadow-lg h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4 border-b border-zinc-850 pb-3">
                        <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/25 text-violet-400">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">Professional Certifications</h3>
                          <span className="text-[10px] text-zinc-500 font-mono">Industry-Recognized Credentials</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5">
                        {certifications.map((cert, index) => (
                          <li
                            key={index}
                            className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-violet-500/40 transition-colors flex items-start gap-2.5 group"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                              <span className="text-xs text-zinc-200 font-medium leading-relaxed block">
                                {cert}
                              </span>
                              <span className="text-[10px] font-mono text-violet-400/80 uppercase font-semibold">
                                Verified Credential
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-850 text-xs text-zinc-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-violet-400" />
                      Continuous pursuit of advanced cloud &amp; AI specializations.
                    </div>
                  </div>
                </Card3D>

                {/* Education Block with 3D Tilt */}
                <Card3D depth={8} glowColor="rgba(99, 102, 241, 0.15)">
                  <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-indigo-500/40 backdrop-blur-xl shadow-lg h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4 border-b border-zinc-850 pb-3">
                        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">Education History</h3>
                          <span className="text-[10px] text-zinc-500 font-mono">Academic Degrees &amp; Specializations</span>
                        </div>
                      </div>

                      <div className="space-y-3.5">
                        {education.map((edu, index) => (
                          <div
                            key={index}
                            className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 relative pl-3.5 border-l-2 border-l-violet-400"
                          >
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-100">{edu.institution}</h4>
                            <p className="text-xs text-zinc-300 mt-0.5 font-medium">{edu.degree}</p>
                            {edu.details && (
                              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                                {edu.details}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-850 text-xs text-zinc-400 flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-violet-400" />
                      Committed to engineering excellence and scalable architecture.
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
