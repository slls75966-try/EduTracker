// js/timetable.js
const emploiDuTemps = {
    "lundi": ["Mathématiques", "Français"],
    "mardi": ["Physique", "Anglais"],
    "mercredi": ["SVT"],
    "jeudi": ["Mathématiques", "Histoire"],
    "vendredi": ["Informatique", "Sport"],
    "samedi": [],
    "dimanche": []
};

function chargerCours() {
    const list = document.getElementById('subjects-list');
    if (!list) return;

    const jour = new Date().toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
    const cours = emploiDuTemps[jour] || [];

    if (cours.length === 0) {
        list.innerHTML = "<li>Aucun cours aujourd'hui.</li>";
        return;
    }

    list.innerHTML = cours.map((matiere, index) => `
        <li style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${matiere}</span>
            <button onclick="validerCours(this)" class="btn-check">Confirmer</button>
        </li>
    `).join('');
}

function validerCours(btn) {
    btn.textContent = "Fait ✅";
    btn.style.background = "#27ae60";
    btn.disabled = true;
    btn.parentElement.style.textDecoration = "line-through";
    btn.parentElement.style.color = "gray";
}

// On lance la fonction au chargement
window.addEventListener('load', chargerCours);
