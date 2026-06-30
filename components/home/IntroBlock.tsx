import { Button } from '@/components/Button';
import { AnimatedBadge } from '@/components/AnimatedBadge';
import { Reveal } from '@/components/Reveal';
import { homeContent } from '@/lib/content';

/**
 * Bloc intro façon « YOUR GO-TO FOR / GOOD TIMES » (§4.4).
 * Gauche : label mono + grand titre Bebas. Droite : paragraphe + 1 pilule.
 * Badge rond posé en chevauchement sur le bord bas (déborde sur la section sombre).
 */
export function IntroBlock() {
  const { intro } = homeContent;
  return (
    <section id="intro" className="relative bg-creme pb-20 pt-16 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="container-bistrot">
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Titre */}
          <Reveal>
            <p className="eyebrow mb-3">{intro.eyebrow}</p>
            <h2 className="text-7xl leading-[0.82] sm:text-8xl lg:text-[7.5rem]">
              <span className="block">{intro.titreLignes[0]}</span>
              <span className="block text-terracotta">{intro.titreLignes[1]}</span>
            </h2>
          </Reveal>

          {/* Paragraphe + CTA */}
          <Reveal delay={140} className="flex flex-col gap-5 lg:pb-3">
            {intro.paragraphes.map((p, i) => (
              <p
                key={i}
                className="text-pretty text-lg leading-relaxed text-petrole/85"
              >
                {p}
              </p>
            ))}
            <div>
              <Button href="/a-propos" variant="petrole">
                {intro.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Badge rond en chevauchement sur la section suivante (décoratif) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden translate-y-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="container-bistrot">
          <AnimatedBadge className="h-32 w-32 lg:h-40 lg:w-40" />
        </div>
      </div>
    </section>
  );
}
