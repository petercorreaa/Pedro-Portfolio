export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">
        Creative Designer
      </p>
      <h1 className="text-6xl md:text-8xl font-bold text-white leading-none mb-6">
        Pedro
        <br />
        <span className="text-white/20">Correa</span>
      </h1>
      <p className="text-white/50 text-lg max-w-md leading-relaxed">
        Crafting visual identities, digital experiences, and stories that connect brands with people.
      </p>
    </section>
  );
}
