import { cn } from '@/lib/utils';

/** Couleurs d'ampoules — reprises du logo (jaune, terracotta, ambre, sauge, crème). */
const BULB_COLORS = ['#F2B705', '#C04A2E', '#D89137', '#5E8C5F', '#F4EFE1'];

/**
 * Guirlande lumineuse décorative (inspirée de l'enseigne du logo).
 * Un fil qui drape en douceur, des ampoules qui scintillent en décalé.
 * À poser en haut d'une section (dans la marge interne) : `aria-hidden`,
 * sans interaction, sans impact sur la mise en page.
 */
export function StringLights({
  className,
  tone = 'light',
  count = 16,
}: {
  className?: string;
  /** `light` = fil sombre (fond clair) · `dark` = fil clair (fond sombre) */
  tone?: 'light' | 'dark';
  count?: number;
}) {
  const W = 1200;
  const H = 64;
  const pin = 5;
  const sag = 22;
  const wireY = (t: number) => pin + Math.sin(Math.PI * t) * sag;
  const wire =
    tone === 'dark' ? 'rgba(244,239,225,0.45)' : 'rgba(35,61,57,0.32)';

  // Tracé du fil (échantillonné pour un joli drapé).
  let d = `M 0 ${wireY(0).toFixed(1)}`;
  for (let i = 1; i <= 48; i++) {
    const t = i / 48;
    d += ` L ${(t * W).toFixed(1)} ${wireY(t).toFixed(1)}`;
  }

  const bulbs = Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    return {
      left: t * 100,
      top: wireY(t),
      color: BULB_COLORS[i % BULB_COLORS.length],
      delay: ((i * 0.19) % 2.6).toFixed(2),
    };
  });

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute left-1/2 top-0 h-16 w-full -translate-x-1/2 overflow-visible',
        className,
      )}
    >
      <div className="tatina-sway relative h-full w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height={H}
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0"
        >
          <path
            d={d}
            fill="none"
            stroke={wire}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>

        {bulbs.map((b, i) => (
          <span
            key={i}
            className="tatina-twinkle absolute"
            style={{ left: `${b.left}%`, top: `${b.top}px`, animationDelay: `${b.delay}s` }}
          >
            {/* Attache */}
            <span
              className="absolute top-0 h-2 w-px -translate-x-1/2"
              style={{ background: wire }}
            />
            {/* Halo */}
            <span
              className="absolute top-2 h-4 w-4 -translate-x-1/2 rounded-full opacity-60 blur-[3px]"
              style={{ background: b.color }}
            />
            {/* Ampoule */}
            <span
              className="absolute top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
              style={{ background: b.color, boxShadow: `0 0 7px ${b.color}` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
