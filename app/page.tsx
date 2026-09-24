import HeroSection from "@/components/ui/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import SectionsGrid from "@/components/ui/SectionsGrid";
import MusicSection from "@/components/sections/MusicSection";
import ContactSection from "@/components/sections/ContactSection";
import StickyFooter from "@/components/ui/sticky-footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mb-20 md:mb-[120px]">
        <HeroSection />
      </div>
      <div className="mb-20 md:mb-[120px]">
        <MarqueeSection />
      </div>
      <div id="sections" className="mb-20 md:mb-[120px] scroll-mt-24 lg:scroll-mt-0">
        <SectionsGrid />
      </div>
      <div className="mb-20 md:mb-[120px]">
        <MusicSection />
      </div>
      <ContactSection />
      <StickyFooter />
    </main>
  );
}
