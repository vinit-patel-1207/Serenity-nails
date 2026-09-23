import { Link } from 'react-router';
import { img, type Product } from '../data/products.ts';
import { orderMessage, whatsappLink } from '../lib/whatsapp.ts';
import { WhatsAppIcon } from './BrandIcons.tsx';
import Price from './Price.tsx';

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-rose-light/20 transition hover:-translate-y-1">
      <Link to={`/products/${p.slug}`} className="relative block aspect-square overflow-hidden bg-blush">
        <img
          src={img(p.images[0])}
          alt={`${p.name} press-on nail set`}
          loading="lazy"
          decoding="async"
          width={600}
          height={600}
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-wine">
          {p.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg leading-snug">
          <Link to={`/products/${p.slug}`} className="hover:text-rose">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{p.tagline}</p>
        <Price product={p} className="mt-3 text-lg" />
        <a
          href={whatsappLink(orderMessage(p))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4 w-full py-2.5"
          aria-label={`Buy ${p.name} on WhatsApp`}
        >
          <WhatsAppIcon className="size-4" /> Buy Now
        </a>
      </div>
    </article>
  );
}
