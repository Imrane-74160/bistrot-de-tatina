import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { site, adresseLigne } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description:
    'Mentions légales et politique de confidentialité (RGPD) du Bistrot de Tatina.',
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Mentions légales', path: '/mentions-legales' },
        ])}
      />
      <PageHero current="Mentions légales" eyebrow="Informations légales" title="Mentions légales" />

      <Section tone="creme" spacing="lg">
        <div className="prose-bistrot mx-auto max-w-3xl">
          <h2>Éditeur du site</h2>
          <p>
            Ce site est édité par l'association <strong>{site.nom}</strong>,
            association à but non lucratif (loi 1901).
            <br />
            Adresse : {adresseLigne}.
            <br />
            Téléphone : {site.telephone} — E-mail : {site.email}.
          </p>
          <p>
            <strong>TODO : à confirmer client</strong> — numéro RNA (W…),
            SIRET, nom du représentant légal / directeur de la publication.
          </p>

          <h2>Hébergement</h2>
          <p>
            <strong>TODO : à confirmer client</strong> — hébergeur du site (par
            exemple Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA).
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site (textes, logo, photographies,
            illustrations) est la propriété de l'association {site.nom} ou de ses
            partenaires, sauf mention contraire. Toute reproduction sans
            autorisation est interdite.
          </p>

          <h2 id="rgpd">Données personnelles &amp; confidentialité (RGPD)</h2>
          <p>
            Le site ne collecte des données personnelles que via ses formulaires
            (contact). Les informations transmises (nom, e-mail, message) sont
            utilisées <strong>uniquement</strong> pour répondre à votre demande
            et ne sont ni revendues, ni cédées à des tiers.
          </p>
          <ul>
            <li>
              <strong>Finalité :</strong> traitement de votre demande de contact.
            </li>
            <li>
              <strong>Base légale :</strong> votre consentement (case à cocher).
            </li>
            <li>
              <strong>Conservation :</strong> le temps nécessaire au traitement,
              puis suppression. <strong>TODO :</strong> durée exacte à définir.
            </li>
            <li>
              <strong>Destinataire :</strong> l'équipe de l'association
              uniquement.
            </li>
          </ul>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression de vos données. Pour l'exercer,
            écrivez-nous à{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site n'utilise pas de cookies de suivi ni d'outils de mesure
            d'audience. La page Contact intègre une carte Google Maps : son
            affichage peut déposer des cookies tiers gérés par Google.
          </p>

          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-petrole/60">
            TODO : faire valider ces mentions par l'association (RNA/SIRET,
            hébergeur, durées de conservation).
          </p>
        </div>
      </Section>
    </>
  );
}
