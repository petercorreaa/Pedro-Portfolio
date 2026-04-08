import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import type { Work } from "@/components/ui/GlassCard";

const works: Work[] = [
  {
    id: "social-01",
    title: "Vegano Fácil",
    tags: ["Social Media", "Content Strategy"],
    description: "Gestión integral de redes para marca de alimentación plant-based. Estrategia de contenido, diseño de feed y producción de reels mensuales.",
  },
  {
    id: "social-02",
    title: "Campaña Verano 24",
    tags: ["Campaign", "Instagram", "Paid Social"],
    description: "Campaña de verano para cadena de tiendas de ropa. Concepto creativo, piezas estáticas y animadas para múltiples formatos y plataformas.",
  },
  {
    id: "social-03",
    title: "Colectivo Cultural",
    tags: ["Community", "Content Creation"],
    description: "Dirección creativa de redes para colectivo de arte urbano. Crecimiento de 0 a 45k seguidores en 8 meses mediante contenido editorial.",
  },
  {
    id: "social-04",
    title: "Lanzamiento App",
    tags: ["Product Launch", "Social Strategy"],
    description: "Estrategia de lanzamiento en redes para aplicación fintech. Plan de contenidos pre y post-lanzamiento con influencers y piezas animadas.",
  },
  {
    id: "social-05",
    title: "Brand Takeover",
    tags: ["TikTok", "Reels", "Viral Content"],
    description: "Estrategia de contenido viral para marca de bebidas. Serie de videos cortos que alcanzaron 2M de views orgánicos en TikTok e Instagram.",
  },
  {
    id: "social-06",
    title: "Awareness ONG",
    tags: ["Cause Marketing", "Social Impact"],
    description: "Campaña de concientización para fundación ambiental. Contenido storytelling en formato carrusel y video corto para Instagram y LinkedIn.",
  },
];

export default function SocialPage() {
  return (
    <SectionPageTemplate
      title="Social"
      gradient="linear-gradient(to bottom, #0d0907, #1e3a5f)"
      accentColor="#4a8fd4"
      works={works}
    />
  );
}
