// Converts raw/ photos to responsive webp in public/images. Run: npm run images
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import fs from 'node:fs';

const out = 'public/images';
fs.mkdirSync(out, { recursive: true });

// sharp's prebuilt libheif can't decode iPhone HEIC (HEVC), so convert those to jpg first
for (const f of fs.readdirSync('raw').filter((f) => /\.heic$/i.test(f))) {
  const jpg = `raw/${f.replace(/\.heic$/i, '.jpg')}`;
  if (fs.existsSync(jpg)) continue;
  const buf = await heicConvert({ buffer: fs.readFileSync(`raw/${f}`), format: 'JPEG', quality: 0.92 });
  fs.writeFileSync(jpg, Buffer.from(buf));
}

for (const f of fs.readdirSync('raw').filter((f) => /\.jpe?g$/i.test(f))) {
  const name = f.replace(/\.(?:jpe?g\.)?jpe?g$/i, '');
  for (const w of [600, 1200]) {
    await sharp(`raw/${f}`).rotate().resize(w, w, { fit: 'cover' }).webp({ quality: 78 }).toFile(`${out}/${name}-${w}.webp`);
  }
  // jpg for link previews (WhatsApp/Facebook are unreliable with webp)
  await sharp(`raw/${f}`).rotate().resize(600, 600, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${out}/${name}-og.jpg`);
}

await sharp('raw/logo.png').resize(320).webp({ quality: 90 }).toFile(`${out}/logo.webp`);
await sharp('raw/logo.png').resize(512, 512, { fit: 'contain', background: '#FFF7F7' }).png().toFile('public/icon-512.png');
await sharp('raw/logo.png').resize(180, 180, { fit: 'contain', background: '#FFF7F7' }).png().toFile('public/apple-touch-icon.png');
await sharp('raw/logo.png').resize(1200, 630, { fit: 'contain', background: '#FFF7F7' }).jpeg({ quality: 85 }).toFile('public/og-image.jpg');
console.log('done');
