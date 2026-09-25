import { ChevronDown, Search, SearchX } from 'lucide-react';
import { useSearchParams } from 'react-router';
import ProductCard from '../components/ProductCard.tsx';
import Seo from '../components/Seo.tsx';
import { CATEGORIES, products, SHAPES } from '../data/products.ts';

const SORTS = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  name: 'Name: A–Z',
} as const;
type Sort = keyof typeof SORTS;

export default function Products() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const shape = params.get('shape') ?? '';
  const sort = (params.get('sort') ?? 'featured') as Sort;

  const set = (key: string, value: string) =>
    setParams(
      (prev) => {
        if (value) prev.set(key, value);
        else prev.delete(key);
        return prev;
      },
      { replace: true, preventScrollReset: true },
    );

  const needle = q.trim().toLowerCase();
  const list = products
    .filter(
      (p) =>
        (!category || p.category === category) &&
        (!shape || p.shape === shape) &&
        (!needle || `${p.name} ${p.tagline} ${p.category} ${p.shape}`.toLowerCase().includes(needle)),
    )
    .sort((a, b) =>
      sort === 'price-asc'
        ? a.price - b.price
        : sort === 'price-desc'
          ? b.price - a.price
          : sort === 'name'
            ? a.name.localeCompare(b.name)
            : Number(!!b.featured) - Number(!!a.featured),
    );

  const chip = (active: boolean) =>
    `chip ${active ? 'border-wine bg-wine text-white' : 'border-rose-light/50 bg-white hover:border-rose'}`;

  return (
    <>
      <Seo
        title={category ? `${category} Press-On Nails` : 'Shop Press-On Nails'}
        description="Shop handcrafted press-on nail sets by Serenity Nails. Filter by style and shape, and order instantly on WhatsApp."
      />
      <section className="bg-blush">
        <div className="container-x py-14 text-center">
          <p className="eyebrow">The collection</p>
          <h1 className="text-4xl font-medium sm:text-5xl">Our Products</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Hand-painted press-on sets, ready to wear in minutes.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={q}
              onChange={(e) => set('q', e.target.value)}
              placeholder="Search nail sets…"
              className="input pl-11"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="sr-only" htmlFor="shape">
              Shape
            </label>
            <div className="relative">
              <select
                id="shape"
                value={shape}
                onChange={(e) => set('shape', e.target.value)}
                className="input w-auto appearance-none pr-9"
              >
                <option value="">All shapes</option>
                {SHAPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
            </div>
            <label className="sr-only" htmlFor="sort">
              Sort by
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sort}
                onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)}
                className="input w-auto appearance-none pr-9"
              >
                {Object.entries(SORTS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button className={chip(!category)} aria-pressed={!category} onClick={() => set('category', '')}>
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={chip(category === c)}
              aria-pressed={category === c}
              onClick={() => set('category', c)}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted" aria-live="polite">
          Showing {list.length} {list.length === 1 ? 'set' : 'sets'}
        </p>

        {list.length ? (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-blush px-6 py-16 text-center">
            <SearchX className="mx-auto size-10 text-rose" aria-hidden />
            <h2 className="mt-4 text-2xl">No sets match your filters</h2>
            <p className="mt-2 text-muted">Try a different search or clear the filters.</p>
            <button className="btn-primary mt-6" onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
