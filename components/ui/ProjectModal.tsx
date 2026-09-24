"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WorkItem } from "@/lib/constants";
import { useLang } from "@/lib/i18n";

interface ProjectModalProps {
  work:        WorkItem | null;
  accentColor: string;
  onClose:     () => void;
}

const glassBtn: React.CSSProperties = {
  background:           "rgba(247,245,241,0.08)",
  backdropFilter:       "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border:               "1px solid rgba(247,245,241,0.15)",
  color:                "#f7f5f1",
};

export default function ProjectModal({ work, accentColor, onClose }: ProjectModalProps) {
  const [index, setIndex] = useState(0);
  const { lang, t, tag: tagLabel } = useLang();

  const total = work?.files.length ?? 0;

  useEffect(() => { setIndex(0); }, [work?.id]);

  const prev = useCallback(() => {
    setIndex((i) => (total === 0 ? 0 : (i - 1 + total) % total));
  }, [total]);

  const next = useCallback(() => {
    setIndex((i) => (total === 0 ? 0 : (i + 1) % total));
  }, [total]);

  useEffect(() => {
    if (!work) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")    onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [work, onClose, prev, next]);

  useEffect(() => {
    if (work) document.body.style.overflow = "hidden";
    else      document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [work]);

  const current = work?.files[index];

  return (
    <AnimatePresence>
      {work && current && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100]"
            style={{
              background:           "rgba(13,9,7,0.88)",
              backdropFilter:       "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            className="fixed inset-0 z-[101] flex flex-col pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* ── Fixed close button ────────────────────────── */}
            <button
              onClick={onClose}
              aria-label={t.work.close}
              className="pointer-events-auto fixed top-[84px] right-4 md:top-[110px] md:right-6 w-11 h-11 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ ...glassBtn, zIndex: 999 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* ── Tags + title ──────────────────────────────── */}
            <div className="pointer-events-auto px-5 pr-16 pt-[92px] pb-4 md:px-10 md:pt-[180px] md:pb-5">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: `${accentColor}18`,
                      color:       accentColor,
                      border:     `1px solid ${accentColor}35`,
                    }}
                  >
                    {tagLabel(tag)}
                  </span>
                ))}
              </div>
              <h2
                className="font-display text-2xl md:text-3xl truncate"
                style={{ color: "#f7f5f1" }}
              >
                {work.title}
              </h2>
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            '8px',
                    padding:        '8px 20px',
                    borderRadius:   '999px',
                    border:         '1px solid rgba(247,245,241,0.2)',
                    background:     'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(12px)',
                    color:          '#f7f5f1',
                    fontSize:       '12px',
                    letterSpacing:  '0.15em',
                    textTransform:  'uppercase',
                    textDecoration: 'none',
                    marginTop:      '12px',
                    transition:     'all 0.3s ease',
                  }}
                >
                  {t.work.visitSite}
                </a>
              )}
            </div>

            <div
              className="relative flex-1 min-h-0 flex items-center justify-center px-3 md:px-20 pointer-events-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${work.id}-${index}`}
                  className="relative w-full h-full flex items-center justify-center pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{    opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  drag={total > 1 && current.type === "image" ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) next();
                    else if (info.offset.x > 60) prev();
                  }}
                >
                  {current.type === "image" ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={current.src}
                        alt={work.title}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "contain" }}
                        draggable={false}
                        priority
                      />
                    </div>
                  ) : (
                    <video
                      key={current.src}
                      src={current.src}
                      controls
                      autoPlay
                      loop
                      playsInline
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label={t.work.prev}
                    className="pointer-events-auto absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
                    style={glassBtn}
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    aria-label={t.work.next}
                    className="pointer-events-auto absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
                    style={glassBtn}
                  >
                    →
                  </button>
                </>
              )}
            </div>

            <div className="pointer-events-auto px-5 md:px-10 py-4 md:py-5" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}>
              <p
                className="text-sm md:text-base leading-relaxed mb-4 max-w-3xl"
                style={{ color: "rgba(247,245,241,0.65)" }}
              >
                {work.description[lang]}
              </p>

              {total > 1 && (
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs uppercase tracking-widest tabular-nums"
                    style={{ color: "rgba(247,245,241,0.4)" }}
                  >
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <div className="flex gap-1.5 flex-1 overflow-x-auto">
                    {work.files.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`${t.work.goTo} ${i + 1}`}
                        className="rounded-full transition-all duration-300 flex-shrink-0"
                        style={{
                          width:      i === index ? 24 : 6,
                          height:     6,
                          background: i === index ? accentColor : "rgba(247,245,241,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
