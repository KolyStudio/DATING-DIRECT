<script>
  import { onMount } from "svelte";
  import dayjs from "dayjs";

  // Données du serveur
  export let data;
  const { profiles } = data;

  // État local
  let featuredProfiles = [];
  let date = dayjs().format("DD/MM/YYYY");
  let online = "EN LIGNE";

  // Lien pour les boutons d'action
  const actionLink = `https://invitation.my-secret.net/?v=soft&userName=Eloise&userDistance=7&userPhotos=53&userPicture=https://i.ibb.co/pbyntnD/profil.webp&s1=DIRECT&s2=${date}`;

  onMount(() => {
    // Sélectionner quelques profils à mettre en avant
    const profileKeys = Object.keys(profiles);
    const randomProfiles = [];

    // Sélectionner 6 profils aléatoires
    for (let i = 0; i < Math.min(6, profileKeys.length); i++) {
      const randomIndex = Math.floor(Math.random() * profileKeys.length);
      const slug = profileKeys[randomIndex];
      const profile = profiles[slug];

      randomProfiles.push({
        slug,
        ...profile,
      });

      // Retirer le profil sélectionné pour éviter les doublons
      profileKeys.splice(randomIndex, 1);
    }

    featuredProfiles = randomProfiles;
  });
</script>

<svelte:head>
  <title>Eloise Profil - Rencontres et discussions privées</title>
  <meta
    name="description"
    content="Découvrez des profils authentiques de femmes célibataires près de chez vous. Discutez en privé et faites des rencontres réelles."
  />
  <meta
    property="og:title"
    content="Eloise Profil - Rencontres et discussions privées"
  />
  <meta
    property="og:description"
    content="Découvrez des profils authentiques de femmes célibataires près de chez vous. Discutez en privé et faites des rencontres réelles."
  />
  <meta property="og:image" content="https://i.ibb.co/pbyntnD/profil.webp" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="Eloise Profil - Rencontres et discussions privées"
  />
  <meta
    name="twitter:description"
    content="Découvrez des profils authentiques de femmes célibataires près de chez vous. Discutez en privé et faites des rencontres réelles."
  />
  <meta name="twitter:image" content="https://i.ibb.co/pbyntnD/profil.webp" />
</svelte:head>

<main class="min-h-screen">
  <!-- Hero Section -->
  <section class="relative py-12 bg-gradient-to-b from-[#f8edfd] to-[#f0e5f5]">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-[#7e0048] mb-4">
          Rencontres privées et discussions authentiques
        </h1>
        <p class="text-lg mb-8">
          Découvrez des profils vérifiés de femmes célibataires près de chez
          vous. Échangez en toute confidentialité et faites des rencontres
          réelles.
        </p>
        <div class="flex justify-center space-x-1 mb-4">
          <img
            src="/icons/arrow.webp"
            alt="Flèche vers le bas"
            class="w-4 rotate-90"
          />
          <img
            src="/icons/arrow.webp"
            alt="Flèche vers le bas"
            class="w-4 rotate-90"
          />
          <img
            src="/icons/arrow.webp"
            alt="Flèche vers le bas"
            class="w-4 rotate-90"
          />
        </div>
        <a
          href={actionLink}
          class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white text-lg font-semibold py-4 px-8 inline-flex items-center justify-center rounded-3xl my-2"
        >
          DÉCOUVRIR LES PROFILS
        </a>
      </div>
    </div>
  </section>

  <!-- Featured Profiles Section -->
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-[#7e0048] text-center mb-8">
        Profils populaires
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each featuredProfiles as profile}
          <div
            class="bg-[#f8edfd] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
          >
            <a href="/{profile.slug}" class="block">
              <div class="relative">
                <div class="absolute top-2 right-2 z-10">
                  <div
                    class="bg-[#09BC8A] text-white px-2 py-1 text-xs font-semibold tracking-widest uppercase rounded-lg"
                  >
                    {online}
                  </div>
                </div>
                <img
                  src="https://randomuser.me/api/portraits/women/{profile.age %
                    99}.jpg"
                  alt={`Photo de ${profile.prenom}`}
                  class="w-full h-64 object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-[#7e0048] text-xl mb-1">
                  {profile.prenom}, {profile.age} ans
                </h3>
                <p class="text-gray-600 mb-2">{profile.profession}</p>
                <p class="text-sm mb-4">
                  À la recherche de nouvelles rencontres près de chez vous.
                </p>
                <div class="flex justify-center">
                  <span
                    class="inline-block bg-[#7e0048]/10 text-[#7e0048] text-xs px-3 py-1 rounded-full mr-2"
                  >
                    Profil vérifié
                  </span>
                  <span
                    class="inline-block bg-[#7e0048]/10 text-[#7e0048] text-xs px-3 py-1 rounded-full"
                  >
                    Répond rapidement
                  </span>
                </div>
              </div>
            </a>
          </div>
        {/each}
      </div>

      <div class="text-center mt-10">
        <a
          href={actionLink}
          class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white font-semibold py-3 px-6 inline-flex items-center justify-center rounded-3xl"
        >
          VOIR TOUS LES PROFILS
        </a>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-12 bg-[#f8edfd]">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-[#7e0048] text-center mb-8">
        Ce que disent nos utilisateurs
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <img
            src="/reviews/rev1.webp"
            alt="Témoignage utilisateur"
            class="w-full rounded-lg mb-4"
          />
          <p class="text-center text-sm font-semibold">
            Vous êtes nombreux à avoir pris l'offre d'essai et à en être
            contents !
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <img
            src="/reviews/rev2.webp"
            alt="Témoignage utilisateur"
            class="w-full rounded-lg mb-4"
          />
          <p class="text-center text-sm font-semibold">
            Si tu es sceptique, inscris-toi et rejoins-nous, tu verras que ça
            fonctionne vraiment !
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <img
            src="/reviews/rev3.webp"
            alt="Témoignage utilisateur"
            class="w-full rounded-lg mb-4"
          />
          <p class="text-center text-sm font-semibold">
            Ce ne sont pas des escortes, tu peux contacter autant de filles que
            tu veux.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4 text-center max-w-3xl">
      <h2 class="text-2xl font-bold text-[#7e0048] mb-4">
        Prêt à faire des rencontres ?
      </h2>
      <p class="mb-8">
        Rejoignez notre communauté et commencez à discuter avec des profils
        vérifiés dès aujourd'hui.
      </p>
      <a
        href={actionLink}
        class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white text-lg font-semibold py-4 px-8 inline-flex items-center justify-center rounded-3xl"
      >
        COMMENCER MAINTENANT
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-8 bg-[#7e0048] text-white">
    <div class="container mx-auto px-4 text-center">
      <p class="mb-4">
        © {new Date().getFullYear()} Eloise Profil - Tous droits réservés
      </p>
      <p class="text-sm opacity-75">
        Ce site est réservé aux personnes majeures. En l'utilisant, vous
        confirmez avoir plus de 18 ans.
      </p>
    </div>
  </footer>
</main>

<style>
  .container {
    max-width: 1200px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  section {
    animation: fadeIn 0.5s ease-in-out;
  }
</style>
