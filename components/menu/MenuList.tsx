import { Leaf } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { formatPrix } from '@/lib/content';
import type { RubriqueCarte } from '@/types';

/** Liste de la carte : rubriques + articles avec prix en Space Mono. */
export function MenuList({ rubriques }: { rubriques: RubriqueCarte[] }) {
  return (
    <div className="flex flex-col gap-14">
      {rubriques.map((rubrique) => (
        <section key={rubrique.id} aria-labelledby={`rubrique-${rubrique.id}`}>
          <div className="mb-6 border-b-2 border-petrole/15 pb-4">
            <h2
              id={`rubrique-${rubrique.id}`}
              className="text-4xl sm:text-5xl"
            >
              {rubrique.titre}
            </h2>
            {rubrique.note && (
              <p className="mt-2 text-pretty text-petrole/80">{rubrique.note}</p>
            )}
          </div>

          <ul className="flex flex-col">
            {rubrique.articles.map((article, i) => (
              <li
                key={`${rubrique.id}-${i}`}
                className="flex items-baseline gap-4 border-b border-petrole/10 py-4 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-petrole">
                      {article.nom}
                    </h3>
                    {article.local && (
                      <Badge variant="sauge" size="sm">
                        <Leaf className="size-3" aria-hidden="true" />
                        Local
                      </Badge>
                    )}
                  </div>
                  {article.description && (
                    <p className="mt-0.5 text-sm text-petrole/80">
                      {article.description}
                    </p>
                  )}
                </div>

                {/* Points de conduite (décoratifs) */}
                <span
                  className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-petrole/25 sm:block"
                  aria-hidden="true"
                />

                <span className="shrink-0 font-mono text-base font-bold text-terracotta">
                  {formatPrix(article.prix)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
