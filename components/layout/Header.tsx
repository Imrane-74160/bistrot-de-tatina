import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { MobileNav } from '@/components/layout/MobileNav';
import { UtilityBar } from '@/components/layout/UtilityBar';
import { AwningEdge } from '@/components/decor/AwningEdge';

/**
 * En-tête (§4.2) : barre utilitaire + nav logo-centré.
 * Desktop : 3 liens · logo central · 3 liens (espacement homogène, tél dans la barre du haut).
 * Mobile : logo à gauche · menu hamburger à droite (le tél reste dans la barre sticky).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <UtilityBar />
      {/* Bord festonné « store de café » suspendu sous le header */}
      <AwningEdge color="creme" />
      <div className="border-b border-petrole/10 bg-creme/95 backdrop-blur supports-[backdrop-filter]:bg-creme/80">
        <div className="container-bistrot flex h-20 items-center justify-between">
          {/* Desktop : nav complète (3 · logo · 3) répartie uniformément */}
          <HeaderNav />

          {/* Mobile/tablette : logo à gauche */}
          <Link
            href="/"
            aria-label="Le Bistrot de Tatina — accueil"
            className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta lg:hidden"
          >
            <Logo size={48} priority className="h-11 w-11 sm:h-12 sm:w-12" />
          </Link>

          {/* Mobile/tablette : menu hamburger à droite */}
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
