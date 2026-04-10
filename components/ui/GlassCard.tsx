"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface Work {
  id: string;
  title: string;
  tags: string[];
  description: string;
}

interface GlassCardProps {
  work: Work;
  gradient: string;   // CSS gradient string for the image placeholder
  accentColor: string;
  onClick: () => void;
}

export default function GlassCard({ work, gradient, accentColor, onClick }: GlassCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y:           hovered ? -8 : 0,
        borderColor: hovered ? `${accentColor}55` : "rgba(255,255,255,0.15)",
        boxShadow:   hovered
          ? `0 24px 48px -12px ${accentColor}30, 0 8px 24px -4px rgba(0,0,0,0.5)`
          : "0 0px 0px 0px transparent",
      }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      style={{
        background:            "rgba(247,245,241,0.08)",
        backdropFilter:        "blur(20px)",
        WebkitBackdropFilter:  "blur(20px)",
        border:                "1px solid rgba(255,255,255,0.15)",
        borderRadius:          "1.5rem",
        cursor:                "pointer",
        overflow:              "hidden",
        position:              "relative",
      }}
    >
      {/* ── Image placeholder area ───────────────────────── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{ background: gradient, opacity: 0.7 }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Image scale on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Centred placeholder icon */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            style={{ opacity: 0.2 }}
          >
            <rect x="4" y="4" width="32" height="32" rx="4" stroke="white" strokeWidth="1.5" />
            <circle cx="14" cy="15" r="3" stroke="white" strokeWidth="1.5" />
            <path d="M4 27l9-7 6 5 6-4 11 9" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Accent glow on hover */}
        <motion.div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 120%, ${accentColor}25 0%, transparent 65%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* ── Info panel ───────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Resting state — always visible */}
        <div className="px-5 py-4 flex items-start justify-between gap-3">
          <div>
            <h3
              className="text-base leading-snug font-medium"
              style={{ color: "#f7f5f1" }}
            >
              {work.title}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(247,245,241,0.08)",
                    color:      "rgba(247,245,241,0.5)",
                    border:     "1px solid rgba(247,245,241,0.1)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow — shifts right on hover */}
          <motion.span
            animate={{ x: hovered ? 3 : 0, color: hovered ? accentColor : "rgba(247,245,241,0.3)" }}
            transition={{ duration: 0.3 }}
            className="text-lg flex-shrink-0 mt-0.5"
          >
            →
          </motion.span>
        </div>

        {/* Slide-up extra panel */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: hovered ? "0%" : "100%", opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="px-5 pb-4"
        >
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(247,245,241,0.5)" }}
          >
            {work.description}
          </p>
          <span
            className="inline-block mt-2 text-xs font-medium uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            Ver proyecto →
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}
