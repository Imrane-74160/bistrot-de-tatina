'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X, Phone, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { navLinks, site, itineraireUrl } from '@/lib/site';

/** Menu mobile (sheet accessible Radix) — nav ≤ 3 clics. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full text-petrole transition-colors hover:bg-petrole/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-petrole/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-creme shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex items-center justify-between border-b border-petrole/12 px-5 py-4">
            <Dialog.Title className="sr-only">Menu de navigation</Dialog.Title>
            <Logo size={44} className="h-11 w-11" />
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-petrole transition-colors hover:bg-petrole/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                aria-label="Fermer le menu"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Navigation principale" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-[52px] items-center rounded-2xl px-4 font-display text-3xl uppercase tracking-tight transition-colors',
                        active
                          ? 'bg-petrole text-jaune'
                          : 'text-petrole hover:bg-petrole/5',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 border-t border-petrole/12 px-5 py-5">
            <a
              href={`tel:${site.telephoneE164}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill bg-petrole px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] text-jaune"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.telephone}
            </a>
            <a
              href={itineraireUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill border-2 border-petrole/25 px-6 font-mono text-sm font-bold uppercase tracking-[0.12em] text-petrole"
            >
              <Navigation className="size-4" aria-hidden="true" />
              Itinéraire
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
