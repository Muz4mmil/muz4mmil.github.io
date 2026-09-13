# muz4mmil.github.io

Personal portfolio. Next.js (App Router) + TypeScript + Tailwind + framer-motion.
Single page composed of `app/sections/{hero,about,projects,contact}.tsx`, with
content in `app/data/*.json`.

## Design — read this before writing any UI

**[docs/DESIGN.md](docs/DESIGN.md) is the binding design spec for this repo.**
Read it in full before adding a section, restyling one, or making any visual
change. It was derived from the reference set the site is modelled on, and the
goal is an exact match to that design pattern — not an interpretation of it.

Quick orientation (the spec has the detail and the rationale):

- **Monochrome only.** No accent colour, no gradients, no shadows on cards.
  Use the `ink` / `ink-muted` / `body` / `meta` / `hairline` / `line` / `surface`
  tokens in `tailwind.config.ts`; never `#000`.
- **Three weights: 400 / 500 / 700.** `italic`, `font-extralight` and
  `font-black` are banned.
- **Two-tone headlines** are the signature: one `ink` half, one `ink-muted`
  half, same size and weight. Exactly one split per headline.
- **Display type is tight** — negative tracking, line-height ≤ 1.0. Use the
  `display-xl` / `display-l` / `display-m` classes.
- **Buttons are pills with a trailing arrow.** `btn-primary` (solid, h-14),
  `btn-secondary` (outlined, h-11), `btn-icon` (circle, h-11 w-11).
- **Media cards** are a flat `surface` rectangle at `rounded-media` (24px) with
  the caption *outside and below* — bold title over a grey descriptor.
- **Forms use underline inputs** (`.field`), never boxed ones.
- **Radii:** pill, 24px, 16px. Nothing else.
- Left-align everything. Never centre a display headline.
- Reuse the existing framer-motion vocabulary (masked line reveal, wipe panel,
  fade-up, `viewport={{ once: true }}`) rather than inventing new effects.

Shared primitives live in `app/globals.css` under `@layer components`
(`.shell`, `.display-*`, `.eyebrow`, `.caps`, `.btn-*`, `.chip*`, `.media-card`,
`.field`, `.row-divided`). Prefer them over re-deriving utility strings.

`docs/DESIGN.md` §5 lists the anti-patterns to check against before shipping,
and §6 tracks the known deltas between the current code and the spec.
