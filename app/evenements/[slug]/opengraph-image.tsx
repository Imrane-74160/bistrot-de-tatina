import { ImageResponse } from 'next/og';
import { getEvent, formatDateFr } from '@/lib/events';
import { site } from '@/lib/site';

// Généré à la demande (évite le bug @vercel/og au build sur Windows).
export const dynamic = 'force-dynamic';

export const alt = 'Événement — Le Bistrot de Tatina';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PETROLE = '#233D39';
const CREME = '#F4EFE1';
const JAUNE = '#F2B705';
const TERRACOTTA = '#C04A2E';

export default async function Image({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug);
  const titre = event?.titre ?? site.nom;
  const date = event ? formatDateFr(event.date) : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PETROLE,
          padding: 64,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              backgroundColor: JAUNE,
            }}
          />
          <div
            style={{
              color: CREME,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Le Bistrot de Tatina
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: JAUNE,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Événement
          </div>
          <div
            style={{
              color: CREME,
              fontSize: 86,
              fontWeight: 800,
              lineHeight: 1.02,
              textTransform: 'uppercase',
              maxWidth: 1000,
            }}
          >
            {titre}
          </div>
          <div
            style={{
              marginTop: 28,
              width: 120,
              height: 8,
              borderRadius: 999,
              backgroundColor: TERRACOTTA,
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: CREME,
            fontSize: 30,
          }}
        >
          <div style={{ textTransform: 'capitalize' }}>{date}</div>
          <div style={{ color: JAUNE, fontWeight: 700 }}>Meythet · Annecy</div>
        </div>
      </div>
    ),
    size,
  );
}
