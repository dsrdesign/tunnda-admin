# Tunnda — Admin

Dashboard d'administration de la plateforme Tunnda, réservé à l'équipe : suivi de l'activité, des comptes et de la messagerie.

Projets liés : [tunnda-api](https://github.com/dsrdesign/tunnda-api) · [tunnda-web](https://github.com/dsrdesign/tunnda-web).

## Confidentialité : métadonnées seulement

Les arbres appartiennent aux familles. **Le dashboard ne montre jamais leur contenu** (personnes, noms, dates, liens, photos). Il ne voit que des métadonnées : nombre de familles, de membres et de fiches, activité, livraison des messages, comptes suspendus.

## Où en est-on

| Étape | État |
|---|---|
| Projet Next.js initialisé | ✅ fait |
| Connexion administrateur (téléphone et code), garde de rôle, journal d'audit | ✅ fait |
| Vue d'ensemble : comptes, familles, fiches, photos, codes envoyés, activité sur 14 jours | ✅ fait |
| Utilisateurs : recherche, numéros masqués, suspension (avec raison) et réactivation | ✅ fait |
| Familles : métadonnées seulement (membres, fiches, photos, invitations, activité) | ✅ fait |
| Messagerie : chaque envoi de code, son canal (WhatsApp, SMS) et la raison d'un échec | ✅ fait |
| Journal d'audit : qui, quoi, quand, d'où | ✅ fait |

Pages : `/` (vue d'ensemble), `/utilisateurs`, `/familles`, `/messagerie`, `/audit`, `/connexion`.

## Architecture : par fonctionnalité, comme `mimo-admin`

```text
features/<nom>/
  types/        types et libellés
  repository/   interface (le contrat)
  api/          implémentation : appels HTTP
  services/     service qui reçoit le dépôt
  hooks/        react-query : useQuery / useMutation
  components/   écrans et tableaux de la fonctionnalité
  index.ts      ce que la fonctionnalité expose aux pages
```

Les pages de `app/` restent fines : elles assemblent les composants et les hooks d'une fonctionnalité.

## Sécurité prévue (sur le modèle de mimo-admin)

- Jeton de l'API dans un cookie `httpOnly`, jamais visible du navigateur.
- Appels du navigateur via un proxy Next.js qui ajoute le jeton ; aucun appel direct à l'API.
- Jeton de rôle administrateur distinct : il ne donne aucun accès aux routes des familles.
- Chaque action sensible tracée dans le journal d'audit ; numéros masqués dans les listes ; site en `noindex`.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) et React 19 — version récente : lire `AGENTS.md` et `node_modules/next/dist/docs/` avant d'écrire du code.
- Tailwind CSS 4
- TypeScript

## Démarrage

```bash
npm install
cp .env.example .env.local    # API_URL=http://localhost:3000/api/v1
npm run dev                   # http://localhost:3002 (API sur 3000, web sur 3001)
```

Un administrateur ne s'inscrit pas : tunnda-api le crée au démarrage à partir de `ADMIN_SEED_PHONE` et `ADMIN_SEED_NAME` (voir `tunnda-api/docs/admin.md`). On se connecte ensuite avec ce numéro et le code reçu.
