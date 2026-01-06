// js/database.js

const DB_NAME = "EduTrackerDB";
const DB_VERSION = 1;
const STORE_NAME = "rapports";

// Fonction pour ouvrir la connexion à la base de données
function ouvrirDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // Création ou mise à jour de la structure de la base
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                // On crée le "magasin d'objets" avec 'id' comme clé unique
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject("Erreur IndexedDB : " + event.target.errorCode);
        };
    });
}

// Fonction pour ENREGISTRER un rapport
async function enregistrerRapportDansDB(rapport) {
    const db = await ouvrirDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(rapport); // .put ajoute ou écrase si l'id existe

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
    });
}

// Fonction pour RÉCUPÉRER un rapport spécifique (par son ID)
async function obtenirRapportDeDB(id) {
    const db = await ouvrirDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(null);
    });
}
