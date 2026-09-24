"use client";
import { GooeyMarquee } from "@/components/ui/gooey-marquee";

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
    <section aria-label="Tools">
      <GooeyMarquee
        text={TOOLS.join(" · ")}
        speed={60}
        className="h-24 text-5xl md:h-32 md:text-8xl font-bold uppercase tracking-tight text-[#f7f5f1]"
      />
    </section>
  );
}
