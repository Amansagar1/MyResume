"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Gauge, Rocket } from "lucide-react";
import Card3D from "./Card3D";

export default function StatsBar() {
  const stats = [
    {
      label: "Production Experience",
      value: "3+ Years",
      detail: "Full Stack & Real-Time AI Agents",
      icon: <Rocket className="w-4 h-4 text-white" />,
      glowColor: "rgba(59, 130, 246, 0.2)",
    },
    {
      label: "Platform Availability",
      value: "99.9%",
      detail: "AWS ECS Multi-Tenant Micredrvices",
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      glowColor: "rgba(59, 130, 246, 0.2)",
    },
    {
      label: "Latency Reduction",
      value: "40% Gain",
      detail: "220ms to <130ms via Redis Caching",
      icon: <Gauge className="w-4 h-4 text-white" />,
      glowColor: "rgba(236, 72, 153, 0.2)",
    },
    {
      label: "Delivery Acceleration",
      value: "35% Faster",
      detail: "Automated Docker & CI/CD Pipelines",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      glowColor: "rgba(245, 158, 11, 0.2)",
    },
  ];

  return (
    <section className="relative z-20 my-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card3D depth={8} glowColor={stat.glowColor}>
              <div className="p-4 rounded-none bg-black/85 /40 hover:border-white/40 backdrop-blur-xl  flex flex-col justify-between h-full group">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="p-2 rounded-none bg-transparent  group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                    Metric 0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-medium tracking-tight tracking-tight tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-350 bg-clip-text text-transparent group-hover:text-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">
                    {stat.label}
                  </div>
                  <p className="text-[11px] text-slate-500 font-light mt-0.5 leading-tight">
                    {stat.detail}
                  </p>
                </div>
              </div>
            </Card3D>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
