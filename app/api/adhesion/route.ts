import { NextResponse } from 'next/server';
import { adhesionSchema } from '@/lib/validation';
import { sendToAssociation, sendConfirmation, escapeHtml } from '@/lib/mail';
import { site } from '@/lib/site';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = adhesionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Formulaire invalide.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { nom, email, telephone, message, website } = parsed.data;

  // Honeypot rempli = bot : on répond OK sans rien envoyer.
  if (website) return NextResponse.json({ ok: true });

  const tel = telephone || '—';
  const note = message || '—';
  const montant = site.adhesion?.montant?.trim();
  const montantPhrase = montant ? ` (${montant})` : '';

  // 1) Notification à l'association — pour préremplir la fiche papier.
  const text =
    `Nouvelle pré-adhésion à reporter sur la fiche papier :\n\n` +
    `Nom : ${nom}\nE-mail : ${email}\nTéléphone : ${tel}\nMessage : ${note}\n\n` +
    `Le règlement de l'adhésion se fera sur place, au bistrot.`;
  const html = `
    <h2>Nouvelle pré-adhésion — ${escapeHtml(site.nom)}</h2>
    <p>À reporter sur la fiche papier :</p>
    <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
    <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(tel)}</p>
    <p><strong>Message :</strong> ${escapeHtml(note)}</p>
    <hr />
    <p>Le règlement de l'adhésion se fera sur place, au bistrot.</p>`;

  // 2) Confirmation à la personne.
  const confirmText =
    `Bonjour ${nom},\n\n` +
    `Votre pré-adhésion au Bistrot de Tatina est bien enregistrée.\n\n` +
    `Il ne reste plus qu'à régler votre adhésion${montantPhrase} directement au bistrot, ` +
    `lors de votre prochaine visite. Elle est valable 1 an, renouvelable chaque année.\n\n` +
    `Merci de votre soutien — c'est grâce à vous qu'on fait avancer la lutte locale contre le cancer.\n\n` +
    `À très vite,\n${site.nom}\n${site.telephone}\n` +
    `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`;
  const confirmHtml =
    `<p>Bonjour ${escapeHtml(nom)},</p>` +
    `<p>Votre pré-adhésion au <strong>Bistrot de Tatina</strong> est bien enregistrée.</p>` +
    `<p>Il ne reste plus qu'à régler votre adhésion${escapeHtml(montantPhrase)} directement au bistrot, ` +
    `lors de votre prochaine visite. Elle est <strong>valable 1 an</strong>, renouvelable chaque année.</p>` +
    `<p>Merci de votre soutien — c'est grâce à vous qu'on fait avancer la lutte locale contre le cancer.</p>` +
    `<p>À très vite,<br />${escapeHtml(site.nom)}<br />${site.telephone}<br />` +
    `${escapeHtml(site.adresse.rue)}, ${site.adresse.codePostal} ${escapeHtml(site.adresse.ville)}</p>`;

  try {
    await sendToAssociation({
      subject: `[Pré-adhésion] ${nom}`,
      text,
      html,
      replyTo: email,
    });

    await sendConfirmation(email, {
      subject: `Votre pré-adhésion — ${site.nom}`,
      text: confirmText,
      html: confirmHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[adhesion] envoi échoué', err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez ou passez nous voir." },
      { status: 502 },
    );
  }
}
