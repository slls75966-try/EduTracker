// On attend que la page soit prête
window.onload = function() {
    const dateElement = document.getElementById('current-date');
    
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const today = new Date().toLocaleDateString('fr-FR', options);
        
        // Mise à jour du texte
        dateElement.textContent = today;
        console.log("Date chargée !");
    } else {
        console.error("Erreur : L'ID 'current-date' est introuvable dans le HTML.");
    }
};
