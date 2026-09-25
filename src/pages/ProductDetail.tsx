import { Check, ChevronLeft, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { WhatsAppIcon } from '../components/BrandIcons.tsx';
import Price from '../components/Price.tsx';
import ProductCard from '../components/ProductCard.tsx';
import Seo from '../components/Seo.tsx';
import { getProduct, img, ogImg, INCLUDED, products, SIZES } from '../data/products.ts';
import { SITE } from '../lib/site.ts';
import { formatPrice, orderMessage, whatsappLink } from '../lib/whatsapp.ts';
import NotFound from './NotFound.tsx';

const STEPS = [
  'Clean, file and push back cuticles',
  'Pick the right size for each nail',
  'Apply glue or tab, press for 30 seconds',
];

export default function ProductDetail() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  // key resets state when navigating between products
  return product ? <Detail key={slug} product={product} /> : <NotFound />;
}

function Detail({ product: p }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<(typeof SIZES)[number]>('M');
  const [qty, setQty] = useState(1);

  const related = products
    .filter((r) => r.slug !== p.slug && r.category === p.category)
    .concat(products.filter((r) => r.category !== p.category))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.images.map((id) => SITE.url + img(id, 1200)),
    brand: { '@type': 'Brand', name: SITE.name },
    url: `${SITE.url}/products/${p.slug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: p.price,
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/products/${p.slug}`,
      seller: { '@type': 'Organization', name: SITE.name },
    },
  };

  return (
    <>
      <Seo
        title={p.name}
        description={`${p.name} — ${p.tagline}. ${formatPrice(p.price)}. Order on WhatsApp.`}
        image={ogImg(p.images[0])}
        jsonLd={jsonLd}
      />

      <div className="container-x py-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link to="/products" className="inline-flex items-center gap-1 hover:text-rose">
            <ChevronLeft className="size-4" aria-hidden /> Back to products
          </Link>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="aspect-square overflow-hidden rounded-3xl bg-blush shadow-soft">
              <img
                src={img(p.images[active], 1200)}
                alt={`${p.name} press-on nail set`}
                width={1200}
                height={1200}
                className="size-full object-cover"
              />
            </div>
            {p.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {p.images.map((id, i) => (
                  <button
                    key={id}
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === active}
                    className={`size-20 overflow-hidden rounded-xl ring-2 transition ${i === active ? 'ring-rose' : 'ring-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img(id)} alt="" width={600} height={600} className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm tracking-widest text-rose uppercase">
              {p.category} · {p.shape}
            </p>
            <h1 className="mt-2 text-4xl font-medium sm:text-5xl">{p.name}</h1>
            <p className="mt-2 text-muted">{p.tagline}</p>
            <Price product={p} className="mt-5 text-3xl" />
            <p className="mt-6 leading-relaxed text-muted">{p.description}</p>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium">Size</legend>
              <div className="mt-3 flex gap-2">
                {SIZES.map((s) => (
                  <label
                    key={s}
                    className={`chip cursor-pointer px-5 has-focus-visible:outline-2 has-focus-visible:outline-rose ${size === s ? 'border-wine bg-wine text-white' : 'border-rose-light/50 bg-white hover:border-rose'}`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      onChange={() => setSize(s)}
                      className="sr-only"
                    />
                    {s}
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">
                Not sure? Message us and we'll help you find your fit.
              </p>
            </fieldset>

            <div className="mt-6">
              <p className="text-sm font-medium" id="qty-label">
                Quantity
              </p>
              <div
                className="mt-3 inline-flex items-center rounded-full border border-rose-light/60 bg-white"
                role="group"
                aria-labelledby="qty-label"
              >
                <button
                  className="p-3 hover:text-rose disabled:opacity-40"
                  onClick={() => setQty((q) => q - 1)}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-medium" aria-live="polite">
                  {qty}
                </span>
                <button
                  className="p-3 hover:text-rose disabled:opacity-40"
                  onClick={() => setQty((q) => q + 1)}
                  disabled={qty >= 10}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <a
              href={whatsappLink(
                orderMessage({ name: p.name, price: p.price, slug: p.slug, quantity: qty, size }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-8 w-full py-4 text-base sm:w-auto sm:px-10"
            >
              <WhatsAppIcon className="size-5" /> Buy Now on WhatsApp
            </a>
            {qty > 1 && <p className="mt-2 text-sm text-muted">Total: {formatPrice(p.price * qty)}</p>}

            <div className="mt-10 grid gap-6 border-t border-rose-light/30 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="font-serif text-lg">What's included</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {INCLUDED.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="size-4 shrink-0 text-rose" aria-hidden /> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-lg">How to apply</h2>
                <ol className="mt-3 space-y-2 text-sm text-muted">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex gap-2">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blush text-xs text-rose">
                        {i + 1}
                      </span>{' '}
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-x py-16">
        <h2 className="mb-8 text-3xl font-medium">You may also love</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {related.map((r) => (
            <ProductCard key={r.slug} product={r} />
          ))}
        </div>
      </section>
    </>
  );
}
