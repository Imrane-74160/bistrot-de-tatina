import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Boutons ronds (flèche ↓ / ↑ §3.3) — cibles ≥ 44px
const roundVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 [&_svg]:size-5',
  {
    variants: {
      variant: {
        jaune:
          'bg-jaune text-petrole hover:bg-jaune/90 ring-offset-creme shadow-card',
        petrole:
          'bg-petrole text-jaune hover:bg-petrole/90 ring-offset-creme shadow-card',
        creme:
          'bg-creme text-petrole hover:bg-white ring-offset-petrole shadow-card',
        outline:
          'border-2 border-creme/50 text-creme hover:bg-creme hover:text-petrole ring-offset-petrole',
      },
      size: {
        md: 'h-12 w-12',
        lg: 'h-14 w-14',
      },
    },
    defaultVariants: { variant: 'jaune', size: 'md' },
  },
);

type RoundProps = VariantProps<typeof roundVariants> & {
  className?: string;
  'aria-label': string;
  children: React.ReactNode;
} & (
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function RoundIconButton({
  variant,
  size,
  className,
  children,
  ...props
}: RoundProps) {
  const classes = cn(roundVariants({ variant, size }), className);
  if ('href' in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export { roundVariants };
