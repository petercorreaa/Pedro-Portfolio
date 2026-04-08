import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import type { Work } from "@/components/ui/GlassCard";

const works: Work[] = [
  {
    id: "uxui-01",
    title: "Banca Digital",
    tags: ["UX Research", "Product Design", "Figma"],
    description: "Rediseño de la experiencia de onboarding para banco digital. Research con usuarios, wireframes, prototipo y handoff con sistema de diseño documentado.",
  },
  {
    id: "uxui-02",
    title: "Marketplace Artesanal",
    tags: ["E-commerce UX", "Mobile", "Prototyping"],
    description: "Diseño UX/UI para plataforma de comercio artesanal. Flujos de compra, sistema de búsqueda y checkout optimizado para conversión móvil.",
  },
  {
    id: "uxui-03",
    title: "Dashboard Analytics",
    tags: ["Data Visualization", "SaaS", "Design System"],
    description: "Interfaz de dashboard para herramienta de analytics B2B. Sistema de componentes con tema claro/oscuro y visualización de datos complejos.",
  },
  {
    id: "uxui-04",
    title: "App de Bienestar",
    tags: ["Mobile App", "iOS", "UX Strategy"],
    description: "Diseño end-to-end de aplicación de meditación y hábitos. Onboarding personalizado, sistema de notificaciones y seguimiento de progreso.",
  },
  {
    id: "uxui-05",
    title: "Portal Educativo",
    tags: ["EdTech", "Accessibility", "UX"],
    description: "Plataforma de aprendizaje online para institución universitaria. Foco en accesibilidad WCAG AA, flujos de navegación y experiencia de video.",
  },
  {
    id: "uxui-06",
    title: "Design System v2",
    tags: ["Design System", "Tokens", "Components"],
    description: "Construcción de design system desde cero para startup de salud digital. 80+ componentes documentados en Storybook con tokens multi-marca.",
  },
];

export default function UXUIPage() {
  return (
    <SectionPageTemplate
      title="UX/UI"
      gradient="linear-gradient(to bottom, #0d0907, #3b1f6b)"
      accentColor="#9b6bff"
      works={works}
    />
  );
}
