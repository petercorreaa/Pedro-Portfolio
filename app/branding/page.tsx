import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import type { Work } from "@/components/ui/GlassCard";

const works: Work[] = [
  {
    id: "branding-01",
    title: "Marca Raíz",
    tags: ["Brand Identity", "Logo", "Guidelines"],
    description: "Sistema de identidad visual completo para una marca de alimentación orgánica. Incluye logotipo, tipografía personalizada, paleta cromática y manual de marca.",
  },
  {
    id: "branding-02",
    title: "Studio Norte",
    tags: ["Rebranding", "Visual System"],
    description: "Rediseño de marca para estudio de arquitectura. Enfoque minimalista con tipografía geométrica y sistema de aplicaciones para señalética y papelería.",
  },
  {
    id: "branding-03",
    title: "Ola Festival",
    tags: ["Event Branding", "Motion"],
    description: "Identidad para festival de música independiente. Sistema modular adaptable a distintos formatos: digital, impresión y escenografía.",
  },
  {
    id: "branding-04",
    title: "Terruño Wines",
    tags: ["Brand Identity", "Packaging", "Print"],
    description: "Branding premium para bodega familiar. Diseño de etiquetas, packaging de regalo y material de comunicación institucional.",
  },
  {
    id: "branding-05",
    title: "Clínica Esencia",
    tags: ["Healthcare Branding", "Guidelines"],
    description: "Identidad para clínica de bienestar. Paleta cálida y tipografía humanista que transmite confianza y cuidado.",
  },
  {
    id: "branding-06",
    title: "Komún Co.",
    tags: ["Startup Branding", "Digital"],
    description: "Marca y sistema de diseño para startup de economía colaborativa. Identidad flexible con tokens de diseño integrados al producto digital.",
  },
];

export default function BrandingPage() {
  return (
    <SectionPageTemplate
      title="Branding"
      gradient="linear-gradient(to bottom, #0d0907, #1a4d2e)"
      accentColor="#3db56a"
      works={works}
    />
  );
}
