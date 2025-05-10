import fs from "fs";

// Chemin du sitemap
const sitemapPath = "static/sitemap.xml";

// Lire le contenu du sitemap
let sitemapContent = fs.readFileSync(sitemapPath, "utf-8");

// Afficher le contenu pour le débogage
console.log("Contenu original (extrait):", sitemapContent.substring(0, 200));

// Remplacer toutes les occurrences de eloiseprofil.com par eloiseprofil.com
sitemapContent = sitemapContent.replace(/https:\/\/eloiseprofil\.com/g, "https://eloiseprofil.com");

// Vérifier si le remplacement a fonctionné
console.log("Contenu après remplacement (extrait):", sitemapContent.substring(0, 200));

// Écrire le contenu modifié dans le fichier
fs.writeFileSync(sitemapPath, sitemapContent, "utf-8");

console.log("Sitemap mis à jour avec succès!");
