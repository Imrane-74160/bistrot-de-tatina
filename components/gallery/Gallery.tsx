'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { galerieContent } from '@/lib/content';

type Photo = { src: string; alt: string; categorie: string };

/** Galerie : onglets de filtrage + grille + lightbox accessible (Radix Dialog). */
export function Gallery() {
  const { categories, photos } = galerieContent;
  const [filter, setFilter] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible: Photo[] =
    filter === 'all' ? photos : photos.filter((p) => p.categorie === filter);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)),
    [visible.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, prev, next]);

  const current = openIndex === null ? null : visible[openIndex];

  return (
    <div className="flex flex-col gap-8">
      {/* Onglets de filtrage */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrer les photos"
      >
        {[{ id: 'all', label: 'Tout' }, ...categories].map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              'min-h-[44px] rounded-pill px-5 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2',
              filter === cat.id
                ? 'bg-petrole text-jaune'
                : 'border-2 border-petrole/25 text-petrole hover:border-petrole',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grille */}
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-petrole/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              aria-label={`Agrandir : ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      <Dialog.Root open={openIndex !== null} onOpenChange={(o) => !o && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-petrole/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 focus:outline-none sm:p-8"
            aria-label="Visionneuse photo"
          >
            <Dialog.Title className="sr-only">
              {current?.alt ?? 'Photo'}
            </Dialog.Title>

            {current && (
              <figure className="relative flex max-h-full w-full max-w-5xl flex-col items-center">
                <div className="relative h-[70vh] w-full">
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    className="rounded-card object-contain"
                  />
                </div>
                <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-creme/80">
                  {current.alt} · {(openIndex ?? 0) + 1}/{visible.length}
                </figcaption>
              </figure>
            )}

            {/* Contrôles */}
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-creme/10 text-creme transition-colors hover:bg-creme hover:text-petrole focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
                aria-label="Fermer"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </Dialog.Close>
            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-creme/10 text-creme transition-colors hover:bg-creme hover:text-petrole focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune sm:left-4"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-creme/10 text-creme transition-colors hover:bg-creme hover:text-petrole focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune sm:right-4"
                  aria-label="Photo suivante"
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
