"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

/* ── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const labelVariant = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.2 } },
};

export default function HeroSection() {
  return (
    <section className="hero-section relative flex items-center justify-center min-h-screen overflow-hidden px-6 md:px-16">

      {/* ── Ambient mesh background ─────────────────────────────── */}
      <div className="hero-mesh" aria-hidden="true" />

      {/* ── Two-column grid ─────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-24 pb-20">

        {/* ── Image column ──────────────────────────────────────── */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="hero-image-wrapper">
            {/* Glow ring */}
            <div className="hero-glow-ring" aria-hidden="true" />
            {/* Portrait */}
            <div className="hero-image-float">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
                <Image
                  src="/images/pedro.jpg"
                  alt="Pedro Correa"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Text column ───────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-6">

          {/* Label */}
          <motion.p
            variants={labelVariant}
            initial="hidden"
            animate="show"
            className="text-xs uppercase tracking-[0.25em] font-medium"
            style={{ color: "#4dd9c0" }}
          >
            Designer &amp; Creative Director
          </motion.p>

          {/* Heading — each word staggers in from below */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col leading-none"
          >
            {["Pedro", "Correa"].map((word) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  variants={fadeUp}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-display"
                  style={{
                    fontSize: "clamp(4rem, 9vw, 8rem)",
                    color: "#f7f5f1",
                    lineHeight: 1.05,
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
            style={{ color: "rgba(247, 245, 241, 0.6)" }}
            className="text-base md:text-lg leading-relaxed max-w-sm"
          >
            Crafting brand identities, digital experiences, and visual stories
            that connect ideas with people.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.05 }}
          >
            <MagneticButton strength={0.4}>
              <Link href="#sections" className="hero-cta">
                Ver trabajos
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(247, 245, 241, 0.3)" }}
        >
          Scroll
        </span>
        <div className="scroll-chevron" />
      </motion.div>
    </section>
  );
}
