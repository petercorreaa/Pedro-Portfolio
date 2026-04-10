"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useCursor } from "@/lib/cursor-context";

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
      const progress    = frame / SCRAMBLE_FRAMES;
      const resolved    = Math.floor(progress * text.length);
      setDisplayed(
        text.split("")
          .map((char, i) => {
            if (char === "/" || char === " " || char === "&") return char;
            if (i < resolved) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
    }, SCRAMBLE_TICK);
    return () => clearInterval(id);
  }, [active, text]);

  return displayed;
}

/* ── Sub-component: one column title with scramble ───────────── */
function ScrambleTitle({
  text,
  active,
  tint,
}: {
  text:   string;
  active: boolean;
  tint:   string;
}) {
  const displayed = useScramble(text, active);

  return (
    <motion.h2
      className="relative z-10 font-akira select-none text-center px-4"
      style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}
      animate={{
        color:         active ? tint : "#f7f5f1",
        letterSpacing: active ? "0.06em" : "0em",
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
    setColor("#4dd9c0");
  }

  return (
    <section
      id="sections"
      className="
        w-full min-h-screen
        flex flex-col
        md:grid md:grid-cols-2
        lg:flex lg:flex-row
        rounded-3xl overflow-hidden
      "
    >
      {SECTIONS.map((section, i) => {
        const isHovered = hoveredId === section.id;
        const isLast    = i === SECTIONS.length - 1;

        return (
          /* Scroll-animated wrapper — only animate after client mount */
          <motion.div
            key={section.id}
            className="relative flex-1 overflow-hidden"
            style={{ minHeight: "50vh" }}
            initial={mounted ? { opacity: 0, y: 40 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              delay:    i * 0.1,
              ease:     [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={section.href}
              className="absolute inset-0 flex items-center justify-center cursor-none"
              onMouseEnter={() => handleEnter(section.id, section.tint)}
              onMouseLeave={handleLeave}
            >
              {/* ── Gradient background ───────────────────── */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, #0d0907, ${section.color})` }}
              />

              {/* ── Hover brightness overlay ──────────────── */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.05 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* ── Divider (right edge, all but last) ───── */}
              {!isLast && (
                <div className="absolute top-0 right-0 bottom-0 w-px bg-white/10" />
              )}

              {/* ── Scramble title ────────────────────────── */}
              <ScrambleTitle
                text={section.label}
                active={isHovered}
                tint={section.tint}
              />

              {/* ── Bottom glass info panel ───────────────── */}
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
