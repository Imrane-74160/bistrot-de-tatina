import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

/** Bulles réparties naturellement (positions, tailles, vitesses variées). */
const BUBBLES = [
  { left: 6, size: 10, dur: 9, delay: 0, sway: 12 },
  { left: 14, size: 6, dur: 11, delay: 2.5, sway: -10 },
  { left: 26, size: 8, dur: 8.5, delay: 1.2, sway: 16 },
  { left: 38, size: 5, dur: 12, delay: 4, sway: -14 },
  { left: 52, size: 9, dur: 9.5, delay: 0.8, sway: 10 },
  { left: 64, size: 6, dur: 10.5, delay: 3.2, sway: -12 },
  { left: 76, size: 11, dur: 8, delay: 1.8, sway: 14 },
  { left: 88, size: 7, dur: 11.5, delay: 4.6, sway: -16 },
  { left: 95, size: 5, dur: 9, delay: 2.2, sway: 8 },
];

/**
 * Bulles de bière qui montent doucement dans les sections sombres (clin d'œil
 * au comptoir). `aria-hidden`, sans interaction, sous le contenu (-z-10, le
 * parent doit être `relative isolate`). Masquées en prefers-reduced-motion.
 */
export function BeerBubbles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="tatina-bubble"
          style={
            {
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              '--dur': `${b.dur}s`,
              '--delay': `${b.delay}s`,
              '--sway': `${b.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
