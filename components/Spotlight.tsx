'use client';

import { useEffect, useRef } from 'react';

/**
 * Halo lumineux (jaune) qui suit la souris sur la section parente.
 * À placer comme premier enfant d'une section `relative` (fond sombre),
 * le contenu devant être en `relative z-10`. Désactivé si reduced-motion.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
      el.classList.add('tatina-spot--on');
    };
    const onLeave = () => el.classList.remove('tatina-spot--on');

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="tatina-spot" aria-hidden="true" />;
}
