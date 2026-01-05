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
