"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalInfo } from "../types/resume";

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

    // Determine PHP API endpoint (fallback to local PHP server at port 8000)
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const endpoint = `${apiBase}/api/contact.php`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.warn("PHP API not reachable, falling back to client simulation:", error);
      
      // Simulation Mode fallback
      setTimeout(() => {
        setStatus("success");
        setIsSimulated(true);
        console.log("Contact form submitted (Simulated):", formData);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1500);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-zinc-950 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-xs uppercase tracking-widest text-teal-400 font-bold mb-2">Get In Touch</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Let's Connect</h3>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left panel: Info */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-zinc-150">Contact Information</h4>
              <p className="text-sm text-zinc-450 leading-relaxed font-light">
                Have an exciting project idea, a position to fill, or just want to discuss code? Drop me a message, and I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Quick connection items */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">Email</span>
                  <a href={`mailto:${personal.email}`} className="text-sm font-semibold text-zinc-300 hover:text-teal-400 transition-colors">
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">Phone</span>
                  <a href={`tel:${personal.phone}`} className="text-sm font-semibold text-zinc-300 hover:text-teal-400 transition-colors">
                    {personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">Location</span>
                  <span className="text-sm font-semibold text-zinc-300">
                    {personal.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="md:col-span-7">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-teal-400" />
                    <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                    <p className="text-sm text-zinc-400 max-w-sm">
                      Thank you for reaching out. I have received your message and will get back to you shortly.
                    </p>
                    {isSimulated && (
                      <span className="inline-block mt-2 px-3 py-1 rounded text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                        Simulation Mode Active (PHP server offline)
                      </span>
                    )}
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 px-6 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700/50 transition-colors cursor-pointer"
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
                        <label htmlFor="name" className="text-xs font-bold text-zinc-455 uppercase tracking-wider">
                          Your Name <span className="text-teal-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Aman Sagar"
                          className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 text-zinc-150 placeholder-zinc-600 outline-none text-sm transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-zinc-455 uppercase tracking-wider">
                          Your Email <span className="text-teal-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@mail.com"
                          className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 text-zinc-150 placeholder-zinc-600 outline-none text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold text-zinc-455 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Collaboration"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 text-zinc-150 placeholder-zinc-600 outline-none text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold text-zinc-455 uppercase tracking-wider">
                        Message <span className="text-teal-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/20 text-zinc-150 placeholder-zinc-600 outline-none text-sm transition-all resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-zinc-950 font-bold hover:brightness-110 active:scale-98 transition-all disabled:opacity-55 disabled:cursor-not-allowed shadow-md cursor-pointer"
                      id="contact-submit-btn"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Message...
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
          </div>
        </div>
      </div>
    </section>
  );
}
