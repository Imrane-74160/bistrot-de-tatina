'use client';

import { useEffect, useState } from 'react';

/** Fine barre de progression de lecture en haut de page. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
      aria-hidden="true"
    >
      <div
        className="h-full bg-jaune shadow-[0_0_10px_rgba(242,183,5,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
