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
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-petrole/62">
              TODO : récit complet de la famille à confirmer.
            </p>
          </div>
        </div>
      </Section>

      {/* La cause */}
      <Section tone="petrole" spacing="lg" id="la-cause">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-pill bg-jaune px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-petrole">
            <Heart className="size-4" aria-hidden="true" />
            La cause
          </span>
          <h2 className="text-balance text-4xl text-creme sm:text-5xl lg:text-6xl">
            Boire un verre qui a du sens
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-creme/92">
            Le Bistrot de Tatina est une association <strong className="text-creme">à but non
            lucratif</strong>. Ici, on ne cherche pas le profit : tous les bénéfices
            sont reversés à la <strong className="text-creme">lutte locale contre le
            cancer</strong> — associations, hôpitaux, recherche et aide aux malades,
            notamment autour du cancer des ovaires.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-creme/92">
            Faire la fête fait le bien. La moindre voix compte, et chaque soirée
            partagée fait avancer une cause qui nous tient à cœur.
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
                className="flex h-full flex-col gap-3 rounded-card border border-petrole/12 bg-petrole/[0.03] p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="font-display text-5xl text-terracotta">
                  {annee.annee}
                </span>
                <p className="text-pretty text-petrole/85">{annee.faitMarquant}</p>
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-petrole/62">
                  Reversé : {annee.reverse} · Adhérents : {annee.adherents}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-center font-mono text-[0.7rem] uppercase tracking-wider text-petrole/62">
          TODO : chiffres réels par année à fournir par l'association.
        </p>
      </Section>

      {/* Bénéficiaires & partenaires */}
      <Partners />

      {/* Pourquoi adhérer */}
      <Section tone="petrole" spacing="lg">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Rejoindre l'aventure"
              title="Pourquoi adhérer ?"
              tone="light"
              as="h2"
              titleClassName="text-creme"
            />
            <p className="text-pretty text-lg leading-relaxed text-creme/92">
              Un bar associatif repose sur l'adhésion : c'est ce qui nous permet
              d'exister légalement et de reverser nos bénéfices à la cause.
              Adhérer, c'est rejoindre une communauté et soutenir directement la
              lutte contre le cancer.
            </p>
            <ul className="flex flex-col gap-3 text-creme/92">
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
              L'adhésion se fait simplement sur place. Une question ? Écrivez-nous.
            </p>
            <div>
              <Button href="/contact" variant="jaune">
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
