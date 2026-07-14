# Matveyan Studio — Video Editor & Colorist Portfolio

A cinematic, dark-themed portfolio website for a video editor / colorist, built as a **React frontend-only** app (no backend, no database, no APIs). All content is static/local — driven by data files or hardcoded components.

---

## 🎬 Concept

A moody, high-contrast portfolio with a "creative studio dashboard" aesthetic — monospace UI labels, terminal-style micro-copy (`SCROLL_TO_ENTER`, `GRID_COORD [X: 1140 // Y: 0216]`), a teal/green accent color, and full-bleed cinematic background imagery/video.

**Tagline:** *"Crafting High Fidelity Motion"*
**Subtext:** Specializing in cinematic video editing, advanced color grading, sound design, and post-production workflows that bridge the gap between raw footage and high-impact visual storytelling.

---

## 🧱 Tech Stack

- **React + TypeScript** (`.tsx`)
- **Vite** — dev server & build tool (`vite.config.ts`)
- **Tailwind CSS** — utility-first styling to match the dark/mono aesthetic
- **Framer Motion** — for scroll animations, hover states, page transitions
- **Lucide React** (or React Icons) — for GitHub/LinkedIn/Twitter/social icons
- No backend — content lives in local `.ts`/`.json` data files
- Contact form (if included) uses a static form service like **Formspree** or a `mailto:` link (still no custom backend)

---

## 📁 Actual Folder Structure

This matches the current repo layout (Vite + React + TypeScript):

```
animated/
├── public/
│   └── assets/
│       └── silver-knight/        # background/hero images used in the design
├── src/
│   ├── components/                # all UI section components (Navbar, Hero, etc.)
│   ├── App.tsx                    # root component, composes all sections
│   ├── main.tsx                   # React entry point (mounts <App /> to DOM)
│   └── index.css                  # global styles / Tailwind directives
├── .env.example                   # placeholder for any env vars (no backend, so likely unused/minimal)
├── .gitignore
├── index.html                     # Vite HTML entry
├── metadata.json                  # project metadata (used by AI Studio tooling if applicable)
├── package.json
├── package-lock.json
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite build config
└── README.md
```

> Note: this project uses **.tsx** (TypeScript + React), not plain `.jsx` — so all components should be typed. Since there's no backend, `.env.example` will mostly hold things like a public form endpoint (e.g. Formspree ID) if you add a contact form, not any secret keys.

### Recommended `src/components/` breakdown

```
src/components/
├── Navbar.tsx
├── Hero.tsx
├── AvailabilityBadge.tsx
├── WorkSection.tsx
├── ExperienceSection.tsx
├── SkillsSection.tsx
├── ProjectsSection.tsx
├── InfoSection.tsx
├── Footer.tsx
└── ScrollIndicator.tsx
```

---

## 🗂️ Sections (from the design)

1. **Navbar**
   - Logo: `MATVEYAN . STUDIO` (with live status dot)
   - Nav links: `01 // WORK`, `02 // EXPERIENCE`, `03 // SKILLS`, `04 // PROJECTS`, `05 // INFO`
   - Social icons: GitHub, LinkedIn, Twitter/X
   - CTA button: `INITIATE_COMMS ↗` (scrolls to / opens contact)

2. **Hero**
   - Status badge: `AVAILABLE FOR SELECT PROJECTS // 2026`
   - Eyebrow label: `[ 00 // VIDEO EDITOR & COLORIST ]`
   - Headline: `CRAFTING HIGH FIDELITY MOTION` (last word in accent teal)
   - Description paragraph
   - Primary CTA button: `EXPLORE_REEL`
   - Secondary status text: `// ACTIVE_CELL: EDIT_SUITE_ONLINE`
   - Background: full-bleed cinematic image or looping muted video
   - Decorative HUD text in corners: `SCROLL_TO_ENTER`, `VIEWPORT_SCROLL 000%`, `GRID_COORD [ X: 1140 // Y: 0216 ]`

3. **Work / Reel** — embedded showreel video or grid of edited clips
4. **Experience** — timeline of roles/clients
5. **Skills** — editing software, color grading tools, sound design, codecs/workflow
6. **Projects** — case-study style cards (thumbnail, title, role, tools used, link to Vimeo/YouTube)
7. **Info / Contact** — bio, contact CTA, social links

---

## ⚙️ Setup Instructions

The project already exists (Vite + React + TS scaffold). To run it locally:

```bash
# 1. Clone the repo
git clone https://github.com/Yashxt/animated.git
cd animated

# 2. Install dependencies
npm install

# 3. Copy env example (only needed if you add a form endpoint etc.)
cp .env.example .env

# 4. Start dev server
npm run dev

# 5. Build for production
npm run build
```

If Tailwind, Framer Motion, or Lucide aren't installed yet, add them with:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion lucide-react
```

### Tailwind config essentials
- Add a monospace font (e.g. `JetBrains Mono`, `Space Mono`, or `IBM Plex Mono`) via Google Fonts
- Extend theme with a teal/green accent color (e.g. `#3ee6b0` / `#2dd4bf`)
- Dark background base: near-black (`#0a0a0a` / `#0d0d0d`)

---

## 🎨 Design Notes

| Element | Style |
|---|---|
| Background | Full-bleed cinematic photo/video with dark overlay for text contrast |
| Typography | Bold sans-serif for headline, monospace for labels/HUD text |
| Accent color | Teal/mint green (`#3ee6b0`) for highlights, status dots, links |
| Buttons | Solid white "primary" button, outlined/ghost teal "secondary" button |
| Micro-copy | Terminal/HUD-style labels in uppercase, small letter-spacing |
| Motion | Subtle fade/slide-in on scroll (Framer Motion `whileInView`) |

---

## 🚀 Deployment

Since this is a static frontend-only React app, it deploys easily to:
- **Vercel** (recommended, zero-config for Vite/React)
- **Netlify**
- **GitHub Pages**

```bash
npm run build
# then deploy the /dist folder
```

---

## ✅ To-Do / Content Checklist

- [ ] Replace placeholder hero background with your own footage/photo
- [ ] Add showreel video (YouTube/Vimeo embed or self-hosted mp4)
- [ ] Fill in `data/projects.js` with real case studies
- [ ] Fill in `data/experience.js` with real work history
- [ ] Fill in `data/skills.js` with your actual tools (Premiere, DaVinci Resolve, After Effects, etc.)
- [ ] Add real social links (GitHub, LinkedIn, Twitter/X)
- [ ] Set up contact CTA (mailto link or Formspree form)
- [ ] Add favicon and page metadata (title, OG tags)
- [ ] Test responsiveness on mobile
