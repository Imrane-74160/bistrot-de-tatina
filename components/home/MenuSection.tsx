import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { homeContent } from '@/lib/content';

/** « La carte » façon « FOOD & EATS » (§4.7) — pétrole sombre, texte + horaires + photos. */
export function MenuSection() {
  const { menu } = homeContent;
  return (
    <section className="bg-petrole text-creme" aria-labelledby="menu-titre">
      <div className="container-bistrot border-t border-creme/10 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Texte */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              id="menu-titre"
              eyebrow={menu.eyebrow}
              title={menu.titre}
              tone="light"
              as="h2"
              titleClassName="text-creme"
            />
            <p className="text-pretty text-lg leading-relaxed text-creme/90">
              {menu.texte}
            </p>

            <div>
              <Button href="/carte" variant="outline-light">
                {menu.cta}
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Photos en collage */}
          <Reveal variant="zoom" className="relative">
            <div className="overflow-hidden rounded-card shadow-overlap ring-1 ring-creme/10">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={menu.images[0].src}
                  alt={menu.images[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 -left-4 hidden w-2/5 overflow-hidden rounded-card shadow-overlap ring-4 ring-petrole sm:block">
              <div className="relative aspect-square w-full">
                <Image
                  src={menu.images[1].src}
                  alt={menu.images[1].alt}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
