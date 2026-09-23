import { AnimatePresence, motion } from 'motion/react';
import { Mail, Menu, Phone, Search, X } from 'lucide-react';
import { useEffect, useState, type ComponentProps } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router';
import { SITE } from '../lib/site.ts';
import { whatsappLink } from '../lib/whatsapp.ts';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.tsx';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/nail-designs', label: 'Nail Designs' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  // Esc closes the drawer; page behind it doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onSearch: ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q')?.toString().trim() ?? '';
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm transition hover:text-rose ${isActive ? 'text-rose after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-rose' : ''}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-rose-light/20 bg-cream/85 backdrop-blur-md">
        <div className="container-x flex h-18 items-center justify-between gap-4">
          <Link to="/" aria-label="Serenity Nails home" className="shrink-0">
            <img
              src="/images/logo.webp"
              alt="Serenity Nails"
              width={64}
              height={65}
              className="h-14 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearching((s) => !s)}
              className="rounded-full p-2.5 hover:bg-blush"
              aria-label="Search products"
              aria-expanded={searching}
            >
              <Search className="size-5" />
            </button>
            <Link to="/products" className="btn-primary hidden py-2 sm:inline-flex">
              Shop Now
            </Link>
            {/* <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp hidden py-2 md:inline-flex"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp Us
          </a> */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-full p-2.5 hover:bg-blush lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searching && (
            <motion.form
              role="search"
              onSubmit={onSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-rose-light/20"
            >
              <div className="container-x flex gap-2 py-3">
                <label htmlFor="site-search" className="sr-only">
                  Search nail sets
                </label>
                <input
                  id="site-search"
                  name="q"
                  type="search"
                  autoFocus
                  placeholder="Search designs, e.g. bridal, chrome…"
                  className="input"
                />
                <button className="btn-primary">Search</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </header>

      {/* Outside <header>: its backdrop-blur would make it the containing block for fixed children */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-burgundy/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-cream shadow-soft"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-18 items-center justify-between border-b border-rose-light/20 px-5">
                <img src="/images/logo.webp" alt="" width={64} height={65} className="h-12 w-auto" />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2.5 hover:bg-blush"
                  aria-label="Close menu"
                  autoFocus
                >
                  <X className="size-6" />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto px-5 py-4">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      end={n.to === '/'}
                      className={({ isActive }) =>
                        `block border-b border-rose-light/15 py-4 font-serif text-xl ${isActive ? 'text-rose' : ''}`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-rose-light/20 p-5">
                <Link to="/products" className="btn-primary w-full">
                  Shop Now
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp Us
                </a>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-burgundy text-white/80">
      <div className="mx-8 grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-serif text-3xl text-white">Serenity Nails</p>
          <p className="mt-1 font-script text-2xl text-rose-light">Beautiful Nails, Happier You</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Handcrafted press-on nail sets, hand-painted with love. Salon-worthy nails in minutes — order
            easily on WhatsApp.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-white uppercase">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-rose-light">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-white uppercase">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {['Bridal', 'Glam', 'Chrome', 'Floral', 'Minimal'].map((c) => (
              <li key={c}>
                <Link to={`/products?category=${c}`} className="hover:text-rose-light">
                  {c} Nails
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-white uppercase">
            Get in Touch
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:+${SITE.whatsapp}`} className="flex items-center gap-2 hover:text-rose-light">
                <Phone className="size-4" aria-hidden /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-rose-light">
                <Mail className="size-4 shrink-0" aria-hidden />
                <span className="break-all">{SITE.email}</span>
              </a>
            </li>
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-rose-light"
              >
                <InstagramIcon className="size-4" /> @{SITE.instagram}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-rose-light"
              >
                <WhatsAppIcon className="size-4" /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-5 text-xs text-white/60">
          © {new Date().getFullYear()} Serenity Nails. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded bg-wine px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      {/* key: remount closes menus on navigation */}
      <Header key={pathname} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#1f8f4e] text-white shadow-soft transition hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <ScrollRestoration />
    </>
  );
}
