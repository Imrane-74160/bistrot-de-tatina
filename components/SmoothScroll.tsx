'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Défilement « cinématique » (Lenis) — desktop uniquement (tactile = natif).
 * Désactivé si l'utilisateur préfère réduire les animations.
 * Remonte en haut de page à chaque changement de page (sauf ancre #...).
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // On pilote nous-mêmes la position : on empêche la restauration du navigateur.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    lenisRef.current = lenis;

    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Au changement de page : repartir du haut (sauf si on vise une ancre #...).
  useEffect(() => {
    if (window.location.hash) return;

    const toTop = () => {
      const lenis = lenisRef.current;
      if (lenis) {
        // Recalcule la hauteur de la nouvelle page puis remet l'état interne à 0,
        // sinon Lenis « réécrit » l'ancienne position au frame suivant.
        lenis.resize();
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo(0, 0);
    };

    // Immédiat + après le rendu/layout de la nouvelle page (2 frames de sécurité).
    toTop();
    const r1 = requestAnimationFrame(toTop);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(toTop));
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [pathname]);

  return null;
}
