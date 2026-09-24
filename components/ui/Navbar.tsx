"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLang, type Lang } from "@/lib/i18n";

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
  const { t } = useLang();

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

  const menuItems: { key: string; label: string; onClick: () => void; active?: boolean; activeColor?: string }[] = [
    { key: "about", label: t.nav.about, onClick: () => goTo('about') },
    ...NAV_LINKS.map((link) => ({
      key:         link.href,
      label:       link.label,
      onClick:     () => router.push(link.href),
      active:      pathname === link.href,
      activeColor: sectionActiveColors[link.href],
    })),
    { key: "music",   label: t.nav.music,   onClick: () => goTo('music') },
    { key: "contact", label: t.nav.contact, onClick: () => goTo('contact') },
  ];

  return (
    <>
      <header
        className="fixed z-50 transition-all duration-300 top-4 left-3 right-3 px-5 py-3 md:top-10 md:left-6 md:right-6 md:px-12 md:py-[18px]"
        style={{
          background:           scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
          backdropFilter:       "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border:               "1px solid rgba(255,255,255,0.12)",
          borderRadius:         "999px",
          boxShadow:            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center justify-between w-full gap-4 lg:gap-8">
          <button
            onClick={() => { router.push('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }}
            className="font-akira tracking-wider transition-colors duration-300 hover:text-[#e8e0f5] whitespace-nowrap"
            style={{ color: "#f7f5f1", fontSize: "clamp(0.75rem, 1.2vw, 1rem)", background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            Pedro Correa
          </button>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <MagneticButton strength={0.25}>
                <NavButton onClick={() => goTo('about')}>{t.nav.about}</NavButton>
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
                <NavButton onClick={() => goTo('music')}>{t.nav.music}</NavButton>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <NavButton onClick={() => goTo('contact')}>{t.nav.contact}</NavButton>
              </MagneticButton>
            </nav>

            <LangToggle />

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={t.nav.toggleMenu}
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-px w-6 bg-[#f7f5f1] origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-6 bg-[#f7f5f1] origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-px w-6 bg-[#f7f5f1] origin-center"
              />
            </button>
          </div>
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
            className="fixed z-40 lg:hidden top-[80px] left-3 right-3 md:top-[120px] md:left-6 md:right-6"
            style={{
              background:           "rgba(13,9,7,0.92)",
              backdropFilter:       "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border:               "1px solid rgba(255,255,255,0.12)",
              borderRadius:         "24px",
              boxShadow:            "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <nav className="flex flex-col px-7 py-6 gap-1">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <NavButton
                    onClick={() => { item.onClick(); setMenuOpen(false); }}
                    active={item.active}
                    activeColor={item.activeColor}
                    className="nav-link--menu"
                  >
                    {item.label}
                  </NavButton>
                </motion.div>
              ))}
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
  className = "",
  children,
}: {
  onClick: () => void;
  active?: boolean;
  activeColor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-link ${active ? "nav-link--active" : ""} ${className}`}
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

/* ── EN / ES switch with a sliding pill ─────────────────────── */
function LangToggle() {
  const { lang, setLang, t } = useLang();
  const options: Lang[] = ["en", "es"];

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="relative flex items-center rounded-full p-[3px] flex-shrink-0"
      style={{
        border:     "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      {options.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            className="relative rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] leading-none"
            style={{
              color:      active ? "#0d0907" : "rgba(247,245,241,0.6)",
              transition: "color 0.25s ease",
              cursor:     "pointer",
            }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "#e8e0f5" }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10">{l}</span>
          </button>
        );
      })}
    </div>
  );
}
