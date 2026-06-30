import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { IntroBlock } from '@/components/home/IntroBlock';
import { StorySection } from '@/components/home/StorySection';
import { MenuSection } from '@/components/home/MenuSection';
import { OfferIconStrip } from '@/components/home/OfferIconStrip';
import { PhotoBandTabs } from '@/components/home/PhotoBandTabs';
import { UpcomingEvents } from '@/components/home/UpcomingEvents';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { ContactPreview } from '@/components/home/ContactPreview';

export const metadata: Metadata = {
  description:
    'Bistrot associatif et solidaire à Meythet (Annecy), dans un ancien atelier de chaudronnerie. On boit un verre qui a du sens : tous les bénéfices vont à la lutte locale contre le cancer. Événements, carte locale, cour extérieure.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */} <Hero />
      {/* Intro + badge */} <IntroBlock />
      {/* Aperçu « Qui sommes-nous ? » */} <StorySection />
      {/* Aperçu « Carte » */} <MenuSection />
      {/* Bande d'offres */} <OfferIconStrip />
      {/* Bande photo + onglets */} <PhotoBandTabs />
      {/* Aperçu « Événements » */} <UpcomingEvents />
      {/* Aperçu « Galerie » */} <GalleryPreview />
      {/* Aperçu « Contact » */} <ContactPreview />
    </>
  );
}
