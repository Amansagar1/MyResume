"use client";

import React from "react";
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Terminal, ArrowUpRight, Radio } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./Icons";
import { motion } from "framer-motion";
import Draggable from "./Draggable";
import { PersonalInfo } from "../types/resume";
import AgentTerminal3D from "./AgentTerminal3D";
import AvailabilityBeacon from "./AvailabilityBeacon";

interface HeroProps {
  personal: PersonalInfo;
}

export default function Hero({ personal }: HeroProps) {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById("experience") || document.getElementById("projects");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-12 bg-transparent"
    >
      {/* 2025.kitanga.dev Iconic Split Typography Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-4">
        {/* Modern Interactive Availability Beacon & Telemetry Drawer */}
        <AvailabilityBeacon location={personal.location} email={personal.email} />

        {/* Decorative Floating Orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-none blur-[60px] pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-1/4 w-48 h-48 bg-white/5 rounded-none blur-[80px] pointer-events-none"
        />

        {/* Cohesive Clean Hero Grid */}
        <div className="flex flex-col items-center justify-center mt-4 relative z-10 text-center pointer-events-none w-full">
          {/* Left Column: Core Identity & Actions */}
          <div className="w-full flex flex-col items-center space-y-5 pointer-events-auto">
            <div className="relative">
              <Draggable className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white border-l-2 border-r-2 border-white/40 mb-6 bg-white/5">
                  <Terminal className="w-3 h-3 text-white" />
                  SYS.ROLE :: FULL_STACK_AI_ENGINEER
                </span>
              </Draggable>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[0.95] flex flex-wrap gap-x-4 sm:gap-x-6">
                <Draggable className="inline-block">
                  <span className="text-gray-500 font-mono text-4xl sm:text-6xl lg:text-7xl">
                    [
                  </span>
                </Draggable>
                <Draggable className="inline-block">
                  <span className="">Kumar</span>
                </Draggable>
                <Draggable className="inline-block">
                  <span className="text-white">
                    Aman
                  </span>
                </Draggable>
                <Draggable className="inline-block">
                  <span className="text-white">
                    Sagar
                  </span>
                </Draggable>
                <Draggable className="inline-block">
                  <span className="text-gray-500 font-mono text-4xl sm:text-6xl lg:text-7xl">
                    ]
                  </span>
                </Draggable>
              </h1>
            </div>

            <Draggable>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                Full Stack &amp; AI Engineer with <strong className="text-white font-semibold">3+ years</strong> of production experience building autonomous AI agent networks, RAG vector pipelines, and high-concurrency micredrvices on AWS ECS, Docker, and Redis.
              </p>
            </Draggable>

            {/* Quick Contacts Pills */}
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400 pt-1">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-transparent  hover:border-white/50 hover:text-white transition-all  "
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                {personal.email}
              </a>
              <a
                href={`tel:${personal.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-transparent  hover:border-white/50 hover:text-white transition-all  "
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                {personal.phone}
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-transparent  text-gray-500  ">
                <MapPin className="w-3.5 h-3.5 text-white" />
                {personal.location}
              </span>
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-transparent  hover:border-white/50 hover:text-white transition-all  "
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-white" />
                  LinkedIn
                </a>
              )}
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-transparent  hover:border-white/50 hover:text-white transition-all  "
                >
                  <GithubIcon className="w-3.5 h-3.5 text-white" />
                  GitHub
                </a>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3.5 pt-2">
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-white text-black font-medium hover:brightness-110 active:scale-95 transition-all  cursor-pointer text-xs sm:text-sm"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-transparent hover:bg-slate-800 text-slate-200 font-semibold  hover:border-white/40 transition-all cursor-pointer text-xs sm:text-sm"
              >
                <Terminal className="w-4 h-4 text-white" />
                Explore Systems
              </a>
            </div>
          </div>

          {/* Right Column: 3D AI Engineering Terminal */}
          <div className="w-full flex justify-center mt-12 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity">
            <AgentTerminal3D />
          </div>
        </div>
      </div>

      {/* Mechanical HUD Scroll Hint */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-end pt-8 z-10">
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-white text-[10px] font-mono tracking-[0.3em] uppercase transition-colors cursor-pointer group"
          id="scroll-hint"
        >
          <div className="flex gap-1 items-center">
             <span className="w-1 h-1 bg-white/50 group-hover:bg-white transition-colors" />
             <span>INITIATE_SCROLL</span>
             <span className="w-1 h-1 bg-white/50 group-hover:bg-white transition-colors" />
          </div>
          {/* Scanline / HUD Target */}
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 group-hover:via-white transition-all overflow-hidden relative">
             <div className="w-full h-4 bg-white absolute top-0 animate-[bounce_2s_infinite]" />
          </div>
        </button>
      </div>
    </section>
  );
}
