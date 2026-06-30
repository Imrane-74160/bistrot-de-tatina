import Image from 'next/image';
import { Building2 } from 'lucide-react';
import type { Partenaire } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Grille de logos partenaires / bénéficiaires.
 * Affiche le logo si fourni, sinon une tuile placeholder avec le nom.
 */
export function PartnerLogos({
  items,
  className,
}: {
  items: Partenaire[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3',
        className,
      )}
    >
      {items.map((item) => {
        const content = (
          <>
            {item.logo ? (
              <Image
                src={item.logo}
                alt={item.nom}
                width={160}
                height={80}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <>
                <Building2
                  className="size-6 shrink-0 text-terracotta"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold leading-snug text-petrole">
                  {item.nom}
                </span>
              </>
            )}
          </>
        );
        return (
          <li key={item.nom}>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full min-h-[96px] flex-col items-center justify-center gap-2 rounded-2xl border border-petrole/12 bg-creme p-4 text-center transition-colors hover:border-petrole/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                {content}
              </a>
            ) : (
              <div className="flex h-full min-h-[96px] flex-col items-center justify-center gap-2 rounded-2xl border border-petrole/12 bg-creme p-4 text-center">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
