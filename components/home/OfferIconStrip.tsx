import {
  Music,
  Brain,
  UtensilsCrossed,
  PartyPopper,
  Carrot,
  type LucideIcon,
} from 'lucide-react';
import { homeContent } from '@/lib/content';

const ICONS: Record<string, LucideIcon> = {
  Music,
  Brain,
  UtensilsCrossed,
  PartyPopper,
  Carrot,
};

/** Bande d'offres façon « PING PONG / DARTS… » (§4.8) — icônes trait fin jaune. */
export function OfferIconStrip() {
  const { offres } = homeContent;
  return (
    <section className="bg-creme" aria-labelledby="offres-titre">
      <div className="container-bistrot py-14 sm:py-16">
        <h2 id="offres-titre" className="sr-only">
          Ce qui vous attend au bistrot
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {offres.map((offre) => {
            const Icon = ICONS[offre.icone] ?? PartyPopper;
            return (
              <li
                key={offre.label}
                className="flex flex-col items-center gap-4 text-center"
              >
                <Icon
                  className="size-14 text-jaune sm:size-16"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <span className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-petrole">
                  {offre.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
