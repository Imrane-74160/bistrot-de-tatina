# Le Bistrot de Tatina — site web

Site du **Bistrot de Tatina**, bistrot associatif et solidaire à Meythet (Annecy).
Construit avec **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.
Tout le contenu est éditable sans toucher au code, dans le dossier [`/content`](./content).

> Idée maîtresse : **« boire un verre qui a du sens »** — tous les bénéfices sont
> reversés à la lutte locale contre le cancer.

---

## 🚀 Lancer le site en local

Prérequis : [Node.js](https://nodejs.org) 18.18+.

```bash
npm install      # une seule fois (installe les dépendances)
npm run dev      # démarre le site sur http://localhost:3000
```

Autres commandes :

```bash
npm run build    # build de production
npm run start    # démarre la version de production (après build)
npm run lint     # vérifie le code
npm run format   # met en forme le code
```

---

## ✏️ Modifier le contenu (sans coder)

Tout est dans le dossier **`/content`**. Après modification, le site se met à jour
tout seul en mode `dev` (ou au prochain `build`).

| Fichier | Ce qu'il contient |
|---|---|
| `content/infos.json` | Adresse, téléphone, horaires, e-mail, réseaux sociaux |
| `content/home.json` | Tous les textes de la page d'accueil |
| `content/carte.json` | La carte (boissons, grignotage) avec les **prix** |
| `content/chiffres.json` | Les chiffres d'impact (€ reversés, adhérents…) |
| `content/partenaires.json` | Bénéficiaires & partenaires |
| `content/galerie.json` | Les photos de la galerie (par catégorie) |
| `content/evenements/*.md` | **Un fichier `.md` = un événement** |

### Ajouter un événement

Créer un fichier dans `content/evenements/`, par exemple `ma-soiree.md` :

```markdown
---
titre: "Ma super soirée"
date: "2026-09-12"        # format AAAA-MM-JJ
heure: "19h30"
resume: "Une phrase courte qui donne envie."
image: "/images/bar-service.jpg"   # une photo de /public/images
platUnique: "Tartiflette maison"   # optionnel
tags:
  - Concert
  - Soirée à thème
lieu: "Le Bistrot de Tatina — la cour"
---

Le texte complet de l'événement, en **Markdown**.
On peut mettre des paragraphes, des listes, du gras, etc.
```

L'événement apparaît automatiquement dans l'agenda et sur l'accueil. Les
événements **passés** (date dépassée) basculent dans « Événements passés ».

### Ajouter / changer une photo

1. Déposer l'image dans `public/images/` (format `.jpg`, large de préférence).
2. La référencer dans `content/galerie.json` (ou `home.json`) avec un **texte
   alternatif** (`alt`) décrivant la photo (important pour l'accessibilité).

---

## 🛠️ Back-office `/admin` (interface graphique)

Un back-office **Decap CMS** permet de gérer le contenu **sans toucher aux
fichiers** : créer / modifier / **supprimer des événements**, gérer la
**galerie** (ajout, suppression, catégories), la **carte**, les infos
pratiques, les chiffres et les partenaires. Les modifications sont enregistrées
dans `/content` (et les images dans `public/images`).

### Éditer en local (tout de suite, sans configuration)

Dans deux terminaux :

```bash
npx decap-server     # terminal 1 — petit serveur d'édition local (port 8081)
npm run dev          # terminal 2 — le site
```

Puis ouvrir **http://localhost:3000/admin**. Les changements s'écrivent
directement dans les fichiers du projet. (Activé par `local_backend: true`.)

### Éditer en production (sur le site en ligne)

Le CMS enregistre alors directement sur **GitHub** (le site se reconstruit tout
seul). Mise en place une seule fois :

1. Mettre le projet sur **GitHub**.
2. Créer une **OAuth App GitHub** (_Settings → Developer settings → OAuth Apps_)
   - **Homepage URL** : `https://VOTRE-SITE`
   - **Authorization callback URL** : `https://VOTRE-SITE/api/callback`
3. Sur Vercel, ajouter les variables `GITHUB_OAUTH_ID` et `GITHUB_OAUTH_SECRET`.
4. Dans `public/admin/config.yml`, renseigner `repo:` (owner/repo) et
   `base_url:` (URL du site).
5. Les administrateurs se connectent sur `https://VOTRE-SITE/admin` avec GitHub.

> Le dossier `/admin` est exclu des moteurs de recherche (`robots.txt` + noindex).

---

## 📨 Formulaire de contact (e-mails)

Le formulaire de contact envoie un e-mail à l'association. Configurer les
variables d'environnement (copier `.env.example` vers `.env.local`) :

- **Option 1 — Resend** (recommandé) : créer une clé sur [resend.com](https://resend.com)
  → renseigner `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
  Permet aussi l'**e-mail de confirmation** automatique.
- **Option 2 — Web3Forms** (sans compte e-mail) : clé sur
  [web3forms.com](https://web3forms.com) → renseigner `WEB3FORMS_ACCESS_KEY`.

> Sans aucune clé configurée, le formulaire fonctionne quand même : le message
> est écrit dans les logs du serveur (utile pour tester).

**Aucun paiement en ligne** n'est présent sur le site.

---

## 🌐 Mise en ligne (déploiement)

Le plus simple : [Vercel](https://vercel.com) (gratuit).

1. Pousser le projet sur GitHub.
2. Importer le dépôt dans Vercel.
3. Ajouter les variables d'environnement (les mêmes que `.env.example`),
   dont `NEXT_PUBLIC_SITE_URL` = l'adresse finale du site.
4. Déployer. Le `sitemap.xml`, `robots.txt` et les images de partage (OG) sont
   générés automatiquement.

---

## ✅ Bonnes pratiques respectées

- **Mobile-first** et **accessibilité AA** (contrastes, focus visibles, textes
  alternatifs, navigation clavier, `prefers-reduced-motion`).
- **SEO** : métadonnées par page, données structurées JSON-LD (LocalBusiness,
  Event, fil d'Ariane), sitemap, robots, images de partage dynamiques.
- **Téléphone clic-pour-appeler** partout, barre d'action sticky sur mobile.

---

## 🔧 À compléter par l'association (cherchez « TODO » dans le code)

- Horaires définitifs · chiffres d'impact réels (par année).
- Noms réels des bénéficiaires & partenaires (+ logos).
- URLs Instagram / Facebook.
- Carte & prix définitifs.
- Mentions légales : numéro RNA, SIRET, hébergeur, durées de conservation RGPD.
- Coordonnées GPS exactes (pour la carte).

---

## 🗂️ Structure (pour les développeurs)

```
app/            # pages (App Router) + routes API + SEO (sitemap, robots, OG)
components/     # composants UI (layout, home, events, gallery, menu, forms…)
content/        # contenu éditable (JSON + Markdown)
lib/            # logique (lecture contenu, events, SEO, e-mails, validation)
public/images/  # photos
types/          # types TypeScript
```

Design system : 5 couleurs (`petrole`, `creme`, `jaune`, `terracotta`, `sauge`)
et 3 polices (Bebas Neue, Archivo, Space Mono) — voir `tailwind.config.ts`.
