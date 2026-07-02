'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * En-tête de page interne. Avec image : carte arrondie + parallaxe souris +
 * overlay + titre révélé. Sans image : bandeau pétrole. Fil d'Ariane discret.
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
  const stageRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty('--px', px.toFixed(3));
    el.style.setProperty('--py', py.toFixed(3));
  };
  const onLeave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
  };

  const Breadcrumb = (
    <nav aria-label="Fil d'Ariane">
      <ol
        className={cn(
          'flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em]',
          image ? 'text-creme/90' : 'text-creme/90',
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
          <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="hero-3d relative overflow-hidden rounded-card shadow-overlap"
          >
            {/* Image de fond : couvre toute la carte (la hauteur est imposée par
                le contenu, pas par un ratio fixe → padding haut/bas constant) */}
            <div className="hero-parallax">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1680px) 100vw, 1680px"
                className="object-cover"
              />
            </div>
            {/* Assombrissement : fort à gauche (texte) + léger voile vertical */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(35,61,57,0.95),rgba(35,61,57,0.74)_44%,rgba(35,61,57,0.38)_74%,rgba(35,61,57,0.14))]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,61,57,0.55),rgba(35,61,57,0.1)_55%,rgba(35,61,57,0.2))]"
              aria-hidden="true"
            />
            {/* Balayage de lumière unique à l'ouverture */}
            <span className="hero-sheen" aria-hidden="true" />

            {/* Contenu en flux : impose la hauteur, marge interne haut/bas identique */}
            <div className="relative z-10 flex flex-col p-6 sm:p-10 lg:p-14">
              {/* Fil d'Ariane masqué sur mobile (gain de place) */}
              <div className="mb-6 hidden sm:block">{Breadcrumb}</div>
              <div className="max-w-3xl">
                {eyebrow && (
                  <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-jaune sm:text-sm">
                    {eyebrow}
                  </p>
                )}
                <h1 className="text-balance text-4xl text-creme drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-7xl">
                  <span className="hero-line-inner">{title}</span>
                </h1>
                {intro && (
                  <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-creme/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:text-lg">
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
        {/* Fil d'Ariane masqué sur mobile (gain de place) */}
        <div className="mb-6 hidden sm:block">{Breadcrumb}</div>
        {eyebrow && (
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-jaune sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance text-4xl sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-creme/90">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
