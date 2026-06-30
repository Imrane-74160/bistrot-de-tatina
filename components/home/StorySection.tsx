import Image from 'next/image';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { OverlapCard } from '@/components/OverlapCard';
import { Reveal } from '@/components/Reveal';
import { homeContent } from '@/lib/content';

/** « Notre histoire » (§4.6) — section pétrole sombre, photo + texte. */
export function StorySection() {
  const { story } = homeContent;
  return (
    <section className="bg-petrole text-creme" aria-labelledby="story-titre">
      <div className="container-bistrot py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="zoom" className="order-1">
            <OverlapCard className="ring-1 ring-creme/10">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </OverlapCard>
          </Reveal>

          <div className="order-2 flex flex-col gap-6">
            <SectionHeading
              id="story-titre"
              eyebrow={story.eyebrow}
              title={story.titre}
              tone="light"
              as="h2"
              titleClassName="text-creme"
            />
            {story.paragraphes.map((p, i) => (
              <p key={i} className="text-pretty text-lg leading-relaxed text-creme/85">
                {p}
              </p>
            ))}
            <div>
              <Button href="/a-propos" variant="jaune">
                {story.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
