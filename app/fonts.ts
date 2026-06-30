import { Bebas_Neue, Archivo, Space_Mono } from 'next/font/google';

// Titres (Display / H1 / H2 / H3) — condensée, CAPITALES, très grand (§3.2)
export const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

// Corps — grotesque lisible (§3.2)
export const body = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

// Labels / prix / tags — monospace, touche « fonderie » (§3.2)
export const mono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
