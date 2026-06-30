import { site } from '@/lib/site';

const RESEND_KEY = process.env.RESEND_API_KEY;
const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const TO = process.env.CONTACT_TO_EMAIL || site.email;
const FROM =
  process.env.CONTACT_FROM_EMAIL || `Le Bistrot de Tatina <onboarding@resend.dev>`;

type Mail = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Envoie un e-mail à l'association.
 * Priorité : Resend → Web3Forms → mode dev (log console).
 * Aucune clé configurée = le formulaire fonctionne quand même (log serveur),
 * pour ne jamais bloquer une famille non-technique pendant la mise en place.
 */
export async function sendToAssociation(mail: Mail): Promise<{ ok: boolean; mode: string }> {
  // 1. Resend
  if (RESEND_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
    });
    if (error) throw new Error(`Resend: ${error.message}`);
    return { ok: true, mode: 'resend' };
  }

  // 2. Web3Forms (fallback sans backend)
  if (WEB3FORMS_KEY) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: mail.subject,
        from_name: 'Site Le Bistrot de Tatina',
        replyto: mail.replyTo,
        message: mail.text,
      }),
    });
    if (!res.ok) throw new Error(`Web3Forms: ${res.status}`);
    return { ok: true, mode: 'web3forms' };
  }

  // 3. Mode dev : pas de clé → on log et on considère l'envoi OK.
  console.info(
    '[mail] Aucune clé e-mail configurée (RESEND_API_KEY / WEB3FORMS_ACCESS_KEY).\n' +
      `À envoyer à ${TO} :\n` +
      `Sujet : ${mail.subject}\n${mail.text}`,
  );
  return { ok: true, mode: 'dev-log' };
}

/** Envoie un e-mail de confirmation à la personne (si Resend dispo). */
export async function sendConfirmation(to: string, mail: Mail): Promise<void> {
  if (!RESEND_KEY) return; // confirmation possible uniquement via Resend
  const { Resend } = await import('resend');
  const resend = new Resend(RESEND_KEY);
  await resend.emails.send({
    from: FROM,
    to: [to],
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  });
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
