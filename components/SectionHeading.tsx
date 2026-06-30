import { cn } from '@/lib/utils';
import { Reveal } from '@/components/Reveal';

/**
 * En-tête de section (§3.3) : petit label Space Mono en capitales
 * au-dessus d'un grand titre Bebas. + description optionnelle.
 */
export function SectionHeading({
  eyebrow,
  title,
  id,
  as: Tag = 'h2',
  align = 'left',
  tone = 'dark',
  className,
  titleClassName,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** Id posé sur le titre (pour aria-labelledby). */
  id?: string;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  /** `dark` = label terracotta (fond clair) · `light` = label jaune (fond sombre) */
  tone?: 'dark' | 'light';
  className?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'font-mono text-xs font-bold uppercase tracking-[0.25em]',
            tone === 'light' ? 'text-jaune' : 'text-terracotta',
          )}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        id={id}
        className={cn(
          'text-balance text-4xl leading-[0.92] sm:text-5xl lg:text-6xl',
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {children && (
        <div
          className={cn(
            'max-w-prose text-pretty text-base leading-relaxed',
            tone === 'light' ? 'text-creme/92' : 'text-petrole/85',
            align === 'center' && 'mx-auto',
          )}
        >
          {children}
        </div>
      )}
    </Reveal>
  );
}
