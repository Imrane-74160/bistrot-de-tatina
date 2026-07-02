'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Décalage d'apparition en ms (pour effet « stagger »). */
  delay?: number;
  /** Animation : remontée (défaut), zoom doux, fondu simple, ou bascule 3D. */
  variant?: 'up' | 'zoom' | 'fade' | 'tilt';
};

/**
 * Révèle son contenu en douceur quand il entre dans le viewport
 * (IntersectionObserver). Respecte `prefers-reduced-motion` et reste visible
 * sans JavaScript (cf. <noscript> dans le layout).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-variant={variant}
      className={cn('reveal', inView && 'reveal--in', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
