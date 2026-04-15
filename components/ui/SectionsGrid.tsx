"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useCursor } from "@/lib/cursor-context";

/* ── Per-section organic radial-gradient backgrounds ─────────── */
const SECTION_BACKGROUNDS: Record<string, string> = {
  branding: [
    "radial-gradient(ellipse 80% 70% at 30% 60%, #1a4d2e 0%, #0d2918 40%, #0d0907 100%)",
    "radial-gradient(ellipse 50% 40% at 80% 20%, #0f3d22 0%, transparent 60%)",
  ].join(", "),
  visual: [
    "radial-gradient(ellipse 70% 80% at 60% 70%, #7a2e0e 0%, #4a1a06 45%, #0d0907 100%)",
    "radial-gradient(ellipse 60% 50% at 20% 30%, #5c2008 0%, transparent 55%)",
  ].join(", "),
  social: [
    "radial-gradient(ellipse 90% 60% at 40% 80%, #1e3a5f 0%, #0f2040 40%, #0d0907 100%)",
    "radial-gradient(ellipse 55% 70% at 75% 15%, #162d4a 0%, transparent 60%)",
  ].join(", "),
  uxui: [
    "radial-gradient(ellipse 75% 85% at 55% 65%, #3b1f6b 0%, #22104a 45%, #0d0907 100%)",
    "radial-gradient(ellipse 65% 45% at 15% 25%, #2d1555 0%, transparent 55%)",
  ].join(", "),
};

/* ── Scramble config ─────────────────────────────────────────── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!%&*?";
const SCRAMBLE_FRAMES = 18;   // × 33ms ≈ 600ms total
const SCRAMBLE_TICK   = 33;

function useScramble(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      if (frame >= SCRAMBLE_FRAMES) {
        setDisplayed(text);
        clearInterval(id);
        return;
      }
      const progress = frame / SCRAMBLE_FRAMES;
      const resolved = Math.floor(progress * text.length);
      setDisplayed(
        text.split("").map((char, i) => {
          if (char === "/" || char === " " || char === "&") return char;
          if (i < resolved) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
    }, SCRAMBLE_TICK);
    return () => clearInterval(id);
  }, [active, text]);

  return displayed;
}

/* ── Sub-component: one column title with scramble ───────────── */
function ScrambleTitle({ text, active }: { text: string; active: boolean }) {
  const displayed = useScramble(text, active);

  return (
    <motion.h2
      className="relative z-10 font-akira select-none text-center"
      style={{
        fontSize:         "clamp(1.1rem, 2.2vw, 2rem)",
        lineHeight:       1,
        letterSpacing:    "0.15em",
        padding:          "0 2rem",
        overflow:         "visible",
        WebkitTextStroke: "1px #f7f5f1",
      }}
      animate={{
        color: active ? "rgba(247,245,241,1)" : "rgba(247,245,241,0)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {displayed}
    </motion.h2>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function SectionsGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted,   setMounted]   = useState(false);
  const { setColor } = useCursor();

  useEffect(() => { setMounted(true); }, []);

  function handleEnter(id: string, tint: string) {
    setHoveredId(id);
    setColor(tint);
  }
  function handleLeave() {
    setHoveredId(null);
    setColor("#e8e0f5");
  }

  return (
    <section
      id="sections"
      style={{
        display:       "flex",
        flexDirection: "row",
        gap:           "12px",
        padding:       "12px",
        height:        "100vh",
        alignItems:    "stretch",
      }}
    >
      {SECTIONS.map((section, i) => {
        const isHovered = hoveredId === section.id;

        return (
          /* Outer card shell */
          <motion.div
            key={section.id}
            data-cursor="work"
            style={{
              flex:         1,
              borderRadius: "24px",
              overflow:     "hidden",
              position:     "relative",
              boxShadow:    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            initial={mounted ? { opacity: 0, y: 40 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              delay:    i * 0.1,
              ease:     [0.22, 1, 0.36, 1],
            }}
          >
            {/* ── Glassmorphism layer ───────────────────────── */}
            <div
              style={{
                position:             "absolute",
                inset:                0,
                background:           "rgba(255,255,255,0.04)",
                backdropFilter:       "blur(12px) saturate(150%)",
                WebkitBackdropFilter: "blur(12px) saturate(150%)",
                border:               "1px solid rgba(255,255,255,0.1)",
                borderRadius:         "24px",
                pointerEvents:        "none",
                zIndex:               1,
              }}
            />

            <Link
              href={section.href}
              className="absolute inset-0 flex items-center justify-center cursor-none"
              onMouseEnter={() => handleEnter(section.id, section.tint)}
              onMouseLeave={handleLeave}
            >
              {/* ── Organic radial-gradient background ───────── */}
              <div
                className="absolute inset-0"
                style={{ background: SECTION_BACKGROUNDS[section.id] }}
              />

              {/* ── Hover brightness overlay ──────────────────── */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.04 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* ── Scramble title ────────────────────────────── */}
              <ScrambleTitle text={section.label} active={isHovered} />

              {/* ── Bottom glass info panel ───────────────────── */}
              <motion.div
                className="absolute left-0 right-0 bottom-0 z-20"
                style={{
                  background:           "rgba(247,245,241,0.05)",
                  backdropFilter:       "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderTop:            "1px solid rgba(247,245,241,0.1)",
                }}
                initial={{ y: "100%" }}
                animate={{ y: isHovered ? "0%" : "100%" }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="flex items-center justify-between px-6 py-5">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(247,245,241,0.65)", maxWidth: "16rem" }}
                  >
                    {section.description}
                  </p>
                  <motion.span
                    className="text-2xl flex-shrink-0 ml-4"
                    style={{ color: section.tint }}
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}
