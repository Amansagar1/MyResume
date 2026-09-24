"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  depth?: number;
}

export default function Card3D({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.22)",
  depth = 10,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for raw mouse coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Glare coordinates in pixels
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [depth, -depth]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-depth, depth]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    x.set(currentX / width - 0.5);
    y.set(currentY / height - 0.5);

    mouseX.set(currentX);
    mouseY.set(currentY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={`relative group ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative rounded-2xl transition-shadow duration-300"
      >
        {children}

        {/* Dynamic Interactive Glare / Glimpse Overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, ${glowColor}, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 mix-blend-screen"
        />

        {/* Subtle border highlight following the cursor */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(250px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(168, 85, 247, 0.45), transparent 60%)`,
          }}
          className="pointer-events-none absolute -inset-px rounded-2xl z-10 -z-10 blur-[1px]"
        />
      </motion.div>
    </div>
  );
}
