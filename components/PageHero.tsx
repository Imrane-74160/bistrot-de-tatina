import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * En-tête de page interne. Avec image : carte arrondie + overlay + titre.
 * Sans image : bandeau pétrole. Inclut un fil d'Ariane discret.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = '',
  current,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  /** Libellé de la page courante (fil d'Ariane). */
  current: string;
}) {
  const Breadcrumb = (
    <nav aria-label="Fil d'Ariane">
      <ol
        className={cn(
          'flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em]',
          image ? 'text-creme/80' : 'text-creme/70',
        )}
      >
        <li>
          <Link href="/" className="transition-colors hover:text-jaune">
            Accueil
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li className="text-jaune" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );

  if (image) {
    return (
      <section className="bg-creme pt-4 sm:pt-6">
        <div className="container-bistrot">
          <div className="relative overflow-hidden rounded-card shadow-overlap">
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9] lg:aspect-[21/8]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1680px) 100vw, 1680px"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,61,57,0.92),rgba(35,61,57,0.45)_55%,rgba(35,61,57,0.25))]"
                aria-hidden="true"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
              {Breadcrumb}
              <div className="max-w-3xl">
                {eyebrow && (
                  <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-jaune sm:text-sm">
                    {eyebrow}
                  </p>
                )}
                <h1 className="text-balance text-5xl text-creme drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl">
                  {title}
                </h1>
                {intro && (
                  <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-creme/90 sm:text-lg">
                    {intro}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-petrole text-creme">
      <div className="container-bistrot py-12 sm:py-16 lg:py-20">
        <div className="mb-6">{Breadcrumb}</div>
        {eyebrow && (
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-jaune sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-creme/85">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
