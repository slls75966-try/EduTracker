// js/date.js
function afficherDate() {
    const dateElement = document.getElementById('current-date');
    const welcomeElement = document.getElementById('welcome-msg');
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = new Date();
    
    if (dateElement) {
        dateElement.textContent = dateNow.toLocaleDateString('fr-FR', options);
    }

    if (welcomeElement) {
        const heure = dateNow.getHours();
        welcomeElement.textContent = heure >= 18 ? "Bonsoir !" : "Bonjour !";
    }
}

// On lance la fonction au chargement
window.addEventListener('load', afficherDate);
