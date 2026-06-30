import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

// Placeholder : grille de nos photos en attendant le branchement du vrai flux.
// TODO: à confirmer client — connecter l'API Instagram ou un widget (Behold, EmbedSocial…).
const PLACEHOLDER = [
  { src: '/images/cour-fauteuils.jpg', alt: 'La cour et ses fauteuils' },
  { src: '/images/biere-blonde.jpg', alt: 'Bières blondes pression' },
  { src: '/images/deco-fleurs.jpg', alt: 'Décor de fleurs sur la tôle' },
  { src: '/images/bar-tireuses.jpg', alt: 'Les tireuses du bar' },
  { src: '/images/cour-pompe.jpg', alt: 'La pompe vintage de la cour' },
  { src: '/images/plat-tapas.jpg', alt: 'Assiette à grignoter' },
];

export function InstagramFeed({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <a
        href={site.reseaux.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.12em] text-terracotta transition-colors hover:text-petrole focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <Instagram className="size-5" aria-hidden="true" />
        {site.reseaux.instagramHandle}
      </a>
      <ul className="grid grid-cols-3 gap-2">
        {PLACEHOLDER.map((photo) => (
          <li key={photo.src}>
            <a
              href={site.reseaux.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              aria-label={`${photo.alt} — voir sur Instagram (nouvel onglet)`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 33vw, 160px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-petrole/0 transition-colors group-hover:bg-petrole/40">
                <Instagram
                  className="size-6 text-creme opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
