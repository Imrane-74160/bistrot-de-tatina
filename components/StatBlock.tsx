import { cn } from '@/lib/utils';

/** Chiffre clé : grande valeur Bebas + libellé. */
export function StatBlock({
  value,
  label,
  suffix,
  tone = 'light',
  className,
}: {
  value: string;
  label: string;
  suffix?: string;
  /** `light` = sur fond sombre · `dark` = sur fond clair */
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div
        className={cn(
          'font-display text-5xl leading-none sm:text-6xl',
          tone === 'light' ? 'text-jaune' : 'text-terracotta',
        )}
      >
        {value}
        {suffix && <span className="text-3xl sm:text-4xl">{suffix}</span>}
      </div>
      <div
        className={cn(
          'font-mono text-xs font-bold uppercase tracking-[0.16em]',
          tone === 'light' ? 'text-creme/90' : 'text-petrole/80',
        )}
      >
        {label}
      </div>
    </div>
  );
}
