/**
 * Formatage de dates — fonctions pures, sans dépendance Node (fs/path).
 * Isolées ici pour pouvoir être importées aussi bien côté serveur que dans
 * des composants client (ex. EventCard), sans tirer `node:fs` dans le bundle.
 */

/** Date lisible en français (ex. « jeudi 3 juillet 2026 »). */
export function formatDateFr(iso: string): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Date courte (ex. « 3 juil. »). */
export function formatDateShort(iso: string): { jour: string; mois: string } {
  const d = new Date(iso);
  return {
    jour: new Intl.DateTimeFormat('fr-FR', { day: '2-digit' }).format(d),
    mois: new Intl.DateTimeFormat('fr-FR', { month: 'short' })
      .format(d)
      .replace('.', ''),
  };
}
