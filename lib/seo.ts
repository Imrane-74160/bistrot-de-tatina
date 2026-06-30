import type { Metadata } from 'next';
import { site, SITE_URL, adresseLigne } from '@/lib/site';

/**
 * Construit les métadonnées d'une page (titre + description).
 * Les images OG sont gérées par convention de fichiers (opengraph-image.tsx) :
 * la racine s'applique à tout le site, chaque segment peut surcharger.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle =
    path === '/' ? `${site.nom} — ${site.baseline}` : `${title} · ${site.nom}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      siteName: site.nom,
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

/** JSON-LD LocalBusiness (BarOrPub) — affiché sur toutes les pages. */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    '@id': `${SITE_URL}/#bistrot`,
    name: site.nom,
    slogan: site.baseline,
    description: site.description,
    url: SITE_URL,
    telephone: site.telephoneE164,
    email: site.email,
    foundingDate: String(site.fondation),
    priceRange: '€',
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.adresse.rue,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressRegion: 'Haute-Savoie',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday', 'Friday'],
        opens: '17:00',
        closes: '23:59',
      },
    ],
    sameAs: [site.reseaux.instagram, site.reseaux.facebook].filter(Boolean),
    knowsAbout: 'Association solidaire — lutte contre le cancer',
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(adresseLigne)}`,
  };
}

/** JSON-LD Event (fiche événement). */
export function eventJsonLd(event: {
  titre: string;
  date: string;
  resume: string;
  image: string;
  lieu: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.titre,
    startDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: event.resume,
    image: [`${SITE_URL}${event.image}`],
    url: `${SITE_URL}/evenements/${event.slug}`,
    location: {
      '@type': 'Place',
      name: event.lieu,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.adresse.rue,
        postalCode: site.adresse.codePostal,
        addressLocality: site.adresse.ville,
        addressCountry: 'FR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: site.nom,
      url: SITE_URL,
    },
    isAccessibleForFree: true,
  };
}

/** JSON-LD BreadcrumbList. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
