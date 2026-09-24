import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import { CursorProvider } from "@/lib/cursor-context";
import { AudioProvider } from "@/context/AudioContext";
import { LanguageProvider } from "@/lib/i18n";
import FloatingPlayer from "@/components/ui/FloatingPlayer";

const FixedBackground = dynamic(
  () => import("@/components/ui/fixed-background").then((m) => m.FixedBackground),
  { ssr: false }
);

const spaceGrotesk = Space_Grotesk({
  subsets:  ["latin", "latin-ext"],
  weight:   ["300", "400", "500", "600", "700"],
  display:  "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Pedro Correa — Creative Portfolio",
  description: "Branding, Visual, Social & UX/UI design portfolio",
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#0d0907",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable} style={{ margin: 0, padding: 0, background: "#0d0907", overflowX: "hidden" }}>
      <body
        className="antialiased text-[#f7f5f1]"
        style={{ margin: 0, padding: 0, background: "#0d0907", overflowX: "hidden" }}
      >
        <FixedBackground />
        <LanguageProvider>
          <CursorProvider>
            <Preloader />
            <Navbar />
            <AudioProvider>
              <div style={{ position: "relative", zIndex: 1 }}>
                {children}
              </div>
              <FloatingPlayer />
              <CustomCursor />
            </AudioProvider>
          </CursorProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
