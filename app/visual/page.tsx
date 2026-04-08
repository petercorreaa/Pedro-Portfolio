import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import type { Work } from "@/components/ui/GlassCard";

const works: Work[] = [
  {
    id: "visual-01",
    title: "Luz del Norte",
    tags: ["Photography", "Art Direction"],
    description: "Serie fotográfica documental en la Patagonia. Exploración de paisajes extremos y comunidades rurales con cámara analógica de medio formato.",
  },
  {
    id: "visual-02",
    title: "Cuerpos en Tránsito",
    tags: ["Editorial", "Photography"],
    description: "Campaña editorial para revista de moda independiente. Conceptualización, dirección de arte y fotografía en locaciones urbanas.",
  },
  {
    id: "visual-03",
    title: "Abstrakta",
    tags: ["Illustration", "Digital Art"],
    description: "Serie de ilustraciones digitales exploradas desde la abstracción geométrica. Publicadas en colección limitada impresa en risografía.",
  },
  {
    id: "visual-04",
    title: "Motion Loops",
    tags: ["Motion Graphics", "Loop Art"],
    description: "Pack de animaciones loopables para marca de entretenimiento digital. Diseñadas para uso en redes sociales y señalética digital.",
  },
  {
    id: "visual-05",
    title: "Retrato Colectivo",
    tags: ["Portrait", "Photography"],
    description: "Proyecto de retratos para ONG cultural. 40 retratos que documentan artistas emergentes de América Latina.",
  },
  {
    id: "visual-06",
    title: "Typeworks Vol. 1",
    tags: ["Typography", "Lettering"],
    description: "Exploración tipográfica y lettering manual para colección de pósters de edición limitada. Combinación de técnicas digitales y análogas.",
  },
];

export default function VisualPage() {
  return (
    <SectionPageTemplate
      title="Visual"
      gradient="linear-gradient(to bottom, #0d0907, #7a2e0e)"
      accentColor="#f07a3a"
      works={works}
    />
  );
}
