### Etapes :

1 Verifier que vous avez MongoDBCompas
2 Lancer Docker desktop (balaine bleu)
3 docker-compose -v (vérifier que vous pouvez conteneuriser un app)
4 Récuperer le projet : https://github.com/Paul78330/phototheque
5 Relier le ref et récuperer le contenu du ref distant

```
git pull upstream main --allow-unrelated-histories
```

6 Mettre à jour mes packages (récuperer mes dépendances)

```
npm install
```

7 installer mongoDb Atlas
8 Relier le ref de du projet GitLabgit remote add origin https://gitlab.com/tms-team1/node_ci_project.githttps://gitlab.com/Paul78330
9 pousser vers le ref gitla

```
git push --set-upstream origin main
```

10 Builder docker dans le projet

```
docker build
```

11 Editer un fichier de config Dockerfile, qui permettra de configurer notre conteneurisation

```
docker build
```

12 Configuration de l'infrastructure docker-compose.yml (preparer les services indispensbles pour l'utilisation de l'app)

```
docker-compose up -d
```

-d : en détaché (en arrière plan)

13 Editer le fichier de config .gitlab-ci.yml

14 installer Jest : pour tester le code en Js

```
npm install --save-dev jest
```

15 installer supertest : bibliothèque de test pour Node.js

```
npm install --save-dev supertest
```

16 installer sinon : bibliothèque de test pour JavaScript qui fournit des fonctionnalités pour les tests unitaires, comme les espions, les stubs et les mocks.

```
npm install sinon
```

17 Editer le ficher index.test.js ( nous souhaitions tester index.js)

* le ficher à tester dois être en [nom_fichier].test.js
* resoudre les différents dans index.test.js

A savoir :

    -	Comment inspecter tous les processus encours sur notre machine

```
netstat -tuln [vérifier le ports utilisée sur linux]
netstat -ano [vérifier les ports utilisée pour windows]
```

- Pour savoir quel service utilise le port 3000, vous pouvez utiliser la commande `lsof` (List of Open Files) sur un système Unix/Linux ou la commande `netstat` sur Windows.

  ```
  lsof -i :3000 [linux]
  netstat -ano | findstr :3000 [windows]
  ```

  - Pour arrêter le processus qui utilise le port 3000, vous pouvez utiliser la commande `kill` sur Unix/Linux ou la commande `taskkill` sur Windows.

```
kill -9 <PID> [linux]
taskkill /PID <PID> /F [windows]
```

- pour arreter les conteneur docker-compose encours
  - ```
    docker-compose down
    ```

    - pour stopper toutes les images docker encours

```
docker stop $(docker ps -aq)
```

- pour supprimer les conteneurs existants
  - ```
    docker rm -f $(docker ps -aq)
    ```

    - pour supprimer tous les conteneur et réseaux inutilisés
    - 

```
docker sytem prune -a
docker network prune
```

18 Créer un dosier test et y mettre le fihcier de configuration du test [albums_routes.test.js]

19 - ajouter test:integration dans script du package.json, afin d'avoir une commande npm pour le lancement du test

20- Ajouter protfinder : bibliothèque Node permettant d'allouer un port disponible 

```
npm install portfinder
```

21- configurer le job adéquat dans le fichier .gitlab-ci.yml

22- tester la configuration localement + tester la configuration depuis docker-compose

23- envoyer mes modifications (changements dans le code) vers mon environnements d'intégration (GitLab)

```
git push [branche distante] [branche locale]
```
