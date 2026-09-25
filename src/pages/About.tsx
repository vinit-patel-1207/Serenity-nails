import { Gem, Heart, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import Reveal from '../components/Reveal.tsx';
import SectionHeading from '../components/SectionHeading.tsx';
import Seo from '../components/Seo.tsx';
import { img } from '../data/products.ts';

const VALUES = [
  {
    icon: Sparkles,
    title: 'Hand-painted',
    text: 'Every nail is painted and finished by hand — no two sets are exactly alike.',
  },
  {
    icon: Gem,
    title: 'Premium finish',
    text: 'Salon-grade gels, foils, pearls and chrome for a finish that lasts.',
  },
  { icon: Leaf, title: 'Reusable', text: 'Look after them and wear your favourite set again and again.' },
  {
    icon: Heart,
    title: 'Made with love',
    text: 'Packed carefully in a keepsake box, ready to gift or keep.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Serenity Nails creates hand-painted press-on nail sets that bring salon-worthy nail art to you in minutes."
      />
      <section className="bg-blush">
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="eyebrow">Our story</p>
            <h1 className="text-4xl font-medium sm:text-5xl">About Serenity Nails</h1>
            <p className="mt-5 leading-relaxed text-muted">
              Serenity Nails began with a simple belief: beautiful nails should feel effortless. What started
              as a love for nail art grew into a small studio creating hand-painted press-on sets — each one
              designed, painted and finished with care.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              From delicate florals and bridal gold to bold chrome and everyday nudes, our sets let you wear
              salon-worthy nail art in minutes, without the salon appointment.
            </p>
          </div>
          <div className="order-1 grid grid-cols-2 gap-4 md:order-2">
            <img
              src={img('1000072591')}
              alt="Mauve abstract nail set"
              width={600}
              height={600}
              className="aspect-3/4 rounded-t-full object-cover"
            />
            <img
              src={img('1000072588')}
              alt="Pearl polka blossom nail set"
              width={600}
              height={600}
              className="mt-12 aspect-3/4 rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f8efed]">
        <div className="container-x grid gap-8 pt-4 pb-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
          <div className="order-1 relative mx-auto w-full max-w-60 px-3 pb-12 sm:max-w-[18rem] sm:px-4 sm:pb-14 md:max-w-[16rem] lg:max-w-[18rem]">
            <div className="absolute -top-2 -right-2 bottom-5 -left-2 -rotate-6 rounded-4xl bg-wine/90 sm:-top-4 sm:-right-3 sm:bottom-7 sm:-left-3 sm:rounded-[2.5rem]" />
            <div className="relative z-10 top-2 overflow-hidden rounded-4xl border-2 border-amber-100 bg-[#fffdf9] shadow-[0_18px_40px_rgba(80,25,35,0.12)] sm:top-4">
              <img
                src="/images/designer.jpeg"
                alt="Shruti, designer at Serenity Nails"
                width={800}
                height={1000}
                className="aspect-4/5 size-full scale-[1.03] object-cover object-top ring-1 ring-rose-light/35"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="relative z-10 mt-5 pl-1">
              <p className="font-serif text-2xl text-white">Shruti</p>
              <p className="mt-1 text-sm tracking-[0.16em] text-amber-100 uppercase">Designer &amp; Founder</p>
            </div>
          </div>
          <div className="order-2">
            <p className="eyebrow text-center md:text-left">Meet the designer</p>
            <h2 className="text-3xl font-medium sm:text-4xl text-center md:text-left">Meet Shruti</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                Behind Serenity Nails is Shruti, a designer who believes the smallest details can change how
                you feel. Each set begins with a colour, a mood or a little moment of inspiration, then takes
                shape through careful painting, layering and finishing.
              </p>
              <p>
                From the first sketch to the final top coat, every design is made to feel personal — beautiful
                enough for a special occasion, easy enough for everyday wear and unmistakably yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading
          title="What Makes Us Different"
          subtitle="Small studio. Big attention to detail."
          center
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="h-full rounded-2xl bg-white p-6 shadow-soft">
                <span className="grid size-12 place-items-center rounded-full bg-blush text-rose">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x pb-20 text-center">
        <p className="font-script text-4xl text-rose">Beautiful Nails, Happier You</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/products" className="btn-primary">
            Shop the Collection
          </Link>
          <Link to="/contact" className="btn-outline">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
