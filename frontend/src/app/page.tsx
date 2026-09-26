"use client";

import React, { useState, useEffect } from "react";
import { ResumeData } from "../types/resume";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import NeuralCanvas from "../components/NeuralCanvas";
import CursorGlow from "../components/CursorGlow";
import Scene3D from "../components/Scene3D";
import AboutKitanga from "../components/AboutKitanga";
import ClickSparkles from "../components/ClickSparkles";
import CyberCompanion from "../components/CyberCompanion";
import { Loader2, WifiOff, Play, Sparkles } from "lucide-react";
import { fallbackResumeData } from "../data/fallbackData";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(fallbackResumeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mongodbError, setMongodbError] = useState<string | null>(null);

  const fetchResumeData = async () => {
    setLoading(true);
    setError(false);
    setMongodbError(null);
    let apiBase = "http://localhost:8000";
    if (process.env.NEXT_PUBLIC_API_URL) {
      apiBase = process.env.NEXT_PUBLIC_API_URL;
    } else if (typeof window !== "undefined") {
      apiBase = window.location.port === "3000" ? "http://localhost:8000" : "";
    }
    
    // Normalize URL: remove trailing slash if present
    if (apiBase.endsWith("/")) {
      apiBase = apiBase.slice(0, -1);
    }
    
    try {
      const response = await fetch(`${apiBase}/api/resume.php`);
      if (response.ok) {
        const data: ResumeData = await response.json();
        setResumeData(data);
        if (data.mongodb_status === "disconnected" && data.mongodb_error) {
          setMongodbError(data.mongodb_error);
        }
      } else {
        // Let it fallback silently to fallbackResumeData instead of showing error on load
        console.warn("Failed to fetch from PHP API, using fallback data.");
      }
    } catch (error) {
      console.error("Failed to fetch resume data from PHP API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  const handleUseFallback = () => {
    setResumeData(fallbackResumeData);
    setError(false);
  };

  // 2. Error / Offline State with clean recovery
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-slate-50 font-mono p-4 relative overflow-hidden">
        <NeuralCanvas />
        <CursorGlow />
        <div className="max-w-md w-full flex flex-col items-center gap-6 p-8 rounded-none bg-slate-900/85 /40 shadow-2xl backdrop-blur-2xl text-center relative z-10">
          <div className="p-4 rounded-none bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 ">
            <WifiOff className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-medium text-white tracking-tight font-heading">PHP REST API Unreachable</h1>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              The portfolio attempted to retrieve resume data from the local PHP backend on port 8000.
            </p>
            <div className="p-4 bg-slate-900/50  rounded-none text-left text-xs font-mono text-gray-500 space-y-2 mt-4 shadow-inner">
              <span className="text-indigo-400 font-semibold">// Start local PHP backend:</span>
              <div className="p-2 rounded-none bg-black text-slate-300  select-all">
                php -S 127.0.0.1:8000 -t backend/api
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <button
              onClick={fetchResumeData}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white font-medium hover:brightness-110 active:scale-95 transition-all text-xs cursor-pointer  shadow-indigo-500/25"
            >
              Retry Connection
            </button>
            <button
              onClick={handleUseFallback}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200  active:scale-95 transition-all text-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-indigo-400" />
              Use Verified Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Render Page with live interactive 3D WebGL scene & Kitanga aesthetics
  return (
    <div className="flex flex-col min-h-screen bg-black text-slate-50 overflow-x-hidden selection:bg-white selection:text-white relative font-mono">
      {/* 2025.kitanga.dev 3D WebGL Canvas Scene */}
      <Scene3D />

      {/* Interactive AI Neural Constellation & Cursor Glow */}
      <NeuralCanvas />
      <CursorGlow />

      {/* Interactive Sparkle Burst on Mouse Click */}
      <ClickSparkles />

      {/* Roaming Autonomous AI Drone Companion ("Amnu") */}
      <CyberCompanion />

      <Navbar githubUrl={resumeData.personal.github} personalName={resumeData.personal.name} />
      
      <main className="flex-grow relative z-10">
        <Hero personal={resumeData.personal} />
        <StatsBar />
        <AboutKitanga personal={resumeData.personal} />
        <Projects projects={resumeData.projects} />
        <Experience experience={resumeData.experience} />
        <Skills 
          skills={resumeData.skills} 
          certifications={resumeData.certifications} 
          education={resumeData.education} 
        />
        <Contact personal={resumeData.personal} />
      </main>

      <Footer personal={resumeData.personal} />
    </div>
  );
}
