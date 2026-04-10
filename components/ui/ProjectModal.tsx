"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Work } from "./GlassCard";

interface ProjectModalProps {
  work:        Work | null;
  gradient:    string;
  accentColor: string;
  onClose:     () => void;
}

const CAROUSEL_SLIDES = 3;

export default function ProjectModal({ work, gradient, accentColor, onClose }: ProjectModalProps) {
  const [slide, setSlide] = useState(0);

  // Reset carousel when a new work opens
  useEffect(() => { setSlide(0); }, [work?.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (work) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [work]);

  return (
    <AnimatePresence>
      {work && (
        <>
          {/* ── Backdrop ────────────────────────────────── */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(13,9,7,0.85)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* ── Panel ───────────────────────────────────── */}
          <motion.div
            key="panel"
            className="fixed z-[101] inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-8 lg:inset-x-16 lg:inset-y-10 flex flex-col rounded-3xl overflow-hidden"
            style={{
              background:           "rgba(247,245,241,0.05)",
              backdropFilter:       "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border:               `1px solid rgba(247,245,241,0.12)`,
              boxShadow:            `0 40px 80px -20px rgba(0,0,0,0.7)`,
            }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.94, y: 20  }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* ── Close button ──────────────────────────── */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "rgba(247,245,241,0.1)",
                border:     "1px solid rgba(247,245,241,0.15)",
                color:      "#f7f5f1",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* ── Image carousel ────────────────────────── */}
            <div className="relative flex-shrink-0 overflow-hidden" style={{ height: "55%" }}>
              {/* Slide area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: gradient }}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0  }}
                  exit={{    opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Noise overlay */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      backgroundSize: "128px 128px",
                    }}
                  />
                  <div className="relative text-center">
                    <p
                      className="text-xs uppercase tracking-[0.2em] mb-3"
                      style={{ color: "rgba(247,245,241,0.4)" }}
                    >
                      Image {slide + 1} / {CAROUSEL_SLIDES}
                    </p>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.2 }}>
                      <rect x="4" y="4" width="40" height="40" rx="6" stroke="white" strokeWidth="1.5"/>
                      <circle cx="17" cy="18" r="4" stroke="white" strokeWidth="1.5"/>
                      <path d="M4 34l11-9 8 6 8-5 13 10" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              {slide > 0 && (
                <button
                  onClick={() => setSlide((s) => s - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(247,245,241,0.12)", border: "1px solid rgba(247,245,241,0.2)", color: "#f7f5f1" }}
                >
                  ←
                </button>
              )}
              {slide < CAROUSEL_SLIDES - 1 && (
                <button
                  onClick={() => setSlide((s) => s + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(247,245,241,0.12)", border: "1px solid rgba(247,245,241,0.2)", color: "#f7f5f1" }}
                >
                  →
                </button>
              )}

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: CAROUSEL_SLIDES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:      i === slide ? 20 : 6,
                      height:     6,
                      background: i === slide ? accentColor : "rgba(247,245,241,0.3)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── Detail area ───────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-8 py-7">
              <div className="flex flex-wrap gap-2 mb-4">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: `${accentColor}18`,
                      color:       accentColor,
                      border:      `1px solid ${accentColor}35`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="font-akira text-2xl md:text-3xl mb-4" style={{ color: "#f7f5f1" }}>
                {work.title}
              </h2>

              <p className="text-base leading-relaxed" style={{ color: "rgba(247,245,241,0.6)" }}>
                {work.description}
              </p>

              <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(247,245,241,0.08)" }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(247,245,241,0.3)" }}>
                  Detalles del proyecto
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: "rgba(247,245,241,0.55)" }}>
                  <div><span style={{ color: accentColor }}>Cliente</span><br/>Por definir</div>
                  <div><span style={{ color: accentColor }}>Año</span><br/>2024</div>
                  <div><span style={{ color: accentColor }}>Servicios</span><br/>{work.tags.join(", ")}</div>
                  <div><span style={{ color: accentColor }}>Entregables</span><br/>Por definir</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
