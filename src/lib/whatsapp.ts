import { SITE } from './site.ts';

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`;

type Order = { name: string; price: number; slug?: string; quantity?: number; size?: string };

// The product link makes WhatsApp show the product photo as a link preview (og:image of the prerendered page).
export function orderMessage({ name, price, slug, quantity = 1, size }: Order) {
  return [
    'Hello Serenity Nails,',
    'I am interested in ordering the following product:',
    '',
    `Product: ${name}`,
    `Price: ${formatPrice(price)}`,
    `Quantity: ${quantity}`,
    ...(size ? [`Size: ${size}`] : []),
    ...(slug ? [`Link: ${SITE.url}/products/${slug}`] : []),
    '',
    'Please share the availability and ordering details.',
    '',
    'Thank you.',
  ].join('\n');
}

export const whatsappLink = (
  text = 'Hello Serenity Nails, I would like to know more about your nail sets.',
) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
