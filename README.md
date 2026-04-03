# Session Cookie

Application Node.js avec authentification par session, connexion à MongoDB et rendu de vues EJS.

## Fonctionnalités

- Inscription d'un utilisateur
- Connexion avec mot de passe haché
- Gestion de session avec `express-session`
- Stockage des sessions dans MongoDB avec `connect-mongodb-session`
- Accès protégé au tableau de bord
- Déconnexion avec destruction de session

## Stack technique

- Node.js / Express
- MongoDB / Mongoose
- EJS
- express-session
- bcrypt

## Prérequis

- Node.js installé
- MongoDB lancé en local ou accessible à distance

## Installation

```bash
npm install
```

## Configuration

La chaîne de connexion MongoDB est définie dans [config/default.json](config/default.json).

Exemple actuel :

```json
{
  "mongoURI": "mongodb://localhost:27017/sessions"
}
```

Si nécessaire, adaptez cette valeur à votre environnement MongoDB.

## Lancement

Mode normal :

```bash
npm start
```

Mode développement :

```bash
npm run dev
```

L'application démarre sur le port `5000`.

## Routes principales

- `GET /` : page d'accueil
- `GET /login` : formulaire de connexion
- `POST /login` : authentification
- `GET /register` : formulaire d'inscription
- `POST /register` : création de compte
- `GET /dashboard` : page protégée accessible uniquement si l'utilisateur est authentifié
- `POST /logout` : déconnexion

## Structure du projet

- [app.js](app.js) : point d'entrée de l'application
- [controllers/appController.js](controllers/appController.js) : logique des pages et de l'authentification
- [middleware/is-auth.js](middleware/is-auth.js) : protection des routes privées
- [models/User.js](models/User.js) : schéma utilisateur MongoDB
- [config/db.js](config/db.js) : connexion à la base de données
- [views/](views) : templates EJS

## Flux d'utilisation

1. L'utilisateur ouvre la page d'accueil.
2. Il crée un compte via `/register`.
3. Il se connecte via `/login`.
4. Une session est créée et stockée dans MongoDB.
5. L'accès à `/dashboard` est autorisé tant que la session est valide.
6. La déconnexion supprime la session.

## Remarques

- Le mot de passe est haché avant enregistrement.
- Le projet utilise des messages d'erreur stockés temporairement dans la session pour l'affichage sur les pages de connexion et d'inscription.
- Si MongoDB n'est pas démarré, l'application ne pourra pas se connecter correctement.
