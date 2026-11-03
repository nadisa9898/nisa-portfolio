# Skills.md — UI conventions

Read before adding or changing a component. Also see [AGENTS.md](AGENTS.md): Next.js 16 has breaking changes, so check `node_modules/next/dist/docs/` before using framework APIs.

## 1. Stack

Next.js 16 (App Router), React 19, strict TypeScript · Tailwind v4 (CSS-first, no `tailwind.config.js`) · CSS keyframes for ambient loops, GSAP for entrances · `lenis` scroll · `lucide-react` icons · Bricolage Grotesque (`font-sans`) + DM Mono (`font-mono`) · alias `@/*` → `src/*` · pnpm.

## 2. Layout

```
src/app/         routes, layout.tsx, globals.css (tokens)
src/components/  ui/ (generic micro components), layout/ (chrome), sections/ (compose ui/), projects/, mascot/
src/data/        editable content and layout data
src/hooks/       behaviour touching window/refs
src/lib/         pure helpers
```

- `ui/` knows nothing about a section; `sections/` compose `ui/` and read `data/`.
- Text, nav items, positions and sizes live in `data/`, not JSX.

## 3. Micro components

One component per file in `components/ui/<PascalName>.tsx`, named export, minimal typed props, always accepts `className` (and `style` if decorative), one-line `/** doc */`. Merge classes by appending `` `base ${className ?? ""}` ``. Add `"use client"` only for state, effects, refs or handlers. Decorative elements get `aria-hidden="true"`. A pattern used twice gets extracted.

Existing: `Star`, `Cloud`, `Bubble`, `SafeImage` (next/image with color fallback), `CtaButton`, `Eyebrow`, `SectionPill`, `Reveal`, `BackToTop`, `RecommendationCard`, `SkillIcon`, `TwinkleStars`.

## 4. Tailwind v4

- Tokens live in `@theme` in [globals.css](src/app/globals.css) (`--color-foo` → `bg-foo`). Plain CSS there is only for tokens, keyframes and global rules.
- Mobile-first; breakpoints `min-[640px]` (tablet), `min-[860px]` (desktop). Fluid sizes use `clamp()`.
- Display headings: `font-extrabold uppercase leading-[.86] [font-variation-settings:'wdth'_75]`. Eyebrows and badges: `font-mono tracking-[.14em]`. Body: `text-ink-body`.
- Use token names, not hex. Exceptions (SVG attributes, inline styles, `data/hero.ts`) must match a token.

## 5. Tokens

Colors: `navy` #17244c (text, borders, shadows) · `cream` #fffdf6 (background) · `blue` #3051d9 (accent) · `sky` #8ed8f8 · `sky-light` #bcebff · `sky-pale` #e6f7ff · `sky-mist` #e3f5ff · `sky-haze` #d9f3ff · `pink` #ff78bc · `pink-light` #ffc8e7 · `pink-pale` #ffeaf5 · `yellow` #ffd84d · `yellow-light` #fff3a6 · `lilac` #c9b8ff · `green` #7ed957 · `ink-body` #2b3a66 · `ink-soft` #3b4870 · `ink-muted` #5a6890. Opacity modifiers work (`bg-cream/75`).

Shadows: `shadow-hard-3|4|5|6|8|12` (solid navy offset); pair with `border-2 border-navy`. Soft shadows only on floating glass UI.

Motion: `ease-spring` (hover lifts), `ease-reveal` (entrances), `animate-float|spin-slow|twinkle|sway|marquee|pulse-soft|morph|bob`. Keyframes are prefixed `pip*`; per-instance timing via `animate-[pipSpin_6s_linear_infinite]`. `globals.css` shortens animation under `prefers-reduced-motion`; JS animation must check `matchMedia("(prefers-reduced-motion: reduce)")`.

## 6. Buttons

Use [CtaButton](src/components/ui/CtaButton.tsx) (`variant`: `solid` | `outline` | `blue`; `arrow={false}` centres the label with no circle, as the Hero outline button does). Add variants via the `variants` object and the union type; don't fork it.

- Links navigate (`Link`), buttons act (`<button type="button">`); icon buttons need `aria-label`, toggles need `aria-expanded`.
- Links on colored blocks need `no-underline` and a `hover:text-*` (global `a` is blue, hover navy).
- Keep a visible focus state.
- Glass surface (floating chrome only): `bg-cream/75 backdrop-blur-[14px] border-[1.5px] border-navy/12`.

## 7. Images

- Build URLs with `asset()` / `projectImage()` / `projectThumb()` / `caseStudyImage()` from [assets.ts](src/lib/assets.ts) (`public/images` or `NEXT_PUBLIC_ASSET_BASE_URL`).
- Render with `SafeImage`; real `alt` for content, `alt=""` for decor; set `width`/`height`; `priority` only above the fold; GIFs need `unoptimized`.

## 8. Data

Personal content is in [site.ts](src/data/site.ts). Section layout data goes in a file named for the section, with exported interfaces, `readonly` arrays and `as const` configs.

## 9. Animation

- Ambient loops → CSS tokens. Entrances → GSAP in `gsap.context(..., rootRef.current)`, return `ctx.revert()`, target `data-*` attributes.
- Parallax → `usePointerParallax(rootRef)` with `data-depth="0..1"`.
- Cursor hooks: `data-magnetic`, `data-cursor`. Always clean up listeners and frames.

## 10. Accessibility

One `<main>`; nav has `aria-label`; section `id`s match `nav` in `site.ts`. Body text `ink-body` or darker (no `ink-muted` for essential text on tints). Respect reduced motion. Expose toggle state.

## 11. Code style

Double quotes, semicolons, 2-space indent, trailing commas. Named exports (defaults only where Next requires). `import type` for types. One-line comments explaining why. Import order: external, `@/components`, `@/data`, `@/hooks`, `@/lib`. Run `pnpm lint` before finishing.

## 12. New section

1. Add typed `readonly` content to `src/data/<section>.ts`.
2. Build new micro components in `ui/` first.
3. Create `sections/<Section>.tsx` with `<section id="...">` and container `relative mx-auto max-w-[1440px] px-[clamp(20px,5vw,72px)]`.
4. Add it to `page.tsx` and, if navigable, to `nav` in `site.ts`.
5. Check mobile, tablet, desktop and reduced motion.

## 13. Responsive check

Run it for every UI change, and for the whole site before finishing a task. Layout is fixed by screenshots, not by reading classes.

**Device matrix** (the same set as [responsive-check.mjs](scripts/responsive-check.mjs)):

| Class | Viewports |
| --- | --- |
| Flagship phones | 360×800, 390×844 (iPhone 15), 430×932 (Pro Max / Galaxy Ultra) |
| Modern tablets | 768×1024 (iPad mini), 820×1180 (iPad Air), 1024×1366 (iPad Pro 12.9), 1180×820 landscape |
| Laptops / desktop | 1280×720, 1440×900, 1920×1080 |

Bands the CSS targets: `<640` phone, `640–859` tablet, `≥860` desktop. Anything between the matrix widths (e.g. 600, 860, 1100) must also hold, since fluid `clamp()` sizes meet fixed ones there.

**Procedure**

1. Start `pnpm dev`, then run `node scripts/responsive-check.mjs [route] [deviceFilter]` (e.g. `node scripts/responsive-check.mjs /projects phone`). It scrolls the page so entrances have played, prints `ok`/`OVERFLOW` per device, and saves one PNG per section to `tests/.shots/responsive/` (`FULL=1` adds a full-page shot, needed for routes without `main > section[id]`). On Git Bash set `MSYS_NO_PATHCONV=1` so `/projects` isn't rewritten into a Windows path.
2. `OVERFLOW` means `scrollWidth > innerWidth`, which is always a bug. Elements listed from marquees and `aria-hidden` decor are expected.
3. Open the PNGs for at least a phone, a tablet and a laptop. Look for: clipped or overlapping text, cards or images cut by the viewport, buttons wrapping badly, tap targets under 44px, stacked order that reads wrong, and mid-word breaks in long values (emails, URLs).
4. When a Claude Design reference exists (the project's `Portfolio.dc.html`), screenshot it at the same viewport and compare section by section; the design is the source of truth for layout, spacing and which elements show per breakpoint.
5. Re-run after the fix and re-check the neighbouring breakpoints.

**Conventions that keep layouts stable**

- Mobile-first: base classes are the phone layout; add `min-[640px]:` / `min-[860px]:` for larger. Use `max-[639px]:` only for phone-only overrides.
- Place grid children explicitly (`col-start-*` and `row-start-1`) when the layout has an empty column; auto-placement drops items into the wrong cell, as the Experience timeline markers did.
- Let content shrink: `min-w-0` on flex/grid children, `[overflow-wrap:anywhere]` on long values, `flex-wrap` rows that stack on phones.
- Fixed pixel widths are fine for cards and buttons only if they fit 360px; otherwise use `w-full max-w-[...]`.
- Horizontal scrollers (marquees) sit inside `overflow-hidden` and keep the page free of horizontal scroll; `main` uses `overflow-x-clip`.
- GSAP writes `transform` and folds in CSS `translate`/`rotate`/`scale`. Animate a wrapper, never an element that uses those properties itself (the recommendation cards' tilt and hover lift).
- Fixed chrome (navbar, mascot buddy, dev indicator) appears over element screenshots; it is a capture artifact, not a bug.
- A new keyframe or utility that doesn't show in `pnpm dev` may be a stale CSS chunk: save `globals.css` again or restart the server before debugging the code.
- Don't skip reduced motion when testing: set `reducedMotion: "reduce"` once per section with an entrance animation.
