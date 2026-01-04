// Cette fonction s'exécute dès que la page est totalement chargée
window.onload = function() {
    // 1. On cherche l'endroit où afficher la date
    const dateElement = document.getElementById('current-date');
    const welcomeElement = document.getElementById('welcome-msg');

    // 2. On configure le format de la date (ex: lundi 14 juillet 2024)
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // 3. On génère la date du jour en français
    const aujourdhui = new Date().toLocaleDateString('fr-FR', options);

    // 4. On vérifie si l'élément existe bien avant d'écrire dedans
    if (dateElement) {
        dateElement.textContent = aujourdhui;
    }

    //Optionnel : Personnaliser le message de bienvenue selon l'heure
    const heure = new Date().getHours();
    if (welcomeElement) {
        if (heure >= 18) {
            welcomeElement.textContent = "Bonsoir et bienvenue !";
        } else {
            welcomeElement.textContent = "Bonjour et bienvenue !";
        }
    }
};
