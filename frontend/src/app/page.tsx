"use client";

import React, { useState, useEffect } from "react";
import { ResumeData } from "../types/resume";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Loader2, WifiOff, Play } from "lucide-react";
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

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-50 font-sans">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl backdrop-blur-md">
          <Loader2 className="w-10 h-10 text-teal-400 animate-spin" />
          <div className="text-center space-y-1">
            <h1 className="text-lg font-bold text-white tracking-wide">Connecting to PHP API...</h1>
            <p className="text-xs text-zinc-500 font-light">Retrieving all resume sections and skills</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error / Offline State
  if (error || !resumeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-50 font-sans p-4">
        <div className="max-w-md w-full flex flex-col items-center gap-6 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl backdrop-blur-md text-center">
          <div className="p-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            <WifiOff className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white">PHP API Offline</h1>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              This portfolio is configured to retrieve all information dynamically from the PHP REST API, but the local backend is unreachable.
            </p>
            <div className="p-4 bg-zinc-950/80 border border-zinc-850 rounded-xl text-left text-xs font-mono text-zinc-500 space-y-2.5 mt-4">
              <span className="text-teal-400 font-semibold">// Start local backend:</span>
              <p>Navigate to backend directory and start server on port 8000:</p>
              <div className="p-2 rounded bg-zinc-900 text-zinc-300 select-all border border-zinc-800">
                php -S localhost:8000
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
            <button
              onClick={fetchResumeData}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-zinc-950 font-bold hover:brightness-110 active:scale-95 transition-all text-sm cursor-pointer"
            >
              Retry Connection
            </button>
            <button
              onClick={handleUseFallback}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-750 active:scale-95 transition-all text-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-teal-400" />
              Use Static Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Render Page with live API data
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-50 overflow-x-hidden selection:bg-teal-500 selection:text-black">
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-radial-gradient from-teal-500/5 via-transparent to-transparent pointer-events-none -z-20" />
      
      {mongodbError && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-400 px-4 py-2.5 text-center text-xs font-medium relative z-50 flex items-center justify-center gap-2">
          <span>⚠️ <strong>MongoDB Connection Warning:</strong> {mongodbError}</span>
          <button 
            onClick={() => setMongodbError(null)} 
            className="underline hover:text-white ml-2 cursor-pointer focus:outline-none"
          >
            Dismiss
          </button>
        </div>
      )}

      <Navbar githubUrl={resumeData.personal.github} personalName={resumeData.personal.name} />
      <main className="flex-grow">
        <Hero personal={resumeData.personal} />
        <Experience experience={resumeData.experience} />
        <Projects projects={resumeData.projects} />
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
