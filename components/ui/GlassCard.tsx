"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { WorkItem } from "@/lib/constants";

export type Work = WorkItem;

interface GlassCardProps {
  work:        WorkItem;
  gradient:    string;
  accentColor: string;
  onClick:     () => void;
}

export default function GlassCard({ work, gradient, accentColor, onClick }: GlassCardProps) {
  const [hovered, setHovered] = useState(false);

  const cover = work.files[0];
  const hasCover = Boolean(cover);

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
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <div
          className="absolute inset-0"
          style={{ background: gradient, opacity: 0.7 }}
        />

        {hasCover && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            {cover.type === "image" ? (
              <Image
                src={cover.src}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <video
                src={cover.src}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </motion.div>
        )}

        {work.files.length > 1 && (
          <div
            className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium"
            style={{
              background:           "rgba(13,9,7,0.6)",
              backdropFilter:       "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color:                "#f7f5f1",
              border:               "1px solid rgba(247,245,241,0.15)",
            }}
          >
            {work.files.length} pieces
          </div>
        )}

        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, rgba(13,9,7,0.55), transparent 55%)` }}
          animate={{ opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.35 }}
        />

        <motion.div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 120%, ${accentColor}25 0%, transparent 65%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="relative overflow-hidden">
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

          <motion.span
            animate={{ x: hovered ? 3 : 0, color: hovered ? accentColor : "rgba(247,245,241,0.3)" }}
            transition={{ duration: 0.3 }}
            className="text-lg flex-shrink-0 mt-0.5"
          >
            →
          </motion.span>
        </div>

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
            View project →
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}
