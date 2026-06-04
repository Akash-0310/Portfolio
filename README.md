# Akash Singh — Developer Portfolio

Ultra-premium cinematic developer portfolio built with Next.js 16, TypeScript, Framer Motion, and Tailwind CSS v4.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React + custom SVG brand icons |
| Fonts | Geist Sans + Geist Mono |

## Features

- Cinematic loading screen with animated progress bar
- Custom cursor with magnetic hover effects (desktop only)
- Command palette (`Ctrl/Cmd + K`) with keyboard navigation
- Smooth section navigation
- Interactive hero with typewriter role cycling and floating tech badges
- Animated stats with count-up on scroll
- Experience timeline with expandable accordion cards
- Skills constellation with category switching and orbit visualization
- Project showcase with cinematic modal case studies
- GitHub stats dashboard with contribution heatmap
- Contact form with success state animation
- Scroll progress bar in navigation
- Glassmorphism panels throughout
- Mouse-reactive lighting effects
- Mobile responsive with adaptive navigation

## Sections

1. **Hero** — Cinematic intro with typewriter, floating tech elements
2. **About** — Story-driven bio, animated stats, work philosophy
3. **Experience** — TCS + BestPeers accordion timeline
4. **Skills** — Category-switching with orbit visualization
5. **Projects** — Simhealth + MoonLight with modal case studies
6. **Testimonials** — Glass testimonial cards
7. **GitHub Stats** — Contribution heatmap + language breakdown
8. **Blog** — Engineering insight cards
9. **Contact** — Animated form with social links

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

All content lives in **one file**: `src/lib/data.ts`

Update these exports to personalize:
- `siteConfig` — name, email, phone, bio, social links
- `roles` — typewriter cycling titles
- `experience` — work history with highlights and tech
- `projects` — project details with metrics and features
- `skills` — categorized skill sets with proficiency levels
- `stats` — hero stats (years, projects, etc.)
- `blogPosts` — blog article cards
- `testimonials` — social proof cards

## Deploy to Vercel

```bash
# Option 1: Vercel dashboard
# Push to GitHub → import on vercel.com → deploy

# Option 2: Vercel CLI
npm install -g vercel
vercel --prod
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with SEO metadata
│   ├── page.tsx         # Main page — assembles all sections
│   └── globals.css      # Design system: CSS vars, animations, utilities
├── components/
│   ├── effects/         # Visual: cursor, particles, grid backgrounds
│   ├── layout/          # Navbar (with scroll progress), Footer
│   ├── sections/        # All 9 page sections
│   ├── special/         # Loading screen, command palette
│   └── ui/              # Badge, Button, GlassCard, SectionHeader, icons
├── hooks/
│   ├── useMousePosition # Throttled mouse tracking for reactive effects
│   └── useInView        # Intersection observer wrapper
└── lib/
    ├── data.ts          # All portfolio content (single source of truth)
    ├── animations.ts    # Framer Motion presets (fadeInUp, stagger, etc.)
    └── utils.ts         # cn(), clamp(), lerp()
```

## License

MIT — free to use and customize.
