import { Heart, HandHeart } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { PartnerLogos } from '@/components/PartnerLogos';
import { Reveal } from '@/components/Reveal';
import { partenairesContent } from '@/lib/content';

/** « Partenaires & bénéficiaires » (§4.11) — propre à Tatina. */
export function Partners() {
  const { beneficiaires, partenaires, transparence } = partenairesContent;
  return (
    <section className="bg-creme" aria-labelledby="partenaires-titre">
      <div className="container-bistrot border-t border-petrole/10 py-16 sm:py-20">
        <SectionHeading
          id="partenaires-titre"
          eyebrow="Transparence"
          title="Où va l'argent ?"
          as="h2"
          align="center"
          className="mx-auto mb-12 max-w-2xl"
        >
          {transparence}
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-4">
            <h3 className="flex items-center justify-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.16em] text-terracotta">
              <HandHeart className="size-5" aria-hidden="true" />
              Les bénéficiaires
            </h3>
            <PartnerLogos items={beneficiaires} />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-4">
            <h3 className="flex items-center justify-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.16em] text-sauge">
              <Heart className="size-5" aria-hidden="true" />
              Nos partenaires locaux
            </h3>
            <PartnerLogos items={partenaires} />
          </Reveal>
        </div>

        <p className="mt-8 text-center font-mono text-[0.7rem] uppercase tracking-wider text-petrole/62">
          TODO : noms réels & logos à fournir par l'association.
        </p>
      </div>
    </section>
  );
}
