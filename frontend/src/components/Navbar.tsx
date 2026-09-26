"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  personalName: string;
  githubUrl: string;
}

const navItems = [
  { label: "Home", id: "home" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
];

export default function Navbar({ personalName, githubUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [scaleX, setScaleX] = useState(0);

  const handleToggleSound = () => {
    setSoundOn((prev) => !prev);
    // Sound logic would be placed here
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Progress bar logic
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScaleX(scrollY / docHeight);
      }

      // Active section logic
      const sections = navItems.map((item) => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(navItems[i].id);
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
      {/* Scroll Progress Bar at the very top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[1px] bg-white origin-left z-[60]"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            
            {/* Logo / Brand Name */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollTo("home")}
            >
              <span className="text-xl sm:text-2xl font-bold tracking-widest text-white uppercase">
                {personalName.split(' ')[0]}
              </span>
            </div>

            {/* Desktop Nav Items (Center Aligned, Mono) */}
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative text-xs sm:text-sm font-mono tracking-widest transition-colors duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right side Sound Toggle + CTA */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-white/30 text-xs font-mono text-white hover:bg-white hover:text-black transition-all group"
              >
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white"
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
              className="md:hidden bg-black border-b border-white/20"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col items-center">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-center py-3 font-mono tracking-widest uppercase text-sm ${
                      activeSection === item.id ? "text-white border-b border-white/20" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 mt-4 text-center rounded-full border border-white/30 text-white font-mono text-sm hover:bg-white hover:text-black transition-colors"
                >
                  GitHub Profile
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
