import type { Product } from '../data/products.ts';
import { formatPrice } from '../lib/whatsapp.ts';

export default function Price({
  product: p,
  className = 'text-lg',
}: {
  product: Product;
  className?: string;
}) {
  const onSale = p.mrp && p.mrp > p.price;
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className="font-semibold text-wine">
        {onSale && <span className="sr-only">Sale price </span>}
        {formatPrice(p.price)}
      </span>
      {onSale && (
        <>
          <s className="text-[0.7em] text-muted">
            <span className="sr-only">Original price </span>
            {formatPrice(p.mrp!)}
          </s>
          <span className="rounded-full bg-rose/10 px-2 py-0.5 text-[0.55em] font-medium text-rose">
            {Math.round((1 - p.price / p.mrp!) * 100)}% off
          </span>
        </>
      )}
    </p>
  );
}
