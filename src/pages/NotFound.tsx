import { Link, useRouteError } from 'react-router';
import Seo from '../components/Seo.tsx';

export default function NotFound() {
  const error = useRouteError(); // set only when rendered as the ErrorBoundary
  if (error) console.error(error);
  const crashed = Boolean(error);

  return (
    <section className="container-x grid min-h-[70vh] place-items-center py-20 text-center">
      <Seo
        title={crashed ? 'Something went wrong' : 'Page not found'}
        description="This page could not be found."
      />
      <div>
        <p className="font-serif text-8xl text-rose-light">{crashed ? 'Oops' : '404'}</p>
        <h1 className="mt-4 text-3xl">{crashed ? 'Something went wrong' : 'This page slipped off'}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {crashed
            ? 'Please refresh the page or try again in a moment.'
            : "We couldn't find the page you're looking for. Let's get you back to something beautiful."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/products" className="btn-outline">
            Shop Products
          </Link>
        </div>
      </div>
    </section>
  );
}
