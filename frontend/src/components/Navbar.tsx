"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ambientSound } from "../utils/audioSynth";

interface NavbarProps {
  githubUrl: string;
  personalName: string;
}

export default function Navbar({ githubUrl, personalName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [soundOn, setSoundOn] = useState(false);

  const handleToggleSound = () => {
    const isNowPlaying = ambientSound.toggle();
    setSoundOn(isNowPlaying);
  };

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { id: "home", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills & AI" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      // Find the last section that has scrolled past the top offset
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, element } = sections[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is at or above the navbar (plus some padding)
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at the very top (Electric Violet Gradient) */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 origin-left z-[60] shadow-[0_0_12px_#8b5cf6]"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#06060a]/85 backdrop-blur-xl border-b border-zinc-800/60 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13">
            {/* Logo / Brand Name */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => scrollTo("home")}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-500/20 via-indigo-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 group-hover:border-violet-400/60 transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <Terminal className="w-3.5 h-3.5 text-violet-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-extrabold tracking-wide text-white group-hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  {personalName}
                  <Sparkles className="w-3 h-3 text-violet-400 opacity-80" />
                </span>
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                  Full Stack &amp; AI Engineer
                </span>
              </div>
            </div>

            {/* Desktop Nav Items (Tighter & Sleeker) */}
            <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-900/70 border border-zinc-800 rounded-full backdrop-blur-md shadow-inner">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "text-white font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right side Sound Toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono border border-zinc-800 bg-zinc-900/60 hover:border-violet-500/40 text-zinc-400 hover:text-white transition-all cursor-pointer select-none backdrop-blur-md"
                title="Toggle ambient background sound"
              >
                <span className="flex items-center gap-1">
                  <span
                    className={`w-1.5 h-3 rounded-full transition-all duration-300 ${
                      soundOn
                        ? "bg-violet-400 animate-pulse h-3"
                        : "bg-zinc-600 h-1.5"
                    }`}
                  />
                  <span
                    className={`w-1.5 h-4 rounded-full transition-all duration-300 ${
                      soundOn
                        ? "bg-indigo-400 animate-pulse delay-75 h-4"
                        : "bg-zinc-600 h-1.5"
                    }`}
                  />
                  <span
                    className={`w-1.5 h-2 rounded-full transition-all duration-300 ${
                      soundOn
                        ? "bg-fuchsia-400 animate-pulse delay-150 h-2"
                        : "bg-zinc-600 h-1.5"
                    }`}
                  />
                </span>
                <span>Sound | {soundOn ? "ON" : "OFF"}</span>
              </button>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900/90 text-zinc-200 hover:text-white border border-zinc-800 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all group"
              >
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-violet-400" />
              </a>
            </div>

            {/* Mobile Menu Button + Sound Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleSound}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 text-xs font-mono"
              >
                🔊 {soundOn ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none border border-zinc-800"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800"
            >
              <div className="px-3 pt-3 pb-5 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-400 border border-violet-500/30 pl-5"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-zinc-850 px-1">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-bold text-center text-sm shadow-lg shadow-violet-500/25"
                  >
                    GitHub Profile
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
