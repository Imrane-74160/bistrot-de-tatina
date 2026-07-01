import { cn } from '@/lib/utils';

/**
 * Objet décoratif « cut-out » (verre, planche, shaker…) posé en collage.
 * Positionné en absolu via `className` (au sein d'une section `relative`),
 * flotte doucement, ombre portée pour le relief. `aria-hidden`, sans interaction,
 * sans impact sur la mise en page. Tilt de base réglable via `--rot`.
 */
export function DecorObject({
  src,
  className,
  floatDelay,
  float = true,
}: {
  src: string;
  /** Position + taille + tilt éventuel, ex. "bottom-4 right-6 w-40 [--rot:-8deg]" */
  className?: string;
  floatDelay?: string;
  float?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable={false}
      className={cn(
        'pointer-events-none absolute select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.28)]',
        float && 'tatina-float',
        className,
      )}
      style={floatDelay ? { animationDelay: floatDelay } : undefined}
    />
  );
}
