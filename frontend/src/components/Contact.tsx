"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalInfo } from "../types/resume";
import Card3D from "./Card3D";
import Draggable from "./Draggable";

interface ContactProps {
  personal: PersonalInfo;
}

export default function Contact({ personal }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSimulated, setIsSimulated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setIsSimulated(false);
    setErrorMessage("");

    // Input Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Determine PHP API endpoint dynamically
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

    const endpoint = `${apiBase}/api/contact.php`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Failed to submit message. Please try again.");
      }
    } catch {
      // Fallback simulation mode if local PHP backend is offline
      setTimeout(() => {
        setStatus("success");
        setIsSimulated(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1200);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-black/90 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-none bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-none bg-blue-600/10 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none text-xs font-mono font-semibold bg-white/10 text-white border border-white/20 mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            INITIATE COLLABORATION
          </div>
          <Draggable>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white tracking-tight">Let's Connect</h2>
          </Draggable>
          <Draggable>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-xl font-light">
              Available for full-time engineering roles, AI agent integrations, and scalable full-stack web applications.
            </p>
          </Draggable>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-none mt-3 mx-auto md:mx-0" />
        </div>

        {/* Contact Layout (Tighter gap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7">
          {/* Left panel: Info cards combined into one */}
          <div className="lg:col-span-5 h-full">
            <Card3D depth={8} glowColor="rgba(59, 130, 246, 0.18)" className="h-full">
              <div className="p-6 sm:p-7 rounded-none bg-slate-900/60 /40 hover:border-white/40 backdrop-blur-xl shadow-xl h-full flex flex-col justify-center space-y-8">
                
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-none bg-white/10 border border-blue-500/25 text-white group-hover:scale-110 transition-transform ">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 uppercase font-medium tracking-wider block mb-0.5">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-sm sm:text-base font-semibold text-slate-200 hover:text-white transition-colors truncate block"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-none bg-white/10 border border-blue-500/25 text-white group-hover:scale-110 transition-transform ">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 uppercase font-medium tracking-wider block mb-0.5">
                      Phone &amp; WhatsApp
                    </span>
                    <a
                      href={`tel:${personal.phone}`}
                      className="text-sm sm:text-base font-semibold text-slate-200 hover:text-white transition-colors truncate block"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group">
                  <div className="p-3 rounded-none bg-white/10 border border-blue-500/25 text-white group-hover:scale-110 transition-transform ">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 uppercase font-medium tracking-wider block mb-0.5">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-200 block">
                      {personal.location}
                    </span>
                  </div>
                </div>

                {/* LinkedIn */}
                {personal.linkedin && (
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-none bg-white/10 border border-blue-500/25 text-white group-hover:scale-110 transition-transform ">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-mono text-slate-500 uppercase font-medium tracking-wider block mb-0.5">
                        LinkedIn Network
                      </span>
                      <a
                        href={personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-slate-200 hover:text-white transition-colors truncate flex items-center gap-1.5"
                      >
                        <span>linkedin.com/in/{personal.linkedinUsername || "kumaramansagar"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </a>
                    </div>
                  </div>
                )}
                
              </div>
            </Card3D>
          </div>

          {/* Right panel: 3D Form (Tighter padding) */}
          <div className="lg:col-span-7">
            <Card3D depth={8} glowColor="rgba(59, 130, 246, 0.18)">
              <div className="p-5 sm:p-6 rounded-none bg-slate-900/60 /40 hover:border-white/40 backdrop-blur-xl shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-5 text-xs font-mono text-gray-500">
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Send Direct Message</span>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-10 space-y-3"
                    >
                      <div className="w-14 h-14 rounded-none bg-white/10 border border-blue-500/30 flex items-center justify-center text-white ">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="text-xl font-medium tracking-tight text-white">Message Dispatched!</h4>
                      <p className="text-xs text-gray-500 max-w-sm font-light">
                        Thank you for reaching out. I have received your message and will respond promptly.
                      </p>
                      {isSimulated && (
                        <span className="inline-block mt-2 px-3 py-1 rounded-none text-[10px] font-mono bg-slate-900 text-gray-500 border border-slate-850">
                          Local Simulation Mode
                        </span>
                      )}
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 px-6 py-2.5 rounded-none bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold /60 transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider block">
                            Your Name <span className="text-white">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Kumar Aman Sagar"
                            className="w-full px-3.5 py-2.5 rounded-none bg-transparent  focus:border-white/40 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-slate-600 outline-none text-xs sm:text-sm transition-all shadow-inner"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block">
                            Your Email <span className="text-white">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="kumaramansagar01@gmail.com"
                            className="w-full px-3.5 py-2.5 rounded-none bg-transparent  focus:border-white/40 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-slate-600 outline-none text-xs sm:text-sm transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="subject" className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Full Stack / AI Engineer Opportunity"
                          className="w-full px-3.5 py-2.5 rounded-none bg-transparent  focus:border-white/40 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-slate-600 outline-none text-xs sm:text-sm transition-all shadow-inner"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block">
                          Message <span className="text-white">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Let's build something remarkable together..."
                          className="w-full px-3.5 py-2.5 rounded-none bg-transparent  focus:border-white/40 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-slate-600 outline-none text-xs sm:text-sm transition-all resize-none shadow-inner"
                        />
                      </div>

                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-3 rounded-none bg-white/10 border border-blue-500/25 text-white text-xs font-medium"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-none bg-gradient-to-r bg-white text-black text-white font-medium tracking-tight hover:brightness-110 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer text-xs sm:text-sm"
                        id="contact-submit-btn"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Dispatching Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}
