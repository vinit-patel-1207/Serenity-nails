import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  link?: { to: string; label: string };
  center?: boolean;
};

export default function SectionHeading({ title, subtitle, eyebrow, link, center }: Props) {
  return (
    <div
      className={`mb-8 flex flex-wrap items-end gap-4 ${center ? 'justify-center text-center' : 'justify-between'}`}
    >
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="text-3xl font-medium sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link.to} className="group inline-flex items-center gap-1.5 text-sm font-medium text-wine">
          {link.label}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  );
}
