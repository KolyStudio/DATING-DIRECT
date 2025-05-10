import { getProfileBySlug } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
  const slug = params.slug;
  const profile = getProfileBySlug(slug);
  
  // Passer les informations de détection de bot au composant
  return {
    slug,
    profile,
    isBot: locals.isBot || false,
    searchEngine: locals.searchEngine || null
  };
}
