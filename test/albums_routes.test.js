// Importe le module 'supertest' pour effectuer des tests HTTP de haut niveau
const request = require("supertest");

// Importe le module 'express' pour créer l'application web
const express = require("express");

// Importe le module 'express-session' pour gérer les sessions utilisateur
const session = require("express-session");

// Importe le module 'connect-flash' pour afficher des messages flash (messages temporaires) à l'utilisateur
const flash = require("connect-flash");

// Importe le module 'portfinder' pour trouver un port réseau disponible
const portfinder = require("portfinder");

// Importation des routes d'album de votre application
const router = require("../routes/albums_routes");

// Crée une nouvelle application Express
const app = express();

/**
 * Le module `portfinder` est une bibliothèque Node.js qui fournit des outils pour rechercher un port réseau ouvert sur votre machine locale. Il est souvent utilisé dans les situations où vous avez besoin de démarrer un serveur sur un port spécifique, mais vous ne savez pas quels ports sont actuellement disponibles.
 */

/**
 * Dans le contexte de vos tests, `portfinder` est utilisé pour trouver un port ouvert avant de démarrer votre serveur Express. Cela permet d'éviter les conflits de port si vous avez d'autres services en cours d'exécution sur votre machine qui pourraient utiliser le même port.
 */

// Configuration de l'application pour utiliser JSON, express-session, connect-flash et nos routes d'albums
app.use(express.json());

app.use(
  session({
    secret: "Your secret key",
    saveUninitialized: true,
    resave: true,
  })
);
/**
 * Ce code utilise le middleware express-session pour gérer les sessions dans votre application Express. Voici ce que fait chaque option :

secret: Cette option est utilisée pour signer le cookie de session. C'est une chaîne de caractères que vous choisissez, et elle devrait être gardée secrète. Dans ce cas, elle est définie sur "your secret key".

saveUninitialized: Cette option contrôle si une nouvelle session doit être enregistrée dans le magasin de sessions, même si elle n'a pas été modifiée. Si cette option est définie sur true, la session sera enregistrée même si elle est nouvelle et qu'aucune donnée n'a été ajoutée.

resave: Cette option contrôle si la session doit être enregistrée dans le magasin de sessions, même si elle n'a pas été modifiée lors de la requête. Si cette option est définie sur true, la session sera toujours enregistrée dans le magasin de sessions, même si elle n'a pas été modifiée.

En résumé, ce code configure votre application pour utiliser les sessions. Les sessions sont un moyen de stocker des données spécifiques à l'utilisateur entre les requêtes HTTP.
 */

//congifuration de l'application pour utiliser connect-flash (mmessages de succès ou d'échecs)
app.use(flash());

// Configuration de l'application pour utiliser nos routes d'albums
app.use("/", router);

let server;

// server = app.listen(3000, () => {
//   console.log('Application lancée sur le port 3000');
// });

beforeAll(async () => {
  // Utilise le module 'portfinder' pour trouver un port réseau disponible
  // 'getPortPromise' retourne une promesse qui se résout avec un numéro de port disponible
  port = await portfinder.getPortPromise();

  // Démarre le serveur Express sur le port trouvé précédemment
  // 'app.listen(port)' démarre le serveur sur le port spécifié et retourne un objet serveur
  server = app.listen(port);
});

afterAll((done) => {
  server.close(done);
});

//Définition d'une suites de tests pour nos routes
describe("Albums routes", () => {
  // Test pour vérifier que la création d'un nouvel album fonctionne correctement
  it("should create a new album", async () => {
    // Faire une requête POST pour créer un nouvel album
    const res = await request(server).post("/album/create").send({
      albumTitle: "Test Album",
    });
    // Vérifier que le code de statut de la réponse est 302 (redirection)
    expect(res.statusCode).toEqual(302);
    // Vérifier que l'application redirige vers '/albums' après la création d'un album
  }, 60000); //Ajouter un delais de 60secondes pour éviter les erreurs de délais d'attente
});
