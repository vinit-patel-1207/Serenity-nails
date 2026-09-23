import { MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import './index.css';

const lazy = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
});

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        // render crashes and failed chunk loads land here, header/footer stay
        ErrorBoundary: NotFound,
        children: [
          { index: true, Component: Home },
          { path: 'about', lazy: lazy(() => import('./pages/About.tsx')) },
          { path: 'nail-designs', lazy: lazy(() => import('./pages/NailDesigns.tsx')) },
          { path: 'products', lazy: lazy(() => import('./pages/Products.tsx')) },
          { path: 'products/:slug', lazy: lazy(() => import('./pages/ProductDetail.tsx')) },
          { path: 'contact', lazy: lazy(() => import('./pages/Contact.tsx')) },
          { path: '*', Component: NotFound },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>,
);
