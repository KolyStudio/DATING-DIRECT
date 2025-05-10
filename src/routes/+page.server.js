import { profiles } from '$lib/profiles.js';

/** @type {import('./$types').PageServerLoad} */
export function load() {
  // Récupérer tous les profils pour la page d'accueil
  return {
    profiles
  };
}
