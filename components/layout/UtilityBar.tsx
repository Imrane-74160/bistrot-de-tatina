import Link from 'next/link';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { site } from '@/lib/site';

/** Barre utilitaire fine (§4.1) : réseaux à gauche, liens courts à droite. */
export function UtilityBar() {
  return (
    <div className="hidden bg-petrole text-creme sm:block">
      <div className="container-bistrot flex h-10 items-center justify-between gap-4 text-[0.72rem]">
        <div className="flex items-center gap-1">
          <a
            href={site.reseaux.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-creme/92 transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
            aria-label="Instagram (nouvel onglet)"
          >
            <Instagram className="size-4" aria-hidden="true" />
          </a>
          <a
            href={site.reseaux.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-creme/92 transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
            aria-label="Facebook (nouvel onglet)"
          >
            <Facebook className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="flex items-center gap-5">
          <nav aria-label="Liens utilitaires">
            <ul className="flex items-center gap-4 font-mono uppercase tracking-[0.12em]">
              <li className="hidden sm:block">
                <Link
                  href="/a-propos"
                  className="transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
                >
                  Notre histoire
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/a-propos#la-cause"
                  className="transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
                >
                  La cause
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link
                  href="/contact"
                  className="transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
                >
                  Presse &amp; contact
                </Link>
              </li>
            </ul>
          </nav>
          {/* Téléphone (desktop) — caché sur mobile où la barre sticky le reprend */}
          <a
            href={`tel:${site.telephoneE164}`}
            className="hidden items-center gap-1.5 font-mono font-bold uppercase tracking-[0.1em] text-jaune transition-colors hover:text-creme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune lg:inline-flex"
            aria-label={`Appeler le ${site.telephone}`}
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {site.telephone}
          </a>
        </div>
      </div>
    </div>
  );
}
