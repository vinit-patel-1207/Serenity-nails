// Run: npm test  (node strips the types, no framework needed)
import assert from 'node:assert/strict';
import { orderMessage, whatsappLink, formatPrice } from './whatsapp.ts';

assert.equal(formatPrice(1299), '₹1,299');
const msg = orderMessage({ name: 'Rosé & Gold', price: 499, slug: 'rose-gold', quantity: 2, size: 'M' });
assert.match(
  msg,
  /Product: Rosé & Gold\nPrice: ₹499\nQuantity: 2\nSize: M\nLink: https:\/\/serenitynails\.shop\/products\/rose-gold\n/,
);
assert.doesNotMatch(orderMessage({ name: 'X', price: 1 }), /Size|Link/);
const url = new URL(whatsappLink(msg));
assert.equal(url.host, 'wa.me');
assert.equal(url.searchParams.get('text'), msg); // round-trips through encoding (& and newlines survive)
console.log('whatsapp ok');
