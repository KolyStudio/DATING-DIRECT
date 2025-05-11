/**
 * Générateur de contenu unique pour les pages de profil
 * Ce module génère du contenu unique pour chaque profil en fonction du slug
 */

/**
 * Génère un contenu unique pour un profil spécifique
 * @param {string} slug - Le slug de la page
 * @param {object} profile - Les données du profil
 * @returns {object} - Contenu unique généré
 */
export function generateUniqueContent(slug, profile) {
  // Utiliser le slug comme seed pour la génération de contenu
  const seed = hashString(slug);

  // Générer des sections de contenu uniques basées sur le profil et le seed
  const content = generateParagraphs(profile, seed);

  // Générer un titre unique
  const title = generateTitle(profile, seed, slug);

  // Générer une description unique
  const description = generateDescription(profile, seed, slug);

  // Générer des mots-clés uniques
  const keywords = generateKeywords(profile, seed);

  // Générer une date de dernière mise à jour aléatoire mais récente
  const lastUpdated = generateRecentDate(seed);

  // Générer un nombre de vues aléatoire
  const views = 100 + (seed % 900); // Entre 100 et 999 vues

  // Générer un taux de réponse aléatoire
  const responseRate = 70 + (seed % 30); // Entre 70% et 99%

  // Générer un temps de réponse aléatoire
  const responseTime = ["quelques minutes", "moins d'une heure", "1-2 heures", "dans la journée"][seed % 4];

  // Générer des images aléatoires
  const randomImages = generateRandomImages(seed, profile);

  // Générer des listes aléatoires de loisirs et passions
  const randomInterests = generateRandomInterests(seed);

  return {
    title,
    description,
    content,
    keywords,
    lastUpdated,
    views,
    responseRate,
    responseTime,
    slug,
    images: randomImages,
    interests: randomInterests
  };
}

/**
 * Génère des listes aléatoires de loisirs et passions
 * @param {number} seed - La valeur seed
 * @returns {object} - Les listes de loisirs et passions
 */
function generateRandomInterests(seed) {
  // Liste étendue de loisirs
  const hobbies = [
    'Voyages et découvertes',
    'Cinéma et séries',
    'Gastronomie',
    'Sport et bien-être',
    'Photographie',
    'Randonnée',
    'Yoga',
    'Cuisine',
    'Lecture',
    'Danse',
    'Musique',
    'Jardinage',
    'Bricolage',
    'Jeux vidéo',
    'Jeux de société',
    'Dessin et peinture',
    'Écriture',
    'Théâtre',
    'Vélo',
    'Natation',
    'Course à pied',
    'Méditation',
    'Ski',
    'Surf',
    'Escalade',
    'Équitation',
    'Pêche',
    'Camping',
    'Astronomie',
    'Plongée sous-marine',
    'Voile',
    'Patinage',
    'Tennis',
    'Golf',
    'Basketball',
    'Football',
    'Volleyball',
    'Badminton',
    'Bowling',
    'Billard',
    'Échecs',
    'Poker',
    'Karaoké',
    'Couture',
    'Tricot',
    'Poterie',
    'Sculpture',
    'Calligraphie',
    'Origami',
    'Collection (timbres, pièces, etc.)'
  ];

  // Liste étendue de passions
  const passions = [
    'Art et culture',
    'Musique et concerts',
    'Lecture',
    'Nature et écologie',
    'Développement personnel',
    'Histoire',
    'Sciences',
    'Technologie',
    'Innovation',
    'Architecture',
    'Design',
    'Mode',
    'Beauté',
    'Santé',
    'Nutrition',
    'Psychologie',
    'Philosophie',
    'Spiritualité',
    'Langues étrangères',
    'Voyages culturels',
    'Gastronomie du monde',
    'Œnologie',
    'Mixologie',
    'Photographie artistique',
    'Cinéma indépendant',
    'Théâtre contemporain',
    'Opéra',
    'Ballet',
    'Danse contemporaine',
    'Littérature classique',
    'Poésie',
    'Écriture créative',
    'Journalisme',
    'Politique',
    'Économie',
    'Finance personnelle',
    'Entrepreneuriat',
    'Marketing',
    'Communication',
    'Éducation',
    'Coaching',
    'Bénévolat',
    'Causes humanitaires',
    'Protection animale',
    'Développement durable',
    'Minimalisme',
    'Art de vivre',
    'Décoration intérieure',
    'Jardinage urbain',
    'Astronomie'
  ];

  // Sélectionner aléatoirement 5 loisirs et 5 passions
  const selectedHobbies = selectRandomMultiple(hobbies, seed, 5);
  const selectedPassions = selectRandomMultiple(passions, seed + 200, 5);

  return {
    hobbies: selectedHobbies,
    passions: selectedPassions
  };
}

/**
 * Génère des URLs d'images aléatoires pour le profil
 * @param {number} seed - La valeur seed
 * @param {object} profile - Les données du profil
 * @returns {object} - Les URLs des images générées
 */
function generateRandomImages(seed, profile) {
  // Déterminer le genre pour les images (basé sur le prénom, simplifié)
  const gender = ['Marie', 'Sophie', 'Julie', 'Laura', 'Emma', 'Léa', 'Chloé', 'Camille', 'Manon', 'Sarah',
                 'Pauline', 'Lucie', 'Océane', 'Éloise', 'Jade', 'Inès', 'Clara', 'Charlotte', 'Juliette', 'Zoé']
                 .includes(profile.prenom) ? 'female' : 'male';

  // Services d'images aléatoires
  const services = {
    // RandomUser API - photos de personnes réalistes
    randomuser: {
      profile: `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${seed % 99}.jpg`,
      lifestyle: `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${(seed + 10) % 99}.jpg`,
      gallery: [
        `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${(seed + 20) % 99}.jpg`,
        `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${(seed + 30) % 99}.jpg`,
        `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${(seed + 40) % 99}.jpg`
      ]
    },


  };

  // Sélectionner un service aléatoire basé sur le seed
  const serviceKeys = Object.keys(services);
  const selectedService = serviceKeys[seed % serviceKeys.length];

  // Retourner les URLs d'images du service sélectionné
  return {
    service: selectedService,
    profileImage: services[selectedService].profile,
    lifestyleImage: services[selectedService].lifestyle,
    galleryImages: services[selectedService].gallery
  };
}

/**
 * Génère une date récente aléatoire
 * @param {number} seed - La valeur seed
 * @returns {string} - La date au format DD/MM/YYYY
 */
function generateRecentDate(seed) {
  const now = new Date();
  // Générer une date dans les 30 derniers jours
  const daysAgo = seed % 30;
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

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
 * Sélectionne un élément aléatoire d'un tableau basé sur un seed
 * @param {Array} array - Le tableau d'options
 * @param {number} seed - La valeur seed
 * @returns {*} - L'élément sélectionné
 */
function selectRandom(array, seed) {
  const index = seed % array.length;
  return array[index];
}

/**
 * Génère un titre unique pour le profil
 * @param {object} profile - Les données du profil
 * @param {number} seed - La valeur seed
 * @param {string} slug - Le slug de la page
 * @returns {string} - Le titre généré
 */
function generateTitle(profile, seed, slug) {
  const titleTemplates = [
    `${slug} - Rencontre et chat privé`,
    `Page personnelle de ${slug} | ${profile.age} ans`,
    `${slug}, ${profile.age} ans - Profil de rencontre`,
    `Discuter avec ${slug} - Profil privé`,
    `${slug} - ${profile.profession} de ${profile.age} ans`,
    `Profil de ${slug} | Chat et photos privées`,
    `${slug} - Disponible pour discuter maintenant`,
    `Rencontrer ${slug}, ${profile.profession} de ${profile.age} ans`,
    `${slug} ${profile.age} ans - Échange de messages privés`,
    `Profil vérifié de ${slug} - ${profile.profession}`,
    `${slug} - Rencontres et discussions en ligne`,
    `Chat privé avec ${slug}, ${profile.age} ans`,
    `${slug} - Profil personnel et photos privées`,
    `Découvrir ${slug}, ${profile.profession} de ${profile.age} ans`,
    `${slug} - Messagerie instantanée et rencontres`,
    `Profil exclusif de ${slug} | ${profile.age} ans`,
    `${slug} - Disponible pour chat et rencontres`,
    `Rencontrer ${slug} - Profil authentique`,
    `${slug}, ${profile.age} ans - Échanges et rencontres`,
    `Profil de ${slug} - Photos et chat privé`,
    `${slug} - Messagerie privée et rencontres`,
    `${slug}, ${profile.profession} - Profil vérifié`,
    `Chat avec ${slug} - Profil personnel`,
    `${slug} ${profile.age} ans - Rencontres locales`,
    `Profil et photos de ${slug} - Chat privé`,
    `${slug} - Discussions et rencontres`,
    `${slug}, ${profile.profession} - Disponible maintenant`,
    `Rencontrer ${slug} ${profile.age} ans - Profil vérifié`,
    `${slug} - Échanges authentiques et rencontres`,
    `Profil privé de ${slug} - ${profile.profession}`,
  ];

  return selectRandom(titleTemplates, seed);
}

/**
 * Génère une description unique pour le profil
 * @param {object} profile - Les données du profil
 * @param {number} seed - La valeur seed
 * @param {string} slug - Le slug de la page
 * @returns {string} - La description générée
 */
function generateDescription(profile, seed, slug) {
  const descTemplates = [
    `Découvrez le profil de ${slug}, ${profile.profession} de ${profile.age} ans. Consultez ses photos et discutez en privé.`,
    `${slug}, ${profile.age} ans, cherche à faire des rencontres. Profil authentique avec photos vérifiées.`,
    `Page personnelle de ${slug}, ${profile.profession}. Discutez en privé et découvrez ses photos exclusives.`,
    `${slug}, ${profile.age} ans, partage son quotidien et ses photos. Profil vérifié disponible pour discuter.`,
    `Rencontrez ${slug}, une ${profile.profession} de ${profile.age} ans qui répond généralement en quelques minutes.`,
    `Bienvenue sur le profil de ${slug}, ${profile.age} ans, ${profile.profession} passionnée à la recherche de nouvelles rencontres.`,
    `${slug} partage ici ses photos et ses centres d'intérêt. Profil vérifié, ${profile.age} ans, disponible pour discuter.`,
    `Découvrez ${slug}, ${profile.profession} de ${profile.age} ans qui aime partager et échanger. Photos et chat privé disponibles.`,
    `Profil authentique de ${slug}, ${profile.age} ans. Échangez en privé et découvrez ses photos exclusives.`,
    `${slug}, ${profile.profession} de ${profile.age} ans, cherche à faire de nouvelles rencontres. Profil vérifié avec photos.`,
    `Page privée de ${slug}, ${profile.age} ans. Discutez en toute confidentialité et découvrez son quotidien en photos.`,
    `Rencontrez ${slug}, ${profile.profession} passionnée de ${profile.age} ans. Profil vérifié avec messagerie instantanée.`,
    `${slug}, ${profile.age} ans, partage ici son univers et ses photos. Disponible pour discuter et faire connaissance.`,
    `Profil personnel de ${slug}, ${profile.profession} de ${profile.age} ans. Photos vérifiées et chat privé disponibles.`,
    `Découvrez le quotidien de ${slug}, ${profile.age} ans, à travers ses photos et échangez en privé.`,
    `${slug}, ${profile.profession} de ${profile.age} ans, à la recherche de nouvelles connexions. Profil authentique et vérifié.`,
    `Page exclusive de ${slug}, ${profile.age} ans. Partagez des moments privilégiés et découvrez ses photos privées.`,
    `Profil vérifié de ${slug}, ${profile.profession} de ${profile.age} ans. Messagerie instantanée et photos disponibles.`,
    `${slug}, ${profile.age} ans, ouvre les portes de son univers. Discutez en privé et découvrez ses photos exclusives.`,
    `Rencontrez ${slug}, une ${profile.profession} authentique de ${profile.age} ans. Profil vérifié avec photos et chat privé.`,
    `${slug} partage son quotidien et ses passions. ${profile.age} ans, ${profile.profession}, disponible pour échanger.`,
    `Profil personnel de ${slug}, ${profile.age} ans. Découvrez ses photos et engagez la conversation en privé.`,
    `${slug}, ${profile.profession} de ${profile.age} ans, à la recherche de nouvelles rencontres. Profil vérifié et authentique.`,
    `Page privée de ${slug}, ${profile.age} ans. Échangez des messages et découvrez ses photos exclusives.`,
    `Découvrez ${slug}, ${profile.profession} passionnée de ${profile.age} ans. Chat privé et photos disponibles.`,
    `${slug}, ${profile.age} ans, partage ici ses centres d'intérêt et ses photos. Profil vérifié, disponible pour discuter.`,
    `Profil authentique de ${slug}, ${profile.profession} de ${profile.age} ans. Messagerie privée et photos exclusives.`,
    `Rencontrez ${slug}, ${profile.age} ans, et découvrez son univers à travers ses photos et conversations privées.`,
    `${slug}, ${profile.profession} de ${profile.age} ans, cherche à faire de nouvelles connaissances. Profil vérifié avec photos.`,
    `Page personnelle de ${slug}, ${profile.age} ans. Discutez en toute confidentialité et découvrez ses photos privées.`
  ];

  return selectRandom(descTemplates, seed);
}

/**
 * Génère des paragraphes uniques pour le profil
 * @param {object} profile - Les données du profil
 * @param {number} seed - La valeur seed
 * @returns {object} - Les sections de contenu générées
 */
function generateParagraphs(profile, seed) {
  // Structure de contenu SEO optimisée
  const result = {
    introduction: '',
    about: '',
    interests: '',
    lookingFor: '',
    conclusion: '',
    additionalSections: []
  };

  // Différentes introductions possibles (25 options)
  const intros = [
    `Bonjour, je m'appelle ${profile.prenom}, j'ai ${profile.age} ans et je suis ${profile.profession}.`,
    `Salut ! Moi c'est ${profile.prenom}, ${profile.age} ans, ${profile.profession} passionnée.`,
    `${profile.prenom}, ${profile.age} ans, ${profile.profession} à la recherche de nouvelles rencontres.`,
    `Je suis ${profile.prenom}, j'ai ${profile.age} ans et je travaille comme ${profile.profession}.`,
    `${profile.prenom}, ${profile.age} ans, ${profile.profession} qui aime partager et échanger.`,
    `Enchantée, je suis ${profile.prenom}, ${profile.age} ans, et je travaille en tant que ${profile.profession}.`,
    `Bienvenue sur mon profil ! Je m'appelle ${profile.prenom}, j'ai ${profile.age} ans et je suis ${profile.profession}.`,
    `${profile.prenom}, ${profile.profession} de ${profile.age} ans, ravie de faire votre connaissance.`,
    `Hello ! Je suis ${profile.prenom}, ${profile.age} ans, ${profile.profession} et à la recherche de nouvelles connexions.`,
    `Je me présente : ${profile.prenom}, ${profile.age} ans, exerçant comme ${profile.profession}.`,
    `${profile.age} ans, ${profile.profession}, je m'appelle ${profile.prenom} et je suis heureuse de vous accueillir sur mon profil.`,
    `Bonjour à tous ! ${profile.prenom}, ${profile.age} ans, ${profile.profession} passionnée par son métier et la vie en général.`,
    `${profile.prenom} ici, ${profile.age} ans, travaillant comme ${profile.profession} et cherchant à élargir mon cercle social.`,
    `Salutations ! Je suis ${profile.prenom}, j'ai ${profile.age} ans, et je suis une ${profile.profession} enthousiaste.`,
    `Moi c'est ${profile.prenom}, ${profile.age} ans, ${profile.profession} qui aime profiter de chaque instant.`,
    `${profile.prenom}, ${profile.profession} de ${profile.age} ans, à la recherche de nouvelles expériences et rencontres.`,
    `Je m'appelle ${profile.prenom}, j'ai ${profile.age} ans, et je suis une ${profile.profession} qui aime partager et découvrir.`,
    `${profile.age} ans, ${profile.profession}, je suis ${profile.prenom} et je suis ravie de vous rencontrer virtuellement.`,
    `Bonjour et bienvenue ! ${profile.prenom}, ${profile.age} ans, ${profile.profession} à l'écoute de nouvelles opportunités.`,
    `${profile.prenom} ici ! ${profile.age} ans, ${profile.profession} et toujours partante pour de nouvelles aventures.`,
    `Enchantée, ${profile.prenom}, ${profile.age} ans, exerçant en tant que ${profile.profession} et ouverte à de nouvelles rencontres.`,
    `Hello, je suis ${profile.prenom} ! J'ai ${profile.age} ans et je travaille comme ${profile.profession}.`,
    `${profile.prenom}, ${profile.profession} de ${profile.age} ans, à la recherche de connexions authentiques.`,
    `Bonjour à toi ! Je m'appelle ${profile.prenom}, j'ai ${profile.age} ans et je suis ${profile.profession}.`,
    `${profile.prenom}, ${profile.age} ans, ${profile.profession} qui croit en la sincérité et l'authenticité des relations.`
  ];

  // Paragraphes "À propos de moi" (25 options)
  const aboutMe = [
    `Je suis une personne sociable et ouverte d'esprit, toujours prête à découvrir de nouvelles choses et à rencontrer de nouvelles personnes.`,
    `Dynamique et spontanée, j'aime profiter de chaque instant et partager des moments agréables avec les personnes qui m'entourent.`,
    `Je me décrirais comme quelqu'un de positif et optimiste, qui aime rire et faire rire les autres.`,
    `Authentique et sincère, je préfère les relations vraies et profondes aux échanges superficiels.`,
    `Je suis une personne attentionnée et à l'écoute, qui accorde beaucoup d'importance aux relations humaines.`,
    `Curieuse et ouverte d'esprit, j'aime découvrir de nouvelles cultures, de nouveaux endroits et de nouvelles personnes.`,
    `Je suis quelqu'un de simple et naturel, qui apprécie les petits bonheurs du quotidien.`,
    `Indépendante mais aimant partager, je cherche un équilibre entre ma vie personnelle et mes relations.`,
    `Je suis une personne créative et passionnée, toujours en quête de nouvelles inspirations.`,
    `Sensible et empathique, j'accorde beaucoup d'importance aux émotions et aux sentiments.`,
    `Aventurière dans l'âme, j'aime sortir de ma zone de confort et vivre de nouvelles expériences enrichissantes.`,
    `Je suis quelqu'un de déterminé et persévérant, qui n'abandonne pas facilement face aux défis de la vie.`,
    `Joyeuse et enthousiaste, j'essaie de voir le bon côté des choses et de profiter pleinement de chaque moment.`,
    `Je suis une personne réfléchie qui aime prendre le temps d'analyser les situations avant d'agir.`,
    `Spontanée et un peu impulsive parfois, j'aime suivre mon instinct et me laisser porter par mes envies.`,
    `Je suis quelqu'un de loyal et fidèle en amitié comme en amour, les relations durables sont importantes pour moi.`,
    `Passionnée et intense, je vis mes émotions pleinement et j'aime partager cette énergie avec les autres.`,
    `Je suis une personne équilibrée qui cherche l'harmonie dans tous les aspects de ma vie.`,
    `Curieuse intellectuellement, j'aime apprendre constamment et m'enrichir de nouvelles connaissances.`,
    `Je suis quelqu'un de bienveillant qui accorde beaucoup d'importance au respect et à la gentillesse.`,
    `Dynamique et énergique, j'ai toujours besoin d'être active et de me sentir vivante.`,
    `Je suis une personne authentique qui n'aime pas les faux-semblants et préfère la vérité, même difficile.`,
    `Rêveuse et idéaliste, j'ai toujours plein de projets en tête et d'aspirations pour l'avenir.`,
    `Je suis quelqu'un de patient et compréhensif, qui sait que les meilleures choses prennent du temps.`,
    `Intuitive et sensible, je fais confiance à mes ressentis et j'accorde beaucoup d'importance à l'énergie des personnes.`
  ];

  // Sections additionnelles pour enrichir le contenu (10 sections avec 5-10 options chacune)
  const additionalSections = [
    {
      title: "Ma philosophie de vie",
      content: [
        "Je crois que la vie est faite pour être vécue pleinement, en profitant de chaque instant.",
        "Pour moi, le bonheur se trouve dans les petites choses du quotidien et dans les relations authentiques.",
        "Je pense que la communication et l'honnêteté sont les bases d'une relation réussie.",
        "Ma devise : vivre et laisser vivre, dans le respect et la bienveillance.",
        "Je crois en l'importance de rester soi-même et d'être authentique dans toutes les situations.",
        "Je suis convaincue que chaque rencontre a un sens et nous apporte quelque chose.",
        "Pour moi, l'équilibre entre vie personnelle et professionnelle est essentiel au bonheur.",
        "Je pense que la vie est trop courte pour se prendre au sérieux et qu'il faut savoir en rire.",
        "Ma philosophie est simple : être heureux et rendre les autres heureux autant que possible.",
        "Je crois que nous sommes responsables de notre propre bonheur et qu'il faut savoir le cultiver."
      ]
    },
    {
      title: "Mes loisirs préférés",
      content: [
        "J'adore les activités en plein air comme la randonnée, le vélo et les pique-niques.",
        "Les soirées cinéma sous un plaid avec un bon film sont parmi mes moments préférés.",
        "J'aime beaucoup cuisiner et découvrir de nouvelles recettes du monde entier.",
        "Les voyages sont ma passion, j'essaie de découvrir un nouveau pays chaque année.",
        "La lecture est mon échappatoire, je peux passer des heures plongée dans un bon livre.",
        "Je pratique le yoga et la méditation régulièrement pour maintenir un équilibre mental et physique.",
        "La photographie est une de mes passions, j'aime capturer des moments et des émotions.",
        "J'adore les concerts et festivals, l'ambiance et l'énergie de la musique live sont incomparables.",
        "Les jeux de société entre amis sont pour moi synonymes de fous rires et de bons moments.",
        "J'aime beaucoup les expositions d'art et les musées, ils nourrissent ma curiosité et ma créativité."
      ]
    },
    {
      title: "Ce qui me fait craquer",
      content: [
        "J'apprécie les personnes qui ont de l'humour et qui savent me faire rire.",
        "L'intelligence et la curiosité sont des qualités qui m'attirent beaucoup.",
        "J'aime les personnes attentionnées qui font preuve de petites attentions au quotidien.",
        "La confiance en soi sans arrogance est une qualité que je trouve très séduisante.",
        "Je suis sensible aux personnes passionnées qui ont des projets et des ambitions.",
        "L'authenticité et la sincérité sont pour moi des qualités essentielles chez quelqu'un.",
        "J'aime les personnes qui savent écouter et qui s'intéressent vraiment aux autres.",
        "Le sens de l'humour et la capacité à ne pas se prendre trop au sérieux me séduisent beaucoup.",
        "Je suis attirée par les personnes qui ont une certaine culture et ouverture d'esprit.",
        "La gentillesse et la bienveillance sont des qualités qui me touchent particulièrement."
      ]
    },
    {
      title: "Mes projets",
      content: [
        "J'aimerais voyager davantage et découvrir de nouvelles cultures et traditions.",
        "Je souhaite développer mes compétences professionnelles et évoluer dans ma carrière.",
        "Un de mes rêves serait d'apprendre une nouvelle langue et de vivre quelque temps à l'étranger.",
        "Je projette de m'investir dans une association caritative qui me tient à cœur.",
        "À terme, j'aimerais trouver un équilibre parfait entre vie professionnelle et personnelle.",
        "J'ai pour projet d'écrire un livre sur mes expériences et les leçons que j'en ai tirées.",
        "Je rêve de créer ma propre entreprise dans un domaine qui me passionne vraiment.",
        "J'aimerais apprendre à jouer d'un instrument de musique, c'est un projet qui me tient à cœur.",
        "Un de mes objectifs est de participer à un marathon ou une course similaire pour me dépasser.",
        "Je souhaite construire une maison qui me ressemble, un lieu chaleureux où accueillir mes proches."
      ]
    },
    {
      title: "Mes petits plaisirs",
      content: [
        "Un bon café au lit le dimanche matin avec un livre passionnant.",
        "Me promener sous la pluie et sentir les gouttes sur mon visage.",
        "Regarder un coucher de soleil en bord de mer, les pieds dans le sable.",
        "Préparer un bon repas pour mes amis et partager des moments conviviaux.",
        "Écouter ma playlist préférée à fond en dansant dans mon salon.",
        "M'endormir au son de la pluie qui tombe sur les vitres.",
        "Prendre un bain chaud aux huiles essentielles après une longue journée.",
        "Déguster un carré de chocolat noir en fermant les yeux pour en apprécier toutes les saveurs.",
        "Recevoir un message inattendu d'une personne qui compte pour moi."
      ]
    },
    {
      title: "Ce que j'aime dans mon métier",
      content: [
        "La possibilité de rencontrer des personnes de tous horizons et d'apprendre de chacune d'elles.",
        "Le sentiment d'accomplissement quand je réussis à relever un défi professionnel.",
        "L'opportunité d'être créative et de proposer des solutions innovantes.",
        "Le travail d'équipe et la collaboration avec des collègues passionnés.",
        "La diversité des tâches qui fait que chaque journée est différente.",
        "La possibilité d'apprendre constamment et de développer de nouvelles compétences.",
        "Le sentiment d'utilité et de contribution à quelque chose de plus grand que moi.",
        "L'équilibre entre autonomie et responsabilité qui me permet de m'épanouir."
      ]
    },
    {
      title: "Mes destinations de rêve",
      content: [
        "Le Japon, pour sa culture fascinante entre tradition et modernité.",
        "La Nouvelle-Zélande, pour ses paysages à couper le souffle et sa nature préservée.",
        "L'Italie, pour sa gastronomie, son art et son architecture.",
        "L'Islande, pour ses paysages lunaires et ses aurores boréales.",
        "Le Pérou, pour découvrir le Machu Picchu et la culture inca.",
        "La Thaïlande, pour ses plages paradisiaques et sa cuisine épicée.",
        "Le Canada, pour ses grands espaces et la gentillesse de ses habitants.",
        "L'Afrique du Sud, pour ses safaris et la diversité de ses paysages.",
        "La Grèce, pour ses îles magnifiques et son histoire fascinante.",
        "L'Australie, pour sa faune unique et ses villes dynamiques."
      ]
    },
    {
      title: "Mes qualités et défauts",
      content: [
        "Je suis loyale et fidèle en amitié, mais parfois trop exigeante envers les autres.",
        "Ma curiosité me pousse à toujours apprendre, mais peut aussi me rendre un peu dispersée.",
        "Je suis organisée et fiable, mais cela peut parfois me rendre un peu trop perfectionniste.",
        "Mon empathie me permet de comprendre les autres, mais je peux aussi trop m'impliquer émotionnellement.",
        "Je suis spontanée et authentique, mais cela peut parfois me rendre un peu trop directe.",
        "Ma patience est une force, mais elle peut aussi me faire accepter des situations que je devrais changer.",
        "Je suis déterminée et persévérante, mais parfois têtue quand je suis convaincue d'avoir raison.",
        "Mon optimisme me permet d'avancer, mais peut parfois me faire paraître naïve."
      ]
    },
    {
      title: "Ce qui m'inspire",
      content: [
        "Les personnes qui suivent leurs rêves malgré les obstacles et qui osent être différentes.",
        "Les histoires de résilience et de dépassement de soi face à l'adversité.",
        "La nature et sa capacité à se renouveler constamment, sa beauté et sa force tranquille.",
        "L'art sous toutes ses formes, qui nous permet de voir le monde différemment.",
        "Les conversations profondes qui nous font réfléchir et remettre en question nos certitudes.",
        "Les actes de gentillesse désintéressés qui nous rappellent la beauté de l'humanité.",
        "Les innovations et découvertes qui changent notre façon de vivre et de penser.",
        "Les voyages et la découverte de nouvelles cultures qui élargissent notre vision du monde.",
        "Les personnes qui restent authentiques et fidèles à leurs valeurs malgré les pressions sociales."
      ]
    },
    {
      title: "Une journée parfaite pour moi",
      content: [
        "Se réveiller naturellement sans réveil, prendre un bon petit-déjeuner et partir en randonnée dans la nature.",
        "Commencer par une séance de yoga, puis passer la journée à explorer une nouvelle ville et finir par un bon restaurant.",
        "Faire la grasse matinée, bruncher avec des amis, puis profiter d'une après-midi détente avec un bon livre et un bain chaud.",
        "Me lever tôt pour voir le lever du soleil, passer la journée à la plage et terminer par un barbecue sous les étoiles.",
        "Partir en road trip improvisé, s'arrêter dans des endroits insolites et dormir à la belle étoile.",
        "Visiter des musées et expositions toute la journée, puis assister à un concert ou un spectacle le soir.",
        "Faire du shopping dans mes boutiques préférées, déjeuner en terrasse et passer la soirée à regarder mes séries favorites.",
        "Cuisiner toute la journée de bons petits plats et recevoir mes amis pour une soirée conviviale autour d'un bon repas."
      ]
    }
  ];

  // Différents paragraphes sur les intérêts (35 options)
  const interests = [
    `J'adore voyager, découvrir de nouveaux endroits et rencontrer des personnes intéressantes.`,
    `Mes passions sont la photographie, le cinéma et les sorties entre amis.`,
    `Je suis une grande fan de musique, de festivals et j'adore danser.`,
    `J'aime la nature, les randonnées et les activités en plein air.`,
    `Je suis passionnée par la cuisine, les bons restaurants et les découvertes culinaires.`,
    `Le yoga et la méditation font partie intégrante de ma vie, j'y trouve un véritable équilibre.`,
    `Je suis une grande lectrice, j'adore me plonger dans un bon roman et m'évader.`,
    `Le sport occupe une place importante dans ma vie, je pratique régulièrement la course à pied et la natation.`,
    `Je suis passionnée d'art, j'adore visiter des expositions et des galeries.`,
    `Les voyages sont ma plus grande passion, j'ai déjà visité plus de 15 pays et j'ai encore tant à découvrir.`,
    `J'aime beaucoup les animaux, j'ai d'ailleurs deux chats qui sont comme mes enfants.`,
    `La mode et le design m'intéressent beaucoup, j'aime suivre les tendances et créer mon propre style.`,
    `Je suis une grande amatrice de séries, je peux facilement passer un weekend entier en marathon Netflix.`,
    `La danse est ma passion depuis toute petite, je pratique encore régulièrement.`,
    `J'adore les jeux de société et les soirées entre amis autour d'un bon jeu.`,
    `Le théâtre et l'opéra sont mes sorties culturelles préférées, j'y vais dès que possible.`,
    `Je suis une grande fan de concerts et de festivals, l'ambiance live est incomparable.`,
    `La photographie est plus qu'un hobby pour moi, c'est une façon de voir le monde différemment.`,
    `J'aime beaucoup jardiner et m'occuper de mes plantes, ça me détend énormément.`,
    `Les escape games et les énigmes me passionnent, j'adore résoudre des problèmes.`,
    `Je suis une grande gourmande, j'adore découvrir de nouveaux restaurants et cuisiner.`,
    `Le bien-être et le développement personnel sont des sujets qui me tiennent à cœur.`,
    `J'ai une passion pour les langues étrangères, je parle déjà trois langues et j'en apprends une quatrième.`,
    `L'astronomie me fascine, j'adore observer les étoiles et en apprendre plus sur l'univers.`,
    `Je suis une grande fan de sports extrêmes, j'ai déjà fait du saut en parachute et du rafting.`,
    `La technologie et l'innovation m'intéressent beaucoup, je suis toujours à l'affût des dernières nouveautés.`,
    `J'aime beaucoup l'histoire et visiter des lieux chargés de passé.`,
    `Le bricolage et la décoration sont mes passe-temps favoris, j'adore transformer mon intérieur.`,
    `Je suis passionnée par l'écologie et j'essaie d'adopter un mode de vie plus responsable.`,
    `Les podcasts sont devenus une vraie passion, j'en écoute sur tous les sujets possibles.`,
    `J'adore les road trips improvisés et les aventures spontanées.`,
    `La peinture est mon exutoire, je passe des heures devant ma toile à créer.`,
    `Je suis une grande fan de culture japonaise, manga, anime et gastronomie.`,
    `Le vin est une de mes passions, j'aime découvrir de nouveaux cépages et régions viticoles.`,
    `J'ai une passion pour la psychologie et comprendre le comportement humain.`
  ];

  // Différents paragraphes sur ce que la personne recherche (35 options)
  const lookingFor = [
    `Je cherche à faire de nouvelles rencontres, sans prise de tête, pour partager de bons moments.`,
    `Je suis ici pour discuter et voir où les choses peuvent nous mener, sans attentes particulières.`,
    `Je recherche des personnes authentiques avec qui je pourrais avoir des conversations intéressantes.`,
    `J'aimerais rencontrer quelqu'un avec qui je partage des centres d'intérêt communs.`,
    `Je suis ouverte à de nouvelles rencontres, que ce soit pour de l'amitié ou plus si affinités.`,
    `Je cherche quelqu'un qui saura me faire rire et avec qui je pourrai partager des moments complices.`,
    `Je suis à la recherche d'une personne sincère et honnête pour construire une relation durable.`,
    `J'aimerais rencontrer quelqu'un qui aime voyager et découvrir de nouveaux horizons.`,
    `Je recherche une personne qui partage ma passion pour le sport et les activités en plein air.`,
    `Je suis ici pour trouver quelqu'un avec qui je pourrais avoir des discussions profondes et enrichissantes.`,
    `Je cherche une personne attentionnée et à l'écoute, qui sait ce qu'elle veut dans la vie.`,
    `J'aimerais rencontrer quelqu'un qui a de l'humour et qui ne se prend pas trop au sérieux.`,
    `Je recherche une personne cultivée, qui aime apprendre et partager ses connaissances.`,
    `Je suis à la recherche de quelqu'un qui apprécie les plaisirs simples de la vie.`,
    `Je cherche une personne qui a des valeurs similaires aux miennes et une vision positive de la vie.`,
    `J'aimerais rencontrer quelqu'un qui est passionné par ce qu'il fait et qui a des projets.`,
    `Je recherche une personne indépendante qui a sa propre vie mais qui sait aussi partager.`,
    `Je suis ici pour trouver quelqu'un qui aime sortir et découvrir de nouveaux endroits.`,
    `Je cherche une personne qui sait ce qu'elle veut et qui n'a pas peur de s'engager.`,
    `J'aimerais rencontrer quelqu'un qui est à l'aise avec lui-même et qui a confiance en lui.`,
    `Je recherche une personne qui aime les animaux autant que moi.`,
    `Je suis à la recherche de quelqu'un qui partage mon goût pour l'art et la culture.`,
    `Je cherche une personne qui a le sens de l'aventure et qui aime sortir de sa zone de confort.`,
    `J'aimerais rencontrer quelqu'un qui est attentif aux petites attentions du quotidien.`,
    `Je recherche une personne qui a de l'ambition et qui est motivée dans la vie.`,
    `Je suis ici pour trouver quelqu'un qui est respectueux et bienveillant envers les autres.`,
    `Je cherche une personne qui aime cuisiner et partager de bons repas.`,
    `J'aimerais rencontrer quelqu'un qui est ouvert d'esprit et tolérant.`,
    `Je recherche une personne qui a le sens de la famille et des valeurs traditionnelles.`,
    `Je suis à la recherche de quelqu'un qui est spontané et qui sait profiter de l'instant présent.`,
    `Je cherche une personne qui est à l'écoute et qui sait communiquer ses émotions.`,
    `J'aimerais rencontrer quelqu'un qui partage mon intérêt pour le développement personnel.`,
    `Je recherche une personne qui a un bon équilibre entre vie professionnelle et personnelle.`,
    `Je suis ici pour trouver quelqu'un qui est prêt à s'investir dans une relation sérieuse.`,
    `Je cherche une personne qui aime les sorties culturelles et les découvertes gastronomiques.`
  ];

  // Différentes conclusions (30 options)
  const conclusions = [
    `N'hésite pas à me contacter si mon profil t'intéresse, je réponds généralement assez rapidement.`,
    `Si tu veux en savoir plus sur moi, envoie-moi un message et on pourra discuter.`,
    `Je suis impatiente de faire ta connaissance, alors n'hésite pas à m'écrire !`,
    `Si tu es curieux d'en savoir plus, je t'invite à me contacter pour qu'on puisse discuter.`,
    `À bientôt peut-être, j'ai hâte de découvrir qui se cache derrière l'écran !`,
    `Si tu penses qu'on pourrait bien s'entendre, n'hésite pas à m'envoyer un message.`,
    `Je serais ravie d'échanger avec toi si tu te reconnais dans ce que je recherche.`,
    `N'hésite pas à me contacter si tu es intéressé, je ne mords pas (sauf si on me le demande gentiment).`,
    `Si mon profil t'intrigue, envoie-moi un message et découvrons si le courant passe entre nous.`,
    `Je suis ouverte à la discussion, alors si tu es intéressé, fais-moi signe !`,
    `Si tu as envie d'en savoir plus sur moi, je serais heureuse de répondre à tes questions.`,
    `N'hésite pas à me contacter, qui sait où une simple conversation peut nous mener ?`,
    `Je suis à un message de distance, alors si tu es intrigué, lance-toi !`,
    `Si tu penses qu'on pourrait avoir des choses en commun, je serais ravie de discuter avec toi.`,
    `Je suis curieuse de te connaître, alors n'hésite pas à m'écrire si mon profil te plaît.`,
    `Si tu cherches quelqu'un comme moi, envoie-moi un message et voyons où cela nous mène.`,
    `Je suis impatiente de découvrir qui se cache derrière les profils que je consulte, alors n'hésite pas à te présenter.`,
    `Si tu as envie de discuter, je suis là ! Qui sait, peut-être sommes-nous faits pour nous rencontrer ?`,
    `N'hésite pas à me contacter si tu es intéressé, je suis toujours partante pour de nouvelles rencontres.`,
    `Si mon profil t'a tapé dans l'œil, fais-moi signe et commençons à discuter.`,
    `Je suis à la recherche de quelqu'un de spécial, peut-être est-ce toi ? N'hésite pas à me contacter pour le découvrir.`,
    `Si tu es curieux d'en savoir plus sur moi, envoie-moi un message et commençons cette aventure ensemble.`,
    `N'hésite pas à m'écrire si tu penses qu'on pourrait bien s'entendre, je suis ouverte à la discussion.`,
    `Si tu te reconnais dans ce que je recherche, je serais ravie de faire ta connaissance.`,
    `Je suis impatiente de découvrir qui sera ma prochaine rencontre, peut-être toi ?`,
    `Si tu es intéressé, envoie-moi un message et voyons si le feeling passe entre nous.`,
    `N'hésite pas à me contacter, je suis toujours ravie de faire de nouvelles connaissances.`,
    `Si mon profil t'intéresse, je serais heureuse de discuter avec toi et d'en apprendre plus sur toi.`,
    `Je suis à la recherche de quelqu'un de spécial, alors si tu penses l'être, fais-moi signe !`,
    `Si tu as envie de me connaître davantage, n'hésite pas à m'envoyer un message, je ne mords pas !`
  ];

  // Sélectionner un élément de chaque catégorie en utilisant le seed
  result.introduction = selectRandom(intros, seed);
  result.about = selectRandom(aboutMe, seed + 10);
  result.interests = selectRandom(interests, seed + 1);
  result.lookingFor = selectRandom(lookingFor, seed + 2);
  result.conclusion = selectRandom(conclusions, seed + 3);

  // Sélectionner 2 sections additionnelles aléatoires
  const numAdditionalSections = 2;
  const selectedIndices = [];

  // Générer des indices uniques pour les sections additionnelles
  while (selectedIndices.length < numAdditionalSections && selectedIndices.length < additionalSections.length) {
    const index = (seed + selectedIndices.length * 7) % additionalSections.length;
    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
    }
  }

  // Ajouter les sections sélectionnées au résultat
  for (const index of selectedIndices) {
    const section = additionalSections[index];
    const contentIndex = (seed + index) % section.content.length;

    result.additionalSections.push({
      title: section.title,
      content: section.content[contentIndex]
    });
  }

  return result;
}

/**
 * Génère des mots-clés uniques pour le profil
 * @param {object} profile - Les données du profil
 * @param {number} seed - La valeur seed
 * @returns {Array<string>} - Les mots-clés générés
 */
function generateKeywords(profile, seed) {
  // Mots-clés de base liés au profil
  const baseKeywords = [
    profile.prenom,
    `${profile.prenom} ${profile.age} ans`,
    `${profile.prenom} ${profile.profession}`,
    `${profile.prenom} profil`,
    `${profile.prenom} photos`,
    `${profile.prenom} chat`,
    `${profile.prenom} rencontre`,
    `${profile.profession} ${profile.age} ans`,
    `${profile.prenom} authentique`,
    `profil de ${profile.prenom}`
  ];

  // Mots-clés liés aux rencontres
  const meetingKeywords = [
    'rencontre en ligne',
    'profil vérifié',
    'chat instantané',
    'messagerie privée',
    'photos exclusives',
    'rencontres sérieuses',
    'célibataire',
    'disponible',
    'authentique',
    'vérifiée',
    'rencontre locale',
    'profil privé',
    'discussion en ligne',
    'rencontre rapide',
    'profil complet',
    'chat sécurisé',
    'rencontre discrète',
    'profil détaillé',
    'messagerie instantanée',
    'rencontre authentique'
  ];

  // Mots-clés liés aux intérêts et activités
  const interestKeywords = [
    'voyages',
    'cinéma',
    'musique',
    'lecture',
    'sport',
    'cuisine',
    'art',
    'photographie',
    'nature',
    'randonnée',
    'yoga',
    'méditation',
    'festivals',
    'concerts',
    'expositions',
    'gastronomie',
    'bien-être',
    'fitness',
    'danse',
    'théâtre'
  ];

  // Mots-clés liés aux qualités personnelles
  const personalityKeywords = [
    'sympathique',
    'dynamique',
    'passionnée',
    'créative',
    'spontanée',
    'attentionnée',
    'sincère',
    'honnête',
    'fidèle',
    'drôle',
    'intelligente',
    'curieuse',
    'ouverte d\'esprit',
    'sensible',
    'optimiste',
    'aventurière',
    'déterminée',
    'équilibrée',
    'sociable',
    'indépendante'
  ];

  // Mots-clés liés à la localisation (fictifs pour varier)
  const locationKeywords = [
    'Paris',
    'Lyon',
    'Marseille',
    'Bordeaux',
    'Lille',
    'Toulouse',
    'Nantes',
    'Strasbourg',
    'Montpellier',
    'Nice'
  ];

  // Sélectionner des mots-clés de chaque catégorie
  const selectedMeeting = selectRandomMultiple(meetingKeywords, seed, 5);
  const selectedInterests = selectRandomMultiple(interestKeywords, seed + 100, 4);
  const selectedPersonality = selectRandomMultiple(personalityKeywords, seed + 200, 3);
  const selectedLocation = selectRandomMultiple(locationKeywords, seed + 300, 1);

  // Combiner tous les mots-clés sélectionnés
  return [
    ...baseKeywords,
    ...selectedMeeting,
    ...selectedInterests,
    ...selectedPersonality,
    ...selectedLocation
  ];
}

/**
 * Sélectionne plusieurs éléments aléatoires d'un tableau basé sur un seed
 * @param {Array} array - Le tableau d'options
 * @param {number} seed - La valeur seed
 * @param {number} count - Le nombre d'éléments à sélectionner
 * @returns {Array} - Les éléments sélectionnés
 */
function selectRandomMultiple(array, seed, count) {
  const result = [];
  const indices = new Set();

  // Générer des indices uniques
  for (let i = 0; i < count && i < array.length; i++) {
    let index;
    do {
      index = (seed + i * 17) % array.length;
    } while (indices.has(index));

    indices.add(index);
    result.push(array[index]);
  }

  return result;
}
