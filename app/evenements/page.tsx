import type { Metadata } from 'next';
import { CalendarDays, History } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { EventCard } from '@/components/events/EventCard';
import { JsonLd } from '@/components/JsonLd';
import { AdhesionCta } from '@/components/AdhesionCta';
import { FloatingSparks } from '@/components/decor/FloatingSparks';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { getUpcomingEvents, getPastEvents } from '@/lib/events';

export const metadata: Metadata = buildMetadata({
  title: 'Événements',
  description:
    'L’agenda du Bistrot de Tatina : concerts, blind tests, soirées à thème, marchés de producteurs et plats uniques. Tous nos rendez-vous à venir à Meythet (Annecy).',
  path: '/evenements',
});

export default function EvenementsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents(6);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Événements', path: '/evenements' },
        ])}
      />
      <PageHero
        current="Événements"
        eyebrow="L'agenda"
        title="Nos rendez-vous"
        intro="Concerts, blind tests, marchés de producteurs, plats uniques… On se retrouve jeudi et vendredi soir, et un peu plus quand l'envie est là."
        image="/images/bar-service.jpg"
        imageAlt="Service au bar pendant une soirée animée"
      />

      <Section tone="creme" spacing="lg">
        <SectionHeading
          eyebrow="À venir"
          title="Prochains rendez-vous"
          as="h2"
          className="mb-10"
        >
          Toute l'année, on fait vivre le bistrot avec des concerts, des blind
          tests, des soirées à thème et des marchés de producteurs. Si vous
          cherchez quoi faire le soir à Annecy ou une bonne adresse pour sortir
          en Haute-Savoie, jetez un œil à l'agenda : il y a presque toujours
          quelque chose qui se prépare derrière la porte jaune de Meythet.
        </SectionHeading>
        {upcoming.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-card border border-petrole/12 bg-petrole/5 py-16 text-center">
            <CalendarDays className="size-10 text-terracotta" aria-hidden="true" />
            <p className="max-w-md text-pretty text-petrole/85">
              Le prochain programme se prépare. Suivez-nous sur Instagram pour ne
              rien rater !
            </p>
          </div>
        )}
      </Section>

      {past.length > 0 && (
        <Section tone="petrole" spacing="lg" className="isolate">
          <FloatingSparks />
          <SectionHeading
            eyebrow="C'était au bistrot"
            title="Événements passés"
            tone="light"
            as="h2"
            titleClassName="text-creme"
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} past />
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-creme/80">
            <History className="size-4" aria-hidden="true" />
            Archive des soirées passées
          </p>
        </Section>
      )}

      {/* Devenir membre */}
      <Section tone="creme" spacing="lg">
        <AdhesionCta variant="petrole" />
      </Section>
    </>
  );
}
