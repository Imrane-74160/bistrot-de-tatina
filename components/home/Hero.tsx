import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { RoundIconButton } from '@/components/RoundIconButton';
import { homeContent } from '@/lib/content';

/**
 * Hero plein cadre en carte arrondie (§4.3).
 * Photo de façade (container jaune + nom à gauche) : titre Bebas 3 lignes
 * aligné à droite pour ne pas masquer l'enseigne, flèche en bas à gauche.
 */
export function Hero() {
  const { hero } = homeContent;
  return (
    <section className="bg-creme pt-4 sm:pt-6" aria-labelledby="hero-titre">
      <div className="container-bistrot">
        <div className="relative overflow-hidden rounded-card shadow-overlap">
          {/* Photo immersive — hauteur calée sur l'écran sur desktop (jamais coupée) */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-[calc(100svh-9rem)] lg:max-h-[760px] lg:min-h-[520px]">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1680px) 100vw, 1680px"
              className="tatina-kenburns object-cover object-[28%_center]"
            />
            {/* Dégradés : sombre en bas (titre) + à droite (lisibilité), container jaune préservé à gauche */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,61,57,0.95),rgba(35,61,57,0.55)_45%,rgba(35,61,57,0.12)_82%)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(to_left,rgba(35,61,57,0.75),rgba(35,61,57,0.1)_52%,transparent_70%)]"
              aria-hidden="true"
            />
          </div>

          {/* Titre superposé, en bas à droite (l'enseigne reste visible à gauche) */}
          <div className="absolute inset-0 flex flex-col items-end justify-end p-6 text-right sm:p-10 lg:p-14">
            <h1
              id="hero-titre"
              className="font-display uppercase leading-[0.82] text-creme drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
            >
              {hero.titre.map((ligne, i) => (
                <span key={i} className="block text-[clamp(2.75rem,12vw,14rem)]">
                  {ligne}
                </span>
              ))}
            </h1>
          </div>

          {/* Flèche de défilement, bas-gauche */}
          <div className="absolute bottom-6 left-6">
            <RoundIconButton
              href="#intro"
              variant="jaune"
              size="lg"
              aria-label="Faire défiler vers le contenu"
            >
              <ArrowDown aria-hidden="true" />
            </RoundIconButton>
          </div>
        </div>
      </div>
    </section>
  );
}
