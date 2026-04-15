"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [show,    setShow]    = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("pc-preloader");
    if (seen) return;

    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("pc-preloader", "1");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ backgroundColor: "#0d0907" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Monogram */}
            <motion.div
              className="font-akira select-none"
              style={{
                fontSize:      "clamp(5rem, 15vw, 9rem)",
                color:         "#f7f5f1",
                lineHeight:    1,
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 1.06, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              PC
            </motion.div>

            {/* Expanding accent line */}
            <motion.div
              style={{
                height:      1,
                background:  "#e8e0f5",
                originX:     0.5,
              }}
              initial={{ scaleX: 0, width: 120, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Subtle label */}
            <motion.p
              className="text-[10px] uppercase tracking-[0.35em]"
              style={{ color: "rgba(247,245,241,0.3)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
