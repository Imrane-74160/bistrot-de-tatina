import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Boutons « pilule » (§3.3) — cibles ≥ 44px (a11y)
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill font-mono text-sm font-bold uppercase tracking-[0.12em] transition-all duration-200 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-creme [&_svg]:size-[1.15em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Fond pétrole, texte jaune (signature §3.3)
        petrole:
          'bg-petrole text-jaune hover:bg-petrole/90 hover:-translate-y-0.5 shadow-card hover:shadow-overlap',
        // Fond jaune, texte pétrole foncé (jamais de texte clair sur jaune §3.3)
        jaune:
          'bg-jaune text-petrole hover:bg-jaune/90 hover:-translate-y-0.5 shadow-card hover:shadow-overlap',
        // Accent terracotta
        terracotta:
          'bg-terracotta text-creme hover:bg-terracotta/90 hover:-translate-y-0.5 shadow-card hover:shadow-overlap',
        // Contour fin (sur fond clair)
        outline:
          'border-2 border-petrole/30 text-petrole hover:border-petrole hover:bg-petrole hover:text-creme',
        // Contour fin clair (sur fond sombre pétrole)
        'outline-light':
          'border-2 border-creme/40 text-creme hover:border-creme hover:bg-creme hover:text-petrole',
        // Lien discret
        ghost: 'text-petrole hover:bg-petrole/5',
      },
      size: {
        sm: 'min-h-[44px] px-5 py-2.5 text-xs',
        md: 'min-h-[48px] px-7 py-3',
        lg: 'min-h-[52px] px-8 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'petrole',
      size: 'md',
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Bouton pilule polymorphe : rend un <button>, un <Link> interne, ou un <a> externe. */
export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a className={classes} href={href} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}

export { buttonVariants };
