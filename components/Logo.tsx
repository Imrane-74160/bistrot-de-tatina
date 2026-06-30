import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Badge logo « Le Bistrot de Tatina » — version statique et légère.
 * Sert le fichier vectoriel /logo.svg (mis en cache, coût quasi nul par page).
 * Utilisé dans le header, le footer et partout où l'animation n'est pas nécessaire.
 * Pour la version qui scintille, voir <AnimatedBadge />.
 */
export function Logo({
  className,
  size = 56,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.svg"
      alt="Le Bistrot de Tatina"
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={cn('select-none', className)}
    />
  );
}
