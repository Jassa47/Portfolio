# Akaaljot Singh Mathoda — Portfolio

A cinematic, space-themed portfolio built with **Next.js 14**, **Framer Motion**, **Three.js**, and **Tailwind CSS**. Inspired by Resend.com's dark minimalism fused with a deep-space aesthetic.

Live at: [add-your-own-vercel-url.vercel.app](https://portfolio-yp15.vercel.app/)

## Features

- **Three.js starfield** with parallax depth and shooting stars (desktop) / CSS twinkle stars (mobile)
- **3D project cards** with perspective tilt and spotlight cursor tracking
- **Typewriter hero** with custom character-by-character animation
- **Magnetic contact buttons** that physically attract toward your cursor
- **Custom comet cursor** with physics-based trailing (desktop only)
- **Glassmorphism navbar** with scroll blur and animated section indicator
- **Scroll-triggered reveals** with staggered spring physics
- **Live GitHub stats** — repos, contributions, current streak, max streak (auto-updates daily)
- **Hybrid project cards** — manual projects enriched with GitHub data, new repos auto-appear
- **Cinematic page loader** with phased reveal animation
- **Nebula background** with floating color blobs and grain overlay
- **Mobile optimized** — lightweight effects, no lag on phones
- **Fully responsive** mobile-first design

## Tech Stack

- **Framework:** Next.js 14 (App Router, ISR)
- **UI:** React 18, Tailwind CSS 3.4
- **Animation:** Framer Motion 11
- **3D:** Three.js, @react-three/fiber
- **Data:** GitHub GraphQL + REST API
- **Deployment:** Vercel (auto-deploys on push, rebuilds daily)

## Getting Started
```bash
git clone https://github.com/Jassa47/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Open http://localhost:3000

## GitHub Integration

The portfolio fetches live data from GitHub every 24 hours via ISR:

- **Repository count** from your profile
- **Total contributions** this year
- **Current streak** and **max streak** from contribution calendar
- **Primary language** per repo auto-populates project cards
- **New repos** with descriptions auto-appear as project cards

### Setup

1. Generate a GitHub Personal Access Token: github.com → Settings → Developer settings → Personal access tokens
2. Select scopes: `read:user` and `repo`
3. Create `.env.local` in the project root: 
GITHUB_TOKEN=your_token_here
GITHUB_USERNAME=your_username_here
4. For Vercel: add the same variables in Project → Settings → Environment Variables

## Customization

All personal content lives in `src/data/portfolio.js`. Edit that single file to update your info, projects, experience, and education.

To hide a repo from auto-appearing, add its name to the `excludeRepos` array in `portfolio.js`.

Drop your resume PDF into `public/Akaaljot_Resume.pdf` for the navbar resume link.

## Project Structure

src/
app/
globals.css          — Theme, glass cards, nebula bg, utilities
layout.jsx           — Root layout with SEO metadata and favicon
page.jsx             — Server component with GitHub data fetching
components/
HomeContent.jsx      — Client wrapper composing all sections
Loader.jsx           — Cinematic page load animation
StarField.jsx        — Three.js (desktop) / CSS (mobile) starfield
CustomCursor.jsx     — Comet trail cursor (desktop only)
SectionReveal.jsx    — Scroll-triggered reveal wrapper
Navbar.jsx           — Glassmorphism nav with section tracking
Hero.jsx             — Typewriter name and CTA
About.jsx            — Bio, live GitHub stat counters, tech stack
ProjectCard.jsx      — 3D tilt card with spotlight
Projects.jsx         — Bento grid layout
Experience.jsx       — Timeline (work, education, certs)
Contact.jsx          — Magnetic link buttons
Footer.jsx           — Social links and back-to-top
data/
portfolio.js         — All resume content and project overrides
lib/
github.js            — GitHub API utility (stats + repo fetching)
hooks/
useMousePosition.js  — Mouse tracking hook
useCounter.js        — Animated counter hook

## Deploy to Vercel

1. Push code to GitHub
2. Go to vercel.com/new
3. Import the Portfolio repo
4. Add environment variables: `GITHUB_TOKEN` and `GITHUB_USERNAME`
5. Click Deploy

Site auto-redeploys on every push and refreshes GitHub data every 24 hours.

## License

MIT
