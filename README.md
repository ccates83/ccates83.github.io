# connor-cates-site

Connor Cates's personal site: résumé, an index of the writing on Medium, and project case studies. The "Signal" direction: dark, cinematic, motion-led.

## Stack

- **Astro 7**, static output (`dist/`), one HTML file per route.
- **GSAP 3.15** (ScrollTrigger, SplitText) for choreography, **Lenis** for smooth scroll on GSAP's ticker.
- **Native cross-document View Transitions** for page transitions — no client router; every navigation is a real page load.
- Target host: **Cloudflare Workers Static Assets** (`wrangler.jsonc`), same setup as `ics-website`.

## Commands

```bash
npm run dev       # astro dev (Astro 7 daemonizes it — `npx astro dev stop` to stop)
npm run build     # → dist/
npm run preview   # serve dist/
```

## Where things live

| What | Where |
|---|---|
| Name, bio, links, jobs, education, skills, the six eras | `src/data/site.ts` |
| Posts (Medium is canonical; files are frontmatter-only stubs) | `src/content/posts/*.md` |
| Projects (frontmatter = home card; body = `/work/<slug>` case study) | `src/content/projects/*.md` |
| Shared motion: Lenis, cursor, loader, reveals, magnetic | `src/scripts/core.ts` |
| Home sections | `src/components/{Hero,Manifesto,PostList,Eras,WorkStack,Timeline}.astro` |
| Design tokens + page-transition CSS | `src/styles/global.css` |
| Rejected/explored mocks | `design/mocks/` |

**Add a post:** new file in `src/content/posts/` with `number`, `title`, `summary`, `status` (`published` needs `date` + `url`). **Add a project:** new file in `src/content/projects/`; pick a `theme` and `visual`.

## Motion rules

- Every animation respects `prefers-reduced-motion`: no Lenis, no loader, no pinning, static end states.
- The loader plays once per browser session (home page only).
- The custom cursor only appears on fine pointers; the native cursor stays on touch devices.
- Page scripts wait on `ready` from `core.ts` so entrance animations start after the loader.

## Before first deploy

- Pick the domain; update `SITE_URL` in `astro.config.mjs`, `public/robots.txt`, and `wrangler.jsonc` `name` if needed.
- Add an `og-image.png` and the résumé PDF (the résumé page currently prints to PDF via the browser).
