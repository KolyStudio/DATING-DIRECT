import { isSearchBot, identifySearchEngine } from '$lib/utils/botDetector';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const userAgent = event.request.headers.get('user-agent') || '';

  // Détection des robots de recherche
  const isBot = isSearchBot(userAgent);
  const searchEngine = identifySearchEngine(userAgent);

  // Ajouter les informations de détection au contexte de l'événement
  event.locals.isBot = isBot;
  event.locals.searchEngine = searchEngine;

  // Résoudre la requête normalement
  return await resolve(event);
}
