"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

const sectionActiveColors: Record<string, string> = {
  '/branding': '#5db87e',
  '/visual':   '#d4622a',
  '/social':   '#4a7fbf',
  '/uxui':     '#8b52d4',
}

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const goTo = (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  };

  return (
    <>
      <header
        className="fixed z-50 transition-all duration-300"
        style={{
          top:                  "20px",
          margin:               "20px 24px 0",
          width:                "calc(100% - 48px)",
          background:           scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
          backdropFilter:       "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border:               "1px solid rgba(255,255,255,0.12)",
          borderRadius:         "999px",
          padding:              "18px 48px",
          boxShadow:            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center justify-between w-full gap-8">
          <button
            onClick={() => { router.push('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }}
            className="font-akira tracking-wider transition-colors duration-300 hover:text-[#e8e0f5] whitespace-nowrap"
            style={{ color: "#f7f5f1", fontSize: "clamp(0.75rem, 1.2vw, 1rem)", background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            Pedro Correa
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <MagneticButton strength={0.25}>
              <NavButton onClick={() => goTo('about')}>About</NavButton>
            </MagneticButton>
            {NAV_LINKS.map((link) => (
              <MagneticButton key={link.href} strength={0.25}>
                <NavButton
                  onClick={() => router.push(link.href)}
                  active={pathname === link.href}
                  activeColor={sectionActiveColors[link.href]}
                >
                  {link.label}
                </NavButton>
              </MagneticButton>
            ))}
            <MagneticButton strength={0.25}>
              <NavButton onClick={() => goTo('music')}>Music</NavButton>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <NavButton onClick={() => goTo('contact')}>Contact</NavButton>
            </MagneticButton>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px w-6 bg-[#f7f5f1] origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-6 bg-[#f7f5f1] origin-center"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px w-6 bg-[#f7f5f1] origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed z-40 md:hidden"
            style={{
              top:                  "76px",
              left:                 "50%",
              transform:            "translateX(-50%)",
              minWidth:             "min(90vw, 500px)",
              background:           "rgba(13,9,7,0.92)",
              backdropFilter:       "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border:               "1px solid rgba(255,255,255,0.12)",
              borderRadius:         "20px",
              boxShadow:            "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                <NavButton onClick={() => { goTo('about'); setMenuOpen(false); }}>About</NavButton>
              </motion.div>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 1) * 0.06, duration: 0.2 }}
                >
                  <NavButton
                    onClick={() => { router.push(link.href); setMenuOpen(false); }}
                    active={pathname === link.href}
                    activeColor={sectionActiveColors[link.href]}
                  >
                    {link.label}
                  </NavButton>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (NAV_LINKS.length + 1) * 0.06, duration: 0.2 }}>
                <NavButton onClick={() => { goTo('music'); setMenuOpen(false); }}>Music</NavButton>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (NAV_LINKS.length + 2) * 0.06, duration: 0.2 }}>
                <NavButton onClick={() => { goTo('contact'); setMenuOpen(false); }}>Contact</NavButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavButton({
  onClick,
  active,
  activeColor,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  activeColor?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-link ${active ? "nav-link--active" : ""}`}
      style={{
        background: 'none',
        border:     'none',
        padding:    0,
        cursor:     'pointer',
        ...(active && activeColor ? { color: activeColor } : {}),
      }}
    >
      {children}
    </button>
  );
}
