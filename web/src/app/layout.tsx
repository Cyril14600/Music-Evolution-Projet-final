import type { Metadata } from 'next';
import './app.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';
import PageAnimations from '@/components/PageAnimations';
import PageTransition from '@/components/PageTransition';
import { ToastProvider } from '@/context/ToastContext';
import Loader from '@/components/Loader';

import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MusicEvolution14 - DJ & Décoration Événementielle',
  description: 'Animation musicale et décoration événementielle sur mesure en Basse-Normandie.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero-poster.webp" />
      </head>
      <body>
        <Loader />
        <SmoothScroll>
          <ToastProvider>
            <PageAnimations />
            <Header />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
            <ScrollToTop />
          </ToastProvider>
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "MusicEvolution14",
              "description": "Animation musicale et décoration événementielle sur mesure en Basse-Normandie.",
              "url": "https://musicevolution14.fr",
              "telephone": "+33659949229",
              "email": "musicevolution144@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Livry",
                "addressLocality": "Livry",
                "addressRegion": "Calvados",
                "postalCode": "14240",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 49.1052,
                "longitude": -0.7736
              },
              "areaServed": ["Calvados", "Manche", "Orne", "Eure", "Seine-Maritime"],
              "priceRange": "€€",
              "sameAs": [
                "https://www.facebook.com/musicevolution14",
                "https://www.instagram.com/musicevolution14"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}

// Force HMR Update
