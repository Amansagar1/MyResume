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
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
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
        setError(true);
      }
    } catch (error) {
      console.error("Failed to fetch resume data from PHP API:", error);
      setError(true);
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

  // 1. Loading State with 3D feel
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden">
        <NeuralCanvas />
        <CursorGlow />
        <div className="flex flex-col items-center gap-5 p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-[0_0_50px_rgba(139,92,246,0.2)] backdrop-blur-2xl relative z-10">
          <div className="relative">
            <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
            <div className="absolute inset-0 w-10 h-10 rounded-full bg-violet-400/20 blur-md animate-ping" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 font-heading">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Initialising AI Engine &amp; REST API...
            </h1>
            <p className="text-xs text-zinc-500 font-mono">Connecting to PHP microservices &amp; portfolio state</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error / Offline State with clean recovery
  if (error || !resumeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4 relative overflow-hidden">
        <NeuralCanvas />
        <CursorGlow />
        <div className="max-w-md w-full flex flex-col items-center gap-6 p-8 rounded-2xl bg-zinc-950/85 border border-zinc-800/80 shadow-2xl backdrop-blur-2xl text-center relative z-10">
          <div className="p-4 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <WifiOff className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white tracking-tight font-heading">PHP REST API Unreachable</h1>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              The portfolio attempted to retrieve resume data from the local PHP backend on port 8000.
            </p>
            <div className="p-4 bg-zinc-900/80 border border-zinc-850 rounded-xl text-left text-xs font-mono text-zinc-500 space-y-2 mt-4 shadow-inner">
              <span className="text-violet-400 font-semibold">// Start local PHP backend:</span>
              <div className="p-2 rounded-lg bg-black text-zinc-300 border border-zinc-800 select-all">
                php -S 127.0.0.1:8000 -t backend/api
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <button
              onClick={fetchResumeData}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 text-white font-bold hover:brightness-110 active:scale-95 transition-all text-xs cursor-pointer shadow-lg shadow-violet-500/25"
            >
              Retry Connection
            </button>
            <button
              onClick={handleUseFallback}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 active:scale-95 transition-all text-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-violet-400" />
              Use Verified Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Render Page with live interactive 3D WebGL scene & Kitanga aesthetics
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 overflow-x-hidden selection:bg-violet-500 selection:text-white relative font-sans">
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
