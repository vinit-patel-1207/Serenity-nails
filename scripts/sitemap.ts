// Generates public/sitemap.xml from the catalog. Runs before every build.
import { writeFileSync } from 'node:fs';
import { products } from '../src/data/products.ts';

const BASE = 'https://serenitynails.in'; // keep in sync with src/lib/site.ts
const paths = ['/', '/about', '/nail-designs', '/products', '/contact', ...products.map((p) => `/products/${p.slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${BASE}${p}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync('public/sitemap.xml', xml);
console.log(`sitemap: ${paths.length} urls`);
