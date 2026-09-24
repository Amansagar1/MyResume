"use client";

import React from "react";
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Terminal, ArrowUpRight, Radio } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./Icons";
import { motion } from "framer-motion";
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
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-transparent"
    >
      {/* 2025.kitanga.dev Iconic Split Typography Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-4">
        {/* Modern Interactive Availability Beacon & Telemetry Drawer */}
        <AvailabilityBeacon location={personal.location} email={personal.email} />

        {/* Massive Kitanga-style Split Branding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center text-center md:text-left mb-8">
          {/* Left Title: Name */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-violet-400 font-bold block mb-2">
              // LEAD ARCHITECT &amp; ENGINEER
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95]">
              Kumar <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                Aman Sagar
              </span>
            </h1>
          </div>

          {/* Right Title: Role */}
          <div className="md:text-right space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold block mb-2">
              // PRODUCTION SPECIALIZATION
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-zinc-300 tracking-tight uppercase leading-[0.98]">
              AI &amp; Full <br />
              <span className="text-white">Stack</span>
            </h2>
          </div>
        </div>

        {/* Main Content Row: Bio & 3D Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          {/* Left: Summary & Quick Pills */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm sm:text-base text-zinc-350 leading-relaxed font-light">
              Full Stack &amp; AI Application Engineer with <strong className="text-white font-semibold">3+ years</strong> of hands-on experience building production AI agent frameworks, RAG vector pipelines, and high-concurrency microservices on AWS ECS, Docker, and Redis.
            </p>

            {/* Quick Contacts Pills */}
            <div className="flex flex-wrap gap-2 text-xs text-zinc-350">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                {personal.email}
              </a>
              <a
                href={`tel:${personal.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-violet-400" />
                {personal.phone}
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 backdrop-blur-md shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                {personal.location}
              </span>
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-violet-400" />
                  LinkedIn
                </a>
              )}
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-violet-500/50 hover:text-white transition-all backdrop-blur-md shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-violet-400" />
                  GitHub
                </a>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 text-white font-extrabold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(139,92,246,0.35)] cursor-pointer text-sm"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-bold border border-zinc-800 hover:border-violet-500/40 transition-all cursor-pointer text-sm"
              >
                <Terminal className="w-4 h-4 text-violet-400" />
                Explore Systems
              </a>
            </div>
          </div>

          {/* Right: 3D AI Engineering Terminal */}
          <div className="lg:col-span-6">
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
          <div className="w-4 h-6 rounded-full border border-zinc-500 group-hover:border-violet-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-1.5 rounded-full bg-violet-400 animate-bounce" />
          </div>
          <span>Scroll</span>
        </button>
      </div>
    </section>
  );
}
