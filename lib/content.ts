import carte from '@/content/carte.json';
import chiffres from '@/content/chiffres.json';
import partenaires from '@/content/partenaires.json';
import home from '@/content/home.json';
import galerie from '@/content/galerie.json';
import faq from '@/content/faq.json';
import type { Chiffre, Partenaire, RubriqueCarte } from '@/types';

/** Contenu éditable de la page d'accueil. */
export const homeContent = home;

/** Questions fréquentes (FAQ + balisage FAQPage). */
export const faqContent = {
  eyebrow: faq.eyebrow,
  titre: faq.titre,
  intro: faq.intro,
  questions: faq.questions as { question: string; reponse: string }[],
};

/** Carte (restauration + boissons). */
export const carteContent = {
  intro: carte.intro,
  rubriques: carte.rubriques as RubriqueCarte[],
};

/** Chiffres clés d'impact. */
export const chiffresContent = {
  accroche: chiffres.accroche,
  stats: chiffres.stats as Chiffre[],
  parAnnee: chiffres.parAnnee,
};

/** Partenaires & bénéficiaires. */
export const partenairesContent = {
  transparence: partenaires.transparence,
  beneficiaires: partenaires.beneficiaires as Partenaire[],
  partenaires: partenaires.partenaires as Partenaire[],
};

/** Galerie photo (catégories + photos). */
export const galerieContent = {
  categories: galerie.categories as { id: string; label: string }[],
  photos: galerie.photos as { src: string; alt: string; categorie: string }[],
};

/**
 * Formate un prix. Accepte un nombre, une chaîne numérique (« 3.5 » / « 3,50 »
 * — comme saisi via le CMS) ou un texte libre (« selon arrivage »).
 */
export function formatPrix(prix: number | string): string {
  const num =
    typeof prix === 'number'
      ? prix
      : (() => {
          const cleaned = prix.trim().replace(',', '.');
          if (cleaned === '' || isNaN(Number(cleaned))) return null;
          return Number(cleaned);
        })();

  if (num !== null && Number.isFinite(num)) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
    }).format(num);
  }
  return String(prix);
}
