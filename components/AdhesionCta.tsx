import { HeartHandshake, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Appel à l'action « Devenir membre » (la page /adhesion n'est pas dans le menu,
 * on la met donc en avant sur plusieurs pages). Carte réutilisable.
 */
export function AdhesionCta({
  className,
  variant = 'petrole',
}: {
  className?: string;
  variant?: 'petrole' | 'jaune';
}) {
  const montant = site.adhesion?.montant?.trim();
  const dark = variant === 'petrole';

  return (
    <div
      className={cn(
        'rounded-card p-8 text-center shadow-card sm:p-12',
        dark ? 'bg-petrole text-creme' : 'bg-jaune text-petrole',
        className,
      )}
    >
      <HeartHandshake
        className={cn('mx-auto mb-4 size-10', dark ? 'text-jaune' : 'text-terracotta')}
        aria-hidden="true"
      />
      <p
        className={cn(
          'mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em]',
          dark ? 'text-jaune' : 'text-terracotta',
        )}
      >
        Rejoindre l'aventure
      </p>
      <h2
        className={cn(
          'text-balance text-4xl sm:text-5xl',
          dark ? 'text-creme' : 'text-petrole',
        )}
      >
        Devenez membre
      </h2>
      <p
        className={cn(
          'mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed',
          dark ? 'text-creme/90' : 'text-petrole/85',
        )}
      >
        Le Bistrot de Tatina est une association : en adhérant
        {montant ? ` (${montant}/an)` : ''}, vous faites vivre le lieu et
        soutenez la lutte locale contre le cancer. Pré-adhérez en ligne, réglez
        sur place.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/adhesion" variant={dark ? 'jaune' : 'petrole'}>
          Pré-adhérer en ligne
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
