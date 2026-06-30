'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { navLeft, navRight } from '@/lib/site';

type NavItem = { href: string; label: string };

/**
 * Barre de navigation desktop : 3 liens · logo · 3 liens, répartis avec un
 * espacement homogène (justify-between), le logo exactement au centre.
 */
export function HeaderNav() {
  const pathname = usePathname();

  const NavLink = ({ link }: { link: NavItem }) => {
    const active =
      link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
    return (
      <Link
        href={link.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'relative inline-flex min-h-[44px] items-center whitespace-nowrap rounded-pill px-1 font-mono text-[1.05rem] font-bold uppercase tracking-[0.06em] transition-colors',
          active ? 'text-terracotta' : 'text-petrole/80 hover:text-petrole',
        )}
      >
        {link.label}
        {active && (
          <span
            aria-hidden="true"
            className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-terracotta"
          />
        )}
      </Link>
    );
  };

  return (
    <nav aria-label="Navigation principale" className="hidden w-full lg:block">
      <ul className="flex w-full items-center justify-between gap-4">
        {navLeft.map((link) => (
          <li key={link.href}>
            <NavLink link={link} />
          </li>
        ))}

        <li className="shrink-0 px-2">
          <Link
            href="/"
            aria-label="Le Bistrot de Tatina — accueil"
            className="flex items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <Logo size={68} priority className="h-[4.25rem] w-[4.25rem]" />
          </Link>
        </li>

        {navRight.map((link) => (
          <li key={link.href}>
            <NavLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
