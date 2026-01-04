// js/date.js
document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('current-date');
    const welcomeElement = document.getElementById('welcome-msg');
    
    const now = new Date();
    
    // Affichage de la date
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('fr-FR', options);

    // Message de bienvenue
    const hour = now.getHours();
    welcomeElement.textContent = (hour < 18) ? "Bonjour !" : "Bonsoir !";
});
