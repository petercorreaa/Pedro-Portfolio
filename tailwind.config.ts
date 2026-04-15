import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0d0907",
        },
        text: {
          primary: "#f7f5f1",
        },
        accent: "#e8e0f5",
        section: {
          branding: "#1a4d2e",
          visual:   "#7a2e0e",
          social:   "#1e3a5f",
          uxui:     "#3b1f6b",
        },
      },
      fontFamily: {
        display: ["AkiraExpanded", "sans-serif"],
        sans:    ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gradient-branding": "linear-gradient(to bottom, #0d0907, #1a4d2e)",
        "gradient-visual":   "linear-gradient(to bottom, #0d0907, #7a2e0e)",
        "gradient-social":   "linear-gradient(to bottom, #0d0907, #1e3a5f)",
        "gradient-uxui":     "linear-gradient(to bottom, #0d0907, #3b1f6b)",
      },
    },
  },
  plugins: [],
};
export default config;
