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

Use [CtaButton](src/components/ui/CtaButton.tsx) (`variant`: `solid` | `outline` | `blue`). Add variants via the `variants` object and the union type; don't fork it.

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
