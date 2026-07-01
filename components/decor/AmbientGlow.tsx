import { cn } from '@/lib/utils';

/** Bruit fractal (SVG inline) pour casser le banding des dégradés (dithering). */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Halos lumineux ambiants qui dérivent lentement en arrière-plan (profondeur).
 * Dégradés radiaux fondant vers transparent (pas de bord visible) + grain fin
 * anti-banding. À placer dans une section `isolate relative` ; passe en -z-10
 * sous le contenu. `aria-hidden`, sans interaction.
 */
export function AmbientGlow({
  className,
  tone = 'warm',
}: {
  className?: string;
  /** `warm` = jaune/terracotta (fond clair) · `cool` = sauge/jaune (fond sombre) */
  tone?: 'warm' | 'cool';
}) {
  const c =
    tone === 'cool'
      ? ['rgba(242,183,5,0.13)', 'rgba(94,140,95,0.16)', 'rgba(192,74,46,0.10)']
      : ['rgba(242,183,5,0.16)', 'rgba(192,74,46,0.13)', 'rgba(94,140,95,0.12)'];

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <span
        className="tatina-glow-orb absolute -left-[15%] -top-[20%] h-[95%] w-[70%]"
        style={{ background: `radial-gradient(closest-side, ${c[0]}, transparent)` }}
      />
      <span
        className="tatina-glow-orb absolute -right-[15%] top-[8%] h-[115%] w-[75%]"
        style={{
          background: `radial-gradient(closest-side, ${c[1]}, transparent)`,
          animationDelay: '-7s',
        }}
      />
      <span
        className="tatina-glow-orb absolute -bottom-[25%] left-[18%] h-[85%] w-[62%]"
        style={{
          background: `radial-gradient(closest-side, ${c[2]}, transparent)`,
          animationDelay: '-12s',
        }}
      />
      {/* Grain fin : dithering pour supprimer les bandes des dégradés */}
      <span
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
      />
    </div>
  );
}
