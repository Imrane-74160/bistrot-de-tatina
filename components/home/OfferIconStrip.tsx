import {
  Music,
  Brain,
  UtensilsCrossed,
  PartyPopper,
  Carrot,
  type LucideIcon,
} from 'lucide-react';
import { AwningEdge } from '@/components/decor/AwningEdge';
import { homeContent } from '@/lib/content';

const ICONS: Record<string, LucideIcon> = {
  Music,
  Brain,
  UtensilsCrossed,
  PartyPopper,
  Carrot,
};

/**
 * Bande d'offres — grand bandeau « auvent » jaune défilant (marquee) :
 * mots en Bebas + icônes, en boucle continue, pause au survol.
 * Une liste sr-only conserve le contenu pour lecteurs d'écran & SEO.
 */
export function OfferIconStrip() {
  const { offres } = homeContent;

  const Row = () => (
    <div className="flex shrink-0 items-center">
      {offres.map((offre) => {
        const Icon = ICONS[offre.icone] ?? PartyPopper;
        return (
          <span
            key={offre.label}
            className="inline-flex items-center whitespace-nowrap"
          >
            <Icon
              className="mx-5 size-8 shrink-0 sm:mx-7 sm:size-10"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="font-display text-4xl uppercase leading-none tracking-tight sm:text-5xl">
              {offre.label}
            </span>
            <span
              className="ml-10 text-2xl text-terracotta sm:ml-14"
              aria-hidden="true"
            >
              ✶
            </span>
          </span>
        );
      })}
    </div>
  );

  return (
    <section
      className="tatina-marquee-hover relative overflow-hidden bg-jaune text-petrole"
      aria-labelledby="offres-titre"
    >
      {/* Bord festonné d'auvent */}
      <AwningEdge color="jaune" />

      <h2 id="offres-titre" className="sr-only">
        Ce qui vous attend au bistrot
      </h2>
      <ul className="sr-only">
        {offres.map((offre) => (
          <li key={offre.label}>{offre.label}</li>
        ))}
      </ul>

      {/* Bandeau défilant (décoratif, contenu doublé pour la boucle) */}
      <div aria-hidden="true" className="tatina-marquee-band py-6 sm:py-8">
        <Row />
        <Row />
      </div>
    </section>
  );
}
