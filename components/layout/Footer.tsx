import Link from 'next/link';
import { Instagram, Facebook, Phone, MapPin, Clock, Navigation } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { site, adresseLigne, itineraireUrl, navLinks } from '@/lib/site';

/** Pied de page (§5) : infos pratiques, réseaux, plan du site, liens légaux. */
export function Footer() {
  return (
    <footer className="bg-petrole text-creme">
      <div className="container-bistrot grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marque + cause */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Logo size={56} className="h-14 w-14" />
            <span className="font-display text-2xl uppercase leading-none">
              Le Bistrot
              <br />
              de Tatina
            </span>
          </div>
          <p className="text-sm leading-relaxed text-creme/88">
            Bistrot associatif et solidaire à Meythet. On boit un verre, on
            partage un moment — et tous les bénéfices vont à la lutte locale
            contre le cancer.
          </p>
          <div className="flex items-center gap-1">
            <a
              href={site.reseaux.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-creme/10 text-creme transition-colors hover:bg-jaune hover:text-petrole focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
              aria-label="Instagram (nouvel onglet)"
            >
              <Instagram className="size-5" aria-hidden="true" />
            </a>
            <a
              href={site.reseaux.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-creme/10 text-creme transition-colors hover:bg-jaune hover:text-petrole focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
              aria-label="Facebook (nouvel onglet)"
            >
              <Facebook className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Plan du site */}
        <nav aria-label="Plan du site" className="flex flex-col gap-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-jaune">
            Le site
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm text-creme/90">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={itineraireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-jaune transition-colors hover:text-creme"
              >
                <Navigation className="size-3.5" aria-hidden="true" />
                Itinéraire
              </a>
            </li>
          </ul>
        </nav>

        {/* Infos pratiques */}
        <div className="flex flex-col gap-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-jaune">
            Nous trouver
          </h2>
          <address className="flex flex-col gap-3 text-sm not-italic text-creme/90">
            <a
              href={itineraireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 transition-colors hover:text-jaune"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-jaune" aria-hidden="true" />
              <span>
                {site.adresse.rue}
                <br />
                {site.adresse.codePostal} {site.adresse.ville} (Annecy)
              </span>
            </a>
            <a
              href={`tel:${site.telephoneE164}`}
              className="flex items-center gap-2.5 transition-colors hover:text-jaune"
            >
              <Phone className="size-4 shrink-0 text-jaune" aria-hidden="true" />
              {site.telephone}
            </a>
            <p className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-jaune" aria-hidden="true" />
              <span>{site.horairesTexte}</span>
            </p>
          </address>
        </div>

        {/* Légal */}
        <nav aria-label="Informations légales" className="flex flex-col gap-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-jaune">
            Infos légales
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm text-creme/90">
            <li>
              <Link
                href="/mentions-legales"
                className="transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/mentions-legales#rgpd"
                className="transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
              >
                Confidentialité (RGPD)
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-jaune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune"
              >
                Contact &amp; presse
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-creme/10">
        <div className="container-bistrot flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-creme/82 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.nom} — Association à but non
            lucratif.
          </p>
          <p className="font-mono uppercase tracking-[0.1em]">
            Fait avec le cœur à Meythet · {site.baseline}
          </p>
        </div>
      </div>
    </footer>
  );
}
