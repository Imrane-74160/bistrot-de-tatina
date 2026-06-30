import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Alternance de fonds (§3.3) : crème clair ↔ pétrole sombre ↔ accent jaune
const sectionVariants = cva('relative w-full', {
  variants: {
    tone: {
      creme: 'bg-creme text-petrole',
      petrole: 'bg-petrole text-creme',
      jaune: 'bg-jaune text-petrole',
      sauge: 'bg-sauge text-creme',
    },
    spacing: {
      none: '',
      sm: 'py-12 sm:py-16',
      md: 'py-16 sm:py-20 lg:py-24',
      lg: 'py-20 sm:py-28 lg:py-32',
    },
  },
  defaultVariants: {
    tone: 'creme',
    spacing: 'md',
  },
});

type SectionProps = VariantProps<typeof sectionVariants> &
  React.HTMLAttributes<HTMLElement> & {
    as?: 'section' | 'div' | 'header' | 'footer' | 'article';
    /** Largeur du conteneur interne. `false` pour gérer soi-même. */
    container?: boolean;
  };

export function Section({
  tone,
  spacing,
  as: Tag = 'section',
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(sectionVariants({ tone, spacing }), className)} {...props}>
      {container ? <div className="container-bistrot">{children}</div> : children}
    </Tag>
  );
}

export { sectionVariants };
