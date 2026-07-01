import type { Metadata } from 'next';
import { CalendarClock, MapPin, HeartHandshake, Users, Check } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { PreAdhesionForm } from '@/components/forms/PreAdhesionForm';
import { JsonLd } from '@/components/JsonLd';
import { AmbientGlow } from '@/components/decor/AmbientGlow';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Adhérer',
  description:
    'Devenez membre du Bistrot de Tatina, bar associatif à Meythet (Annecy). Adhésion annuelle, renouvelable, à régler sur place. Pré-adhérez en ligne en quelques secondes.',
  path: '/adhesion',
});

const montant = site.adhesion?.montant?.trim();

const points = [
  {
    icon: Users,
    titre: 'Un vrai bar associatif',
    texte:
      'Le Bistrot de Tatina est porté par une association. Pour profiter du lieu et de ses soirées, on devient membre — c\'est ce qui nous permet d\'exister et de reverser nos bénéfices à la cause.',
  },
  {
    icon: CalendarClock,
    titre: 'Valable 1 an, renouvelable',
    texte:
      'L\'adhésion est valable un an et se renouvelle chaque année. Simple, sans engagement au-delà.',
  },
  {
    icon: MapPin,
    titre: 'Réglement sur place',
    texte: montant
      ? `Le montant de l'adhésion (${montant}) se règle directement au bistrot. La pré-adhésion en ligne prépare simplement votre fiche.`
      : 'Le règlement de l\'adhésion se fait directement au bistrot. La pré-adhésion en ligne prépare simplement votre fiche pour gagner du temps.',
  },
  {
    icon: HeartHandshake,
    titre: 'Un geste pour la cause',
    texte:
      'En adhérant, vous soutenez concrètement la lutte locale contre le cancer, à Annecy et en Haute-Savoie — en mémoire de Tatie Nadia.',
  },
];

export default function AdhesionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Adhérer', path: '/adhesion' },
        ])}
      />
      <PageHero
        current="Adhérer"
        eyebrow="Rejoindre l'aventure"
        title="Devenir membre"
        intro="Adhérez au Bistrot de Tatina et faites partie d'un lieu de vie solidaire, aux portes d'Annecy. Pré-adhérez en ligne, réglez sur place."
        image="/images/bar-comptoir.jpg"
        imageAlt="Le comptoir du bistrot et ses habitués"
      />

      <Section tone="creme" spacing="lg" className="isolate">
        <AmbientGlow />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Explication */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="eyebrow mb-2">Comment ça marche</p>
              <h2 className="text-4xl sm:text-5xl">L'adhésion, mode d'emploi</h2>
            </div>

            <ul className="flex flex-col gap-6">
              {points.map((p) => (
                <li key={p.titre} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-petrole/5">
                    <p.icon className="size-5 text-terracotta" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-petrole/80">
                      {p.titre}
                    </p>
                    <p className="mt-1 text-pretty leading-relaxed text-petrole/85">
                      {p.texte}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 rounded-card bg-jaune p-5 text-petrole">
              <Check className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p className="text-pretty text-sm leading-relaxed">
                La pré-adhésion en ligne ne remplace pas le règlement : elle nous
                permet juste de préparer votre fiche à l'avance. Vous finalisez tout
                sur place, autour d'un verre.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-card bg-petrole/[0.03] p-6 ring-1 ring-petrole/10 sm:p-8">
            <h2 className="mb-2 text-4xl sm:text-5xl">Pré-adhérer en ligne</h2>
            <p className="mb-6 text-petrole/80">
              Quelques secondes, et votre fiche est prête. On vous envoie une
              confirmation par e-mail.
            </p>
            <PreAdhesionForm />
          </div>
        </div>
      </Section>
    </>
  );
}
