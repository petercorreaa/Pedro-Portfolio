"use client";
import { PerspectiveMarquee } from "@/components/ui/perspective-marquee";

const TOOLS = [
  "Illustrator",
  "PowerPoint",
  "After Effects",
  "Photoshop",
  "Claude",
  "Figma",
  "InDesign",
  "Webflow",
  "DALL-E",
];

export default function MarqueeSection() {
  return (
    <section
      style={{
        width:                "100vw",
        height:               "90px",
        overflow:             "hidden",
        borderRadius:         "0",
        background:           "rgba(255,255,255,0.06)",
        backdropFilter:       "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border:               "1px solid rgba(255,255,255,0.12)",
        boxShadow:            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <PerspectiveMarquee
        items={TOOLS}
        fontSize={22}
        color="#f7f5f1"
        pixelsPerFrame={2}
        rotateX={2}
        rotateY={0}
        perspective={1200}
        background="transparent"
        fadeColor="transparent"
        speed={1}
      />
    </section>
  );
}
