import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import PageTransition from "@/components/ui/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import { CursorProvider } from "@/lib/cursor-context";

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
    <html lang="en">
      <body
        style={{ backgroundColor: "#0d0907", color: "#f7f5f1" }}
        className="antialiased"
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
