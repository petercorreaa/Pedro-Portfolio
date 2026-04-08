import Link from "next/link";

interface GlassCardProps {
  title: string;
  description: string;
  href: string;
  color: string;
}

export default function GlassCard({ title, description, href, color }: GlassCardProps) {
  return (
    <Link href={href} className="group block">
      <div
        className={`relative rounded-2xl p-8 h-64 bg-gradient-to-br ${color} glass transition-all duration-300 group-hover:scale-[1.02] group-hover:border-white/20 overflow-hidden`}
      >
        <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
        <span className="absolute bottom-6 right-6 text-white/40 text-xs uppercase tracking-widest group-hover:text-white/70 transition-colors">
          View Work →
        </span>
      </div>
    </Link>
  );
}
