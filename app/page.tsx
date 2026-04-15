import HeroSection from "@/components/ui/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import SectionsGrid from "@/components/ui/SectionsGrid";
import MusicSection from "@/components/sections/MusicSection";
import ContactSection from "@/components/sections/ContactSection";
import StickyFooter from "@/components/ui/sticky-footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div style={{ marginBottom: "120px" }}>
        <HeroSection />
      </div>
      <div style={{ marginBottom: "120px" }}>
        <MarqueeSection />
      </div>
      <div id="sections" style={{ marginBottom: "120px" }}>
        <SectionsGrid />
      </div>
      <div style={{ marginBottom: "120px" }}>
        <MusicSection />
      </div>
      <ContactSection />
      <StickyFooter />
    </main>
  );
}
