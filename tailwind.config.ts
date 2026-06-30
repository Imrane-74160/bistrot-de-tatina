import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,json}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      // ── Palette fermée (§3.1) ──────────────────────────────────────────────
      colors: {
        petrole: '#233D39',
        creme: '#F4EFE1',
        jaune: '#F2B705',
        terracotta: '#C04A2E',
        sauge: '#5E8C5F',
      },
      // ── Typographie (§3.2) ─────────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Corps relevé à 17–18px pour l'accessibilité (§3.2 ⚠️)
        base: ['1.0625rem', { lineHeight: '1.6' }], // 17px
        lg: ['1.125rem', { lineHeight: '1.6' }], // 18px
      },
      borderRadius: {
        card: '1.75rem', // cartes éditoriales arrondies (§3.3)
        pill: '9999px',
      },
      boxShadow: {
        card: '0 18px 40px -20px rgba(35, 61, 57, 0.45)',
        overlap: '0 28px 60px -28px rgba(35, 61, 57, 0.55)',
      },
      keyframes: {
        // Guirlande : scintillement des ampoules du logo
        twinkle: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.55', filter: 'brightness(1.25)' },
        },
        // Badge logo : flottement doux
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        // Vapeur / mousse au-dessus de la chope
        steam: {
          '0%': { opacity: '0', transform: 'translateY(2px) scale(0.9)' },
          '40%': { opacity: '0.7' },
          '100%': { opacity: '0', transform: 'translateY(-10px) scale(1.1)' },
        },
      },
      animation: {
        twinkle: 'twinkle 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        steam: 'steam 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
