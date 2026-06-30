'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { formatDateShort, formatDateFr } from '@/lib/dates';
import type { EvenementMeta } from '@/types';
import { cn } from '@/lib/utils';

/** Carte événement avec relief 3D au survol (suit le curseur) + reflet. */
export function EventCard({
  event,
  className,
  past = false,
}: {
  event: EvenementMeta;
  className?: string;
  past?: boolean;
}) {
  const { jour, mois } = formatDateShort(event.date);
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - py) * 9}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 9}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        'tatina-tilt group relative flex flex-col overflow-hidden rounded-card bg-creme shadow-card ring-1 ring-petrole/10 transition-shadow duration-300 hover:shadow-overlap',
        past && 'opacity-90',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            'object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110',
            past && 'grayscale-[0.3]',
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <div className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-jaune text-petrole shadow-card">
          <span className="font-display text-3xl leading-none">{jour}</span>
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-wider">
            {mois}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {event.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="soft" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="text-2xl leading-tight">
          <Link
            href={`/evenements/${event.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {event.titre}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-petrole/85">
          {event.resume}
        </p>

        <dl className="mt-auto flex flex-col gap-1.5 font-mono text-xs text-petrole/80">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Date et heure</dt>
            <Clock className="size-3.5 shrink-0 text-terracotta" aria-hidden="true" />
            <dd className="capitalize">
              {formatDateFr(event.date)} · {event.heure}
            </dd>
          </div>
          {event.platUnique && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Plat unique</dt>
              <UtensilsCrossed className="size-3.5 shrink-0 text-terracotta" aria-hidden="true" />
              <dd>{event.platUnique}</dd>
            </div>
          )}
          <div className="flex items-center gap-2">
            <dt className="sr-only">Lieu</dt>
            <MapPin className="size-3.5 shrink-0 text-terracotta" aria-hidden="true" />
            <dd>{event.lieu}</dd>
          </div>
        </dl>

        <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-terracotta">
          {past ? 'Revivre la soirée' : 'En savoir plus'}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* Reflet qui suit le curseur (relief 3D) */}
      <span aria-hidden="true" className="tatina-tilt-glare" />
    </article>
  );
}
