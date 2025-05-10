/**
 * Liste des user agents des principaux robots de recherche
 */
const searchBots = [
  // Google
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-News',
  'Googlebot-Video',
  'AdsBot-Google',
  'AdsBot-Google-Mobile',
  'Mediapartners-Google',
  'Google-Read-Aloud',
  'DuplexWeb-Google',
  'Google Favicon',
  'Storebot-Google',
  
  // Bing
  'bingbot',
  'BingPreview',
  'adidxbot',
  'msnbot',
  'msnbot-media',
  
  // Yahoo
  'Slurp',
  
  // Yandex
  'YandexBot',
  'YandexImages',
  'YandexAccessibilityBot',
  'YandexMobileBot',
  'YandexMetrika',
  
  // Baidu
  'Baiduspider',
  'Baiduspider-image',
  'Baiduspider-video',
  'Baiduspider-news',
  'Baiduspider-favo',
  'Baiduspider-cpro',
  'Baiduspider-ads',
  
  // DuckDuckGo
  'DuckDuckBot',
  
  // Autres
  'Applebot',
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'PinterestBot',
  'Discordbot',
  'TelegramBot',
  'WhatsApp',
  'Sogou',
  'Exabot',
  'ia_archiver',
  'archive.org_bot',
  'Alexabot',
  'AhrefsBot',
  'MJ12bot',
  'SemrushBot',
  'SEOkicks',
  'DotBot',
  'SeznamBot',
  'Qwantify',
  'Pinterestbot',
  'BLEXBot',
  'Barkrowler',
  'PetalBot',
  'CCBot',
  'crawler',
  'spider',
  'bot'
];

/**
 * Détecte si le user agent correspond à un robot de recherche
 * @param {string} userAgent - Le user agent à vérifier
 * @returns {boolean} - True si c'est un robot, false sinon
 */
export function isSearchBot(userAgent) {
  if (!userAgent) return false;
  
  // Convertir en minuscules pour une comparaison insensible à la casse
  const userAgentLower = userAgent.toLowerCase();
  
  return searchBots.some(bot => 
    userAgentLower.includes(bot.toLowerCase())
  );
}

/**
 * Identifie le moteur de recherche spécifique
 * @param {string} userAgent - Le user agent à analyser
 * @returns {string|null} - Le nom du moteur de recherche ou null si non identifié
 */
export function identifySearchEngine(userAgent) {
  if (!userAgent) return null;
  
  const userAgentLower = userAgent.toLowerCase();
  
  if (userAgentLower.includes('google')) return 'google';
  if (userAgentLower.includes('bing')) return 'bing';
  if (userAgentLower.includes('yandex')) return 'yandex';
  if (userAgentLower.includes('baidu')) return 'baidu';
  if (userAgentLower.includes('slurp')) return 'yahoo';
  if (userAgentLower.includes('duckduckbot')) return 'duckduckgo';
  if (userAgentLower.includes('applebot')) return 'apple';
  if (userAgentLower.includes('facebookexternalhit')) return 'facebook';
  if (userAgentLower.includes('twitterbot')) return 'twitter';
  if (userAgentLower.includes('linkedinbot')) return 'linkedin';
  if (userAgentLower.includes('pinterestbot')) return 'pinterest';
  
  // Si c'est un bot mais qu'on ne peut pas l'identifier précisément
  if (searchBots.some(bot => userAgentLower.includes(bot.toLowerCase()))) {
    return 'unknown_bot';
  }
  
  return null;
}
