import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

// Généré à la demande (évite le bug @vercel/og au build sur Windows).
export const dynamic = 'force-dynamic';

export const alt = 'Le Bistrot de Tatina — Boire un verre qui a du sens';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PETROLE = '#233D39';
const CREME = '#F4EFE1';
const JAUNE = '#F2B705';
const TERRACOTTA = '#C04A2E';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: PETROLE,
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, backgroundColor: JAUNE }} />
          <div
            style={{
              color: CREME,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            Le Bistrot de Tatina
          </div>
        </div>

        <div
          style={{
            color: CREME,
            fontSize: 110,
            fontWeight: 800,
            lineHeight: 0.95,
            textTransform: 'uppercase',
          }}
        >
          Un verre
          <br />
          qui a du sens
        </div>

        <div style={{ marginTop: 32, width: 140, height: 10, borderRadius: 999, backgroundColor: TERRACOTTA }} />

        <div style={{ marginTop: 32, color: JAUNE, fontSize: 30, fontWeight: 700 }}>
          Bistrot associatif & solidaire · Meythet (Annecy)
        </div>
      </div>
    ),
    size,
  );
}
