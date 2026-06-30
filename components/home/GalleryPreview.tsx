import Image from 'next/image';
import { ArrowRight, Camera } from 'lucide-react';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { homeContent } from '@/lib/content';

/** Aperçu de la galerie (§ aperçu page Galerie) — grille de photos vers /galerie. */
export function GalleryPreview() {
  const { galerie } = homeContent;
  return (
    <section className="bg-petrole text-creme" aria-labelledby="galerie-titre">
      <div className="container-bistrot py-16 sm:py-20 lg:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            id="galerie-titre"
            eyebrow={galerie.eyebrow}
            title={galerie.titre}
            tone="light"
            as="h2"
            titleClassName="text-creme"
          >
            <span className="text-creme/80">{galerie.texte}</span>
          </SectionHeading>
          <Button href="/galerie" variant="jaune" className="shrink-0">
            <Camera aria-hidden="true" />
            {galerie.cta}
          </Button>
        </div>

        {/* Grille mosaïque : 1ʳᵉ photo en grand */}
        <Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {galerie.images.map((photo, i) => (
            <li
              key={photo.src}
              className={
                i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''
              }
            >
              <div
                className={`relative w-full overflow-hidden rounded-card ring-1 ring-creme/10 ${
                  i === 0 ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-square'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </li>
          ))}
          </ul>
        </Reveal>

        <Button
          href="/galerie"
          variant="outline-light"
          className="mt-8 w-full justify-center sm:hidden"
        >
          {galerie.cta}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
