<script>
  import { onMount } from "svelte";
  import { generateUniqueContent } from "$lib/utils/contentGenerator";

  // Props
  export let slug = "";
  export let profile = {};
  export let searchEngine = null;

  // État local
  let uniqueContent = null;

  onMount(() => {
    // Générer le contenu unique basé sur le slug et le profil
    uniqueContent = generateUniqueContent(slug, profile);
  });
</script>

<svelte:head>
  {#if uniqueContent}
    <title>{uniqueContent.title}</title>
    <meta name="description" content={uniqueContent.description} />
    <meta name="keywords" content={uniqueContent.keywords.join(", ")} />
    <meta property="og:title" content={uniqueContent.title} />
    <meta property="og:description" content={uniqueContent.description} />
    <meta property="og:image" content={uniqueContent.images.profileImage} />
    <meta property="og:type" content="profile" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={uniqueContent.title} />
    <meta name="twitter:description" content={uniqueContent.description} />
    <meta name="twitter:image" content={uniqueContent.images.profileImage} />
    <!-- Schema.org markup pour le profil -->
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": profile.prenom,
        "image": uniqueContent.images.profileImage,
        "jobTitle": profile.profession,
        "description": uniqueContent.description,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://monclubprivee.com/${slug}`
        }
      })}
    </script>
  {/if}
</svelte:head>

{#if uniqueContent}
  <article class="bot-content">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4">{uniqueContent.title}</h1>
      <p class="text-lg text-gray-700 mb-4">{uniqueContent.description}</p>

      <div class="profile-info flex items-center mb-6">
        <img
          src={uniqueContent.images.profileImage}
          alt={`Photo de profil de ${profile.prenom}`}
          class="w-24 h-24 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 class="text-xl font-semibold">
            {profile.prenom}, {profile.age} ans
          </h2>
          <p class="text-gray-600">{profile.profession}</p>
          <div class="mt-2 text-sm text-gray-500">
            <span class="mr-4"
              >Dernière connexion: {uniqueContent.lastUpdated}</span
            >
            <span class="mr-4"
              >Taux de réponse: {uniqueContent.responseRate}%</span
            >
            <span>Temps de réponse: {uniqueContent.responseTime}</span>
          </div>
        </div>
      </div>
    </header>

    <section class="about-me mb-8">
      <h2 class="text-2xl font-semibold mb-4">À propos de moi</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="mb-4">{uniqueContent.content.introduction}</p>
        <p class="mb-4">{uniqueContent.content.about}</p>
      </div>
    </section>

    <section class="interests mb-8">
      <h2 class="text-2xl font-semibold mb-4">Mes centres d'intérêt</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="mb-4">{uniqueContent.content.interests}</p>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="bg-white p-3 rounded shadow-sm">
            <h3 class="font-semibold mb-2">Loisirs</h3>
            <ul class="list-disc pl-5">
              {#each uniqueContent.interests.hobbies as hobby}
                <li>{hobby}</li>
              {/each}
            </ul>
          </div>
          <div class="bg-white p-3 rounded shadow-sm">
            <h3 class="font-semibold mb-2">Passions</h3>
            <ul class="list-disc pl-5">
              {#each uniqueContent.interests.passions as passion}
                <li>{passion}</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="looking-for mb-8">
      <h2 class="text-2xl font-semibold mb-4">Ce que je recherche</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="mb-4">{uniqueContent.content.lookingFor}</p>
      </div>
    </section>

    {#each uniqueContent.content.additionalSections as section}
      <section class="additional-section mb-8">
        <h2 class="text-2xl font-semibold mb-4">{section.title}</h2>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p>{section.content}</p>
        </div>
      </section>
    {/each}

    <section class="gallery mb-8">
      <h2 class="text-2xl font-semibold mb-4">Mes photos</h2>
      <div class="grid grid-cols-2 gap-4">
        <figure>
          <img
            src={uniqueContent.images.profileImage}
            alt={`Photo de profil de ${profile.prenom}`}
            class="w-full h-auto rounded-lg shadow-md"
          />
          <figcaption class="text-sm text-center mt-2">
            Photo de profil
          </figcaption>
        </figure>
        <figure>
          <img
            src={uniqueContent.images.lifestyleImage}
            alt={`Photo lifestyle de ${profile.prenom}`}
            class="w-full h-auto rounded-lg shadow-md"
          />
          <figcaption class="text-sm text-center mt-2">
            Photo lifestyle
          </figcaption>
        </figure>
      </div>

      <div class="mt-4 grid grid-cols-3 gap-2">
        {#each uniqueContent.images.galleryImages as galleryImage, index}
          <figure>
            <img
              src={galleryImage}
              alt={`Photo ${index + 1} de la galerie de ${profile.prenom}`}
              class="w-full h-auto rounded-lg shadow-md"
            />
            <figcaption class="text-sm text-center mt-1">
              Photo {index + 1}
            </figcaption>
          </figure>
        {/each}
      </div>
    </section>

    <section class="contact-info mb-8">
      <h2 class="text-2xl font-semibold mb-4">Me contacter</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="mb-4">
          Pour me contacter, vous pouvez utiliser la messagerie sécurisée de
          notre plateforme. Je réponds généralement en {uniqueContent.responseTime}.
        </p>
        <p>{uniqueContent.content.conclusion}</p>
      </div>
    </section>

    <footer class="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
      <p>Profil consulté {uniqueContent.views} fois</p>
      <p>Dernière mise à jour: {uniqueContent.lastUpdated}</p>
      <div class="seo-keywords hidden">
        {#each uniqueContent.keywords as keyword}
          <span>{keyword}</span>
        {/each}
      </div>
    </footer>
  </article>
{:else}
  <div class="loading p-8 text-center">
    <p class="text-xl">Chargement du profil...</p>
  </div>
{/if}

<style>
  .bot-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  h1,
  h2,
  h3 {
    font-family: "Arial", sans-serif;
  }

  .seo-keywords {
    display: none;
  }

  figure {
    margin: 0;
  }

  @media (max-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
  }
</style>
