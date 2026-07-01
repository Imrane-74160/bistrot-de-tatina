import { cn } from '@/lib/utils';

const COLORS = {
  creme: '#F4EFE1',
  jaune: '#F2B705',
  petrole: '#233D39',
} as const;

// 40 festons (arcs) de 30 unités sur une largeur de 1200.
const SCALLOPS = (() => {
  let d = 'M0 0';
  for (let i = 0; i < 40; i++) d += ' a15 14 0 0 1 30 0';
  return d + ' Z';
})();

/**
 * Bord festonné « store de bistrot » (comme les auvents de café).
 * Par défaut : suspendu SOUS l'élément parent (`top-full`), débordant sur la
 * section suivante. Surchargez la position via `className` (ex. `top-0`).
 * `aria-hidden`, aucun impact sur la mise en page (absolu, pointer-events-none).
 */
export function AwningEdge({
  color = 'creme',
  className,
}: {
  color?: keyof typeof COLORS;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 14"
      preserveAspectRatio="none"
      className={cn(
        'pointer-events-none absolute inset-x-0 top-full z-10 h-2.5 w-full',
        className,
      )}
      style={{ filter: 'drop-shadow(0 2px 2px rgba(35,61,57,0.10))' }}
    >
      <path d={SCALLOPS} fill={COLORS[color]} />
    </svg>
  );
}
