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
          className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-[60px] pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-1/4 w-48 h-48 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Cohesive Clean Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-4 relative z-10">
          {/* Left Column: Core Identity & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-5">
            <div className="relative">
              <Draggable className="inline-block">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                  <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
                  FULL STACK &amp; AI APPLICATION ENGINEER
                </span>
              </Draggable>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black text-white tracking-tight uppercase leading-[1.05] flex flex-wrap gap-x-3 sm:gap-x-4">
                <Draggable className="inline-block">
                  <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Kumar</span>
                </Draggable>
                <Draggable className="inline-block">
                  <span className="bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] bg-gradient-to-r from-red-400 via-red-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                    Aman
                  </span>
                </Draggable>
                <Draggable className="inline-block">
                  <span className="bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] bg-gradient-to-r from-red-300 via-red-300 to-red-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]">
                    Sagar
                  </span>
                </Draggable>
              </h1>
            </div>

            <Draggable>
              <p className="text-sm sm:text-base text-zinc-350 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                Full Stack &amp; AI Engineer with <strong className="text-white font-semibold">3+ years</strong> of production experience building autonomous AI agent networks, RAG vector pipelines, and high-concurrency micredrvices on AWS ECS, Docker, and Redis.
              </p>
            </Draggable>

            {/* Quick Contacts Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-xs text-zinc-350 pt-1">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-red-400" />
                {personal.email}
              </a>
              <a
                href={`tel:${personal.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                {personal.phone}
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 backdrop-blur-md shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {personal.location}
              </span>
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-red-400" />
                  LinkedIn
                </a>
              )}
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-red-400" />
                  GitHub
                </a>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 via-red-500 to-red-500 text-white font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.35)] cursor-pointer text-xs sm:text-sm"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-semibold border border-zinc-800 hover:border-red-500/40 transition-all cursor-pointer text-xs sm:text-sm"
              >
                <Terminal className="w-4 h-4 text-red-400" />
                Explore Systems
              </a>
            </div>
          </div>

          {/* Right Column: 3D AI Engineering Terminal */}
          <div className="lg:col-span-6 flex justify-center">
            <AgentTerminal3D />
          </div>
        </div>
      </div>

      {/* 2025.kitanga.dev Iconic Scroll Hint at Bottom Right */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-end pt-8 z-10">
        <button
          onClick={handleScrollDown}
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer group"
          id="scroll-hint"
        >
          {/* Animated Mouse Icon */}
          <div className="w-4 h-6 rounded-full border border-zinc-500 group-hover:border-red-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-1.5 rounded-full bg-red-400 animate-bounce" />
          </div>
          <span>Scroll</span>
        </button>
      </div>
    </section>
  );
}
