import { motion } from 'motion/react';
import { ArrowRight, Gem, Headphones, MessageCircle, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router';
import { InstagramIcon, WhatsAppIcon } from '../components/BrandIcons.tsx';
import ProductCard from '../components/ProductCard.tsx';
import Reveal from '../components/Reveal.tsx';
import SectionHeading from '../components/SectionHeading.tsx';
import Seo from '../components/Seo.tsx';
import { CATEGORIES, img, products } from '../data/products.ts';
import { SITE } from '../lib/site.ts';
import { whatsappLink } from '../lib/whatsapp.ts';

const featured = products.filter((p) => p.featured);

const PERKS = [
  { icon: Sparkles, title: 'Elegant Designs', text: 'Trendy & timeless styles' },
  { icon: Gem, title: 'Quality Products', text: 'Hand-painted, carefully finished' },
  { icon: MessageCircle, title: 'Easy Ordering', text: 'Order in minutes via WhatsApp' },
  { icon: Headphones, title: 'Personal Support', text: "We're here to help" },
];

const WHY = [
  { icon: Sparkles, title: 'Elegant Designs', text: 'Trendy & timeless' },
  { icon: Gem, title: 'Premium Quality', text: 'Long-lasting beauty' },
  { icon: ShieldCheck, title: 'Carefully Crafted', text: 'Every nail hand-finished' },
  { icon: WhatsAppIcon, title: 'WhatsApp Ordering', text: 'Fast & easy' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/og-image.jpg`,
  telephone: `+${SITE.whatsapp}`,
  email: SITE.email,
  sameAs: [SITE.instagramUrl],
  priceRange: '₹₹',
};

export default function Home() {
  return (
    <>
      <Seo
        title="Serenity Nails"
        description="Handcrafted press-on nail sets — bridal, glam, chrome, floral and minimal designs. Premium quality, easy WhatsApp ordering."
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blush via-cream to-[#f6e1e3]">
        <div className="container-x grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">Handcrafted press-on nails</p>
            <h1 className="mt-2 text-5xl leading-[1.05] font-medium sm:text-6xl lg:text-7xl">
              Elegance <em className="font-normal text-rose">at</em>
              <br />
              Your Fingertips
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Discover beautiful nail designs, hand-painted and carefully finished to make every detail feel
              special.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/nail-designs" className="btn-primary">
                Explore Nail Designs
              </Link>
              <Link to="/products" className="btn-outline">
                Shop Products
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-muted">
              <div className="flex text-rose" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              Loved by nail lovers across India
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto flex w-full max-w-md flex-col lg:block lg:max-w-none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <Link
              to="/products/crimson-blossom-gold"
              className="group relative ml-auto block aspect-[4/5] w-[82%] overflow-hidden rounded-t-full border-8 border-white shadow-soft"
            >
              <img
                src={img('1000072582', 1200)}
                alt="Crimson Blossom Gold press-on nails"
                fetchPriority="high"
                width={1200}
                height={1200}
                className="size-full object-cover transition duration-700 group-hover:scale-105"
              />
            </Link>
            <Link
              to="/products/polka-bow"
              className="group absolute bottom-6 left-0 w-[42%] overflow-hidden rounded-3xl border-4 border-white shadow-soft"
            >
              <img
                src={img('1000072551')}
                alt="Polka Bow press-on nails"
                width={600}
                height={600}
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </Link>
            {/* in flow above the image on small screens; floats beside the arch on desktop */}
            <p
              className="order-first mb-3 text-center font-script text-3xl text-rose lg:absolute lg:top-8 lg:-left-10 lg:mb-0 lg:-rotate-6 lg:text-left lg:text-4xl"
              aria-hidden
            >
              Nail Art <br className="hidden lg:block" />
              is Self Care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section aria-label="Why shop with us" className="border-y border-rose-light/20 bg-white">
        <ul className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-rose">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured designs */}
      <section className="container-x py-20">
        <SectionHeading
          title="Featured Nail Designs"
          subtitle="Explore our latest nail art and timeless classics."
          link={{ to: '/nail-designs', label: 'View All Designs' }}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.slice(0, 5).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/products/${p.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-blush">
                  <img
                    src={img(p.images[0])}
                    alt={`${p.name} nail design`}
                    loading="lazy"
                    width={600}
                    height={600}
                    className="size-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-serif">{p.name}</p>
                <p className="text-xs text-muted">{p.category}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-blush">
        <div className="container-x grid items-center gap-10 py-20 md:grid-cols-2">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={img('1000072576')}
                alt="Crimson blossom nails in gift box"
                loading="lazy"
                width={600}
                height={600}
                className="aspect-[3/4] rounded-2xl object-cover"
              />
              <img
                src={img('1000072578')}
                alt="Emerald royale nails"
                loading="lazy"
                width={600}
                height={600}
                className="mt-10 aspect-[3/4] rounded-2xl object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Our promise</p>
            <h2 className="text-3xl font-medium sm:text-4xl">Where Beauty Meets Serenity</h2>
            <p className="mt-5 leading-relaxed text-muted">
              At Serenity Nails, we believe nails are more than just a beauty choice — they are a form of
              self-expression. Every set is hand-painted, carefully finished and packed with love, bringing
              salon-worthy nail art to you in minutes.
            </p>
            <Link to="/about" className="btn-primary mt-8">
              Discover Serenity Nails <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-x py-20">
        <SectionHeading
          title="Featured Products"
          subtitle="Handpicked sets for your perfect nails."
          link={{ to: '/products', label: 'View All Products' }}
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="container-x pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-blush to-[#f6e1e3] px-6 py-12 sm:px-12">
          <SectionHeading title="Why Serenity Nails" subtitle="Because your nails deserve the best." center />
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:divide-x lg:divide-rose-light/30">
            {WHY.map(({ icon: Icon, title, text }) => (
              <li key={title} className="text-center">
                <Icon className="mx-auto size-8 text-rose" aria-hidden />
                <p className="mt-3 font-serif text-lg">{title}</p>
                <p className="text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x pb-20">
        <SectionHeading
          title="Nail Style Categories"
          subtitle="Find your perfect style."
          link={{ to: '/products', label: 'View All' }}
        />
        <ul className="grid grid-cols-4 gap-3 sm:gap-5 lg:grid-cols-7">
          {CATEGORIES.map((c) => {
            const cover = products.find((p) => p.category === c)!;
            return (
              <li key={c}>
                <Link to={`/products?category=${c}`} className="group block text-center">
                  <div className="aspect-[3/4] overflow-hidden rounded-t-full bg-blush">
                    <img
                      src={img(cover.images[0])}
                      alt=""
                      loading="lazy"
                      width={600}
                      height={600}
                      className="size-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <span className="mt-2 block text-sm group-hover:text-rose">{c}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Instagram */}
      <section className="container-x pb-20">
        <div className="grid overflow-hidden rounded-3xl bg-burgundy text-white lg:grid-cols-3">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl">Follow Our Nail Journey</h2>
            <p className="mt-3 text-white/70">
              Get inspired by our latest designs, behind the scenes and more.
            </p>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 self-start bg-white text-wine hover:bg-blush"
            >
              <InstagramIcon className="size-4" /> @{SITE.instagram}
            </a>
          </div>
          <div className="grid grid-cols-3 gap-1 lg:col-span-2 lg:grid-cols-4">
            {[
              '1000072580',
              '1000072591',
              '1000072600',
              '1000072564',
              '1000072551',
              '1000072560',
              '1000072542',
              '1000072554',
            ].map((id, i) => (
              <a
                key={id}
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block aspect-square overflow-hidden ${i > 5 ? 'hidden lg:block' : ''}`}
                aria-label="View on Instagram"
              >
                <img
                  src={img(id)}
                  alt=""
                  loading="lazy"
                  width={600}
                  height={600}
                  className="size-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-wine to-burgundy px-6 py-14 text-center text-white">
            <p className="font-script text-3xl text-rose-light">Beautiful nails, happier you</p>
            <h2 className="mt-1 text-3xl sm:text-4xl">Found Your Perfect Look?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/70">
              Message Serenity Nails on WhatsApp to order your favourite set or ask about a custom design.
            </p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
              <WhatsAppIcon className="size-4" /> Order on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
