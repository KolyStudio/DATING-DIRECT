import fs from "fs";
import { profiles } from "./src/lib/profiles.js";

// Configuration directe pour éviter les problèmes de chargement de fichiers
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
    "eloisenokira", "eloisefratoma", "eloisepilyna", "pauline"
  ]
};

/**
 * Génère un hash simple à partir d'une chaîne pour la randomisation
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
 * Fonction pour générer les slugs à partir des pseudos avec des priorités variables
 */
function generateSlugs() {
  // Utilisation de map pour transformer chaque pseudo en un objet slug
  return config.pseudos.map((pseudo) => {
    const slug = pseudo.toLowerCase();
    const seed = hashString(slug);

    // Générer une date de dernière modification dans les 7 derniers jours
    const lastmod = new Date();
    lastmod.setDate(lastmod.getDate() - (seed % 7));

    // Déterminer la fréquence de changement en fonction du seed
    const changefreqOptions = ["daily", "weekly", "monthly"];
    const changefreq = changefreqOptions[seed % changefreqOptions.length];

    // Déterminer la priorité en fonction du profil
    // Les profils avec plus de photos ou plus jeunes ont une priorité plus élevée
    const profile = profiles[slug];
    let priority = 0.5; // Priorité par défaut

    if (profile) {
      // Ajuster la priorité en fonction de l'âge (plus jeune = priorité plus élevée)
      if (profile.age < 25) {
        priority += 0.2;
      } else if (profile.age < 30) {
        priority += 0.1;
      }

      // Ajuster la priorité en fonction du nombre de photos (plus de photos = priorité plus élevée)
      if (profile.userPhotos > 50) {
        priority += 0.2;
      } else if (profile.userPhotos > 30) {
        priority += 0.1;
      }

      // S'assurer que la priorité est entre 0.1 et 1.0
      priority = Math.min(Math.max(priority, 0.1), 1.0);
      priority = Math.round(priority * 10) / 10; // Arrondir à 1 décimale
    }

    return {
      url: `/${slug}`,
      lastmod: lastmod.toISOString(),
      changefreq,
      priority
    };
  });
}

/**
 * Fonction pour générer le sitemap XML à partir des slugs
 */
function generateSitemap() {
  const domain = `https://${config.siteName}`;
  console.log("Using domain:", domain);
  console.log("Config siteName:", config.siteName);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Ajouter la page d'accueil avec la priorité maximale
  xml += `
  <url>
    <loc>${domain}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Générer les slugs
  const slugs = generateSlugs();

  // Ajouter chaque slug au sitemap
  slugs.forEach((slug) => {
    xml += `
  <url>
    <loc>${domain}${slug.url}</loc>
    <lastmod>${slug.lastmod}</lastmod>
    <changefreq>${slug.changefreq}</changefreq>
    <priority>${slug.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

(async () => {
  const sitemapContent = generateSitemap();

  // Chemin où le sitemap sera généré
  const sitemapPath = "static/sitemap.xml";

  // Écriture du contenu du sitemap dans un fichier
  fs.writeFileSync(sitemapPath, sitemapContent, "utf-8");

  console.log(`Sitemap généré avec succès à ${sitemapPath}`);
})();
