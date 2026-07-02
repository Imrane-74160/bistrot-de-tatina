import type { Metadata, Viewport } from 'next';
import { display, body, mono } from '@/app/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyCallButton } from '@/components/layout/StickyCallButton';
import { BackToTop } from '@/components/BackToTop';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ScrollProgress } from '@/components/ScrollProgress';
import { PageTransition } from '@/components/PageTransition';
import { CursorGlow } from '@/components/CursorGlow';
import { localBusinessJsonLd } from '@/lib/seo';
import { site, SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.nom} — ${site.baseline}`,
    template: `%s · ${site.nom}`,
  },
  description: site.description,
  applicationName: site.nom,
  authors: [{ name: site.nom }],
  keywords: [
    'bistrot associatif Annecy',
    'bar associatif Meythet',
    'bar solidaire Annecy',
    'bar à bières Annecy',
    'bistrot Annecy',
    'sortir à Annecy',
    'que faire à Annecy le soir',
    'concerts Annecy',
    'blind test Annecy',
    'soirée à thème Annecy',
    'Meythet',
    'Cran-Gevrier',
    'Annecy-le-Vieux',
    'Haute-Savoie',
    'Grand Annecy',
    'lac d’Annecy',
    'lutte contre le cancer',
    'association solidaire Haute-Savoie',
    'privatisation soirée Annecy',
    'producteurs locaux Annecy',
  ],
  category: 'restaurant',
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: '#233D39',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-screen pb-[76px] sm:pb-0">
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '.reveal{opacity:1 !important;transform:none !important}',
            }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <PageTransition />
        <CursorGlow />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <StickyCallButton />
        <BackToTop />
      </body>
    </html>
  );
}
