import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Gallery } from '@/components/gallery/Gallery';
import { SectionHeading } from '@/components/SectionHeading';
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
        <SectionHeading
          eyebrow="L'ambiance en photos"
          title="Bienvenue chez nous"
          as="h2"
          className="mb-10"
        >
          De la cour végétalisée aux soirées concert, de l'ardoise de la carte
          aux bidons colorés du bar : ces images racontent mieux que des mots
          l'esprit de notre bistrot associatif à Meythet, près d'Annecy. Un
          ancien atelier transformé en lieu de vie chaleureux, où l'on se sent
          tout de suite comme à la maison.
        </SectionHeading>
        <Gallery />
      </Section>
    </>
  );
}
