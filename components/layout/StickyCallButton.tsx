import { Phone, Navigation } from 'lucide-react';
import { site, itineraireUrl } from '@/lib/site';

/**
 * Barre d'action sticky mobile (§3.3 a11y) : téléphone clic-pour-appeler
 * toujours visible + itinéraire. Masquée sur desktop.
 */
export function StickyCallButton() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-petrole/10 bg-creme/95 backdrop-blur sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={`tel:${site.telephoneE164}`}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill bg-petrole px-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-jaune"
          aria-label={`Appeler le ${site.telephone}`}
        >
          <Phone className="size-5" aria-hidden="true" />
          Appeler
        </a>
        <a
          href={itineraireUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill bg-jaune px-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-petrole"
        >
          <Navigation className="size-5" aria-hidden="true" />
          Itinéraire
        </a>
      </div>
    </div>
  );
}
