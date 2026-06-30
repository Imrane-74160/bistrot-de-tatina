import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sendToAssociation, sendConfirmation, escapeHtml } from '@/lib/mail';
import { site } from '@/lib/site';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Formulaire invalide.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { nom, email, sujet, message, website } = parsed.data;

  // Honeypot rempli = bot : on répond OK sans rien envoyer.
  if (website) return NextResponse.json({ ok: true });

  const sujetFinal = sujet || 'Message depuis le site';
  const text = `Nom : ${nom}\nE-mail : ${email}\nSujet : ${sujetFinal}\n\n${message}`;
  const html = `
    <h2>Nouveau message — ${escapeHtml(site.nom)}</h2>
    <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
    <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
    <p><strong>Sujet :</strong> ${escapeHtml(sujetFinal)}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`;

  try {
    await sendToAssociation({
      subject: `[Contact] ${sujetFinal}`,
      text,
      html,
      replyTo: email,
    });

    await sendConfirmation(email, {
      subject: `Bien reçu — ${site.nom}`,
      text: `Bonjour ${nom},\n\nMerci pour votre message, nous vous répondrons très vite.\nÀ bientôt au bistrot !\n\n${site.nom}\n${site.telephone}`,
      html: `<p>Bonjour ${escapeHtml(nom)},</p><p>Merci pour votre message, nous vous répondrons très vite.</p><p>À bientôt au bistrot !</p><p>— ${escapeHtml(site.nom)}<br />${site.telephone}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] envoi échoué', err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez ou appelez-nous." },
      { status: 502 },
    );
  }
}
