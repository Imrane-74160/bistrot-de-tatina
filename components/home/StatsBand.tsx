import { Sparkles } from 'lucide-react';
import { chiffresContent } from '@/lib/content';

/**
 * Bandeau « chiffres clés » (§4.5) — accent jaune.
 * Texte pétrole sur jaune (jamais de texte clair sur jaune, §3.3 a11y).
 */
export function StatsBand() {
  const { accroche, stats } = chiffresContent;
  return (
    <section className="bg-jaune text-petrole" aria-labelledby="stats-titre">
      <div className="container-bistrot py-14 sm:py-16">
        <div className="mb-8 flex items-center gap-2.5">
          <Sparkles className="size-5 text-terracotta" aria-hidden="true" />
          <h2
            id="stats-titre"
            className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-petrole/80"
          >
            {accroche}
          </h2>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dd className="font-display text-6xl leading-none sm:text-7xl">
                {stat.valeur}
                {stat.suffixe && (
                  <span className="text-4xl text-terracotta sm:text-5xl">
                    {stat.suffixe}
                  </span>
                )}
              </dd>
              <dt className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-petrole/75">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-wider text-petrole/60">
          TODO : chiffres à confirmer avec l'association.
        </p>
      </div>
    </section>
  );
}
