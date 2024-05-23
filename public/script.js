document.addEventListener("DOMContentLoaded", function() {
    const calculatorForm = document.getElementById("calculatorForm");
    const resultatInput = document.getElementById("resultat");

    calculatorForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre automatiquement

        const formData = new FormData(calculatorForm);
        const expression = formData.get("resultat");

        if (expression.trim() === '') return; // Ne rien faire si l'expression est vide
        try {
            const resultat = eval(expression); // Évaluer l'expression pour obtenir le résultat
            resultatInput.value = resultat;
        } catch (error) {
            resultatInput.value = "Erreur";
            console.error('Erreur:', error);
        }
    });

    function ajouterChiffre(chiffre) {
        resultatInput.value += chiffre;
    }

    function ajouterOperation(op) {
        const dernierCaractere = resultatInput.value.slice(-1);
        if (dernierCaractere === '+' || dernierCaractere === '-' || dernierCaractere === '*' || dernierCaractere === '/') {
            // Remplacer le dernier opérateur s'il y en a déjà un
            resultatInput.value = resultatInput.value.slice(0, -1) + op;
        } else {
            resultatInput.value += op;
        }
    }

    function calculer() {
        const expression = resultatInput.value;
        if (expression.trim() === '') return; // Ne rien faire si l'expression est vide
        try {
            const resultat = eval(expression); // Évaluer l'expression pour obtenir le résultat
            resultatInput.value = resultat;
        } catch (error) {
            resultatInput.value = "Erreur";
            console.error('Erreur:', error);
        }
    }

    function effacer() {
        resultatInput.value = '';
    }

    // Exposer les fonctions globalement pour pouvoir les utiliser dans le HTML
    window.ajouterChiffre = ajouterChiffre;
    window.ajouterOperation = ajouterOperation;
    window.calculer = calculer;
    window.effacer = effacer;
});
