import infos from '@/content/infos.json';

/**
 * Source unique des informations pratiques (lue depuis /content/infos.json,
 * éditable sans toucher au code). Utilisée par les metadata, le JSON-LD,
 * le header, le footer et les pages.
 */
export const site = infos;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://bistrot-tatina.fr';

/** Adresse formatée sur une ligne. */
export const adresseLigne = `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`;

/** Lien Google Maps « itinéraire ». */
export const itineraireUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${site.nom}, ${adresseLigne}`,
)}`;

/** Navigation principale (≤ 6 entrées — socle §5). */
export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'Qui sommes-nous ?' },
  { href: '/carte', label: 'Carte' },
  { href: '/evenements', label: 'Événements' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Navigation scindée pour le header (3 à gauche · logo · 3 à droite). */
export const navLeft = navLinks.slice(0, 3);
export const navRight = navLinks.slice(3, 6);
