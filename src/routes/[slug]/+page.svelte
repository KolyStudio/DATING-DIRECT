<script>
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import BotContent from "$lib/components/BotContent.svelte";

  // Données du serveur
  export let data;

  const { slug, profile, isBot, searchEngine } = data;

  const date = dayjs().format("DD/MM/YYYY");
  let online = "EN LIGNE";

  let link =
    `https://invitation.my-secret.net/?v=soft&userName=Eloise&userDistance=7&userPhotos=53&userPicture=https://i.ibb.co/pbyntnD/profil.webp&s1=DIRECT&s2=` +
    date;

  let titre = `${slug} - Page Privée`;
  let description = `Découvrez le profil de ${slug}, ${profile.age} ans. Consultez ses photos et discutez en privé. Profil authentique avec photos vérifiées.`;
  let monip = "";
  let price = "1,14€";

  // Variables pour le défilement automatique
  let autoScrollInterval;
  let testimonialScroll;
  let reviewsScroll;
  let userScrolled = false;
  let resetScrollTimeout;
  let slideElements = [];
  let reviewElements = [];
  let currentSlideIndex = 0;
  let currentReviewIndex = 0;

  // Fonction pour défiler vers une slide spécifique
  function scrollToSlide(index) {
    if (!testimonialScroll || !slideElements.length) return;

    // Assurez-vous que l'index est valide
    index = Math.max(0, Math.min(index, slideElements.length - 1));
    currentSlideIndex = index;

    // Calculer la position de la slide cible
    const targetSlide = slideElements[index];
    const scrollPosition =
      targetSlide.offsetLeft - testimonialScroll.offsetLeft;

    // Défiler vers la slide
    testimonialScroll.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    // Réinitialiser le drapeau après un délai (réarmer l'auto-scroll)
    userScrolled = true;
    clearTimeout(resetScrollTimeout);
    resetScrollTimeout = setTimeout(() => {
      userScrolled = false;
    }, 15000); // Réarmer après 15 secondes d'inactivité
  }

  function startAutoScroll() {
    clearInterval(autoScrollInterval);

    autoScrollInterval = setInterval(() => {
      if (!userScrolled && testimonialScroll && slideElements.length) {
        // Passer à la slide suivante
        currentSlideIndex = (currentSlideIndex + 1) % slideElements.length;
        scrollToSlide(currentSlideIndex);
      }
    }, 15000); // 15 secondes
  }

  function handleScroll() {
    // Indiquer que l'utilisateur a fait défiler manuellement
    userScrolled = true;

    // Réinitialiser le drapeau après un délai (réarmer l'auto-scroll)
    clearTimeout(resetScrollTimeout);
    resetScrollTimeout = setTimeout(() => {
      userScrolled = false;
    }, 15000); // Réarmer après 15 secondes d'inactivité

    // Déterminer quelle slide est actuellement visible
    if (testimonialScroll && slideElements.length) {
      const scrollPosition = testimonialScroll.scrollLeft;
      const scrollWidth = testimonialScroll.offsetWidth;

      // Trouver la slide la plus visible
      let bestVisibleIndex = 0;
      let bestVisibleArea = 0;

      slideElements.forEach((slide, index) => {
        const slideLeft = slide.offsetLeft - testimonialScroll.offsetLeft;
        const slideRight = slideLeft + slide.offsetWidth;

        // Calculer la zone visible de cette slide
        const visibleLeft = Math.max(slideLeft, scrollPosition);
        const visibleRight = Math.min(slideRight, scrollPosition + scrollWidth);
        const visibleArea = Math.max(0, visibleRight - visibleLeft);

        if (visibleArea > bestVisibleArea) {
          bestVisibleArea = visibleArea;
          bestVisibleIndex = index;
        }
      });

      // Mettre à jour l'index de la slide actuelle
      currentSlideIndex = bestVisibleIndex;
    }
  }

  function handleSlideClick(index) {
    scrollToSlide(index);
  }

  onMount(async () => {
    const myArray = ["EN LIGNE"];
    online = myArray[Math.floor(Math.random() * myArray.length)];

    try {
      const resulta = await fetch(
        "https://ipinfo.io/?token=cb83f69067b70b",
      ).then((r) => r.json());

      const ipay = await fetch(
        `https://api.ipregistry.co/${resulta.ip}?key=d3vt0gu96nu3q8tq`,
      ).then((r) => r.json());

      if (ipay.carrier && !ipay.carrier.name) {
        monip = `vers ${ipay.location.city}`;
      } else {
        monip = "";
      }

      if (ipay.location && ipay.location.country) {
        switch (ipay.location.country.code) {
          case "FR":
            price = "1,14€";
            break;
          case "CA":
            price = "$1.74";
            break;
          case "BE":
            price = "1,44€";
            break;
          case "CH":
            price = "1.89 CHF";
            break;
          default:
            price = "1,14€";
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations IP:",
        error,
      );
    }

    // Initialiser le défilement automatique
    testimonialScroll = document.querySelector(".testimonial-scroll");
    if (testimonialScroll) {
      // Récupérer les slides
      slideElements = [
        document.getElementById("slide-0"),
        document.getElementById("slide-1"),
        document.getElementById("slide-2"),
      ];

      // Ajouter les écouteurs d'événements pour les clics sur les slides
      slideElements.forEach((slide, index) => {
        if (slide) {
          slide.addEventListener("click", () => handleSlideClick(index));
        }
      });

      // Ajouter l'écouteur d'événement pour le scroll manuel
      testimonialScroll.addEventListener("scroll", handleScroll);

      // Démarrer le défilement automatique
      startAutoScroll();
    }
  });
</script>

<svelte:head>
  <title>{titre}</title>
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://eloiseprofil.com/${slug}`} />
  <meta property="og:title" content={titre} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://i.ibb.co/pbyntnD/profil.webp" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={`https://eloiseprofil.com/${slug}`} />
  <meta name="twitter:title" content={titre} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="https://i.ibb.co/pbyntnD/profil.webp" />

  <!-- Schéma JSON-LD pour les moteurs de recherche -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": slug,
      "image": "https://i.ibb.co/pbyntnD/profil.webp",
      "jobTitle": profile.profession,
      "description": description,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://eloiseprofil.com/${slug}`
      }
    })}
  </script>

  <script
    defer
    src="https://unpkg.com/@tinybirdco/flock.js@1.4.2/dist/index.js"
    data-host="https://api.tinybird.co"
    data-token="p.eyJ1IjogIjViNjM2MWE2LTMxOGQtNGQ4ZS05YmNiLTQ1MjFjMjU4YzMzYSIsICJpZCI6ICJlYWU3ZjM5Ny1lZWMxLTQzNjItYTc5YS03NGEzOWMwNTNlOTciLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.Nw5gfngFvTrc2NsdjCd7DKXST1_zfmUErTayunBkzuI"
  ></script>
</svelte:head>

{#if isBot}
  <!-- Contenu spécial pour les robots -->
  <BotContent {slug} {profile} {searchEngine} />
{:else}
  <!-- Contenu normal pour les utilisateurs humains -->
  <div class="relative lg:w-5/12 lg:m-auto w-[90%] m-auto">
    <div class="relative flex justify-center w-full rounded-full">
      <div class="flex justify-center absolute right-0 left-0 top-[10px]">
        <div
          class="text-white fade-inn bg-[#09BC8A] px-3 py-1 text-center text-xs font-semibold tracking-widest uppercase rounded-lg"
        >
          {online}
        </div>
      </div>
      <video
        class="m-auto w-[90%] lg:w-[70%] mt-5 object-cover rounded-[20px]"
        controls
        poster="/blonde/profil.webp"
        src="/blonde/video.mp4"
      >
        <track kind="captions" />
      </video>
    </div>

    <h1 class="font-bold uppercase text-[#7e0048] text-lg mt-2 text-center">
      {slug}
    </h1>

    <p
      class="py-2 pb-0 m-auto mb-3 font-semibold text-center text- rounded-3xl"
    >
      À la recherche d'un plan cul régulier {monip} pour s'amuser un peu ! 😈<br
      /><br />
      Si tu veux échanger des nudes et me rencontrer, envoie-moi un message ici
    </p>

    <div class="flex justify-center space-x-1">
      <img
        src="/icons/arrow.webp"
        alt="Fleche vers le bas"
        class="w-4 rotate-90"
      />
      <img
        src="/icons/arrow.webp"
        alt="Fleche vers le bas"
        class="w-4 rotate-90"
      />
      <img
        src="/icons/arrow.webp"
        alt="Fleche vers le bas"
        class="w-4 rotate-90"
      />
    </div>

    <a
      href={link}
      class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white text-lg font-semibold py-4 flex items-center justify-center rounded-3xl my-2 space-x-4"
    >
      <div>ME CONTACTER MAINTENANT</div>
    </a>

    <img
      alt="Preuve de vérification pour le profil de {slug}"
      src="/blonde/proof2.webp"
      class="rounded-[20px] w-[90%] m-auto shadow-xl my-4"
    />

    <section class="pb-1 my-4 rounded-3xl">
      <h2 class="font-bold text-[#7e0048]">JE NE SUIS PAS UNE ESCORTE !! ❌</h2>
      <p class="py-2 text-sm">
        Une bonne fois pour toutes, <b>je ne demande pas d'argent,</b> je
        cherche juste des plans culs pour m'amuser un peu, c'est tout.<br /><br
        />Je préfère généralement les mecs avec <b>un peu d'expérience</b> mais
        si tu es puceau, je vais voir ce que je peux faire... 😉<br /><br />Par
        contre les mecs, <b>respect et discrétion obligatoire SVP,</b> sinon je bloque
        car c'est pas ce que je recherche.
      </p>
    </section>

    <section class="my-4 rounded-3xl">
      <h2 class="font-bold text-[#7e0048]">COMMENT ME RENCONTRER EN RÉEL ?</h2>
      <p class="py-2 text-sm">
        Envoie-moi une petite photo sur
        <a
          href={link}
          class="font-semibold text-blue-600 underline cursor-pointer underline-offset-2"
          >My Secret en cliquant ici</a
        >
        et <b>dis-moi quand t'es dispo.</b> Je reçois les notifications quand je
        reçois un message, donc habituellement,
        <b>je réponds en quelques minutes.</b><br /><br />
        Je préviens l'essai coûte <b>seulement {price}</b> mais ensuite t'es
        tranquille tu peux contacter gratuitement
        <b>autant de filles que tu veux et recevoir mes nudes sans limites.</b
        ><br /><br />
        Je préfère passer par <b>My Secret</b> car au moins je ne me fais pas
        harceler comme sur les applis de rencontres ou insta,
        <b>ça permet de parler sans se faire spammer</b> par des milliers de gros
        relous. 😘
      </p>
    </section>

    <img
      alt="Photo plus osée de {slug}"
      src="/blonde/hot.webp"
      class="w-[90%] m-auto shadow-xl my-4 rounded-[20px]"
    />

    <div class="flex justify-center space-x-1">
      <img
        src="/icons/arrow.webp"
        alt="Fleche vers le bas"
        class="w-4 rotate-90"
      />
      <img
        src="/icons/arrow.webp"
        alt="Fleche vers le bas"
        class="w-4 rotate-90"
      />
      <a href="/" class="cursor-default"
        ><img
          src="/icons/arrow.webp"
          alt="Fleche vers le bas"
          class="w-4 rotate-90"
        /></a
      >
    </div>

    <a
      href={link}
      class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white text-lg font-semibold py-4 flex items-center justify-center rounded-3xl my-2 space-x-4"
    >
      <div>CLIQUE ICI POUR VOIR MON PROFIL</div>
    </a>

    <section class="p-3 pb-0 mt-6 rounded-3xl">
      <h2 class="font-bold text-center text-[#7e0048]">QUELQUES TÉMOIGNAGES</h2>
    </section>

    <section class="pb-3">
      <div class="w-[95%] m-auto p-3 rounded-3xl my-2">
        <img
          alt="Témoignage client n°1 pour {slug}"
          src="/reviews/rev1.webp"
          class="rounded-2xl shadow-lg shadow-[#c181ff]/10"
        />
      </div>
      <div class="text-center m-auto w-[95%] font-semibold text-sm">
        Vous êtes nombreux à avoir pris l'offre d'essai et à en être contents
        apparemment ! 😘
      </div>
    </section>

    <section class="pb-3">
      <div class="w-[95%] m-auto p-3 rounded-3xl my-2">
        <img
          alt="Témoignage client n°1 pour {slug}"
          src="/reviews/test/rev3.webp"
          class="rounded-2xl shadow-lg shadow-[#c181ff]/10"
        />
      </div>
      <div class="text-center m-auto w-[95%] font-semibold text-sm">
        La persévérance finit toujours par payer ! 💪 Amuse-toi bien ! 😘
      </div>
    </section>

    <section class="py-3">
      <div class="w-[95%] m-auto p-3 rounded-3xl my-2">
        <img
          alt="Témoignage client n°2 pour {slug}"
          src="/reviews/rev3.webp"
          class="shadow-lg shadow-[#c181ff]/10 rounded-2xl"
        />
      </div>
      <div class="text-center m-auto w-[95%] font-semibold text-sm">
        Ce ne sont pas des escortes, tu peux contacter autant de filles que tu
        veux. 👌
      </div>
    </section>

    <section class="py-3">
      <div class="w-[95%] m-auto p-3 rounded-3xl my-2">
        <img
          alt="Témoignage client n°3 pour {slug}"
          src="/reviews/rev2.webp"
          class="shadow-lg shadow-[#c181ff]/10 rounded-2xl"
        />
      </div>
      <div class="text-center m-auto w-[95%] font-semibold text-sm">
        Si tu es septique, inscris-toi et rejoins-moi, tu verras que ça
        fonctionne vraiment ! 💯🔥
      </div>
    </section>

    <hr class="my-2 border-[#800048]/20" />

    <section class="my-2">
      <div class="font-semibold py-2 text-xl text-center text-[#7e0048]">
        Tu veux me rejoindre ? 😏
      </div>
      <div class="mb-4 text-sm font-semibold text-center">
        Super, tu ne le regretteras pas ! 🔥<br /><br />Et si tu doutes encore
        tu peux tester avec l'offre d'essai à seulement {price} ! <br /><br />Il
        te suffit de cliquer sur le bouton ci-dessous, de t'inscrire en une
        minute puis de choisir l'offre d'essai
      </div>
    </section>

    <div class="flex justify-center space-x-1">
      <img
        src="/icons/arrow.webp"
        alt="Fleche vers le bas indiquant le sens en bas 1"
        class="w-4 rotate-90"
      />
      <img
        src="/icons/arrow.webp"
        alt="Fleche vers le bas indiquant le sens en bas 2"
        class="w-4 rotate-90"
      />
      <a href="/" class="cursor-default"
        ><img
          src="/icons/arrow.webp"
          alt="Fleche vers le bas"
          class="w-4 rotate-90"
        /></a
      >
    </div>

    <a
      href={link}
      class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white text-lg font-semibold py-4 flex items-center justify-center rounded-3xl my-2 space-x-4"
    >
      S'INSCRIRE SUR MY SECRET 🔞
    </a>
  </div>
{/if}

<style>
  .testimonial-scroll {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .testimonial-scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .testimonial-scroll > div {
    scroll-snap-align: center;
  }

  .fade-inn {
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-pulse-slow {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
</style>
