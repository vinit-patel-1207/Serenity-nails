import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { WhatsAppIcon } from '../components/BrandIcons.tsx';
import Seo from '../components/Seo.tsx';
import { CATEGORIES, img, products, type Category, type Product } from '../data/products.ts';
import { whatsappLink } from '../lib/whatsapp.ts';

const designs = products.flatMap((p) => p.images.map((id) => ({ id, product: p })));

export default function NailDesigns() {
  const [filter, setFilter] = useState<Category | ''>('');
  const [open, setOpen] = useState<{ id: string; product: Product } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const list = filter ? designs.filter((d) => d.product.category === filter) : designs;
  const show = (d: (typeof designs)[number]) => {
    setOpen(d);
    dialog.current?.showModal();
  };

  const chip = (active: boolean) =>
    `chip ${active ? 'border-wine bg-wine text-white' : 'border-rose-light/50 bg-white hover:border-rose'}`;

  return (
    <>
      <Seo
        title="Nail Design Gallery"
        description="Browse Serenity Nails' gallery of hand-painted nail designs — bridal, floral, chrome, glam and minimal nail art."
      />
      <section className="bg-blush">
        <div className="container-x py-14 text-center">
          <p className="eyebrow">Inspiration</p>
          <h1 className="text-4xl font-medium sm:text-5xl">Nail Design Gallery</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Every design is hand-painted. Tap any look to see it up close.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by style">
          <button className={chip(!filter)} aria-pressed={!filter} onClick={() => setFilter('')}>
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={chip(filter === c)}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
          {list.map((d, i) => (
            <li key={d.id} className="mb-4 break-inside-avoid">
              <button
                onClick={() => show(d)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-blush text-left"
              >
                <img
                  src={img(d.id)}
                  alt={`${d.product.name} nail design`}
                  loading="lazy"
                  width={600}
                  height={600}
                  className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-square'}`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy/80 to-transparent p-4 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                  <span className="block font-serif">{d.product.name}</span>
                  <span className="text-xs text-white/80">{d.product.category}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto w-[min(92vw,56rem)] overflow-hidden rounded-3xl bg-white p-0 backdrop:bg-burgundy/70 backdrop:backdrop-blur-sm"
        aria-label={open?.product.name}
      >
        {open && (
          <div className="grid md:grid-cols-2">
            <img
              src={img(open.id, 1200)}
              alt={`${open.product.name} nail design`}
              width={1200}
              height={1200}
              className="aspect-square w-full object-cover"
            />
            <div className="relative flex flex-col justify-center p-8">
              <button
                onClick={() => dialog.current?.close()}
                className="absolute top-4 right-4 rounded-full p-2 hover:bg-blush"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
              <p className="text-sm tracking-widest text-rose uppercase">{open.product.category}</p>
              <h2 className="mt-2 text-3xl">{open.product.name}</h2>
              <p className="mt-3 text-muted">{open.product.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/products/${open.product.slug}`} className="btn-primary">
                  View Product
                </Link>
                <a
                  href={whatsappLink(
                    `Hello Serenity Nails, I love the "${open.product.name}" design. Could you share the details?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <WhatsAppIcon className="size-4" /> Ask About This
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
