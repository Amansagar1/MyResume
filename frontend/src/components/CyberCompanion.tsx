"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, X, Cpu, Zap, Volume2 } from "lucide-react";

const humanQuotes = [
  "Hi human! 👋 I'm Aman's AI Scout companion!",
  "Click anywhere on the screen for magical sparkles! ✨",
  "Checking out the production systems? SmartDoc AI is pure fire! 🔥",
  "3+ years building autonomous AI agents & scalable backends! ⚡",
  "RAG vector pipelines + Redis cache = sub-millisecond query speed! 🚀",
  "Want to build something incredible? Click 'Get In Touch' below! 📩",
  "BEEP BOOP! System health: 100% nominal! 🛡️",
];

export default function CyberCompanion() {
  // Position state (screen percentage or pixels)
  const [pos, setPos] = useState({ x: 82, y: 70 }); // in viewport vw/vh
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [speech, setSpeech] = useState<string | null>("Hi human! 👋 Tap me!");
  const [faceExpression, setFaceExpression] = useState<"normal" | "happy" | "speed" | "sparkle">("normal");
  const [isSpinning, setIsSpinning] = useState(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Roaming behavior across the window
  useEffect(() => {
    const roamInterval = setInterval(() => {
      // Pick random safe coordinates in the viewport (staying within viewable margins)
      const isMobile = window.innerWidth < 768;
      const minX = isMobile ? 65 : 40;
      const maxX = isMobile ? 85 : 90;
      const minY = 30;
      const maxY = 82;

      const nextX = minX + Math.random() * (maxX - minX);
      const nextY = minY + Math.random() * (maxY - minY);

      // Tilt slightly toward direction of travel
      const deltaX = nextX - pos.x;
      setRotation(deltaX > 0 ? 8 : -8);

      setPos({ x: nextX, y: nextY });

      // Reset tilt after a moment
      setTimeout(() => setRotation(0), 1800);
    }, 8000);

    return () => clearInterval(roamInterval);
  }, [pos.x]);

  // 2. Scroll interaction with human
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      // Tilt according to scroll
      setRotation(isScrollingDown ? 12 : -12);
      setFaceExpression("speed");

      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setRotation(0);
        setFaceExpression("normal");

        // Occasionally speak about the current section
        const scrollPct =
          window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight);

        if (scrollPct > 0.15 && scrollPct < 0.45) {
          triggerSpeech("Scanning Key Systems & Production Architectures... 🚀");
        } else if (scrollPct >= 0.45 && scrollPct < 0.75) {
          triggerSpeech("Carrier Trajectory & 3+ Years Experience! 🛠️");
        } else if (scrollPct >= 0.75) {
          triggerSpeech("Let's connect! Direct messaging available below! 💬");
        }
      }, 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  const triggerSpeech = (text: string) => {
    setSpeech(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, 5500);
  };

  // Initial speech greeting auto-dismiss after 6s
  useEffect(() => {
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, 6000);
    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    };
  }, []);

  // 3. Click interaction with human
  const handleBotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpinning(true);
    setFaceExpression("sparkle");

    const randomQuote = humanQuotes[Math.floor(Math.random() * humanQuotes.length)];
    triggerSpeech(randomQuote);

    setTimeout(() => {
      setIsSpinning(false);
      setFaceExpression("happy");
      setTimeout(() => setFaceExpression("normal"), 2000);
    }, 700);
  };

  return (
    <div
      className="fixed z-[70] pointer-events-none select-none transition-all duration-[2400ms] ease-out"
      style={{
        left: `${pos.x}vw`,
        top: `${pos.y}vh`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative pointer-events-auto cursor-pointer group">
        {/* Interactive Speech Bubble */}
        <AnimatePresence>
          {speech && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute bottom-full mb-3 right-1/2 translate-x-1/2 w-52 sm:w-60 p-3 rounded-2xl bg-zinc-950/95 border border-violet-500/40 shadow-[0_0_25px_rgba(139,92,246,0.3)] backdrop-blur-xl text-left"
            >
              <div className="flex items-start justify-between gap-1.5 mb-1">
                <span className="text-[10px] font-mono font-bold text-violet-400 flex items-center gap-1 uppercase tracking-wider">
                  <Cpu className="w-3 h-3" />
                  NEXUS SCOUT
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSpeech(null);
                  }}
                  className="text-zinc-500 hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                {speech}
              </p>
              {/* Pointer triangle */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-zinc-950" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Robotic Drone Companion */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: isSpinning ? [0, 360] : rotation,
          }}
          transition={{
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            rotate: isSpinning
              ? { duration: 0.7, ease: "easeInOut" }
              : { duration: 1.2 },
          }}
          onClick={handleBotClick}
          onMouseEnter={() => {
            setIsHovered(true);
            setFaceExpression("happy");
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setFaceExpression("normal");
          }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          title="Click to interact with Aman's AI Companion!"
        >
          {/* Outer Halo Pulsing Ring */}
          <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-ping opacity-30" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-violet-600/30 via-fuchsia-600/20 to-indigo-600/30 blur-md pointer-events-none" />

          {/* Bot Body (Aerodynamic Cyber Sphere) */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-zinc-850 via-zinc-900 to-black border-2 border-violet-400/60 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            {/* Top Antenna Beacon */}
            <div className="absolute -top-1 w-2.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />

            {/* Glowing Visor / Screen */}
            <div className="w-10 sm:w-12 h-6 sm:h-7 rounded-xl bg-black/90 border border-violet-500/50 flex items-center justify-center shadow-inner relative overflow-hidden">
              {/* Visor Glare */}
              <div className="absolute -top-2 -left-2 w-8 h-4 bg-white/20 rounded-full rotate-12 blur-[1px]" />

              {/* Expressive Visor Eyes */}
              <div className="flex items-center gap-2 font-mono font-black text-xs sm:text-sm select-none">
                {faceExpression === "normal" && (
                  <span className="text-violet-400 animate-pulse tracking-widest">
                    &bull; &bull;
                  </span>
                )}
                {faceExpression === "happy" && (
                  <span className="text-fuchsia-400 tracking-wider">
                    ^ _ ^
                  </span>
                )}
                {faceExpression === "speed" && (
                  <span className="text-amber-400 tracking-widest">
                    &gt; &lt;
                  </span>
                )}
                {faceExpression === "sparkle" && (
                  <span className="text-cyan-300 tracking-wider">
                    ★ ★
                  </span>
                )}
              </div>
            </div>

            {/* Micro Chest Core Light */}
            <div className="mt-1 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-violet-400 animate-ping" />
              <span className="w-4 h-0.5 rounded-full bg-violet-500/60" />
            </div>
          </div>

          {/* Levitating Micro Thruster Flame at bottom */}
          <div className="absolute -bottom-1.5 flex gap-2">
            <span className="w-1.5 h-3 rounded-full bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
            <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-fuchsia-400 to-transparent animate-bounce" />
            <span className="w-1.5 h-3 rounded-full bg-gradient-to-b from-violet-400 to-transparent animate-pulse" />
          </div>

          {/* Interactive Hint Indicator */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-6 px-2 py-0.5 rounded-md bg-violet-500 text-zinc-950 font-bold text-[9px] font-mono tracking-wider shadow-lg"
            >
              TAP ME!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
