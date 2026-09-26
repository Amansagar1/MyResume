"use client";

import React, { useState } from "react";
import { Cpu, Award, GraduationCap, ArrowRight, Code2, Database, Terminal, Settings, Sparkles, Cloud, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skills as SkillsType, EducationItem } from "../types/resume";
import Card3D from "./Card3D";
import Draggable from "./Draggable";

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
      return <Sparkles className="w-4 h-4 text-white" />;
    }
    if (cat.includes("front") || cat.includes("ui")) {
      return <Code2 className="w-4 h-4 text-white" />;
    }
    if (cat.includes("back") || cat.includes("api")) {
      return <Terminal className="w-4 h-4 text-white" />;
    }
    if (cat.includes("data") || cat.includes("cache") || cat.includes("caching")) {
      return <Database className="w-4 h-4 text-white" />;
    }
    if (cat.includes("cloud") || cat.includes("devops")) {
      return <Cloud className="w-4 h-4 text-white" />;
    }
    return <Cpu className="w-4 h-4 text-white" />;
  };

  const getGroupTitle = (category: string) => {
    return category;
  };

  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-black/80 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-none bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-none bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header and Tab Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none text-xs font-mono font-semibold bg-white/10 text-white border border-white/20 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              CAPABILITIES &bull; PROFICIENCIES
            </div>
            <Draggable>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white tracking-tight">Technical Arsenal</h2>
            </Draggable>
            <Draggable>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-xl font-light">
                Core technologies, architectural patterns, and verified engineering credentials.
              </p>
            </Draggable>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-none mt-3 mx-auto md:mx-0" />
          </div>

          {/* Dynamic Navigation Tabs */}
          <div className="flex justify-center md:justify-end gap-1 p-1 bg-transparent  rounded-none max-w-sm mx-auto md:mx-0  shadow-inner">
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "skills"
                  ? "bg-gradient-to-r from-blue-500 to-blue-500 text-white font-medium "
                  : "text-gray-500 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Core Skills
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "certifications"
                  ? "bg-gradient-to-r from-blue-500 to-blue-500 text-white font-medium "
                  : "text-gray-500 hover:text-slate-200"
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
                      <Card3D depth={25} glowColor={isAiCategory ? "rgba(59, 130, 246, 0.22)" : "rgba(59, 130, 246, 0.12)"} className="h-full">
                        <div
                          className={`p-4 sm:p-5 rounded-none h-full flex flex-col justify-between bg-slate-900/60 border backdrop-blur-xl  transition-all duration-300 ${
                            isAiCategory
                              ? "border-white/40 bg-gradient-to-br from-blue-950/20 via-slate-950/90 to-slate-950/90 "
                              : "border-white/20/40 hover:border-white/40"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3.5">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`p-2 rounded-none border ${
                                    isAiCategory
                                      ? "bg-white/20 border-white/40 text-blue-300 "
                                      : "bg-transparent border-white/20 text-white"
                                  }`}
                                >
                                  {getGroupIcon(category)}
                                </div>
                                <Draggable>
                                  <h3 className="text-sm sm:text-base font-medium text-white tracking-tight">
                                    {getGroupTitle(category)}
                                  </h3>
                                </Draggable>
                              </div>

                              {isAiCategory && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[10px] font-mono font-medium bg-white/15 text-blue-300 border border-blue-500/30">
                                  CORE FOCUS
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {items.map((skill: string, itemIdx: number) => (
                                <span
                                  key={itemIdx}
                                  className={`px-2.5 py-1 rounded-none text-[11px] font-medium border transition-all duration-150  cursor-default hover:scale-105 ${
                                    isAiCategory
                                      ? "bg-blue-950/30 text-blue-200 border-blue-500/30 hover:border-white/40 hover:bg-white/20"
                                      : "bg-transparent text-slate-300 border-white/20 hover:border-white/40 hover:text-blue-300 hover:bg-slate-850"
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                            <span>{items.length} proficiencies</span>
                            <span className="text-white">Production Verified</span>
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
                <Card3D depth={25} glowColor="rgba(0, 170, 255, 0.4)">
                  <div className="p-5 sm:p-6 rounded-none bg-slate-900/60 /40 hover:border-white/40 backdrop-blur-xl  h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4 border-b border-slate-850 pb-3">
                        <div className="p-2 rounded-none bg-white/10 border border-blue-500/25 text-white">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-white">Professional Certifications</h3>
                          <span className="text-[10px] text-slate-500 font-mono">Industry-Recognized Credentials</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5">
                        {certifications.map((cert, index) => (
                          <li
                            key={index}
                            className="p-3 rounded-none bg-slate-900/60 /40 hover:border-white/40 transition-colors flex items-start gap-2.5 group"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                              <span className="text-xs text-slate-200 font-medium leading-relaxed block">
                                {cert}
                              </span>
                              <span className="text-[10px] font-mono text-white/80 uppercase font-semibold">
                                Verified Credential
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-850 text-xs text-gray-500 flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                      Continuous pursuit of advanced cloud &amp; AI specializations.
                    </div>
                  </div>
                </Card3D>

                {/* Education Block with 3D Tilt */}
                <Card3D depth={25} glowColor="rgba(0, 170, 255, 0.4)">
                  <div className="p-5 sm:p-6 rounded-none bg-slate-900/60 /40 hover:border-white/40 backdrop-blur-xl  h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4 border-b border-slate-850 pb-3">
                        <div className="p-2 rounded-none bg-white/10 border border-blue-500/25 text-white">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-white">Education History</h3>
                          <span className="text-[10px] text-slate-500 font-mono">Academic Degrees &amp; Specializations</span>
                        </div>
                      </div>

                      <div className="space-y-3.5">
                        {education.map((edu, index) => (
                          <div
                            key={index}
                            className="p-3.5 rounded-none bg-slate-900/60 /40 relative pl-3.5 border-l-2 border-l-blue-400"
                          >
                            <h4 className="text-xs sm:text-sm font-medium text-white">{edu.institution}</h4>
                            <p className="text-xs text-slate-300 mt-0.5 font-medium">{edu.degree}</p>
                            {edu.details && (
                              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-none text-[10px] font-mono font-medium bg-white/10 text-blue-300 border border-white/20">
                                {edu.details}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-850 text-xs text-gray-500 flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-white" />
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
