import { profiles } from './profiles.js';
import { isSearchBot, identifySearchEngine } from './utils/botDetector';
import { generateUniqueContent } from './utils/contentGenerator';

/**
 * Récupère les données d'un profil à partir de son slug
 * @param {string} slug - Le slug du profil
 * @returns {object} - Les données du profil
 */
export const getProfileBySlug = (slug) => {
  // Default to the first profile if slug doesn't exist
  return profiles[slug] || profiles.pauline;
};

// Exporter les fonctions utilitaires
export {
  isSearchBot,
  identifySearchEngine,
  generateUniqueContent
};
