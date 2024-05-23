const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const dataFilePath = 'data/operations.json';

// Chargement des opérations stockées
let operations = [];
if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    operations = JSON.parse(data);
}

// Fonction pour sauvegarder les opérations dans un fichier
function saveOperations() {
    fs.writeFileSync(dataFilePath, JSON.stringify(operations, null, 2), 'utf-8');
}

// Route GET pour afficher l'interface de la calculatrice
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route POST pour effectuer une opération de calcul
app.post('/calculer', (req, res) => {
    const { nombre1, nombre2, operation } = req.body;

    if (typeof nombre1 !== 'number' || typeof nombre2 !== 'number' || !['+', '-', '*', '/'].includes(operation)) {
        return res.status(400).json({ erreur: 'Données invalides' });
    }

    let resultat;
    switch (operation) {
        case '+':
            resultat = nombre1 + nombre2;
            break;
        case '-':
            resultat = nombre1 - nombre2;
            break;
        case '*':
            resultat = nombre1 * nombre2;
            break;
        case '/':
            resultat = nombre2 !== 0 ? nombre1 / nombre2 : 'Erreur: Division par zéro';
            break;
        default:
            resultat = 'Opération non valide';
    }

    const calcul = { nombre1, nombre2, operation, resultat };
    operations.push(calcul);
    saveOperations();

    res.json({ resultat });
});

// Route GET pour récupérer les opérations stockées
app.get('/operations', (req, res) => {
    res.json(operations);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
