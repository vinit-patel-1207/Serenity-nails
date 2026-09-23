# Serenity Nails

React 19 + TypeScript + Vite + Tailwind v4 storefront. Orders go through WhatsApp (no checkout).

```bash
npm install
npm run dev       # local dev
npm run build     # typecheck + sitemap + production build → dist/
npm test          # WhatsApp message/link check
npm run images    # re-generate public/images from raw/ photos
```

## Editing content

- **Business details** (WhatsApp number, email, Instagram, domain): `src/lib/site.ts` (domain also in `scripts/sitemap.ts`, `public/robots.txt`, `index.html` og:image)
- **Products** (names, prices, categories, photos): `src/data/products.ts`
- **New photo**: drop the `.jpg` into `raw/`, run `npm run images`, reference its filename (without extension) in `images: [...]`

## Deploy

Static SPA: upload `dist/`. `public/_redirects` (Netlify) and `vercel.json` (Vercel) route every path to `index.html`.
