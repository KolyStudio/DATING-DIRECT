import fs from "fs";
import generateSitemap from "./src/generateSitemap.js"; // Assurez-vous que le chemin est correct

(async () => {
  const sitemapContent = generateSitemap();

  // Chemin où le sitemap sera généré
  const sitemapPath = "static/sitemap.xml";

  // Écriture du contenu du sitemap dans un fichier
  fs.writeFileSync(sitemapPath, sitemapContent, "utf-8");

  console.log(`Sitemap généré avec succès à ${sitemapPath}`);
})();
