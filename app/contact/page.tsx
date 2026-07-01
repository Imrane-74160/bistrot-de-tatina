import type { Metadata } from 'next';
import { MapPin, Clock, Phone, Mail, Navigation, Instagram, Facebook } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/JsonLd';
import { AmbientGlow } from '@/components/decor/AmbientGlow';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { site, adresseLigne, itineraireUrl } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Nous écrire, nous appeler, venir nous voir au Bistrot de Tatina à Meythet (Annecy). Adresse, horaires, itinéraire et formulaire de contact.',
  path: '/contact',
});

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.nom}, ${adresseLigne}`,
)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        current="Contact"
        eyebrow="On reste en contact"
        title="Nous contacter"
        intro="Une question, une idée, une envie de privatiser une soirée ? Écrivez-nous ou passez nous voir."
        image="/images/cour-fauteuils.jpg"
        imageAlt="La cour du bistrot et ses fauteuils"
      />

      <Section tone="creme" spacing="lg" className="isolate">
        <AmbientGlow />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Infos pratiques */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="eyebrow mb-2">Infos pratiques</p>
              <h2 className="text-4xl sm:text-5xl">Passez nous voir</h2>
            </div>

            <p className="text-pretty text-lg leading-relaxed text-petrole/85">
              Le Bistrot de Tatina vous accueille à Meythet, au nord-ouest
              d'Annecy et à quelques minutes du lac, en Haute-Savoie. On est
              facilement accessible depuis le centre d'Annecy, Cran-Gevrier,
              Annecy-le-Vieux, Seynod ou Épagny Metz-Tessy, en voiture comme en
              bus, avec du stationnement à proximité. Le plus simple pour nous
              trouver : suivez la porte jaune, ou lancez l'itinéraire ci-dessous.
            </p>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-petrole/5">
                  <MapPin className="size-5 text-terracotta" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-petrole/80">
                    Adresse
                  </p>
                  <p className="text-lg">{adresseLigne} (Annecy)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-petrole/5">
                  <Clock className="size-5 text-terracotta" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-petrole/80">
                    Horaires
                  </p>
                  <p className="text-lg">{site.horairesTexte}</p>
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-petrole/60">
                    TODO : à confirmer
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-petrole/5">
                  <Phone className="size-5 text-terracotta" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-petrole/80">
                    Téléphone
                  </p>
                  <a href={`tel:${site.telephoneE164}`} className="text-lg transition-colors hover:text-terracotta">
                    {site.telephone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-petrole/5">
                  <Mail className="size-5 text-terracotta" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-petrole/80">
                    E-mail
                  </p>
                  <a href={`mailto:${site.email}`} className="text-lg transition-colors hover:text-terracotta">
                    {site.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button href={itineraireUrl} variant="petrole">
                <Navigation aria-hidden="true" />
                Itinéraire
              </Button>
              <a
                href={site.reseaux.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-petrole/5 text-petrole transition-colors hover:bg-terracotta hover:text-creme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                aria-label="Instagram (nouvel onglet)"
              >
                <Instagram className="size-5" aria-hidden="true" />
              </a>
              <a
                href={site.reseaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-petrole/5 text-petrole transition-colors hover:bg-terracotta hover:text-creme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                aria-label="Facebook (nouvel onglet)"
              >
                <Facebook className="size-5" aria-hidden="true" />
              </a>
            </div>

            {/* Carte */}
            <div className="overflow-hidden rounded-card border border-petrole/10 shadow-card">
              <iframe
                src={mapSrc}
                title="Carte — Le Bistrot de Tatina"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-card bg-petrole/[0.03] p-6 ring-1 ring-petrole/10 sm:p-8">
            <h2 className="mb-2 text-4xl sm:text-5xl">Écrivez-nous</h2>
            <p className="mb-6 text-petrole/80">
              On vous répond aussi vite qu'une mousse bien tirée.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
