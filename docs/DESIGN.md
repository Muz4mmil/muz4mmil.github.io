# Design Language — muz4mmil.github.io

The single source of truth for how this portfolio looks. Derived from the
"showcasy"-style editorial reference set. **Every new section and every edit to an
existing section must conform to this document.** When a decision isn't covered
here, choose the option that is quieter, flatter, and more typographic.

The one-line summary: **monochrome Swiss-editorial. Oversized tight grotesk
headlines, two-tone ink/grey text, pill buttons with trailing arrows, flat grey
media cards with the caption outside, hairline rules, and a lot of empty space.**

---

## 1. Foundations

### 1.1 Palette

Strictly monochrome with a cool cast. **There is no accent colour.** Colour
enters the page only through photography/product screenshots, and even those sit
grayscale until hover.

| Token | Value | Use |
|---|---|---|
| `paper` | `#FFFFFF` | Page ground. Default for every section. |
| `ink` | `#0B111A` | Headlines, primary button fill, logo. Cool near-black — **never `#000`**. |
| `ink-muted` | `#A9AFB8` | The second half of a two-tone headline. Light enough to read as a separate voice. |
| `body` | `#56606B` | Paragraphs, descriptions, quotes. |
| `meta` | `#8A9099` | Dates, roles, captions, secondary lines under a bold label. |
| `hairline` | `#E6E7EA` | 1px rules, list dividers, input underlines. |
| `line` | `#D7D9DE` | Outlined pill/chip borders. |
| `surface` | `#EFEFF1` | Media card ground (the grey rectangle mockups sit on). |
| `surface-2` | `#F5F6F7` | Chip selected state, subtle panel fills. |
| `night` | `#1C1C1C` | Optional inverted section ground. |

Rules:
- Pure black and pure `#000` shadows are banned. Use `ink`.
- No gradients anywhere — not on cards, not on buttons, not behind media. The
  reference's grey card is a **flat fill**.
- No coloured borders, no tinted states, no semantic colour (success/error uses
  weight and copy, not hue).

### 1.2 Typography

Typeface: **Geist Sans** (`font-geist`) — the closest available stand-in for the
reference's tight geometric grotesk. Geist Mono is not used in the design
language; reserve it for actual code.

Only **three weights** exist in this system. This is a hard constraint — the
reference never reaches for anything else, and extra weights are the fastest way
to break the look.

| Weight | Where |
|---|---|
| `400` regular | Body copy, eyebrows/section labels, descriptions |
| `500` medium | Buttons, nav items, small caps links, labels above inputs |
| `700` bold | All display type, card titles, list-row titles |

**Banned:** `font-extralight`, `font-thin`, `font-black`, and `italic`. Emphasis
inside a paragraph is done by stepping the colour up to `ink` at weight `500`,
never by italicising.

#### Type scale

| Role | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| **Display XL** — hero headline | `clamp(2.75rem, 8vw, 6.5rem)` | 700 | `0.95` | `-0.035em` |
| **Display L** — section headline | `clamp(2.25rem, 5.5vw, 4.5rem)` | 700 | `1.0` | `-0.03em` |
| **Display M** — sub-headline, big pull quote | `clamp(1.75rem, 3.5vw, 2.75rem)` | 700 | `1.05` | `-0.025em` |
| **Title** — card/list-row title | `1.125rem` – `1.25rem` | 700 | `1.3` | `-0.01em` |
| **Eyebrow** — section label ("About Me") | `1rem` – `1.125rem` | 400 | `1.4` | `0` |
| **Body L** — hero support paragraph | `1.125rem` | 400 | `1.55` | `0` |
| **Body** | `1rem` | 400 | `1.6` | `0` |
| **Meta** — dates, captions, roles | `0.875rem` | 400 | `1.45` | `0` |
| **Caps** — nav, social links, service rail | `0.8125rem` – `0.875rem` | 500/600 | `1.2` | `0.06em`, UPPERCASE |

Notes that matter:
- Display type is **tight**. Negative tracking and line-height under `1.0` are
  what make it read as the reference and not as a generic hero. Never let a
  display headline sit at default tracking.
- The **eyebrow is not a tiny uppercase label.** "About Me" in the reference is
  ordinary sentence-case body-size text sitting directly above the huge
  headline. The contrast between a calm 16px line and a 100px line *is* the
  hierarchy. Do not shrink it to 11px and letter-space it.
- UPPERCASE + letter-spacing is reserved for exactly three things: nav items,
  social/outbound links, and the right-hand service rail. Never for headings.

#### The two-tone headline — the signature move

Every major headline splits into an `ink` part and an `ink-muted` part.

```
Bringing your brand to life in the [digital world]      ← muted tail
Innovative designer for a [digital age]                 ← muted tail
[I'm Ivan,] a passionate designer specializing in…      ← muted head
[Say Hi!] and tell me about your idea                   ← muted head
```

Rules:
- Exactly one split per headline. Never three tones, never alternating.
- The muted part is the *phrase you could drop* — the poetic tail, or the
  self-introduction. The `ink` part carries the actual claim.
- Both parts are the same size and weight. Only colour changes.

### 1.3 Radius

| Token | Value | Use |
|---|---|---|
| pill | `9999px` | Every button, chip, tag, input, avatar |
| media | `24px` | Large media cards, photo containers, project images |
| panel | `16px` | Smaller inline media, thumbnails |

Nothing else. **No 4px/6px/8px corners, and no square corners on media.** If a
box holds an image, it is rounded.

### 1.4 Elevation & borders

- **Cards cast no shadow.** The grey media card is a flat fill with no border
  and no shadow. Depth in the reference comes from the device mockups inside the
  image asset, not from CSS.
- The only permitted shadow, for a mockup that must float free of a card:
  `0 24px 60px -24px rgba(11, 17, 26, 0.18)`. Use sparingly.
- Borders are **always 1px**, always `hairline` or `line`, never coloured, never
  doubled. They appear on: outlined pills, chips, list-row dividers, and input
  underlines. Nowhere else.

### 1.5 Spacing & whitespace

Whitespace is the most load-bearing element in this design. When in doubt, add
more.

| Relationship | Space |
|---|---|
| Page container | `max-w-[1366px]`, side padding `px-[5%]` |
| Section vertical padding | `clamp(80px, 12vw, 180px)` |
| Nav → first content | ~`120px` before the hero headline begins |
| Eyebrow → headline | `16–20px` |
| Headline → supporting paragraph | `24–32px` |
| Headline → primary CTA | `40–48px` |
| Between sub-blocks in a section | `64–96px` |
| Card grid gap | `24–32px` |
| Media card → its caption | `20–24px` |
| List row padding (divided lists) | `24px` vertical |

---

## 2. Components

### 2.1 Buttons

All buttons are **pills** with a **trailing** icon. The arrow never leads.

**Primary** — solid, for the one action that matters in a viewport.
```tsx
<button className="inline-flex h-14 items-center gap-3 rounded-full bg-ink px-8
                   text-base font-medium text-white transition-colors duration-300
                   hover:bg-body">
  Let&apos;s Talk <ArrowRight size={20} strokeWidth={2} />
</button>
```

**Secondary / nav-scale** — outlined, inverts on hover.
```tsx
<a className="inline-flex h-11 items-center gap-2 rounded-full border border-line
              bg-white px-6 text-sm font-medium text-ink transition-colors
              duration-300 hover:bg-ink hover:text-white">
  Let&apos;s Talk <ArrowRight size={18} strokeWidth={2} />
</a>
```

**Icon circle** — the hamburger. Matches the adjacent pill's height exactly.
```tsx
<button className="grid h-11 w-11 place-items-center rounded-full border border-line">
  <Menu size={18} strokeWidth={2} />
</button>
```

Sizes: `h-14 px-8` for section CTAs, `h-11 px-6` for nav and inline. Nothing
smaller than `h-10`.

Icons: lucide, `strokeWidth={2}`, sized `18–20`. `ArrowRight` for actions,
`ArrowUpRight` for outbound, `ArrowDown` for downloads.

### 2.2 Chips / tags

```tsx
// default
<span className="inline-flex h-10 items-center rounded-full border border-line
                 px-4 text-sm text-ink">UIUX</span>
// selected
<span className="inline-flex h-10 items-center rounded-full bg-surface-2
                 px-4 text-sm text-ink">Mobile App</span>
```
Selected state is a **flat grey fill with no border**, not a colour change.
Chips wrap in a `flex flex-wrap gap-3`.

### 2.3 Text links

Uppercase, letter-spaced, weight 500. Two treatments:
- **Underlined** for a row of social links: `underline underline-offset-[6px] decoration-1`.
- **Arrow'd** for outbound: trailing `ArrowUpRight` that rotates 45° on hover
  (`group-hover:rotate-45 duration-300`) — already the house move in this repo,
  keep it.

### 2.4 Media card

The most-repeated object in the reference. Learn it exactly.

```
┌──────────────────────────────┐
│                              │   ← surface (#EFEFF1), rounded-[24px]
│      [ product mockup ]      │      flat, no border, no shadow
│                              │      generous inner padding (40–64px)
└──────────────────────────────┘
Sportly                            ← Title, 700, ink
Mobile App Design                  ← Meta, 400, meta grey
```

Non-negotiables:
- Ground is **flat `surface`** — never a gradient, never white, never bordered.
- The caption lives **outside and below** the card, left-aligned. Never overlaid
  on the image, never inside the grey box.
- Title bold on top, grey descriptor underneath. Two lines, that's it.
- Images are `grayscale` at rest, full colour on hover, `duration-700`.
- Photography fills the container edge-to-edge (`object-cover`, no padding).
  Product/device mockups are `object-contain` with real padding so the grey
  breathes around them.

### 2.5 Featured media row

Above a hero-scale media card, a three-column meta row:

```
Sportly              Website Redesign: Improving        (UIUX) (Branding)
May 5, 2023          user experience and modernizing…
───────────────      ─────────────────────────────      ──────────────────
title 700 / ink      body 400 / body grey               chips, right-aligned
date  400 / meta     max-width ~340px
```
Desktop `grid grid-cols-12` → `col-span-3 / col-span-6 / col-span-3`. Stacks to
one column below `md`.

### 2.6 Divided list

Used for awards, journey/experience, and testimonials. No cards — just rows with
hairline rules.

```tsx
<li className="flex flex-col gap-1 border-b border-hairline py-6 last:border-0">
  <span className="text-lg font-bold text-ink">Honorable Mention</span>
  <span className="text-sm text-meta">2022 — AWWWARDS</span>
</li>
```
For the experience timeline, the same row becomes a `md:grid-cols-4` with the
date in column 1 (`Meta`, uppercase, tracking `0.06em`) and the content spanning
columns 2–4.

### 2.7 Logo wall

Grayscale wordmarks in a `grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10`.
Under each logo, the same bold-over-grey caption pair as a media card
(`UIUX & Branding` / `2022`). Logos sit at ~`#B9BDC4`, no box around them.

### 2.8 Testimonial

Large quote in `Body L` at `body` colour, then a row: circular avatar (`h-11
w-11`), name bold `ink`, role `meta` underneath, and the client's grayscale
wordmark pushed to the far right. Separated from the next by a hairline rule.

### 2.9 Forms — underline inputs

The reference uses **no boxed inputs**. This is the pattern:

```tsx
<label className="flex flex-col gap-2">
  <span className="text-sm font-medium text-ink">Name*</span>
  <input
    placeholder="Hello..."
    className="border-0 border-b border-hairline bg-transparent pb-3
               text-base text-ink outline-none transition-colors
               placeholder:text-meta focus:border-ink"
  />
</label>
```
- Label above, sentence case, `*` for required. Weight 500, `ink`.
- Placeholder is conversational ("Hello…", "Where can I reply?"), not a repeat
  of the label.
- Bottom rule only. On focus the rule darkens to `ink` — no ring, no glow, no
  colour.
- Desktop layout is a **two-column grid** (`md:grid-cols-2 gap-x-12 gap-y-10`),
  with full-width fields spanning both columns. One column on mobile.
- Submit is a Primary pill.

### 2.10 Navigation

```
show|casy.                          [ Let's Talk → ]  [ ≡ ]
```
- Left: wordmark where the first half is `ink-muted` and the second half is
  `ink`, followed by a full stop — the same two-tone logic as the headlines.
- Right: outlined `h-11` pill + `h-11 w-11` icon circle, `gap-3`.
- `40px` from the top of the viewport, aligned to the page container's padding.
- Ground is `paper`; no blur, no border under the nav, no shadow.

---

## 3. Layout patterns

**Asymmetric hero.** Headline occupies ~65–70% of the width on the left. The
supporting paragraph is a **narrow column (~340–380px)** placed to the right and
aligned to the *bottom* of the headline block, not the top. Below, a right-
aligned rail of uppercase service words (`UIUX / BRANDING / MOBILE APP /
WEBSITE DESIGN`) set one per line with generous leading.

**Never centre a display headline.** Everything in this system is left-aligned
to the container edge. The only right-aligned elements are the service rail, the
nav cluster, and the form's submit button.

**Alternating project rows** (already in `app/sections/projects.tsx`) are
consistent with this language — keep the alternation, but the image half must be
a flat `surface` media card per §2.4, and the caption pattern per §2.4.

**Section opening.** Every section below the hero opens the same way:
eyebrow → two-tone display headline → (optional narrow paragraph + CTA on the
right) → content. Don't invent new section headers.

---

## 4. Motion

The existing framer-motion vocabulary in this repo is correct for the language —
keep it and reuse it rather than inventing new effects.

| Effect | Spec |
|---|---|
| Masked line reveal (headlines) | wrap each line in `overflow-hidden`, animate `y: 80 → 0` + `opacity`, `duration 0.4`, `ease: 'easeOut'`, stagger `0.3` per line |
| Wipe reveal (paragraph/image) | white panel over content, `scaleX`/`scaleY` `1 → 0` with a directional `origin-*`, `duration 0.8–1`, `easeInOut` |
| Fade-up (blocks) | `opacity 0→1`, `y 20→0`, `duration 0.6–0.8` |
| Stagger (chips, list items) | `delay: base + i * 0.06` |
| Hover — arrow | `ArrowUpRight` rotates 45°, `duration-300` |
| Hover — image | `grayscale → grayscale-0`, `duration-700` |
| Hover — pill | fill inverts, `duration-300` |

All scroll-triggered animation uses `viewport={{ once: true }}`. Nothing loops,
nothing parallaxes, nothing bounces (`bounce: 0`).

---

## 5. Anti-patterns — do not ship these

- ❌ Gradients of any kind (incl. `bg-gradient-to-br from-neutral-50 to-neutral-100`)
- ❌ Drop shadows on cards, buttons, or nav
- ❌ `italic`, `font-extralight`, `font-thin`, `font-black`
- ❌ Any accent or semantic colour
- ❌ Boxed/fully-outlined form inputs — underline only
- ❌ Centred display headlines
- ❌ Uppercase section headings
- ❌ Corner radii other than pill / 24px / 16px
- ❌ Captions overlaid on top of imagery
- ❌ Emoji, decorative icons in circles, icon badges
- ❌ Display type at default letter-spacing
- ❌ Borders thicker than 1px

---

## 6. Conformance backlog for existing sections

Current code is close, but these are the known deltas from this spec. Fix them
opportunistically when touching the file.

| File | Delta |
|---|---|
| `app/sections/projects.tsx` | Media card uses `bg-gradient-to-br from-neutral-50 to-neutral-100` → flat `bg-surface`; `rounded-md` → `rounded-[24px]`. Project name/tech should follow the §2.4 caption pair. |
| `app/sections/about.tsx` | `font-extralight` + `italic` on the "Developer & Creator" headline → weight 700 two-tone per §1.2. Photo container `rounded-none` → `rounded-[24px]`. |
| `app/sections/contact.tsx` | Boxed `rounded-full` inputs → underline inputs per §2.9; add labels above fields. |
| `app/sections/hero.tsx` | Already correct in spirit (two-tone headline, pill CTAs, uppercase social row). Fixed-px line masks (`h-[5.35rem]`) should move to a line-height-relative value when the type scale is applied. |
| Section headers (`About` / `Projects`) | The sticky `text-4xl font-semibold` + `<hr>` header is a different idiom from the reference. Migrate to the §3 "section opening": eyebrow → two-tone display headline. |
