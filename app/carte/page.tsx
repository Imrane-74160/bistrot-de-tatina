import type { Metadata } from 'next';
import { Leaf } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { MenuList } from '@/components/menu/MenuList';
import { Button } from '@/components/Button';
import { JsonLd } from '@/components/JsonLd';
import { AmbientGlow } from '@/components/decor/AmbientGlow';
import { StringLights } from '@/components/decor/StringLights';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { carteContent } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'La carte',
  description:
    'La carte du Bistrot de Tatina : bières et boissons locales, planches à partager et plat unique les soirs d’événement. Court, local, de saison, à Meythet (Annecy).',
  path: '/carte',
});

export default function CartePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'La carte', path: '/carte' },
        ])}
      />
      <PageHero
        current="La carte"
        eyebrow="À boire & à grignoter"
        title="La carte"
        intro={carteContent.intro}
        image="/images/ardoise-carte.jpg"
        imageAlt="L'ardoise de la carte écrite à la craie"
      />

      <Section tone="creme" spacing="lg" className="isolate">
        <AmbientGlow />
        <StringLights tone="light" className="mx-auto max-w-4xl" />
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 flex items-center gap-2 rounded-pill bg-sauge/10 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-petrole">
            <Leaf className="size-4 text-sauge" aria-hidden="true" />
            Produits & boissons locales privilégiés
          </p>

          <p className="mb-10 text-pretty text-lg leading-relaxed text-petrole/85">
            Au Bistrot de Tatina, on aime ce qui vient d'à côté. Nos bières et nos
            boissons sont autant que possible artisanales et issues de brasseries
            de Haute-Savoie, et nos planches de charcuterie et de fromages mettent
            à l'honneur les producteurs du bassin annécien. La carte reste courte
            et change au gré des saisons et des arrivages : c'est l'esprit d'un
            vrai bistrot de quartier à Annecy, où l'on boit et grignote bien, sans
            se ruiner, en soutenant les artisans du coin.
          </p>

          <MenuList rubriques={carteContent.rubriques} />

          <div className="mt-12 rounded-card bg-petrole p-8 text-center text-creme">
            <h2 className="text-3xl text-jaune sm:text-4xl">Un plat unique vous attend</h2>
            <p className="mx-auto mt-3 max-w-xl text-creme/90">
              Les soirs d'événement, on cuisine un plat unique fait maison.
              Découvrez-le dans l'agenda.
            </p>
            <div className="mt-6">
              <Button href="/evenements" variant="jaune">
                Voir l'agenda
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center font-mono text-[0.7rem] uppercase tracking-wider text-petrole/60">
            TODO : carte & prix réels à confirmer par l'association.
          </p>
        </div>
      </Section>
    </>
  );
}
