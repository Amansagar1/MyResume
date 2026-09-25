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
      dragMomentum={true}
      whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 50 }}
      className={`relative cursor-grab ${className}`}
      style={{ touchAction: "none" }}
    >
      {children}
    </motion.div>
  );
}
