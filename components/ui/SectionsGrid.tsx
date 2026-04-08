import { SECTIONS } from "@/lib/constants";
import GlassCard from "./GlassCard";

export default function SectionsGrid() {
  return (
    <section className="px-8 pb-24 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SECTIONS.map((section) => (
          <GlassCard key={section.href} {...section} />
        ))}
      </div>
    </section>
  );
}
