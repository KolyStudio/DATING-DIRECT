import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger le fichier JSON manuellement
const configPath = resolve(__dirname, '../config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

// Liste de prénoms féminins français pour générer des profils aléatoires
const prenoms = [
  "Éloise", "Eloise", "Eloy", "Elo"
];

// Liste de professions pour générer des profils aléatoires
const professions = [
  "Infirmière", "Étudiante", "Professeure", "Médecin", "Avocate", "Architecte",
  "Designer", "Photographe", "Artiste", "Ingénieure", "Développeuse", "Consultante",
  "Psychologue", "Pharmacienne", "Journaliste", "Vétérinaire", "Comptable", "Chef d'entreprise",
  "Commerciale", "Assistante", "Graphiste", "Kinésithérapeute", "Nutritionniste", "Dentiste",
  "Styliste", "Décoratrice", "Hôtesse de l'air", "Traductrice", "Musicienne", "Danseuse"
];

/**
 * Génère un hash simple à partir d'une chaîne
 * @param {string} str - La chaîne à hacher
 * @returns {number} - La valeur de hachage
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir en entier 32 bits
  }
  return Math.abs(hash);
}

/**
 * Génère un profil aléatoire basé sur un pseudo
 * @param {string} pseudo - Le pseudo pour lequel générer un profil
 * @returns {object} - Le profil généré
 */
function generateProfile(pseudo) {
  const seed = hashString(pseudo);

  // Générer un prénom aléatoire basé sur le seed
  const prenom = prenoms[seed % prenoms.length];

  // Générer un âge aléatoire entre 20 et 35 ans
  const age = 20 + (seed % 16);

  // Générer une profession aléatoire
  const profession = professions[seed % professions.length];

  // Générer une distance aléatoire entre 1 et 15 km
  const userDistance = 1 + (seed % 15);

  // Générer un nombre de photos aléatoire entre 10 et 99
  const userPhotos = 10 + (seed % 90);

  // Générer d'autres attributs aléatoires si nécessaire
  return {
    prenom,
    age,
    profession,
    userDistance,
    userPhotos,
    // Vous pouvez ajouter d'autres attributs ici
  };
}

// Générer les profils pour tous les pseudos dans config.json
const generatedProfiles = {};

// Ajouter des profils par défaut pour les slugs spécifiques

// Générer des profils pour tous les pseudos de config.json
config.pseudos.forEach(pseudo => {
  const slug = pseudo.toLowerCase();
  // Ne pas écraser les profils par défaut
  if (!generatedProfiles[slug]) {
    generatedProfiles[slug] = generateProfile(pseudo);
  }
});

export const profiles = generatedProfiles;
