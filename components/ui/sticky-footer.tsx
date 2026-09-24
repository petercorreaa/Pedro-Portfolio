"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

/* ── Social icon SVGs (brand icons not in lucide-react) ──────── */
function IconLinkedin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

/* ── Link data ───────────────────────────────────────────────── */
const LINKEDIN_URL = "https://www.linkedin.com/in/pedro-a-correa/";
const EMAIL_URL    = "mailto:petercorrea516@gmail.com";

const workLinks = [
  { title: "Branding", href: "/branding" },
  { title: "Visual",   href: "/visual"   },
  { title: "Social",   href: "/social"   },
  { title: "UX/UI",    href: "/uxui"     },
];

const contactLinks = [
  { title: "LinkedIn", href: LINKEDIN_URL },
  { title: "Email",    href: EMAIL_URL    },
];

const socialLinks = [
  {
    icon:  IconLinkedin,
    href:  LINKEDIN_URL,
    label: "LinkedIn",
  },
];

/* ── Shared style tokens ─────────────────────────────────────── */
const muted  = "rgba(247,245,241,0.5)";
const full   = "#f7f5f1";
const border = "rgba(247,245,241,0.1)";

/* ── Component ───────────────────────────────────────────────── */
export default function StickyFooter() {
  const { t } = useLang();
  const footerLinkGroups = [
    { label: t.footer.work,    links: workLinks    },
    { label: t.footer.contact, links: contactLinks },
  ];

  return (
    <footer
      style={{
        borderTop:   `1px solid ${border}`,
        background:  "transparent",
        color:        full,
      }}
    >
      <div
        style={{
          background:    "transparent",
          maxWidth:      "1200px",
          margin:        "0 auto",
        }}
        className="px-5 pt-12 pb-8 md:px-8"
      >
        {/* ── Top row: brand + link groups + socials ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr repeat(2, auto) auto",
            gap:                 "48px",
            alignItems:          "start",
            marginBottom:        "48px",
          }}
          className="footer-grid"
        >
          {/* Brand / description */}
          <div style={{ maxWidth: "280px" }}>
            <div style={{ marginBottom: "16px" }}>
              <span
                className="font-akira"
                style={{
                  fontSize: "1.2rem",
                  color:     full,
                }}
              >
                PC
              </span>
            </div>
            <p
              style={{
                color:       muted,
                fontSize:    "0.8125rem",
                lineHeight:  1.65,
              }}
            >
              {t.footer.tagline}
            </p>
          </div>

          {/* Link groups */}
          {footerLinkGroups.map((group) => (
            <div key={group.label}>
              <p
                style={{
                  fontSize:      "0.6875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color:          muted,
                  marginBottom:  "16px",
                }}
              >
                {group.label}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.title}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social icons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "4px" }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color:      muted,
                  transition: "color 0.2s ease",
                  display:    "inline-flex",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = full; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = muted; }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom row: copyright ── */}
        <div
          style={{
            borderTop:   `1px solid ${border}`,
            paddingTop:  "24px",
            display:     "flex",
            alignItems:  "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color:         muted,
              fontSize:      "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textAlign:     "center",
              lineHeight:    1.6,
            }}
          >
            © {new Date().getFullYear()} Pedro Correa. {t.footer.rights}
          </p>
        </div>
      </div>

    </footer>
  );
}

/* ── Internal link helper ───────────────────────────────────── */
function FooterLink({
  href,
  children,
}: {
  href:     string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  const style: React.CSSProperties = {
    color:          "rgba(247,245,241,0.5)",
    fontSize:       "0.8125rem",
    textDecoration: "none",
    transition:     "color 0.2s ease",
  };
  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      (e.currentTarget as HTMLAnchorElement).style.color = "#f7f5f1";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(247,245,241,0.5)";
    },
  };

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={style} {...handlers}>
      {children}
    </Link>
  );
}
