import { Plus } from 'lucide-react';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { StringLights } from '@/components/decor/StringLights';
import { faqJsonLd } from '@/lib/seo';
import { faqContent } from '@/lib/content';

/**
 * Section « Questions fréquentes » — accordéon natif (<details>) accessible et
 * indexable, doublé d'un balisage FAQPage (référencement local Annecy).
 */
export function FaqSection() {
  const { eyebrow, titre, intro, questions } = faqContent;

  return (
    <Section tone="creme" spacing="lg" aria-labelledby="faq-titre">
      <JsonLd data={faqJsonLd(questions)} />
      <StringLights tone="light" className="mx-auto max-w-5xl" />
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id="faq-titre"
          eyebrow={eyebrow}
          title={titre}
          as="h2"
          align="center"
          className="mb-10"
        >
          {intro}
        </SectionHeading>

        <ul className="flex flex-col gap-3">
          {questions.map((q, i) => (
            <li key={q.question}>
              <Reveal delay={i * 55}>
                <details className="group rounded-card border border-petrole/12 bg-petrole/[0.03] transition-colors open:border-petrole/20 open:bg-petrole/[0.05]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-semibold leading-snug text-petrole marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-creme [&::-webkit-details-marker]:hidden">
                    <h3 className="text-pretty">{q.question}</h3>
                    <Plus
                      className="size-5 shrink-0 text-terracotta transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-5 pb-5 text-pretty leading-relaxed text-petrole/85">
                    {q.reponse}
                  </div>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
