import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, UtensilsCrossed, CalendarDays } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbJsonLd, eventJsonLd } from '@/lib/seo';
import {
  getEvent,
  getEventSlugs,
  formatDateFr,
} from '@/lib/events';

export function generateStaticParams() {
  return getEventSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const event = getEvent(params.slug);
  if (!event) return { title: 'Événement introuvable' };
  return buildMetadata({
    title: event.titre,
    description: event.resume,
    path: `/evenements/${event.slug}`,
  });
}

export default function EvenementPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = getEvent(params.slug);
  if (!event) notFound();

  return (
    <>
      <JsonLd data={eventJsonLd(event)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Événements', path: '/evenements' },
          { name: event.titre, path: `/evenements/${event.slug}` },
        ])}
      />

      <PageHero
        current={event.titre}
        eyebrow="Événement"
        title={event.titre}
        image={event.image}
        imageAlt={event.resume}
      />

      <Section tone="creme" spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          {/* Contenu */}
          <article>
            <Link
              href="/evenements"
              className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-terracotta transition-colors hover:text-petrole"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Tous les événements
            </Link>

            {event.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="soft">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div
              className="prose-bistrot"
              dangerouslySetInnerHTML={{ __html: event.html }}
            />
          </article>

          {/* Aside infos */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-5 rounded-card bg-petrole p-6 text-creme shadow-card">
              <h2 className="font-display text-2xl uppercase text-jaune">
                Infos pratiques
              </h2>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-5 shrink-0 text-jaune" aria-hidden="true" />
                  <span className="capitalize">{formatDateFr(event.date)}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-jaune" aria-hidden="true" />
                  <span>Dès {event.heure}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-jaune" aria-hidden="true" />
                  <span>{event.lieu}</span>
                </li>
                {event.platUnique && (
                  <li className="flex items-start gap-3">
                    <UtensilsCrossed className="mt-0.5 size-5 shrink-0 text-jaune" aria-hidden="true" />
                    <span>
                      <span className="font-mono text-xs uppercase tracking-wider text-creme/82">
                        Plat unique
                      </span>
                      <br />
                      {event.platUnique}
                    </span>
                  </li>
                )}
              </ul>
              <Button href="/contact" variant="jaune" className="w-full justify-center">
                Réserver / nous écrire
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
