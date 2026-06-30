'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { RoundIconButton } from '@/components/RoundIconButton';

/** Bouton rond « retour en haut » (§3.3) — apparaît après défilement. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-24 right-5 z-40 transition-opacity duration-300 sm:bottom-8 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <RoundIconButton
        variant="petrole"
        aria-label="Revenir en haut de la page"
        onClick={toTop}
      >
        <ArrowUp aria-hidden="true" />
      </RoundIconButton>
    </div>
  );
}
