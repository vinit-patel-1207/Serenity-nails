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
          <div>
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
          <div className="grid grid-cols-2 gap-4">
            <img
              src={img('1000072591')}
              alt="Mauve abstract nail set"
              width={600}
              height={600}
              className="aspect-[3/4] rounded-t-full object-cover"
            />
            <img
              src={img('1000072588')}
              alt="Pearl polka blossom nail set"
              width={600}
              height={600}
              className="mt-12 aspect-[3/4] rounded-2xl object-cover"
            />
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
