"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useCursor } from "@/lib/cursor-context";
import { useLang } from "@/lib/i18n";
import { useMediaQuery } from "@/lib/use-media-query";

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
      className="relative z-10 font-display select-none text-center text-[clamp(1.8rem,9vw,2.6rem)] md:text-[clamp(1.5rem,4vw,2.6rem)] lg:text-[clamp(1.4rem,2.8vw,2.6rem)]"
      style={{
        lineHeight:       1,
        letterSpacing:    "0.08em",
        padding:          "0 1rem",
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

/* ── Sub-component: one card ─────────────────────────────────── */
type Section = (typeof SECTIONS)[number];

function SectionCard({
  section,
  index,
  mounted,
  isTouch,
}: {
  section: Section;
  index:   number;
  mounted: boolean;
  isTouch: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { setColor } = useCursor();
  const { lang } = useLang();

  /* Touch screens can't hover — activate the card while it crosses the middle of the viewport */
  const inCenter = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const isActive = hovered || (isTouch && inCenter);

  function handleEnter() {
    if (isTouch) return;
    setHovered(true);
    setColor(section.tint);
  }
  function handleLeave() {
    if (isTouch) return;
    setHovered(false);
    setColor("#e8e0f5");
  }

  return (
    /* Outer card shell */
    <motion.div
      ref={ref}
      data-cursor="work"
      className="h-[clamp(260px,72vw,380px)] md:h-auto lg:flex-1"
      style={{
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
        delay:    isTouch ? 0 : index * 0.1,
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
        onMouseEnter={handleEnter}
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
          animate={{ opacity: isActive ? 0.04 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* ── Scramble title ────────────────────────────── */}
        <ScrambleTitle text={section.label} active={isActive} />

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
          animate={{ y: isActive ? "0%" : "100%" }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-6 md:py-5">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(247,245,241,0.65)", maxWidth: "16rem" }}
            >
              {section.description[lang]}
            </p>
            <motion.span
              className="text-2xl flex-shrink-0 ml-4"
              style={{ color: section.tint }}
              animate={{ x: isActive ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function SectionsGrid() {
  const [mounted, setMounted] = useState(false);
  const isTouch = useMediaQuery("(hover: none)");

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="flex flex-col gap-4 p-4 md:grid md:grid-cols-2 md:grid-rows-2 md:h-screen md:gap-3 md:p-3 lg:flex lg:flex-row">
      {SECTIONS.map((section, i) => (
        <SectionCard
          key={section.id}
          section={section}
          index={i}
          mounted={mounted}
          isTouch={isTouch}
        />
      ))}
    </section>
  );
}
