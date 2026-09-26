"use client";

import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./Icons";
import { PersonalInfo } from "../types/resume";

interface FooterProps {
  personal: PersonalInfo;
}

export default function Footer({ personal }: FooterProps) {
  const scrollToTop = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-slate-900 py-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Tech Stack */}
        <div className="text-center md:text-left space-y-2">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-650 font-light">
            Designed & Engineered using{" "}
            <span className="text-white font-semibold">Next.js</span> &{" "}
            <span className="text-white font-semibold">PHP REST API</span>
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-none bg-slate-900  text-slate-450 hover:text-white hover:border-white/40 hover:-translate-y-0.5 transition-all "
            id="footer-github-link"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-none bg-slate-900  text-slate-450 hover:text-white hover:border-white/40 hover:-translate-y-0.5 transition-all "
              id="footer-linkedin-link"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="p-2.5 rounded-none bg-slate-900  text-slate-450 hover:text-white hover:border-white/40 hover:-translate-y-0.5 transition-all "
            id="footer-email-link"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-none bg-slate-900 border border-slate-850 hover:border-white/40 hover:bg-slate-850 text-gray-500 hover:text-white transition-all  group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
