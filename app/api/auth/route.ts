import { NextResponse } from 'next/server';

/**
 * Démarre le flux OAuth GitHub pour Decap CMS.
 * Nécessite GITHUB_OAUTH_ID (et GITHUB_OAUTH_SECRET côté callback).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId = process.env.GITHUB_OAUTH_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: 'GITHUB_OAUTH_ID manquant. Voir le README (section /admin).' },
      { status: 500 },
    );
  }

  const base = (process.env.NEXT_PUBLIC_SITE_URL || url.origin).replace(/\/$/, '');
  const state = crypto.randomUUID();

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', `${base}/api/callback`);
  authorize.searchParams.set('scope', 'repo');
  authorize.searchParams.set('state', state);

  const res = NextResponse.redirect(authorize.toString());
  res.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  return res;
}
