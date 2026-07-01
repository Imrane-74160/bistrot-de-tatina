import { cn } from '@/lib/utils';

/** Positions/tailles des étincelles (réparties, non alignées pour un rendu naturel). */
const SPARKS = [
  { left: 8, top: 22, size: 6, color: '#F2B705', delay: 0 },
  { left: 20, top: 68, size: 4, color: '#D89137', delay: 1.4 },
  { left: 34, top: 12, size: 5, color: '#F4EFE1', delay: 2.6 },
  { left: 52, top: 44, size: 4, color: '#F2B705', delay: 0.8 },
  { left: 68, top: 74, size: 6, color: '#C04A2E', delay: 3.2 },
  { left: 80, top: 20, size: 4, color: '#5E8C5F', delay: 1.9 },
  { left: 92, top: 56, size: 5, color: '#F2B705', delay: 2.2 },
];

/**
 * Étincelles lumineuses qui montent et scintillent (accent décoratif inspiré
 * des ampoules du logo). `aria-hidden`, sans interaction, sans impact layout.
 */
export function FloatingSparks({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="tatina-spark absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            height: `${s.size}px`,
            width: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 8px ${s.color}`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
