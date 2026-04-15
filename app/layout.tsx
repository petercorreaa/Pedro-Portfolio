import "../styles/globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import { CursorProvider } from "@/lib/cursor-context";
import { AudioProvider } from "@/context/AudioContext";
import FloatingPlayer from "@/components/ui/FloatingPlayer";

const FixedBackground = dynamic(
  () => import("@/components/ui/fixed-background").then((m) => m.FixedBackground),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Pedro Correa — Creative Portfolio",
  description: "Branding, Visual, Social & UX/UI design portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, background: "#0d0907", overflowX: "hidden" }}>
      <body
        className="antialiased text-[#f7f5f1]"
        style={{ margin: 0, padding: 0, background: "#0d0907", overflowX: "hidden" }}
      >
        <FixedBackground />
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
      </body>
    </html>
  );
}
