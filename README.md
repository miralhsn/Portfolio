# Miral Hasan — AI Software Engineer Portfolio

A production-ready personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Designed with a modern AI SaaS aesthetic.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env` if you want to override the default public profile links and contact email.

```bash
cp .env.example .env
```

## Importing into Replit

1. Create a new Replit project → select **"Import from GitHub"** or **"Blank Repl (Node.js)"**
2. Upload/paste this project's files
3. In the Replit shell, run:
   ```bash
   npm install
   npm run dev
   ```
4. Replit will expose a public URL automatically

> Tip: Set the run command in `.replit` to `npm run dev` and the port to `3000`.

## Deploying on Vercel

### Option A — GitHub (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import the GitHub repo
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** — done in ~60 seconds

If you want a clean GitHub repo first, make sure `.env` only contains public values or replace it with your own details before pushing.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel
```

## Customization

| What to change | File |
|---|---|
| Name, title, bio | `src/components/sections/Hero.tsx`, `About.tsx` |
| Experience entries | `src/components/sections/Experience.tsx` |
| Projects | `src/components/sections/Projects.tsx` |
| Skills | `src/components/sections/Skills.tsx` |
| Contact email | `src/components/sections/Contact.tsx` |
| Color palette | `tailwind.config.ts` |
| SEO metadata | `src/app/layout.tsx` |

## Color System

```
Background : #050816
Primary    : #6366F1  (Indigo)
Accent     : #22D3EE  (Cyan)
Highlight  : #A855F7  (Purple)
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Home page (assembles sections)
│   └── globals.css       # Global styles + Tailwind base
├── components/
│   ├── Navbar.tsx        # Sticky responsive navbar
│   ├── Footer.tsx        # Simple footer
│   └── sections/
│       ├── Hero.tsx        # Hero + floating cards
│       ├── About.tsx       # About + stat cards
│       ├── Experience.tsx  # Animated timeline
│       ├── Projects.tsx    # Project cards grid
│       ├── Skills.tsx      # Skill category grid
│       ├── Achievements.tsx # Research / certs / hackathons
│       └── Contact.tsx     # Contact CTA
└── lib/
    └── utils.ts          # cn() helper
```
