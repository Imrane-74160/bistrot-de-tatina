import { cn } from '@/lib/utils';

/**
 * Carte arrondie à coins doux, prête à se chevaucher avec les sections
 * voisines (collage éditorial §3.3). `overflow-hidden` pour les photos.
 */
export function OverlapCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card shadow-overlap',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
