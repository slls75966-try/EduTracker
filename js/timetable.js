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
            <button class="btn-confirm" onclick="ouvrirMaFenetre('${subject}')">Remplir</button>
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
function ouvrirMaFenetre(nomMatiere) {
    // 1. On récupère l'élément du calque par son ID
    const volet = document.getElementById('mon-volet');
    
    // 2. On affiche le nom de la matière dans la fenêtre
    document.getElementById('nom-matiere-affichage').textContent = "Matière : " + nomMatiere;
    
    // 3. On change le style pour le rendre visible
    volet.style.display = "block";
}

// Fonction pour FERMER la fenêtre
function fermerMaFenetre() {
    const volet = document.getElementById('mon-volet');
    volet.style.display = "none";
}
