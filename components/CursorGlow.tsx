'use client';

import { useEffect, useRef } from 'react';

/**
 * Halo lumineux qui suit le curseur avec un léger retard (lerp) et s'agrandit
 * sur les éléments interactifs. Le curseur natif reste visible (a11y).
 * Desktop uniquement (pointer: fine), désactivé en prefers-reduced-motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let scale = 1;
    let tScale = 1;
    let shown = false;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      scale += (tScale - scale) * 0.2;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        el.style.opacity = '1';
      }
      const interactive = (e.target as Element | null)?.closest?.(
        'a, button, summary, [role="button"], input, textarea, select, label',
      );
      tScale = interactive ? 1.8 : 1;
    };
    const onLeave = () => {
      shown = false;
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-9 w-9 rounded-full border-2 border-jaune/70 bg-jaune/10 opacity-0 transition-opacity duration-300 lg:block"
      style={{ boxShadow: '0 0 18px rgba(242, 183, 5, 0.25)' }}
    />
  );
}
