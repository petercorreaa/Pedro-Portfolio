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
    description: "Identity systems, logos & visual language.",
    gradient:    "from-[#0d0907] to-[#1a4d2e]",
    color:       "#1a4d2e",
    tint:        "#3db56a",
    href:        "/branding",
  },
  {
    id:          "visual",
    label:       "Visual",
    description: "Photography, motion & art direction.",
    gradient:    "from-[#0d0907] to-[#7a2e0e]",
    color:       "#7a2e0e",
    tint:        "#f07a3a",
    href:        "/visual",
  },
  {
    id:          "social",
    label:       "Social",
    description: "Content, campaigns & community strategy.",
    gradient:    "from-[#0d0907] to-[#1e3a5f]",
    color:       "#1e3a5f",
    tint:        "#4a8fd4",
    href:        "/social",
  },
  {
    id:          "uxui",
    label:       "UX/UI",
    description: "Interfaces, prototypes & user flows.",
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
  description: string;
  files:       MediaFile[];
  url?:        string;
}

const img = (src: string): MediaFile => ({ type: "image", src });
const vid = (src: string): MediaFile => ({ type: "video", src });

export const WORK: Record<"branding" | "visual" | "social" | "uxui", WorkItem[]> = {
  branding: [
    {
      id:          "nadal-frola",
      title:       "Nadal | Frola",
      tags:        ["Brand Identity", "Motion", "Art Direction"],
      description: "Visual identity system with static and motion pieces. Typographic exploration and art direction for a contemporary brand.",
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
      description: "Complete brand identity for Techo Max. Application design, color palette, and coherent visual system across multiple pieces.",
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
      description: "Visual exploration and digital composition. A conceptual piece playing with atmosphere, texture, and light.",
      files: [img("/work/visual/anywhere-iiwu.png")],
    },
    {
      id:          "create-the-scene",
      title:       "Create the Scene",
      tags:        ["Digital Art", "Composition"],
      description: "AI-driven composition and concept exploration. The idea comes first, the tool follows.",
      files: [img("/work/visual/create-the-scene.jpg")],
    },
    {
      id:          "exodus",
      title:       "Exodus",
      tags:        ["Digital Art", "Concept"],
      description: "Conceptual piece. Exploration of movement, transformation, and displacement through digital visual language.",
      files: [img("/work/visual/exodus.png")],
    },
    {
      id:          "ice-ball",
      title:       "Ice Ball Co.",
      tags:        ["Product Visual", "3D"],
      description: "Product visualization for Ice Ball Co. Study of materials, reflections, and light on cold surfaces.",
      files: [img("/work/visual/ice-ball.png")],
    },
    {
      id:          "liquido-blue-glass",
      title:       "REACTIVE",
      tags:        ["Digital Art", "3D"],
      description: "Art direction and rendering for Líquido Blue Glass. Work on transparencies, refractions, and cool tones.",
      files: [img("/work/visual/liquido-blue-glass.png")],
    },
    {
      id:          "mediterranean-tale",
      title:       "Mediterranean Tale",
      tags:        ["Digital Art", "Concept"],
      description: "Mediterranean visual story. Warm palette, unhurried atmosphere, and art direction inspired by the south.",
      files: [img("/work/visual/mediterranean-tale.png")],
    },
    {
      id:          "wacha",
      title:       "Wacha",
      tags:        ["Poster", "Illustration"],
      description: "Graphic piece. Composition, typography, and color for an expressive visual image.",
      files: [img("/work/visual/wacha.png")],
    },
  ],

  social: [
    {
      id:          "bkb",
      title:       "BKB",
      tags:        ["Social Media", "Motion", "Content"],
      description: "Content direction for BKB. Static pieces and animation integrated into a coherent narrative for social media.",
      files: [
        img("/work/social/bkb/bkb1.png"),
        vid("/work/social/bkb/bkb-animacion.mp4"),
      ],
    },
    {
      id:          "getyn",
      title:       "Getyn",
      tags:        ["Social Media", "Content"],
      description: "Content design for Getyn. Visual piece developed for social media communication.",
      files: [img("/work/social/getyn/getyn1.png")],
    },
  ],

  uxui: [
    {
      id:          "malvec-website",
      title:       "MALVEC STUDIO",
      tags:        ["UX/UI", "Web Design", "Mockup"],
      description: "Design and mockup for the Malvec Studio website. Interface exploration, navigation flow, and visual presentation of the studio.",
      url:         "https://malvec.studio/",
      files: [
        vid("/work/uxui/MALVEC-WEBSITE-MOCKUP.mp4"),
      ],
    },
  ],
};
