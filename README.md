# Maison Haute Lumière — site vitrine

Site e-commerce/vitrine premium pour Maison Haute Lumière Paris, construit pour le lancement à 40 €.

## Inclus

- Accueil premium noir / or / brun, inspiré des visuels fournis.
- Collection : Crème Brûlée, Flame Berry, Nectar, Éclat de Vanille.
- Notes olfactives reprises des visuels fournis.
- Offre de lancement à 40 €.
- Livraison locale : Nanterre / 92 / alentours.
- Expédition par colis en dehors de la zone locale.
- CTA Snapchat vers `parfums.byrsd`.
- Fiche produit en modal.
- Page `/admin`.
- Connexion admin par mot de passe via `ADMIN_PASSWORD`.
- Ajout de produits depuis l'admin avec URL d'image ou import d'une image.
- Suppression de produits.
- Responsive mobile / desktop.

## Vercel

Ajouter une variable d'environnement :

`ADMIN_PASSWORD=un-mot-de-passe-fort`

Puis déployer le dépôt.

### Important

Le catalogue ajouté depuis l'admin est actuellement stocké dans le navigateur via localStorage. Les quatre parfums de base sont intégrés au code. Pour un catalogue partagé entre plusieurs appareils, il faudra brancher une base de données (Supabase par exemple).

## Développement

```bash
npm install
npm run dev
```

Puis ouvrir `/admin` pour gérer le catalogue.
