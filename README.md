# jackgale-dot-uk

Personal website for Jack Gale, built with Next.js (App Router) and pnpm.

## Core Functionality

- Multi-page personal site with custom light/dark theme toggle in the navbar.
- Markdown-driven articles pipeline with article listing and per-article pages.
- Static presence/links directory page using local assets.
- About/Experience/Contact/Privacy pages with shared layout and styling.
- Custom animated loader using `/public/logos/favicon.png`.
- SEO helpers: `robots.txt`, sitemap index, and dynamic article sitemap entries.

## Main Pages

- `/` Home
- `/about` About
- `/presence` Links/presence
- `/articles` Article index (paginated)
- `/articles/[slug]` Article detail pages from markdown
- `/experience` CV/experience summary
- `/contact` Contact links
- `/privacy` Privacy policy

Compatibility routes:

- `/products` redirects to `/articles`
- `/portfolio` redirects to `/articles`
- `/loading` redirects to `/`

## Content Model

- Articles: `src/content/articles/*.md`
- Privacy policy markdown: `src/content/privacy-policy.md`
- Article metadata parsed with frontmatter (`gray-matter`)
- Markdown rendering via `react-markdown` + `remark-gfm`

## Tech Stack & Dependencies

Runtime dependencies:

- `next` `^16.1.6`
- `react` `^19.2.3`
- `react-dom` `^19.2.3`
- `gray-matter` `^4.0.3`
- `react-markdown` `^10.1.0`
- `remark-gfm` `^4.0.1`

Tooling:

- TypeScript
- pnpm (`packageManager` pinned to `pnpm@10.27.0`)
- Node `20.x` (see `engines`)

## Project Structure

- `app/` Next.js App Router pages, layouts, route handlers
- `src/components/` reusable UI components
- `src/content/` markdown content
- `styles/globals.css` global styling and theme tokens
- `public/` static assets
- `scripts/` utility scripts

## Local Development

```bash
pnpm install
pnpm dev
```

Build and run production locally:

```bash
pnpm build
pnpm start
```

## Deployment (Vercel)

Recommended configuration:

- Root directory: repo root
- Install command: `corepack enable && corepack prepare pnpm@10.27.0 --activate && pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Output directory: leave default for Next.js
- Node version: `20.x`

## Notes

- This repo was refactored from an older static site; legacy static source was archived under `archive/pre-refactor-static-site`.
- External API integrations used in the template source were intentionally removed for this site.
