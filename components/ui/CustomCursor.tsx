"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/lib/cursor-context";

export default function CustomCursor() {
  const { color } = useCursor();
  const [visible, setVisible] = useState(false);

  // Raw mouse position — dot follows instantly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring lags behind with spring physics
  const springCfg = { stiffness: 180, damping: 22, mass: 0.6 };
  const ringX = useSpring(dotX, springCfg);
  const ringY = useSpring(dotY, springCfg);

  // Transition config for ring color change
  const colorTransition = { duration: 0.4, ease: "easeInOut" as const };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
    };
  }, [dotX, dotY]);

  // Only render on pointer devices
  if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
    >
      {/* Ring — spring-lagged, color-reactive */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid`,
          borderColor: color,
          opacity: visible ? 1 : 0,
        }}
        animate={{ borderColor: color }}
        transition={colorTransition}
      />

      {/* Dot — instant, always accent white */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: visible ? 1 : 0,
        }}
        animate={{ backgroundColor: color }}
        transition={colorTransition}
      />
    </div>
  );
}
