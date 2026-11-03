# Nadia Nisa — Portfolio

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis. Conventions: [Skills.md](Skills.md); Next.js notes: [AGENTS.md](AGENTS.md).

```bash
pnpm dev | build | start | lint
npx tsc --noEmit
npx playwright test           # e2e against `pnpm dev`
CI_PROD=1 npx playwright test # e2e against a running `pnpm start`
```

## Content

Edit everything in `src/data/`: `site.ts` (name, email, socials, CV path, nav), `projects.ts` / `projectDetails.ts` / `caseStudies.ts`, `experience.ts`, `skills.ts`, `tools.ts`, `recommendations.ts`.

CV: `public/images/proj/Nadia_Nisa.pdf` (set in `site.ts`), downloaded as `Nadia_Nisa_CV.pdf`.

## Assets & env

Images live in `public/images`. Set `NEXT_PUBLIC_ASSET_BASE_URL` to serve them from a CDN (add the origin to `images.remotePatterns` in `next.config.ts` for `next/image`).

Copy `.env.example` to `.env.local` to set the public site URL and optional asset base URL.
