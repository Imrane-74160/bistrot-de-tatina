'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Conteneur en relief 3D suivant le curseur (+ reflet optionnel) — même effet
 * que les cartes événements. Réutilisable autour de n'importe quel contenu.
 * Aucun effet au repos ; désactivé en prefers-reduced-motion.
 */
export function Tilt({
  children,
  className,
  max = 8,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('tatina-tilt relative', className)}
    >
      {children}
      {glare && <span aria-hidden="true" className="tatina-tilt-glare" />}
    </div>
  );
}
