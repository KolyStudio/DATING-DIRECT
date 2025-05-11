// Configuration directe pour éviter les problèmes de chargement de fichiers sur Vercel
const config = {
  "siteName": "eloiseprofil.com",
  "pseudos": [
    "eloisevalota", "eloisemeruka", "eloisepiraya", "eloisendira", "eloisetamira",
    "eloisefanyra", "eloisezuloka", "eloisekorimi", "eloisevarlena", "eloisekideya",
    "eloisedereva", "eloisevynara", "eloisebotaya", "eloiserynta", "eloisebomika",
    "eloisemirata", "eloisepirava", "eloisemykora", "eloisenurila", "eloisevalimo",
    "eloisefirana", "eloisekuvana", "eloisepamira", "eloisejarita", "eloiseykoma",
    "eloisequarila", "eloisedazemi", "eloisenamiro", "eloiselavoto", "eloisefytona",
    "eloiseharima", "eloisekamiro", "eloiselinura", "eloisefaruna", "eloiselureta",
    "eloisemeruva", "eloisejurena", "eloisetunora", "eloiserymata", "eloisekimava",
    "eloisenorido", "eloisepatoda", "eloisezanita", "eloisefolina", "eloisekerula",
    "eloisemyzano", "eloisehaliza", "eloiseburata", "eloiseverono", "eloisepokira",
    "eloiseranuma", "eloisefadira", "eloisefenata", "eloisevolira", "eloisemukata",
    "eloisevarota", "eloisegirema", "eloisenivaka", "eloisefradia", "eloisejukana",
    "eloiselanuma", "eloisepazira", "eloisekamina", "eloisebureta", "eloisegimara",
    "eloisekufara", "eloisequlima", "eloisewiruna", "eloisemazyta", "eloisefilova",
    "eloisehukora", "eloiseparuma", "eloiselorina", "eloiselobaga", "eloisepukala",
    "eloisezytoma", "eloisebilara", "eloisemunava", "eloiserabita", "eloiseyuloma",
    "eloisefatumas", "eloisemyraka", "eloisekoriva", "eloisepilyta", "eloisevamyta",
    "eloisekozeny", "eloisefoneta", "eloisekavita", "eloiseremiva", "eloisehutoma",
    "eloisewizana", "eloiselikuma", "eloisepinora", "eloisevysudo", "eloiseyorima",
    "eloiseforuta", "eloisecamita", "eloisepinava", "eloiselamiros", "eloisevonyda",
    "eloiseyavara", "eloisemurkia", "eloisekalida", "eloisepazoma", "eloisefuzira",
    "eloisesaruta", "eloisetyroma", "eloisenibaka", "eloisevakota", "eloiselubika",
    "eloisenokira", "eloisefratoma", "eloisepilyna"
  ]
};

// Liste de prénoms féminins français pour générer des profils aléatoires
const prenoms = [
  "Éloise", "Eloise", "Eloy", "Elo"
];

// Liste de professions pour générer des profils aléatoires adaptées aux 20-24 ans
const professions = [
  "Étudiante en droit", "Étudiante en médecine", "Étudiante en psychologie", "Étudiante en commerce",
  "Étudiante en arts", "Étudiante en communication", "Étudiante en langues", "Étudiante en informatique",
  "Étudiante en marketing", "Étudiante en biologie", "Étudiante en design", "Étudiante en journalisme",
  "Serveuse", "Barista", "Vendeuse", "Hôtesse d'accueil", "Assistante de vente", "Réceptionniste",
  "Influenceuse", "Créatrice de contenu", "Mannequin", "Danseuse", "Chanteuse", "Artiste",
  "Assistante administrative", "Aide-soignante", "Infirmière stagiaire", "Auxiliaire de vie",
  "Animatrice", "Professeure de fitness", "Coiffeuse", "Esthéticienne", "Maquilleuse", "Photographe"
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

  // Générer un âge aléatoire entre 20 et 24 ans
  const age = 20 + (seed % 5);

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
