// Writes dist/products/<slug>/index.html with product-specific <title> and og: tags.
// Link-preview bots (WhatsApp, Instagram, Facebook) don't run JS, so without this every
// shared product link would preview as the generic logo. Runs after every build.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { ogImg, products } from '../src/data/products.ts';
import { SITE } from '../src/lib/site.ts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const shell = readFileSync('dist/index.html', 'utf8');

for (const p of products) {
  const title = esc(`${p.name} | ${SITE.name}`);
  const desc = esc(`${p.tagline}. ₹${p.price}${p.mrp ? ` (was ₹${p.mrp})` : ''}. Order on WhatsApp.`);
  const url = `${SITE.url}/products/${p.slug}`;
  const html = shell
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${SITE.url}${ogImg(p.images[0])}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, '$1product')
    .replace(
      '</head>',
      `  <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="600" />
    <link rel="canonical" href="${url}" />
  </head>`,
    );
  if (!html.includes(ogImg(p.images[0]))) throw new Error('og:image tag missing from index.html');
  mkdirSync(`dist/products/${p.slug}`, { recursive: true });
  writeFileSync(`dist/products/${p.slug}/index.html`, html);
}
console.log(`prerender: ${products.length} product pages`);
