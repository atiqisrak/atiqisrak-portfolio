# Public assets checklist

Files referenced in code but **not committed** to this repo (likely served from Vercel/CDN in production). Add them to `public/` for local dev without 404s.

## Required for full fidelity

| File | Used by | Notes |
|------|---------|-------|
| `avatar.webp` | SEO schema, OG, production portrait | Dev fallback: `avatar.svg` |
| `og-large-meik.webp` | `app/layout.tsx`, `app/page.tsx` metadata | 1200×630 social preview |
| `AtiqIsrak_Resume.pdf` | Contact, Experience resume link | §12 PLAN |
| `favicon.ico` | `app/layout.tsx` | Dev fallback: `favicon.svg` |
| `favicon-16x16.png` | layout `<head>` | PWA / browser tab |
| `favicon-32x32.png` | layout `<head>` | PWA / browser tab |
| `apple-touch-icon.png` | layout `<head>` | iOS home screen |
| `android-chrome-192x192.png` | `site.webmanifest` | PWA |
| `android-chrome-512x512.png` | `site.webmanifest` | PWA |

## Project case-study images

Paths from `app/projects/data.json` (see `lib/assets.ts` → `PROJECT_IMAGES`):

- `mave-cms.webp`, `sumo.webp`, `assetiq.webp`, `mave-lms.webp`
- `aranya-ecommerce.webp`, `uhl-hms.webp`, `navbot-ai.webp`
- `gloria-jeans.webp`, `techcare.webp`

## Committed placeholders (Phase 5)

- `avatar.svg` — monochrome portrait placeholder until `avatar.webp` is restored
- `favicon.svg` — monochrome favicon fallback

## Restore workflow

1. Copy production assets from Vercel blob/storage or local backup into `public/`.
2. Update `lib/assets.ts` → set `avatar` to `/avatar.webp` when the file exists.
3. Run `npm run build` and verify `/`, `/projects/*`, and social preview tags.
