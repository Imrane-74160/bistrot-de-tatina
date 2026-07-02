'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Objet décoratif « cut-out » (verre, planche, bidons…) posé en collage.
 * - Positionné en absolu via `className` (au sein d'une section `relative`).
 * - Flotte doucement (tilt de base réglable via `--rot`).
 * - Parallaxe au scroll : dérive verticale en profondeur (désactivable).
 * `aria-hidden`, sans interaction, sans impact sur la mise en page.
 * Tout est coupé en prefers-reduced-motion.
 */
export function DecorObject({
  src,
  className,
  floatDelay,
  float = true,
  parallax = 0.07,
}: {
  src: string;
  /** Position + taille + tilt éventuel, ex. "bottom-4 right-6 w-40 [--rot:-8deg]" */
  className?: string;
  floatDelay?: string;
  float?: boolean;
  /** Vitesse de parallaxe au scroll (0 = désactivée). */
  parallax?: number;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const driftRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const drift = driftRef.current;
    if (!wrap || !drift || !parallax) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      // Hors écran : inutile de calculer.
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const delta =
        (r.top + r.height / 2 - window.innerHeight / 2) * -parallax;
      drift.style.transform = `translate3d(0, ${delta.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <span
      ref={wrapRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute select-none', className)}
    >
      <span ref={driftRef} className="block will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          draggable={false}
          className={cn(
            'w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.28)]',
            float && 'tatina-float',
          )}
          style={floatDelay ? { animationDelay: floatDelay } : undefined}
        />
      </span>
    </span>
  );
}
