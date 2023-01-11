## Instructions pour les TPs

### Pré-requis
- Docker, Docker Compose, POSTMAN (ou CURL)

## TP3 : WORKER
1. Installer les nouveaux packages `npm install`
2. Provisionner le Redis en local `docker-compose up -d`
3. Rattacher votre application au Redis
4. Compléter et lancer la nouvelle migration `npm run migrate`
5. Compléter le code de `worker.js`
6. Ajouter le script pour lancer le worker dans `package.json`
7. Lancer l'application en local et tester le comportement du WORKER
8. Préparer votre application pour le déploiement :
   1. Configurer le démarrage en mode WEB et WORKER via le `Procfile`
   2. Provisionner un Redis sur Scalingo
   3. Déployer (automatique lors d'un push du master local sur master du repo en remote)