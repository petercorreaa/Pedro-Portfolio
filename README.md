# Pedro Correa — Creative Portfolio

A high-end designer portfolio built with modern web technologies. Features a dark glassmorphism aesthetic with smooth animations, a custom cursor, and section-specific color systems for Branding, Visual, Social, and UX/UI work.

## Stack

| Tool | Version | Role |
|------|---------|------|
| [Next.js](https://nextjs.org) | 14 | Framework (App Router) |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animations & transitions |

## Features

- **Preloader** — "PC" monogram with expanding accent line on first visit (session-based)
- **Custom cursor** — Dot + spring-lagged ring that changes color per hovered section
- **Page transitions** — Fade + slide via `AnimatePresence` on every route change
- **Scroll animations** — `whileInView` entrance on all work cards and section columns
- **Text scramble** — Glitch effect on section titles at hover (600 ms, resolves left-to-right)
- **Magnetic buttons** — Mouse-proximity pull on CTAs and nav links via `useSpring`
- **Glassmorphism** — `backdrop-blur` panels throughout (navbar, cards, modals, mobile menu)
- **Section gradients** — Each of the 4 sections has a unique vertical gradient and accent color
- **Project modal** — Fullscreen overlay with 3-slide image carousel per work item
- **Responsive** — Mobile-first layout from 320 px to 1440 px+

## Local Setup

```bash
# 1. Clone
git clone https://github.com/petercorreaa/Pedro-Portfolio.git
cd Pedro-Portfolio

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Real Work

1. Place project images in `/public/images/`
2. Update the `works` arrays in each route page:
   - `app/branding/page.tsx`
   - `app/visual/page.tsx`
   - `app/social/page.tsx`
   - `app/uxui/page.tsx`
3. Replace `/public/images/pedro.jpg` with your portrait photo

## Project Structure

```
/app
  /branding · /visual · /social · /uxui   ← Section routes
  layout.tsx                               ← Root layout (fonts, providers)
  page.tsx                                 ← Home (Hero + SectionsGrid)
/components
  /ui
    CustomCursor.tsx    ← Spring-animated dot + ring cursor
    GlassCard.tsx       ← Work card with hover effects + modal trigger
    HeroSection.tsx     ← Full-viewport hero with portrait + CTA
    MagneticButton.tsx  ← Proximity-pull wrapper for buttons/links
    Navbar.tsx          ← Fixed glass navbar with hamburger menu
    PageTransition.tsx  ← AnimatePresence fade/slide wrapper
    Preloader.tsx       ← First-visit "PC" loading overlay
    ProjectModal.tsx    ← Fullscreen modal with image carousel
    SectionsGrid.tsx    ← 4-column navigation grid with scramble titles
  /sections
    SectionPageTemplate.tsx   ← Reusable page template for all 4 sections
/lib
  constants.ts          ← SECTIONS + NAV_LINKS data
  cursor-context.tsx    ← React context for cursor color state
/styles
  globals.css           ← Design tokens, keyframes, component classes
```

## Build

```bash
npm run build
```
