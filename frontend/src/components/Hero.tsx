"use client";

import React from "react";
import { Mail, Phone, MapPin, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PersonalInfo } from "../types/resume";

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

  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-zinc-950"
    >
      {/* Dynamic Grid Background with Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center sm:text-left flex flex-col md:flex-row items-center md:justify-between gap-12"
        >
          {/* Main Text Content */}
          <div className="flex-1 space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Available for Full-time Roles
            </motion.div>

            <div className="space-y-2">
              <motion.h1 
                variants={itemVariants} 
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  {personal.name}
                </span>
              </motion.h1>

              <motion.h2 
                variants={itemVariants} 
                className="text-xl sm:text-2xl font-bold text-zinc-300 tracking-wide"
              >
                {personal.title} — <span className="text-teal-400">{personal.subtitle}</span>
              </motion.h2>
            </div>

            <motion.p 
              variants={itemVariants} 
              className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light"
            >
              {personal.summary}
            </motion.p>

            {/* Quick Contacts */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap justify-center sm:justify-start gap-y-3 gap-x-6 text-sm text-zinc-400"
            >
              <a 
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 hover:text-teal-400 transition-colors"
                id="contact-email-link"
              >
                <Mail className="w-4 h-4 text-teal-500" />
                {personal.email}
              </a>
              <a 
                href={`tel:${personal.phone}`}
                className="flex items-center gap-2 hover:text-teal-400 transition-colors"
                id="contact-phone-link"
              >
                <Phone className="w-4 h-4 text-teal-500" />
                {personal.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-500" />
                {personal.location}
              </span>
            </motion.div>

            {/* Call to Actions */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap justify-center sm:justify-start gap-4 pt-4"
            >
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-zinc-950 font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-teal-500/10 cursor-pointer"
                id="cta-hire-me"
              >
                Hire Me
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
                id="cta-experience"
              >
                View Experience
              </a>
            </motion.div>
          </div>

          {/* Graphical Animated Illustration Container */}
          <motion.div
            variants={itemVariants}
            className="w-64 h-64 sm:w-80 sm:h-80 relative flex items-center justify-center pointer-events-none md:flex-shrink-0"
          >
            {/* Spinning gradient rings */}
            <div className="absolute inset-0 rounded-full border border-zinc-850 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-zinc-800 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 border border-teal-500/20 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
              {/* Tech Stack Floating Tags */}
              <div className="text-xs uppercase tracking-widest text-teal-400 font-bold">Skills Core</div>
              <div className="text-xl font-bold text-white mt-1">{personal.title}</div>
              <div className="text-xs text-zinc-400 mt-2 max-w-[170px]">{personal.subtitle}</div>
            </div>
            
            {/* Floating Orbiting elements */}
            <div className="absolute top-2 left-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-ping" />
            <div className="absolute bottom-10 right-8 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
