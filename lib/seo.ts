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

/**
 * Communes & zones desservies autour d'Annecy (référencement local).
 * Meythet, Cran-Gevrier, Annecy-le-Vieux, Pringy et Seynod forment, avec
 * Annecy, la commune nouvelle depuis 2017 ; les autres sont limitrophes.
 */
const ZONES_DESSERVIES = [
  { '@type': 'City', name: 'Annecy' },
  { '@type': 'City', name: 'Meythet' },
  { '@type': 'City', name: 'Cran-Gevrier' },
  { '@type': 'City', name: 'Annecy-le-Vieux' },
  { '@type': 'City', name: 'Seynod' },
  { '@type': 'City', name: 'Pringy' },
  { '@type': 'City', name: 'Épagny Metz-Tessy' },
  { '@type': 'City', name: 'Poisy' },
  { '@type': 'City', name: 'Argonay' },
  { '@type': 'AdministrativeArea', name: 'Grand Annecy' },
  { '@type': 'AdministrativeArea', name: 'Haute-Savoie' },
];

/** JSON-LD LocalBusiness (BarOrPub) — affiché sur toutes les pages. */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    '@id': `${SITE_URL}/#bistrot`,
    name: site.nom,
    alternateName: 'Bistrot de Tatina — bar associatif à Annecy',
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
    areaServed: ZONES_DESSERVIES,
    servesCuisine: [
      'Bar à bières artisanales',
      'Planches & charcuterie à partager',
      'Cuisine de bistrot maison',
      'Produits locaux de Haute-Savoie',
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Cour extérieure', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Concerts & soirées à thème', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Bières & producteurs locaux', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Privatisation possible', value: true },
    ],
    maximumAttendeeCapacity: 130,
    paymentAccepted: 'Espèces, Carte bancaire',
    currenciesAccepted: 'EUR',
    publicAccess: true,
    isAccessibleForFree: true,
    keywords:
      'bistrot associatif Annecy, bar associatif Meythet, bar solidaire Haute-Savoie, ' +
      'bar à bières Annecy, concerts Annecy, sortir à Annecy, lutte contre le cancer',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday', 'Friday'],
        opens: '17:00',
        closes: '23:59',
      },
    ],
    sameAs: [site.reseaux.instagram].filter(Boolean),
    knowsAbout: [
      'Bistrot associatif et solidaire',
      'Lutte locale contre le cancer',
      'Vie locale à Annecy et en Haute-Savoie',
    ],
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(adresseLigne)}`,
  };
}

/** JSON-LD FAQPage — questions fréquentes (référencement local). */
export function faqJsonLd(items: { question: string; reponse: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.reponse,
      },
    })),
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
