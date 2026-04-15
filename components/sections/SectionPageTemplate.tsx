"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import GlassCard from "@/components/ui/GlassCard";
import ProjectModal from "@/components/ui/ProjectModal";
import type { WorkItem } from "@/lib/constants";

interface SectionPageTemplateProps {
  title:       string;
  gradient:    string;
  accentColor: string;
  works:       WorkItem[];
}

export default function SectionPageTemplate({
  title,
  gradient,
  accentColor,
  works,
}: SectionPageTemplateProps) {
  const router = useRouter();
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [mounted,      setMounted]      = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <main className="relative min-h-screen" style={{ background: gradient, paddingTop: '120px' }}>

        {/* ── Fixed back button ─────────────────────────────── */}
        <MagneticButton strength={0.3} className="fixed top-[110px] left-6 z-[999]">
          <button
            onClick={() => router.push('/#sections')}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors duration-300"
            style={{
              background:           "rgba(247,245,241,0.08)",
              backdropFilter:       "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border:               "1px solid rgba(247,245,241,0.15)",
              color:                "rgba(247,245,241,0.7)",
              cursor:               "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f5f1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247,245,241,0.7)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M2 7l5-5M2 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        </MagneticButton>

        {/* ── Hero area ─────────────────────────────────────── */}
        <div className="pt-10 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
          <motion.p
            className="text-xs uppercase tracking-[0.25em] mb-6"
            style={{ color: accentColor }}
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Portfolio
          </motion.p>

          <div className="overflow-hidden mb-16">
            {title.split(" ").map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  className="font-akira leading-none"
                  style={{
                    fontSize: "clamp(2.2rem, 7vw, 7rem)",
                    color:    "#f7f5f1",
                    lineHeight: 1.05,
                  }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={mounted ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                  transition={{
                    duration: 0.75,
                    delay:    0.2 + i * 0.12,
                    ease:     [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* ── Works grid ──────────────────────────────────── */}
          {works.length === 0 ? (
            <div
              className="rounded-2xl px-6 py-10 text-center"
              style={{
                background:           "rgba(247,245,241,0.04)",
                backdropFilter:       "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border:               "1px solid rgba(247,245,241,0.08)",
                color:                "rgba(247,245,241,0.55)",
              }}
            >
              <p className="text-sm">Coming soon — projects in development.</p>
            </div>
          ) : (
          <div
            className="grid gap-5 sm:gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}
          >
            {works.map((work, i) => (
              <motion.div
                key={work.id}
                initial={mounted ? { opacity: 0, y: 28 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard
                  work={work}
                  gradient={gradient}
                  accentColor={accentColor}
                  onClick={() => setSelectedWork(work)}
                />
              </motion.div>
            ))}
          </div>
          )}
        </div>

        {/* ── Bottom fade ───────────────────────────────────── */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(13,9,7,0.6))" }}
        />
      </main>

      {/* ── Modal (portal-like, outside main) ─────────────── */}
      <ProjectModal
        work={selectedWork}
        accentColor={accentColor}
        onClose={() => setSelectedWork(null)}
      />
    </>
  );
}
