# Portfolio Monorepo

This repo is set up to host your **portfolio** plus each individual project as its own deploy (ideal for **subdomains** on Vercel).

## Apps

- `apps/portfolio` — your main portfolio site
- `apps/<project>` — individual project sites (to be added)

## Prereqs

- Node.js LTS installed

## Dev

- Portfolio only: `npm run dev`
- All apps (when you add more): `npm run dev:all`

## Deploy (Vercel + subdomains)

1. Import this repo into Vercel.
2. Create one Vercel Project per app:
   - `apps/portfolio`
   - `apps/project-xyz`
3. In each Vercel Project, set **Root Directory** to that app folder.
4. Add custom domains:
   - `yourdomain.com` -> portfolio
   - `project-xyz.yourdomain.com` -> the project app

(We’ll refine the exact domain mapping once you share your domain name.)
