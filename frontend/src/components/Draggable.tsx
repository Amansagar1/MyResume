"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface DraggableProps {
  children: ReactNode;
  className?: string;
}

export default function Draggable({ children, className = "" }: DraggableProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.4}
      dragMomentum={false}
      whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 50 }}
      className={`relative cursor-grab ${className}`}
      style={{ touchAction: "none" }}
    >
      {children}
    </motion.div>
  );
}
