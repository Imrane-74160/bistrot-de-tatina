import { cookies } from 'next/headers';

/**
 * Callback OAuth GitHub pour Decap CMS : échange le code contre un token,
 * puis renvoie une page qui transmet le token à la fenêtre Decap (postMessage).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = cookies().get('decap_oauth_state')?.value;

  function page(status: 'success' | 'error', payload: unknown) {
    const content = `authorization:github:${status}:${JSON.stringify(payload)}`;
    return new Response(
      `<!doctype html><html><body><script>
        (function () {
          function receiveMessage(e) {
            window.opener.postMessage(${JSON.stringify(content)}, e.origin);
            window.removeEventListener('message', receiveMessage, false);
          }
          window.addEventListener('message', receiveMessage, false);
          window.opener.postMessage('authorizing:github', '*');
        })();
      </script><p>Connexion en cours…</p></body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }

  if (!code || !state || !expected || state !== expected) {
    return page('error', { message: 'Échec de validation OAuth (state/code).' });
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_OAUTH_ID,
        client_secret: process.env.GITHUB_OAUTH_SECRET,
        code,
      }),
    });
    const data = (await tokenRes.json()) as {
      access_token?: string;
      error?: string;
    };
    if (!data.access_token) {
      return page('error', { message: data.error || 'Token introuvable.' });
    }
    return page('success', { token: data.access_token, provider: 'github' });
  } catch {
    return page('error', { message: 'Erreur lors de l’échange du token.' });
  }
}
