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
    color:       "#1a4d2e",   // gradient endpoint (dark)
    tint:        "#3db56a",   // lighter version for hover title
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
