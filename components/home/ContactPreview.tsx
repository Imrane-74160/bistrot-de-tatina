import Image from 'next/image';
import { MapPin, Clock, Phone, Navigation, Mail } from 'lucide-react';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { homeContent } from '@/lib/content';
import { site, adresseLigne, itineraireUrl } from '@/lib/site';

/** Aperçu Contact (§ aperçu page Contact) — infos pratiques + horaires + CTA. */
export function ContactPreview() {
  const { contact } = homeContent;
  return (
    <section className="bg-creme" aria-labelledby="contact-titre">
      <div className="container-bistrot py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Infos */}
          <div className="flex flex-col gap-8 lg:max-w-xl">
            <SectionHeading
              id="contact-titre"
              eyebrow={contact.eyebrow}
              title={contact.titre}
              as="h2"
            >
              {contact.texte}
            </SectionHeading>

            {/* Horaires mis en avant */}
            <div className="flex w-full items-start gap-4 rounded-card bg-jaune p-5 text-petrole">
              <Clock className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em]">
                  Horaires d'ouverture
                </p>
                <p className="mt-1 text-xl font-semibold">{site.horairesTexte}</p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-petrole/78">
                  TODO : horaires à confirmer
                </p>
              </div>
            </div>

            {/* Adresse + téléphone */}
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden="true" />
                <span className="text-lg">{adresseLigne} (Annecy)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-terracotta" aria-hidden="true" />
                <a
                  href={`tel:${site.telephoneE164}`}
                  className="text-lg transition-colors hover:text-terracotta"
                >
                  {site.telephone}
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button href={itineraireUrl} variant="petrole">
                <Navigation aria-hidden="true" />
                Itinéraire
              </Button>
              <Button href="/contact" variant="outline">
                <Mail aria-hidden="true" />
                Nous écrire
              </Button>
            </div>
          </div>

          {/* Photo */}
          <Reveal variant="zoom" className="overflow-hidden rounded-card shadow-overlap ring-1 ring-petrole/10">
            <div className="relative aspect-[4/3] w-full lg:aspect-[4/5]">
              <Image
                src={contact.image}
                alt={contact.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
