import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Gallery } from '@/components/gallery/Gallery';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Galerie',
  description:
    'En images : le lieu, la cour, le bar, les soirées et la déco fonderie du Bistrot de Tatina à Meythet (Annecy).',
  path: '/galerie',
});

export default function GaleriePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Galerie', path: '/galerie' },
        ])}
      />
      <PageHero
        current="Galerie"
        eyebrow="En images"
        title="La galerie"
        intro="Le lieu, la cour, les soirées, la déco… Un aperçu de l'ambiance qui vous attend."
        image="/images/cour-pergola.jpg"
        imageAlt="La cour et sa pergola végétalisée"
      />

      <Section tone="creme" spacing="lg">
        <Gallery />
      </Section>
    </>
  );
}
