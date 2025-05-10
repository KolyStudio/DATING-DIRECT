import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load() {
  // Rediriger vers le profil par défaut
  throw redirect(302, '/pauline');
}
