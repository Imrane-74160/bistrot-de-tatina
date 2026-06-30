'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUp, Beer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoundIconButton } from '@/components/RoundIconButton';
import { homeContent } from '@/lib/content';

/**
 * Bande photo + mot répété + onglets pilule façon « GOOD TIMES » (§4.9).
 * Bandeau marquee (mot répété) au-dessus de la photo, onglets pilule en dessous.
 */
export function PhotoBandTabs() {
  const { photoband } = homeContent;
  const [active, setActive] = useState(0);
  const current = photoband.onglets[active];

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  // Séquence répétée (x2 pour une boucle marquee sans couture)
  const motifs = Array.from({ length: 6 });

  return (
    <section className="bg-creme pb-16 pt-4" aria-labelledby="photoband-titre">
      <h2 id="photoband-titre" className="sr-only">
        Découvrir le bistrot en images
      </h2>
      <div className="container-bistrot">
        <div className="overflow-hidden rounded-card shadow-overlap">
          {/* Bandeau mot répété */}
          <div className="overflow-hidden bg-terracotta py-3 sm:py-4">
            <div className="tatina-marquee flex w-max items-center gap-6 sm:gap-10">
              {[...motifs, ...motifs].map((_, i) => (
                <span
                  key={i}
                  className="flex items-center gap-6 font-display text-4xl uppercase leading-none text-creme sm:gap-10 sm:text-5xl lg:text-6xl"
                  aria-hidden="true"
                >
                  {photoband.mot}
                  <Beer className="size-6 text-creme/90 sm:size-8" />
                </span>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              key={current.id}
              src={current.image}
              alt={current.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-petrole/15" aria-hidden="true" />
            <div className="absolute bottom-5 right-5">
              <RoundIconButton
                variant="creme"
                aria-label="Revenir en haut de la page"
                onClick={toTop}
              >
                <ArrowUp aria-hidden="true" />
              </RoundIconButton>
            </div>
          </div>
        </div>

        {/* Onglets pilule */}
        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Catégories de photos"
        >
          {photoband.onglets.map((onglet, i) => (
            <button
              key={onglet.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'min-h-[44px] rounded-pill px-5 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2',
                i === active
                  ? 'bg-petrole text-jaune'
                  : 'border-2 border-petrole/25 text-petrole hover:border-petrole',
              )}
            >
              {onglet.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
