import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { SITE } from '../lib/site.ts';

type Props = { title: string; description: string; image?: string; jsonLd?: object };

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

// ponytail: effect-based head tags, fine for a client SPA; switch to SSG/prerender if SEO needs no-JS crawlers.
export default function Seo({ title, description, image = '/og-image.jpg', jsonLd }: Props) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = title === SITE.name ? title : `${title} | ${SITE.name}`;
    const url = SITE.url + pathname;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', SITE.url + image);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, image, pathname]);

  return jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null;
}
