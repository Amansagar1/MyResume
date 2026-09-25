"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  Briefcase, 
  Clock, 
  ChevronDown, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap,
  Globe
} from "lucide-react";

interface AvailabilityBeaconProps {
  location?: string;
  email?: string;
}

export default function AvailabilityBeacon({ 
  location = "Bengaluru, Karnataka", 
  email = "kumaramansagar01@gmail.com" 
}: AvailabilityBeaconProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center mb-8 relative z-20">
      {/* Outer Shimmering Pill Container */}
      <motion.div
        layout
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative group cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Ambient Gradient Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-red-600 to-red-600 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse" />

        {/* Main Pill Surface */}
        <div className="relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-zinc-950/90 border border-red-500/40 backdrop-blur-xl shadow-2xl flex items-center gap-2 sm:gap-3 flex-wrap justify-center text-xs">
          
          {/* Live Signal Beacon Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] font-semibold tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
            </span>
            <span className="hidden sm:inline">LIVE STATUS:</span>
            <span>OPEN TO WORK</span>
          </div>

          {/* Central Typographic Statement */}
          <div className="flex items-center gap-1.5 font-bold tracking-wider font-heading">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400 animate-bounce" />
            <span className="bg-gradient-to-r from-white via-red-200 to-red-300 bg-clip-text text-transparent">
              AVAILABLE FOR FULL-TIME ROLES
            </span>
          </div>

          {/* Location Badge */}
          <div className="hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-[11px]">
            <MapPin className="w-3 h-3 text-red-400" />
            <span>BENGALURU</span>
            <span className="text-zinc-500">&bull;</span>
            <span className="text-[10px] text-zinc-400">HYBRID / REMOTE</span>
          </div>

          {/* Interactive CTA Badge */}
          <button
            onClick={scrollToContact}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-red-500 text-white font-semibold text-[11px] shadow-sm hover:shadow-red-500/30 transition-all active:scale-95 cursor-pointer ml-0.5"
            title="Jump to contact section"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Expand Toggle Chevron */}
          <div 
            className="p-1 rounded-full text-zinc-400 group-hover:text-white hover:bg-zinc-800/60 transition-colors"
            title={isExpanded ? "Collapse details" : "Expand hiring criteria"}
          >
            <ChevronDown 
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isExpanded ? "rotate-180 text-red-400" : ""
              }`} 
            />
          </div>
        </div>
      </motion.div>

      {/* Expandable Recruiter Telemetry Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-2xl mt-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/95 border border-red-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(239,68,68,0.15)] text-left"
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Hiring &amp; Deployment Snapshot
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                ● Immediate Joiner
              </span>
            </div>

            {/* 4-Column Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-3">
              {/* Notice Period */}
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span>Notice Period</span>
                </div>
                <div className="text-sm font-bold text-white">Immediate</div>
                <div className="text-[10px] text-zinc-500">&lt; 15 Days available</div>
              </div>

              {/* Work Mode */}
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1 font-mono">
                  <Globe className="w-3.5 h-3.5 text-red-400" />
                  <span>Work Modes</span>
                </div>
                <div className="text-sm font-bold text-white">Hybrid / Remote</div>
                <div className="text-[10px] text-zinc-500">Bengaluru / Global</div>
              </div>

              {/* Primary Focus */}
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1 font-mono">
                  <Briefcase className="w-3.5 h-3.5 text-red-400" />
                  <span>Target Roles</span>
                </div>
                <div className="text-sm font-bold text-white">Full Stack &amp; AI</div>
                <div className="text-[10px] text-zinc-500">LLMs, React, Node.js</div>
              </div>

              {/* Experience */}
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mb-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Experience</span>
                </div>
                <div className="text-sm font-bold text-white">3+ Years</div>
                <div className="text-[10px] text-zinc-500">Production Proven</div>
              </div>
            </div>

            {/* Quick Action Footer inside Drawer */}
            <div className="pt-3 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-zinc-400 text-[11px] font-mono">
                Looking for senior full-stack, frontend, or AI engineering opportunities.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={scrollToContact}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-600 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-red-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Initiate Discussion</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
