import { ArrowRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { EventCard } from '@/components/events/EventCard';
import { Reveal } from '@/components/Reveal';
import { getUpcomingEvents } from '@/lib/events';

/** « Prochains événements » (§4.10) — 3 cartes depuis l'agenda. */
export function UpcomingEvents() {
  const events = getUpcomingEvents(3);

  return (
    <section className="bg-creme" aria-labelledby="agenda-titre">
      <div className="container-bistrot py-16 sm:py-20 lg:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            id="agenda-titre"
            eyebrow="Le programme"
            title="Prochains rendez-vous"
            as="h2"
          />
          <Button href="/evenements" variant="outline" className="shrink-0">
            Tout l'agenda
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.slug} delay={i * 110} className="h-full">
                <EventCard event={event} />
              </Reveal>
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
      </div>
    </section>
  );
}
