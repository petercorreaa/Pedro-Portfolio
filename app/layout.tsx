import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import PageTransition from "@/components/ui/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import { CursorProvider } from "@/lib/cursor-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body
        style={{ backgroundColor: "#0d0907", color: "#f7f5f1" }}
        className="antialiased font-sans"
      >
        <CursorProvider>
          <Preloader />
          <CustomCursor />
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </CursorProvider>
      </body>
    </html>
  );
}
