import { cn } from '@/lib/utils';

/**
 * Halos lumineux ambiants qui dérivent lentement en arrière-plan (profondeur
 * premium). À placer dans une section `relative` ; le contenu doit passer
 * au-dessus (ex. `relative z-10`). `aria-hidden`, sans interaction.
 */
export function AmbientGlow({
  className,
  tone = 'warm',
}: {
  className?: string;
  /** `warm` = jaune/terracotta (fond clair) · `cool` = sauge/jaune (fond sombre) */
  tone?: 'warm' | 'cool';
}) {
  const orbs =
    tone === 'cool'
      ? ['bg-jaune/15', 'bg-sauge/20', 'bg-terracotta/10']
      : ['bg-jaune/20', 'bg-terracotta/15', 'bg-sauge/15'];

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <span
        className={cn(
          'tatina-glow-orb absolute -left-16 top-4 h-64 w-64 rounded-full blur-3xl',
          orbs[0],
        )}
      />
      <span
        className={cn(
          'tatina-glow-orb absolute -right-10 bottom-0 h-72 w-72 rounded-full blur-3xl',
          orbs[1],
        )}
        style={{ animationDelay: '-7s' }}
      />
      <span
        className={cn(
          'tatina-glow-orb absolute left-1/2 top-1/3 h-56 w-56 rounded-full blur-3xl',
          orbs[2],
        )}
        style={{ animationDelay: '-12s' }}
      />
    </div>
  );
}
