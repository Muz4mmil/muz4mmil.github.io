# muz4mmil.github.io

Personal portfolio of **Muzammil Siddiqui**, full stack developer.

A single-page site with four sections (Home, About, Projects, Contact) in a monochrome, editorial style: oversized tight headlines, two-tone ink/grey type, pill buttons and flat grey media cards.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) with design tokens in `tailwind.config.ts`
- [framer-motion](https://www.framer.com/motion/) for scroll reveals
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [lucide-react](https://lucide.dev) icons, [Devicon](https://devicon.dev) skill logos (self-hosted SVGs)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks)
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin (defaults to `https://muz4mmil.github.io`). It is used for the canonical URL, Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml`.

## Project structure

```
app/
  page.tsx              Server component composing the sections
  layout.tsx            Fonts, metadata, Lenis smooth-scroll root
  components/
    nav.tsx             Fixed nav + mobile menu (client)
    json-ld.tsx         schema.org Person / WebSite / ProfilePage graph
  sections/             hero, about, projects, contact
  data/                 projects.json, skills.json, journey.json
  lib/
    site.ts             Name, contact details, socials, SEO copy (one source of truth)
    use-section-scroll.ts  Smooth #anchor scrolling through Lenis
  opengraph-image.tsx   Generated social share card
  robots.ts, sitemap.ts
public/
  projects/             Project screenshots
  skills/               Skill icons (SVG)
docs/DESIGN.md          The binding design spec — read before any visual change
```

## Editing content

Most updates don't need code changes:

| To change… | Edit |
|---|---|
| Projects | `app/data/projects.json` (`imageFit`: `cover` for photos, `contain` for device mockups) |
| Experience & education | `app/data/journey.json` |
| Skills | `app/data/skills.json` (icon = path to an SVG in `public/skills/`) |
| Name, email, socials, SEO title/description | `app/lib/site.ts` |
| Résumé | replace `public/Resume-Muzammil.pdf` |

## Design

All visual work follows [`docs/DESIGN.md`](docs/DESIGN.md). It covers the colour tokens, type scale, components, motion vocabulary and the anti-patterns to check before shipping.
