# Tunnda — Admin

Dashboard d'administration de la plateforme Tunnda, réservé à l'équipe : suivi de l'activité, des comptes et de la messagerie.

Projets liés : [tunnda-api](https://github.com/dsrdesign/tunnda-api) · [tunnda-web](https://github.com/dsrdesign/tunnda-web).

## Confidentialité : métadonnées seulement

Les arbres appartiennent aux familles. **Le dashboard ne montre jamais leur contenu** (personnes, noms, dates, liens, photos). Il ne voit que des métadonnées : nombre de familles, de membres et de fiches, activité, livraison des messages, comptes suspendus.

## Où en est-on

| Étape | État |
|---|---|
| Projet Next.js initialisé | ✅ fait |
| Connexion administrateur (téléphone et code), garde de rôle, journal d'audit | ⬜ à faire |
| Vue d'ensemble : familles, membres, fiches, activité | ⬜ à faire |
| Utilisateurs : suspension et réactivation d'un compte | ⬜ à faire |
| Messagerie : livraison des codes et invitations WhatsApp / SMS | ⬜ à faire |

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
npm run dev -- -p 3002        # http://localhost:3002 (API sur 3000, web sur 3001)
```
