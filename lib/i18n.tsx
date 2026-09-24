"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "es";
export type Localized = Record<Lang, string>;

const STORAGE_KEY = "pc-lang";

/* ── Dictionary ──────────────────────────────────────────────── */
const DICT = {
  en: {
    nav: { about: "About", music: "Music", contact: "Contact", toggleMenu: "Toggle menu", language: "Language" },
    hero: {
      role: "Multidisciplinary Designer",
      cta:  "View Work",
    },
    about: {
      badge: "About me",
      paragraphs: [
        <>Hi, I&apos;m Pedro — but you can call me Peter.</>,
        <>I&apos;m a multidisciplinary designer. What does that actually mean? Honestly, I didn&apos;t fully know either… until a few months after graduating.</>,
        <>Once I stepped into the real world, I realized something pretty quickly: people and businesses are constantly facing problems, needs, and the occasional &ldquo;we know we want something… we just have no idea what or why.&rdquo;</>,
        <>Everyone wants to solve something. Some know <em><strong>what</strong></em> they want, but not <em><strong>how</strong></em> to get there. Others don&apos;t even know <em><strong>why</strong></em> they want it in the first place.</>,
        <>That&apos;s where I come in.</>,
        <>As a multidisciplinary designer, my role is to understand the <em><strong>why</strong></em> behind a need — and then figure out <em><strong>how</strong></em> to turn it into something real (as long as it involves design… otherwise, I&apos;m probably not your guy).</>,
        <>I design brands, content, websites, e-commerce experiences, visual systems, and pretty much anything that helps ideas take shape and make sense.</>,
      ],
      disciplines: "Branding · UX/UI · Visual · Communication Design",
    },
    music: {
      badge:   "Beyond Design",
      title:   <>Music has always <br className="max-md:hidden" />been my other passion.</>,
      body:    <>Long before I was designing brands and interfaces, I was making music. It&apos;s always been my other creative outlet — feel free to listen while you explore my work.</>,
    },
    contact: {
      badge: "Contact",
      title: <>Let&apos;s work<br />together.</>,
      body:  "Have a project in mind or just want to say hello? Reach out through any of the channels below.",
    },
    footer: {
      tagline:   "Designer & Creative Director crafting brand identities, visual systems and digital experiences.",
      work:      "Work",
      contact:   "Contact",
      rights:    "All rights reserved.",
    },
    work: {
      back:        "Back",
      eyebrow:     "Portfolio",
      comingSoon:  "Coming soon — projects in development.",
      pieces:      "pieces",
      viewProject: "View project →",
      visitSite:   "Visit Website →",
      close:       "Close",
      prev:        "Previous",
      next:        "Next",
      goTo:        "Go to",
    },
    cursor:    "SEE MY WORK",
    preloader: "Portfolio",
  },

  es: {
    nav: { about: "Sobre mí", music: "Música", contact: "Contacto", toggleMenu: "Abrir menú", language: "Idioma" },
    hero: {
      role: "Diseñador Multidisciplinario",
      cta:  "Ver trabajo",
    },
    about: {
      badge: "Sobre mí",
      paragraphs: [
        <>Hola, soy Pedro — pero puedes llamarme Peter.</>,
        <>Soy diseñador multidisciplinario. ¿Qué significa eso realmente? Sinceramente, yo tampoco lo tenía muy claro… hasta unos meses después de graduarme.</>,
        <>Al salir al mundo real, me di cuenta de algo bastante rápido: las personas y las empresas se enfrentan constantemente a problemas, necesidades y al ocasional &ldquo;sabemos que queremos algo… pero no tenemos ni idea de qué ni por qué.&rdquo;</>,
        <>Todo el mundo quiere resolver algo. Algunos saben <em><strong>qué</strong></em> quieren, pero no <em><strong>cómo</strong></em> llegar hasta ahí. Otros ni siquiera saben <em><strong>por qué</strong></em> lo quieren.</>,
        <>Ahí es donde entro yo.</>,
        <>Como diseñador multidisciplinario, mi papel es entender el <em><strong>por qué</strong></em> detrás de una necesidad — y luego descubrir <em><strong>cómo</strong></em> convertirla en algo real (siempre que tenga que ver con diseño… si no, probablemente no soy la persona indicada).</>,
        <>Diseño marcas, contenido, sitios web, experiencias de e-commerce, sistemas visuales y prácticamente cualquier cosa que ayude a que las ideas tomen forma y tengan sentido.</>,
      ],
      disciplines: "Branding · UX/UI · Visual · Diseño de Comunicación",
    },
    music: {
      badge:   "Más allá del diseño",
      title:   <>La música siempre <br className="max-md:hidden" />ha sido mi otra pasión.</>,
      body:    <>Mucho antes de diseñar marcas e interfaces, ya hacía música. Siempre ha sido mi otra vía creativa — siéntete libre de escucharla mientras exploras mi trabajo.</>,
    },
    contact: {
      badge: "Contacto",
      title: <>Trabajemos<br />juntos.</>,
      body:  "¿Tienes un proyecto en mente o simplemente quieres saludar? Escríbeme por cualquiera de estos canales.",
    },
    footer: {
      tagline:   "Diseñador y Director Creativo que crea identidades de marca, sistemas visuales y experiencias digitales.",
      work:      "Trabajo",
      contact:   "Contacto",
      rights:    "Todos los derechos reservados.",
    },
    work: {
      back:        "Volver",
      eyebrow:     "Portafolio",
      comingSoon:  "Próximamente — proyectos en desarrollo.",
      pieces:      "piezas",
      viewProject: "Ver proyecto →",
      visitSite:   "Visitar sitio web →",
      close:       "Cerrar",
      prev:        "Anterior",
      next:        "Siguiente",
      goTo:        "Ir a",
    },
    cursor:    "VER MI TRABAJO",
    preloader: "Portafolio",
  },
};

/* Project tags are stored in English; Spanish renders through this map */
const TAGS_ES: Record<string, string> = {
  "Brand Identity": "Identidad de marca",
  "Motion":         "Animación",
  "Art Direction":  "Dirección de arte",
  "Print":          "Impresión",
  "Visual System":  "Sistema visual",
  "Digital Art":    "Arte digital",
  "Composition":    "Composición",
  "Concept":        "Concepto",
  "Product Visual": "Visual de producto",
  "Poster":         "Póster",
  "Illustration":   "Ilustración",
  "Social Media":   "Redes sociales",
  "Content":        "Contenido",
  "Web Design":     "Diseño web",
};

/* ── Context ─────────────────────────────────────────────────── */
type Dict = (typeof DICT)["en"];

interface LanguageCtx {
  lang:    Lang;
  setLang: (l: Lang) => void;
  t:       Dict;
  tag:     (tag: string) => string;
}

const LanguageContext = createContext<LanguageCtx>({
  lang:    "en",
  setLang: () => {},
  t:       DICT.en,
  tag:     (tag) => tag,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const tag = (t: string) => (lang === "es" ? TAGS_ES[t] ?? t : t);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICT[lang], tag }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
