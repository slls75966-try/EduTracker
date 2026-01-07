// js/timetable.js
const timetable = {
    "lundi": ["Maths", "Physique", "Français"],
    "mardi": ["Anglais", "Histoire", "Sport"],
    "mercredi": ["SVT", "Philo"],
    "jeudi": ["Maths", "Anglais", "Géographie"],
    "vendredi": ["Informatique", "Espagnol"],
    "samedi": [],
    "dimanche": ["Maths", "Français"]
};

// 2. Liste des types d'activités prédéfinies
const typesActivites = [
    "Nouvelle leçon",
    "Exercices",
    "Correction",
    "Examens",
    "Révision",
    "Rattrapage"
];

// Variable globale pour mémoriser sur quel bouton on a cliqué
let boutonSelectionne = null;

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('subjects-list');
    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
    const subjects = timetable[today] || [];

    if (subjects.length === 0) {
        list.innerHTML = "<li>Libre aujourd'hui ! 🌴</li>";
        return;
    }

    list.innerHTML = subjects.map(subject => `
        <li class="subject-item">
            <span>${subject}</span>
            <button class="btn-confirm" onclick="ouvrirMaFenetre('${subject}',this)">Remplir</button>
        </li>
    `).join('');
});

function markAsDone(button) {
    const li = button.parentElement;
    li.classList.add('done');
    button.textContent = "Fait ✅";
    button.disabled = true;
    button.style.backgroundColor = "#2ecc71";
}

// Fonction pour OUVRIR la fenêtre
function ouvrirMaFenetreold(nomMatiere) {
    // 1. On récupère l'élément du calque par son ID
    const volet = document.getElementById('mon-volet');
    
    // 2. On affiche le nom de la matière dans la fenêtre
    document.getElementById('nom-matiere-affichage').textContent = "Matière : " + nomMatiere;
    
    // 3. On change le style pour le rendre visible
    volet.style.display = "block";
}

function ouvrirMaFenetre(nomMatiere, elementBouton) {
    boutonSelectionne = elementBouton; // On mémorise le bouton
    
    document.getElementById('nom-matiere-affichage').textContent = nomMatiere;
     // ON GÉNÈRE LA LISTE DES ACTIVITÉS ICI
    genererFormulaireActivites();
    document.getElementById('mon-volet').style.display = "block";
    
    // On s'assure que le formulaire est réinitialisé à l'ouverture    
    document.getElementById('form-rapport').reset();
    afficherZoneDevoirs(false); 
    gererAnnulation(); // Remet l'opacité normale
}

// 4. Fonction pour FERMER la fenêtre
function fermerMaFenetre() {

    document.getElementById('mon-volet').style.display = "none";
    document.getElementById('form-rapport').reset();
    
    // IMPORTANT : On cache à nouveau la zone des devoirs pour la prochaine ouverture
    afficherZoneDevoirs(false);
    
    document.getElementById('groupe-activites').classList.remove('desactive'); 
    document.getElementById('date-remise').style.display = "none";
}

// Affiche ou cache la zone de texte des devoirs
function afficherZoneDevoirs(doitAfficher) {
    const zone = document.getElementById('zone-details-devoirs');
    if (doitAfficher) {
        zone.style.display = "block";
    } else {
        zone.style.display = "none";
        document.getElementById('details-devoirs').value = ""; // Vide le texte si on remet sur "Non"
    }
}

function verifierEcheancePersonnalisee() {
    const choix = document.getElementById('echeance-devoir').value;
    const champDate = document.getElementById('date-remise');
    
    if (choix === "date-fixe") {
        champDate.style.display = "block";
    } else {
        champDate.style.display = "none";
        champDate.value = ""; // Réinitialise la date
    }
}

let imagesTemporaires = {}; // Pour stocker les images avant l'enregistrement final

function toggleActiviteDetails(checkbox) {
    const detailsDiv = checkbox.parentElement.nextElementSibling;
    if (checkbox.checked) {
        detailsDiv.style.display = "flex"; // Utiliser flex pour aligner les éléments
    } else {
        detailsDiv.style.display = "none";
        // Réinitialiser le statut photo et l'image temporaire si l'activité est décochée
        const inputPhoto = detailsDiv.querySelector('input[type="file"]');
        inputPhoto.value = ''; // Réinitialise l'input file
        detailsDiv.querySelector('.photo-status').style.display = 'none';
        delete imagesTemporaires[checkbox.value]; // Supprime l'image de la mémoire temporaire
    }
}

function triggerFileUpload(button) {
    const inputPhoto = button.nextElementSibling; // L'input file caché
    inputPhoto.click(); // Simule un clic sur l'input file
}
function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        const activiteName = input.closest('.bloc-activite').querySelector('input[type="checkbox"]').value;

        reader.onload = function(e) {
            imagesTemporaires[activiteName] = e.target.result; // Stocke l'image encodée en Base64
            input.nextElementSibling.style.display = 'inline'; // Affiche le statut "Photo ajoutée"
        };
        reader.readAsDataURL(file); // Convertit l'image en Base64
    }
}
// 2. Fonction pour générer le HTML de la grille
function genererFormulaireActivites() {
    const conteneur = document.getElementById('grille-activites-dynamique');
    
    // On vide le conteneur avant de remplir
    conteneur.innerHTML = "";

    // On boucle sur chaque type d'activité
    typesActivites.forEach(type => {
        const idUnique = type.replace(/\s+/g, '-').toLowerCase(); // transforme "Nouvelle leçon" en "nouvelle-leçon"
        
        const blocHtml = `
        <div class="bloc-activite">
                <label>
                    <input type="checkbox" value="${type}" onchange="toggleActiviteDetails(this)"> 
                    ${type}
                </label>
                <div class="details-activite" style="display:none;">
                    <select class="select-niveau">
                        <option value="facile">Facile ✅</option>
                        <option value="moyen" selected>Compris 🆗</option>
                        <option value="difficile">Difficile ❌</option>
                    </select>
                    
                    <button type="button" class="btn-photo" onclick="triggerFileUpload(this)">📸 Photo</button>
                    <input type="file" accept="image/*" capture="camera" style="display:none;" onchange="handleImageUpload(this)">
                    <span class="photo-status" style="display:none; color: green; font-size: 0.8em;">Fichier ajouté</span>
                </div>
            </div>
        `;
        conteneur.insertAdjacentHTML('beforeend', blocHtml);
    });
}
// 5. Gérer l'affichage si le cours est annulé
function gererAnnulation() {
    const estAnnule = document.getElementById('cours-annule').checked;
    const groupeActivites = document.getElementById('groupe-activites');
    
    if (estAnnule) {
        groupeActivites.classList.add('desactive');
    } else {
        groupeActivites.classList.remove('desactive');
    }
}

// --- FONCTION ANNULER Rapport ---
function annulerRapport() {
    // On ferme juste la fenêtre et on réinitialise le formulaire
    fermerMaFenetre();
    console.log("Action annulée par l'utilisateur");
}
// --- FONCTION ENREGISTRER ---
async function validerEtEnregistrer() {
    alert("Merci bien.")
}
// --- FONCTION ENREGISTRER ---
async function validerEtEnregistrer1() {
    const nomMatiere = document.getElementById('nom-matiere-affichage').textContent;
    const dateJour = new Date().toLocaleDateString('fr-CA'); // Format YYYY-MM-DD
    
    // 1. Récupération des activités (Boucle sur les blocs générés)
    let activitesChoisies = [];
    const blocs = document.querySelectorAll('.bloc-activite');
    blocs.forEach(bloc => {
        const checkbox = bloc.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const niveau = bloc.querySelector('.select-niveau').value;
            const typeAct = checkbox.value;
            
            activitesChoisies.push({
                type: typeAct,
                assimilation: niveau,
                // On récupère la photo si elle a été stockée dans notre variable temporaire
                photo: photosTemporaires[typeAct] || null 
            });
        }
    });
    // 2. Récupération des devoirs
    const aDesDevoirs = document.querySelector('input[name="devoirs"]:checked').value === "Oui";
    const detailsDevoirs = document.getElementById('details-devoirs').value;
    const echeance = document.getElementById('echeance-devoir').value;
    const dateFixe = document.getElementById('date-remise').value;

    // 3. Construction de l'objet complet
    const rapportFinal = {
        id: `${dateJour}_${nomMatiere}`,
        matiere: nomMatiere,
        date: dateJour,
        activites: activitesChoisies,
        devoirs: {
            present: aDesDevoirs,
            details: detailsDevoirs,
            echeance: echeance,
            dateSpecifique: (echeance === "date-fixe") ? dateFixe : null
        },
        coursAnnule: document.getElementById('cours-annule').checked
    };
    // 4. Appel à la base de données
    try {
        await enregistrerRapportDansDB(rapportFinal);
        
        // Mise à jour visuelle de l'interface
        if (boutonSelectionne) {
            boutonSelectionne.textContent = "Fait ✅";
            boutonSelectionne.disabled = true;
            boutonSelectionne.parentElement.classList.add('done');
        }
        
        alert("Rapport de " + nomMatiere + " enregistré !");
        fermerMaFenetre();
     } catch (erreur) {
        console.error("Erreur de sauvegarde:", erreur);
        alert("Erreur lors de l'enregistrement local.");
    }
}

// 6. Gérer l'ENREGISTREMENT du formulaire
document.getElementById('form-rapport').onsubmit = function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const estAnnule = document.getElementById('cours-annule').checked;

    if (boutonSelectionne) {
        const ligneMatiere = boutonSelectionne.parentElement;

        if (estAnnule) {
            // Style si le cours n'a pas eu lieu
            ligneMatiere.style.color = "#e74c3c"; // Rouge
            boutonSelectionne.textContent = "Annulé ❌";
        } else {
            // Style si le cours est fait
            ligneMatiere.classList.add('done'); // Utilise la classe CSS .done
            boutonSelectionne.textContent = "Fait ✅";
            boutonSelectionne.style.backgroundColor = "#95a5a6";
        }

        // Désactiver le bouton après validation
        boutonSelectionne.disabled = true;
    }

    // Fermer la fenêtre après l'enregistrement
    fermerMaFenetre();
};
