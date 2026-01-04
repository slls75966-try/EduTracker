// js/timetable.js
const timetable = {
    "lundi": ["Maths", "Physique", "Français"],
    "mardi": ["Anglais", "Histoire", "Sport"],
    "mercredi": ["SVT", "Philo"],
    "jeudi": ["Maths", "Anglais", "Géographie"],
    "vendredi": ["Informatique", "Espagnol"],
    "samedi": [],
    "dimanche": []
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
            <button class="btn-confirm" onclick="markAsDone(this)">Confirmer</button>
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
