import type { Localized } from "@/lib/i18n";

export const NAV_LINKS = [
  { label: "Branding", href: "/branding" },
  { label: "Visual",   href: "/visual"   },
  { label: "Social",   href: "/social"   },
  { label: "UX/UI",    href: "/uxui"     },
];

export const SECTIONS = [
  {
    id:          "branding",
    label:       "Branding",
    description: {
      en: "Identity systems, logos & visual language.",
      es: "Sistemas de identidad, logotipos y lenguaje visual.",
    },
    gradient:    "from-[#0d0907] to-[#1a4d2e]",
    color:       "#1a4d2e",
    tint:        "#3db56a",
    href:        "/branding",
  },
  {
    id:          "visual",
    label:       "Visual",
    description: {
      en: "Photography, motion & art direction.",
      es: "Fotografía, animación y dirección de arte.",
    },
    gradient:    "from-[#0d0907] to-[#7a2e0e]",
    color:       "#7a2e0e",
    tint:        "#f07a3a",
    href:        "/visual",
  },
  {
    id:          "social",
    label:       "Social",
    description: {
      en: "Content, campaigns & community strategy.",
      es: "Contenido, campañas y estrategia de comunidad.",
    },
    gradient:    "from-[#0d0907] to-[#1e3a5f]",
    color:       "#1e3a5f",
    tint:        "#4a8fd4",
    href:        "/social",
  },
  {
    id:          "uxui",
    label:       "UX/UI",
    description: {
      en: "Interfaces, prototypes & user flows.",
      es: "Interfaces, prototipos y flujos de usuario.",
    },
    gradient:    "from-[#0d0907] to-[#3b1f6b]",
    color:       "#3b1f6b",
    tint:        "#9b6bff",
    href:        "/uxui",
  },
];

export type MediaType = "image" | "video";

export interface MediaFile {
  type: MediaType;
  src:  string;
}

export interface WorkItem {
  id:          string;
  title:       string;
  tags:        string[];
  description: Localized;
  files:       MediaFile[];
  url?:        string;
}

const img = (src: string): MediaFile => ({ type: "image", src });
const vid = (src: string): MediaFile => ({ type: "video", src });

export const WORK: Record<"branding" | "visual" | "social" | "uxui", WorkItem[]> = {
  branding: [
    {
      id:          "shyfts",
      title:       "SHYFTS",
      tags:        ["Brand Identity", "Motion Graphics", "Sports Tech"],
      description: {
        en: "Brand identity for Shyfts, an Argentine platform for booking sports courts fast and easy. Professional, trustworthy, and dynamic: tech and sport in one brand.",
        es: "Identidad de marca para Shyfts, plataforma argentina para reservar canchas de forma fácil y rápida. Profesional, confiable y dinámica: tecnología y deporte en una marca.",
      },
      files: [
        vid("/work/branding/shyfts/shyfts-branding.mp4"),
      ],
    },
    {
      id:          "malvec-studio",
      title:       "MALVEC STUDIO",
      tags:        ["Brand Identity", "Motion Graphics"],
      description: {
        en: "Brand identity for Malvec Studio presented through motion graphics. Logo, typography, and color brought to life in an animated piece.",
        es: "Identidad de marca para Malvec Studio presentada a través de motion graphics. Logo, tipografía y color cobran vida en una pieza animada.",
      },
      files: [
        vid("/work/branding/malvec-studio/malvec-branding.mp4"),
      ],
    },
    {
      id:          "nadal-frola",
      title:       "Nadal | Frola",
      tags:        ["Brand Identity", "Motion", "Art Direction"],
      description: {
        en: "Visual identity system with static and motion pieces. Typographic exploration and art direction for a contemporary brand.",
        es: "Sistema de identidad visual con piezas estáticas y animadas. Exploración tipográfica y dirección de arte para una marca contemporánea.",
      },
      files: [
        img("/work/branding/nadal-frola/nf1.jpg"),
        img("/work/branding/nadal-frola/nf4.jpg"),
        img("/work/branding/nadal-frola/nf7.png"),
        img("/work/branding/nadal-frola/nf8.png"),
        vid("/work/branding/nadal-frola/nf5.mp4"),
        vid("/work/branding/nadal-frola/nf6.mp4"),
      ],
    },
    {
      id:          "techo-max",
      title:       "Techo Max",
      tags:        ["Brand Identity", "Print", "Visual System"],
      description: {
        en: "Complete brand identity for Techo Max. Application design, color palette, and coherent visual system across multiple pieces.",
        es: "Identidad de marca completa para Techo Max. Diseño de aplicaciones, paleta de color y un sistema visual coherente en múltiples piezas.",
      },
      files: [
        img("/work/branding/techo-max/tm1.jpg"),
        img("/work/branding/techo-max/tm2.jpg"),
        img("/work/branding/techo-max/tm3.jpg"),
        img("/work/branding/techo-max/tm4.jpg"),
        img("/work/branding/techo-max/tm5.jpg"),
        img("/work/branding/techo-max/tm6.jpg"),
        img("/work/branding/techo-max/tm7.jpg"),
      ],
    },
  ],

  visual: [
    {
      id:          "anywhere-iiwu",
      title:       "Anywhere IIWU",
      tags:        ["Digital Art", "Composition"],
      description: {
        en: "Visual exploration and digital composition. A conceptual piece playing with atmosphere, texture, and light.",
        es: "Exploración visual y composición digital. Una pieza conceptual que juega con la atmósfera, la textura y la luz.",
      },
      files: [img("/work/visual/anywhere-iiwu.png")],
    },
    {
      id:          "create-the-scene",
      title:       "Create the Scene",
      tags:        ["Digital Art", "Composition"],
      description: {
        en: "AI-driven composition and concept exploration. The idea comes first, the tool follows.",
        es: "Composición y exploración de conceptos con IA. Primero la idea, luego la herramienta.",
      },
      files: [img("/work/visual/create-the-scene.jpg")],
    },
    {
      id:          "exodus",
      title:       "Exodus",
      tags:        ["Digital Art", "Concept"],
      description: {
        en: "Conceptual piece. Exploration of movement, transformation, and displacement through digital visual language.",
        es: "Pieza conceptual. Exploración del movimiento, la transformación y el desplazamiento a través del lenguaje visual digital.",
      },
      files: [img("/work/visual/exodus.png")],
    },
    {
      id:          "ice-ball",
      title:       "Ice Ball Co.",
      tags:        ["Product Visual", "3D"],
      description: {
        en: "Product visualization for Ice Ball Co. Study of materials, reflections, and light on cold surfaces.",
        es: "Visualización de producto para Ice Ball Co. Estudio de materiales, reflejos y luz sobre superficies frías.",
      },
      files: [img("/work/visual/ice-ball.png")],
    },
    {
      id:          "liquido-blue-glass",
      title:       "REACTIVE",
      tags:        ["Digital Art", "3D"],
      description: {
        en: "Art direction and rendering for Líquido Blue Glass. Work on transparencies, refractions, and cool tones.",
        es: "Dirección de arte y render para Líquido Blue Glass. Trabajo con transparencias, refracciones y tonos fríos.",
      },
      files: [img("/work/visual/liquido-blue-glass.png")],
    },
    {
      id:          "mediterranean-tale",
      title:       "Mediterranean Tale",
      tags:        ["Digital Art", "Concept"],
      description: {
        en: "Mediterranean visual story. Warm palette, unhurried atmosphere, and art direction inspired by the south.",
        es: "Historia visual mediterránea. Paleta cálida, atmósfera pausada y dirección de arte inspirada en el sur.",
      },
      files: [img("/work/visual/mediterranean-tale.png")],
    },
    {
      id:          "wacha",
      title:       "Wacha",
      tags:        ["Poster", "Illustration"],
      description: {
        en: "Graphic piece. Composition, typography, and color for an expressive visual image.",
        es: "Pieza gráfica. Composición, tipografía y color para una imagen visual expresiva.",
      },
      files: [img("/work/visual/wacha.png")],
    },
  ],

  social: [
    {
      id:          "bkb",
      title:       "BKB",
      tags:        ["Social Media", "Motion", "Content"],
      description: {
        en: "Content direction for BKB. Static pieces and animation integrated into a coherent narrative for social media.",
        es: "Dirección de contenido para BKB. Piezas estáticas y animación integradas en una narrativa coherente para redes sociales.",
      },
      files: [
        img("/work/social/bkb/bkb1.png"),
        vid("/work/social/bkb/bkb-animacion.mp4"),
      ],
    },
    {
      id:          "getyn",
      title:       "Getyn",
      tags:        ["Social Media", "Content"],
      description: {
        en: "Content design for Getyn. Visual piece developed for social media communication.",
        es: "Diseño de contenido para Getyn. Pieza visual desarrollada para la comunicación en redes sociales.",
      },
      files: [img("/work/social/getyn/getyn1.png")],
    },
  ],

  uxui: [
    {
      id:          "malvec-website",
      title:       "MALVEC STUDIO",
      tags:        ["UX/UI", "Web Design", "Mockup"],
      description: {
        en: "Design and mockup for the Malvec Studio website. Interface exploration, navigation flow, and visual presentation of the studio.",
        es: "Diseño y mockup del sitio web de Malvec Studio. Exploración de interfaz, flujo de navegación y presentación visual del estudio.",
      },
      url:         "https://malvec.studio/",
      files: [
        vid("/work/uxui/MALVEC-WEBSITE-MOCKUP.mp4"),
      ],
    },
  ],
};
