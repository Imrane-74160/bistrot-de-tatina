'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Effet « magnétique » : le contenu est légèrement attiré vers le curseur,
 * et revient en place en douceur. Désactivé si reduced-motion / sur tactile
 * (pas de mousemove). Aucun effet sur la mise en page au repos.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        'inline-flex transition-transform duration-300 ease-out',
        className,
      )}
    >
      {children}
    </span>
  );
}
