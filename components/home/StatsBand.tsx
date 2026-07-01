import { Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { chiffresContent } from '@/lib/content';

/**
 * Bandeau « chiffres clés » (§4.5) — accent jaune, contenu centré.
 * Texte pétrole sur jaune (jamais de texte clair sur jaune, §3.3 a11y).
 */
export function StatsBand() {
  const { accroche, stats } = chiffresContent;
  return (
    <section className="bg-jaune text-petrole" aria-labelledby="stats-titre">
      <div className="container-bistrot py-14 text-center sm:py-16">
        <Reveal className="mb-10 flex items-center justify-center gap-2.5">
          <Sparkles className="size-5 shrink-0 text-terracotta" aria-hidden="true" />
          <h2
            id="stats-titre"
            className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-petrole/85"
          >
            {accroche}
          </h2>
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 110}
              variant="zoom"
              className="flex flex-col items-center gap-1"
            >
              <dd className="font-display text-6xl leading-none sm:text-7xl">
                {(() => {
                  const n = Number(stat.valeur);
                  return stat.valeur.trim() !== '' && Number.isFinite(n) ? (
                    <CountUp value={n} />
                  ) : (
                    stat.valeur
                  );
                })()}
                {stat.suffixe && (
                  <span className="text-4xl text-terracotta sm:text-5xl">
                    {stat.suffixe}
                  </span>
                )}
              </dd>
              <dt className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-petrole/85">
                {stat.label}
              </dt>
            </Reveal>
          ))}
        </dl>

        <p className="mt-10 font-mono text-[0.7rem] uppercase tracking-wider text-petrole/80">
          Comptes validés chaque année en assemblée générale
        </p>
      </div>
    </section>
  );
}
