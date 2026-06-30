import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getEventSlugs } from '@/lib/events';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    '',
    '/a-propos',
    '/carte',
    '/evenements',
    '/galerie',
    '/contact',
    '/mentions-legales',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const events = getEventSlugs().map((slug) => ({
    url: `${SITE_URL}/evenements/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...pages, ...events];
}
