import type { Metadata } from 'next';
import Image from 'next/image';
import { Heart, HeartHandshake, Beer, Users } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { OverlapCard } from '@/components/OverlapCard';
import { Button } from '@/components/Button';
import { StatsBand } from '@/components/home/StatsBand';
import { Partners } from '@/components/home/Partners';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { StringLights } from '@/components/decor/StringLights';
import { BeerBubbles } from '@/components/decor/BeerBubbles';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { chiffresContent } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'Qui sommes-nous ?',
  description:
    'Le Bistrot de Tatina : un bistrot associatif et familial né en 2022 dans un ancien atelier de chaudronnerie à Meythet. Notre histoire, le lieu, et la cause — la lutte locale contre le cancer.',
  path: '/a-propos',
});

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Qui sommes-nous ?', path: '/a-propos' },
        ])}
      />
      <PageHero
        current="Qui sommes-nous ?"
        eyebrow="Notre histoire"
        title="Qui sommes-nous ?"
        intro="Une histoire de famille, un ancien atelier, et une idée simple : transformer un verre partagé en soutien concret."
        image="/images/atelier-talina.jpg"
        imageAlt="L'enseigne peinte « Le Bistrot de Tatina »"
      />

      {/* Histoire + lieu */}
      <Section tone="creme" spacing="lg">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <OverlapCard className="ring-1 ring-petrole/10">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/atelier-mural.jpg"
                alt="L'intérieur du bistrot dans l'ancien atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </OverlapCard>
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Depuis 2022" title="Né dans un atelier" as="h2" />
            <p className="text-pretty text-lg leading-relaxed text-petrole/85">
              Le Bistrot de Tatina a ouvert ses portes en 2022 dans un ancien
              atelier de chaudronnerie à Meythet. Containers, acier patiné,
              esthétique d'atelier… et une porte jaune devenue notre signe de
              reconnaissance.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-petrole/85">
              C'est un lieu de vie familial, monté pierre par pierre, où l'on
              vient comme on est : pour une bière locale, une planche à partager,
              une partie de cartes, un concert ou juste pour refaire le monde.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-petrole/85">
              Idéalement situé à Meythet, aux portes d'Annecy et à quelques
              minutes du lac, le bistrot est vite devenu un point de ralliement
              du bassin annécien : un endroit où se retrouver le jeudi et le
              vendredi soir, à deux pas de Cran-Gevrier, d'Annecy-le-Vieux et de
              Seynod, loin de l'agitation et tout près de chez soi.
            </p>

            <div className="rounded-card border-l-4 border-terracotta bg-terracotta/[0.06] p-6">
              <p className="flex items-center gap-2 font-display text-2xl uppercase leading-none text-petrole">
                <Heart className="size-5 text-terracotta" aria-hidden="true" />
                D'où vient le nom « Tatina » ?
              </p>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-petrole/85">
                « Tatina », c'est « <strong className="text-petrole">Tatie Nadia</strong> ».
                Nadia était la sœur de Samia, la présidente de l'association, et une
                proche de tous les bénévoles des débuts. Elle nous a quittés des
                suites d'un cancer quelques années avant l'ouverture. Le bistrot est
                né en sa mémoire — et c'est pour elle, et pour toutes celles et ceux
                que la maladie touche, que chaque verre partagé compte.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* La cause */}
      <Section tone="petrole" spacing="lg" id="la-cause">
        <StringLights tone="dark" className="mx-auto max-w-4xl" />
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-pill bg-jaune px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-petrole">
            <Heart className="size-4" aria-hidden="true" />
            La cause
          </span>
          <h2 className="text-balance text-4xl text-creme sm:text-5xl lg:text-6xl">
            Boire un verre qui a du sens
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-creme/90">
            Le Bistrot de Tatina est une association <strong className="text-creme">à but non
            lucratif</strong>. Ici, on ne cherche pas le profit : <strong className="text-creme">l'essentiel
            des bénéfices est reversé</strong> à la lutte locale contre le cancer —
            associations, hôpitaux, recherche et aide aux malades, notamment autour
            du cancer des ovaires.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-creme/90">
            Nous conservons juste une petite trésorerie pour faire vivre le lieu :
            réparer le matériel et l'améliorer d'année en année. En 2026, par exemple,
            nous avons installé un système de bâches sur la cour pour continuer à vous
            accueillir lors des événements d'hiver, même sous une pluie légère.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-creme/90">
            Et tout est transparent : chaque année, l'assemblée générale réunit les
            adhérents, qui ont accès aux bilans et valident les dépenses comme les
            dons. Faire la fête fait le bien, et chaque soirée partagée à Annecy fait
            avancer une cause qui nous tient à cœur.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/evenements" variant="jaune">
              <Beer aria-hidden="true" />
              Venir nous soutenir
            </Button>
            <Button href="#impact" variant="outline-light">
              Voir notre impact
            </Button>
          </div>
        </div>
      </Section>

      {/* Impact — chiffres clés */}
      <div id="impact">
        <StatsBand />
      </div>

      {/* Impact par année */}
      <Section tone="creme" spacing="lg">
        <SectionHeading
          eyebrow="Notre impact"
          title="Année après année"
          as="h2"
          className="mb-10"
        >
          La transparence fait partie de notre engagement. Voici les grandes
          étapes depuis l'ouverture.
        </SectionHeading>
        <ol className="relative grid gap-6 sm:grid-cols-3">
          {chiffresContent.parAnnee.map((annee, i) => (
            <li key={annee.annee} className="h-full">
              <Reveal
                delay={i * 110}
                variant="tilt"
                className="flex h-full flex-col gap-3 rounded-card border border-petrole/12 bg-petrole/[0.03] p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="font-display text-5xl text-terracotta">
                  {annee.annee}
                </span>
                <p className="text-pretty text-petrole/85">{annee.faitMarquant}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-pretty text-sm leading-relaxed text-petrole/70">
          Les montants exacts sont présentés et validés chaque année en assemblée
          générale, où les adhérents ont accès aux bilans détaillés.
        </p>
      </Section>

      {/* Bénéficiaires & partenaires */}
      <Partners />

      {/* Pourquoi adhérer */}
      <Section tone="petrole" spacing="lg" className="isolate">
        <BeerBubbles />
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Rejoindre l'aventure"
              title="Pourquoi adhérer ?"
              tone="light"
              as="h2"
              titleClassName="text-creme"
            />
            <p className="text-pretty text-lg leading-relaxed text-creme/90">
              Un bar associatif repose sur l'adhésion : c'est elle qui nous permet
              d'exister légalement et de reverser nos bénéfices à la cause. Pour
              faire partie de l'aventure, on devient membre — et on rejoint une
              communauté qui soutient directement la lutte contre le cancer.
            </p>
            <ul className="flex flex-col gap-3 text-creme/90">
              <li className="flex items-start gap-3">
                <Users className="mt-0.5 size-5 shrink-0 text-jaune" aria-hidden="true" />
                Faire partie d'un lieu de vie solidaire et familial.
              </li>
              <li className="flex items-start gap-3">
                <HeartHandshake className="mt-0.5 size-5 shrink-0 text-jaune" aria-hidden="true" />
                Soutenir concrètement la cause à chaque visite.
              </li>
            </ul>
            <p className="text-creme/90">
              L'adhésion est de <strong className="text-creme">15 €</strong>,
              <strong className="text-creme"> valable un an, renouvelable</strong> chaque année, et se
              règle sur place au bistrot. Pour gagner du temps, vous pouvez
              pré-adhérer en ligne en quelques secondes : on prépare votre fiche,
              il ne vous reste qu'à passer régler votre adhésion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/adhesion" variant="jaune">
                Pré-adhérer en ligne
              </Button>
              <Button href="/contact" variant="outline-light">
                Nous contacter
              </Button>
            </div>
          </div>
          <OverlapCard className="ring-1 ring-creme/10">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/cour-fauteuils.jpg"
                alt="La cour conviviale du bistrot"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </OverlapCard>
        </div>
      </Section>
    </>
  );
}
