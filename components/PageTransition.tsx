'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AwningEdge } from '@/components/decor/AwningEdge';

const COVER_MS = 430;

/**
 * Transition de page « rideau de store » : au clic sur un lien interne, un
 * store pétrole au bord festonné descend (logo au centre), la navigation se
 * fait à couvert (le scroll se remet à 0 sans que ça se voie), puis le store
 * remonte sur la nouvelle page. Désactivé en prefers-reduced-motion ; les
 * clics modifiés (ctrl/cmd…), les ancres même page et les liens externes
 * gardent leur comportement natif.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);

  // Interception des clics sur liens internes.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || a.target === '_blank' || a.hasAttribute('download')) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Ancres et liens vers la page courante : comportement natif.
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      if (busyRef.current) return;
      busyRef.current = true;
      pendingRef.current = url.pathname + url.search + url.hash;
      setPhase('cover');
      window.setTimeout(() => {
        if (pendingRef.current) router.push(pendingRef.current);
      }, COVER_MS);
    };

    // Phase capture : passer AVANT le handler de <Link> (qui fait son propre
    // preventDefault) — notre preventDefault le neutralise ensuite proprement.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  // Nouvelle page montée → on relève le store.
  useEffect(() => {
    const pending = pendingRef.current;
    if (!pending) return;
    if (pathname !== pending.split(/[?#]/)[0]) return;
    pendingRef.current = null;
    const t1 = window.setTimeout(() => setPhase('reveal'), 80);
    const t2 = window.setTimeout(() => {
      setPhase('idle');
      busyRef.current = false;
    }, 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  // Filet de sécurité : si la navigation échoue, on libère l'écran.
  useEffect(() => {
    if (phase !== 'cover') return;
    const t = window.setTimeout(() => {
      pendingRef.current = null;
      setPhase('reveal');
      window.setTimeout(() => {
        setPhase('idle');
        busyRef.current = false;
      }, 600);
    }, 2600);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div
      aria-hidden="true"
      data-phase={phase}
      className={`tatina-curtain fixed inset-0 z-[100] ${
        phase === 'idle' ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      <div className="relative h-full w-full bg-petrole">
        {/* Bord festonné : le bas du store qui descend */}
        <AwningEdge color="petrole" className="h-3" />
        {phase !== 'idle' && (
          <div className="flex h-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt=""
              className="tatina-curtain-logo h-24 w-24 sm:h-28 sm:w-28"
            />
          </div>
        )}
      </div>
    </div>
  );
}
