import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Tags / labels en Space Mono (§3.2) — touche « fonderie »
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-pill font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] [&_svg]:size-[1.1em]',
  {
    variants: {
      variant: {
        jaune: 'bg-jaune text-petrole',
        petrole: 'bg-petrole text-jaune',
        terracotta: 'bg-terracotta text-creme',
        sauge: 'bg-sauge text-creme',
        outline: 'border border-petrole/25 text-petrole',
        'outline-light': 'border border-creme/30 text-creme',
        soft: 'bg-petrole/5 text-petrole',
      },
      size: {
        sm: 'px-2.5 py-1',
        md: 'px-3.5 py-1.5',
      },
    },
    defaultVariants: { variant: 'soft', size: 'md' },
  },
);

export function Badge({
  variant,
  size,
  className,
  children,
  ...props
}: VariantProps<typeof badgeVariants> &
  React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  );
}

export { badgeVariants };
