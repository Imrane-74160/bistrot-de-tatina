import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Evenement, EvenementMeta } from '@/types';

const EVENTS_DIR = path.join(process.cwd(), 'content', 'evenements');

marked.setOptions({ gfm: true, breaks: false });

function readAll(): Evenement[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];
  return fs
    .readdirSync(EVENTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(EVENTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      // YAML peut transformer une date non quotée en objet Date → on normalise en « AAAA-MM-JJ ».
      const rawDate = data.date;
      const date =
        rawDate instanceof Date
          ? rawDate.toISOString().slice(0, 10)
          : String(rawDate ?? '');
      return {
        slug,
        titre: data.titre ?? slug,
        date,
        heure: data.heure ?? '',
        resume: data.resume ?? '',
        image: data.image ?? '/images/atelier-mural.jpg',
        platUnique: data.platUnique ?? undefined,
        tags: Array.isArray(data.tags) ? data.tags : [],
        lieu: data.lieu ?? 'Le Bistrot de Tatina',
        contenu: content,
      } satisfies Evenement;
    });
}

const toMeta = ({ contenu: _contenu, ...meta }: Evenement): EvenementMeta => meta;

/** Début du jour courant (pour départager à venir / passés). */
function startOfToday(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

/** Tous les événements (méta), du plus proche au plus lointain. */
export function getAllEvents(): EvenementMeta[] {
  return readAll()
    .map(toMeta)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Événements à venir (aujourd'hui inclus), triés du plus proche au plus lointain. */
export function getUpcomingEvents(limit?: number): EvenementMeta[] {
  const today = startOfToday();
  const list = getAllEvents().filter(
    (e) => new Date(e.date).getTime() >= today,
  );
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

/** Événements passés, du plus récent au plus ancien. */
export function getPastEvents(limit?: number): EvenementMeta[] {
  const today = startOfToday();
  const list = getAllEvents()
    .filter((e) => new Date(e.date).getTime() < today)
    .reverse();
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function getEventSlugs(): string[] {
  return readAll().map((e) => e.slug);
}

/** Un événement complet + son contenu rendu en HTML. */
export function getEvent(
  slug: string,
): (Evenement & { html: string }) | null {
  const ev = readAll().find((e) => e.slug === slug);
  if (!ev) return null;
  return { ...ev, html: marked.parse(ev.contenu) as string };
}

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
