import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InstagramIcon, WhatsAppIcon } from '../components/BrandIcons.tsx';
import Seo from '../components/Seo.tsx';
import { products } from '../data/products.ts';
import { SITE } from '../lib/site.ts';
import { whatsappLink } from '../lib/whatsapp.ts';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  topic: z.string(),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters)').max(1000),
});
type Form = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { topic: 'General enquiry' } });

  // No backend: the form composes a WhatsApp message and opens the chat.
  const onSubmit = ({ name, topic, message }: Form) => {
    const text = `Hello Serenity Nails,\n\nName: ${name}\nTopic: ${topic}\n\n${message}\n\nThank you.`;
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  };

  const contacts = [
    { icon: WhatsAppIcon, label: 'WhatsApp', value: SITE.phoneDisplay, href: whatsappLink() },
    { icon: Phone, label: 'Call', value: SITE.phoneDisplay, href: `tel:+${SITE.whatsapp}` },
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: InstagramIcon, label: 'Instagram', value: `@${SITE.instagram}`, href: SITE.instagramUrl },
  ];

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Serenity Nails on WhatsApp, phone, email or Instagram for orders and custom nail designs."
      />
      <section className="bg-blush">
        <div className="container-x py-14 text-center">
          <p className="eyebrow">We'd love to hear from you</p>
          <h1 className="text-4xl font-medium sm:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Orders, sizing help or a custom design — message us and we'll reply soon.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-5">
        <ul className="space-y-4 lg:col-span-2">
          {contacts.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5"
              >
                <span className="grid size-12 place-items-center rounded-full bg-blush text-rose">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs tracking-widest text-muted uppercase">{label}</span>
                  <span className="block font-medium">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 rounded-3xl bg-white p-6 shadow-soft sm:p-10 lg:col-span-3"
        >
          <h2 className="text-2xl">Send us a message</h2>
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Your name
            </label>
            <input
              id="name"
              autoComplete="name"
              className="input mt-2"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-err' : undefined}
              {...register('name')}
            />
            {errors.name && (
              <p id="name-err" className="mt-1 text-sm text-rose-dark">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="topic" className="text-sm font-medium">
              Topic
            </label>
            <div className="relative mt-2">
              <select id="topic" className="input appearance-none pr-9" {...register('topic')}>
                <option>General enquiry</option>
                <option>Custom design</option>
                <option>Sizing help</option>
                {products.map((p) => (
                  <option key={p.slug}>Order: {p.name}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="input mt-2 resize-y"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-err' : undefined}
              {...register('message')}
            />
            {errors.message && (
              <p id="message-err" className="mt-1 text-sm text-rose-dark">
                {errors.message.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn-whatsapp w-full py-4">
            <WhatsAppIcon className="size-5" /> Send via WhatsApp
          </button>
        </form>
      </section>
    </>
  );
}
