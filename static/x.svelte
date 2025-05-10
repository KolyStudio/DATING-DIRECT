<script>
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { getProfileBySlug } from "$lib/utils";

  const slug = $page.params.slug;
  const profile = getProfileBySlug(slug);

  const date = dayjs().format("DD/MM/YYYY");
  const prenom = profile.prenom;
  let online = "EN LIGNE";

  let link =
    `https://invitation.my-secret.net/?v=soft&userName=${profile.userName}&userDistance=${profile.userDistance}&userPhotos=${profile.userPhotos}&userPicture=${profile.userPicture}&s1=${profile.s1}&s2=` +
    date;

  let titre = `${prenom} - Page Privée`;
  let monip = "";
  let price = "1,14€";

  // Variables pour le défilement automatique
  let autoScrollInterval;
  let testimonialScroll;
  let userScrolled = false;
  let resetScrollTimeout;
  let slideElements = [];
  let currentSlideIndex = 0;

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
    const myArray = [
      `EN LIGNE À L'INSTANT`,
      "EN LIGNE IL Y A 3 MINUTES",
      "EN LIGNE IL Y A 4 MINUTES",
    ];

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

    // Nettoyage à la destruction du composant
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      if (resetScrollTimeout) {
        clearTimeout(resetScrollTimeout);
      }
      if (testimonialScroll) {
        testimonialScroll.removeEventListener("scroll", handleScroll);
      }
      // Supprimer les écouteurs d'événements pour les clics sur les slides
      slideElements.forEach((slide, index) => {
        if (slide) {
          slide.removeEventListener("click", () => handleSlideClick(index));
        }
      });
    };
  });
</script>

<svelte:head>
  <title>{titre}</title>
  <meta
    name="description"
    content={`Accéder à la page privée de ${prenom} pour consulter sa présentation et ses photos. ${prenom} répond généralement aux messages privés en moins d'une heure.`}
  />
  <link rel="icon" href="favicon.png" />
  <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
  <meta
    name="og:description"
    content={`Accéder à la page privée de ${prenom} pour consulter sa présentation et ses photos. ${prenom} répond généralement aux messages privés en moins d'une heure.`}
  />
  <meta
    name="twitter:description"
    content={`Accéder à la page privée de ${prenom} pour consulter sa présentation et ses photos. ${prenom} répond généralement aux messages privés en moins d'une heure.`}
  />
</svelte:head>

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
      class="m-auto w-[90%] lg:w-[70%] mt-5 object-cover"
      controls
      poster={`${profile.folderPath}/profil.webp`}
      src={`${profile.folderPath}/video.mp4`}
    >
      <track kind="captions" />
    </video>
  </div>

  <h1 class="font-bold uppercase text-[#c2016e] text-lg mt-4">
    {prenom}
    <span class="-mt-1 text-sm font-semibold text-[#a05780]">
      • {profile.age} ans • {profile.profession}
    </span>
  </h1>

  <div class="py-2 pb-0 m-auto mb-3 text-sm rounded-3xl">
    <p class="">
      {#if monip}J'habite {monip} et je
      {:else}
        Je{/if} cherche <strong>quelqu'un de sympa</strong> pour
      <strong>se voir régulièrement</strong>... 😏
      <br />
      <br />J'aime les soirées tranquilles et les
      <strong>moments plus intenses</strong>. Si ça match entre nous, je suis du
      genre à <strong>partager des photos hot</strong> et
      <strong>plus si affinités</strong>! <br />
      <br />
      <strong>Dis-moi où t'habites</strong> quand tu m'envoies un message, c'est
      <strong>important</strong>
      pour moi de savoir si on est <strong>proches l'un de l'autre</strong> pour
      qu'on fasse connaissance ✨
    </p>
  </div>

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
    class="cursor-pointer bg-gradient-to-b from-[#e70182] to-[#c2016e] border-b-4 border-[#881757] text-white font-semibold py-4 flex items-center justify-center rounded-3xl my-2 space-x-4 animate-pulse-slow"
  >
    <div>DISCUTER AVEC MOI MAINTENANT</div>
  </a>

  <style>
    @keyframes pulse-slow {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }

    /* Styles pour les témoignages horizontaux */
    .testimonial-scroll {
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      scrollbar-width: thin;
      scrollbar-color: #c2016e #f3f3f3;
    }

    .testimonial-scroll::-webkit-scrollbar {
      height: 6px;
    }

    .testimonial-scroll::-webkit-scrollbar-track {
      background: #f3f3f3;
      border-radius: 10px;
    }

    .testimonial-scroll::-webkit-scrollbar-thumb {
      background-color: #c2016e;
      border-radius: 10px;
    }
  </style>

  <div class="w-[90%] bg-white m-auto shadow-xl my-4">
    <img
      alt="Preuve de vérification pour le profil de {prenom}"
      src={`${profile.folderPath}/proof.webp`}
    />
  </div>

  <section class="pb-1 my-4 rounded-3xl">
    <h2 class="font-bold text-[#c2016e]">❌ PAS UNE ESCORTE, MERCI! ❌</h2>
    <p class="py-2 text-sm">
      Soyons clairs, je cherche juste à m'amuser et rencontrer des mecs cool -
      <strong>ZÉRO intérêt pour l'argent!</strong> 💯 <br /><br />À {profile.age}
      ans, j'ai juste envie de
      <strong>kiffer sans prise de tête</strong>, de faire des rencontres sympas
      et voir où ça mène... 💁‍♀️ J'avoue, j'ai un
      <strong>petit faible pour les mecs qui savent ce qu'ils font</strong>,
      mais bon si t'es moins expérimenté et que t'as une bonne vibe, pourquoi
      pas! <br /><br />😏
      <strong>IMPORTANT: respect et discrétion = NON NÉGOCIABLES!</strong> Je connais
      trop de monde dans ma ville.
    </p>
  </section>

  <section class="my-4 rounded-3xl">
    <h2 class="font-bold text-[#c2016e]">COMMENT ME RENCONTRER ?</h2>
    <p class="py-2 text-sm">
      Après 6 mois à avoir supporté les relous des applis de rencontres, j'ai
      trouvé My Secret grâce à une copine et ça a <strong>TOUT changé!</strong
      ><br />
      <br />

      Pour me contacter c'est <strong>très simple</strong>:
      <a
        href={link}
        class="font-semibold text-blue-600 underline cursor-pointer underline-offset-2"
        >clique ici pour m'envoyer un message</a
      >, ajoute une photo (rien de fou, juste pour voir à qui je parle!) et
      dis-moi tes dispos cette semaine.
      <strong>Je réponds généralement en moins de 10 min</strong>
      (mon tel me notifie direct). <br />
      <br />
    </p>

    <h2 class="font-bold text-[#c2016e]">POURQUOI ÇA COÛTE {price} ?</h2>
    <p class="py-2 text-sm">
      C'est <strong>juste pour la vérification</strong> - ça filtre les faux
      profils et les mecs pas sérieux. <br /><strong>Après c'est GRATUIT</strong
      >
      et tu peux voir <strong>tous mes contenus privés</strong> et parler à
      <strong>autant de filles que tu veux!</strong> <br /><br />Je préfère My
      Secret à Insta/Snap car je recevais genre
      <strong>200+ DMs par jour</strong>
      et c'était
      <strong>IMPOSSIBLE</strong> de filtrer les mecs cool des relous. Ici, l'ambiance
      est carrément plus chill. 😌
    </p>
  </section>

  <div class="w-[90%] bg-white m-auto shadow-xl my-4">
    <img
      alt="Photo plus osée de {prenom}"
      src={`${profile.folderPath}/hot.webp`}
    />
  </div>

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
    class="cursor-pointer bg-gradient-to-b from-[#e70182] to-[#c2016e] border-b-4 border-[#881757] text-white font-semibold py-4 flex items-center justify-center rounded-3xl my-2 space-x-4 animate-pulse-slow"
  >
    <div>DISCUTER AVEC MOI MAINTENANT</div>
  </a>

  <section class="p-3 mt-6 rounded-3xl">
    <h2 class="font-semibold text-center text-[#c2016e]">
      Les retours de mes copines..
    </h2>
  </section>

  <section class="p-3">
    <div class="testimonial-scroll pb-3">
      <div id="slide-0" class="inline-block px-2 w-[85%] cursor-pointer">
        <img
          alt="Témoignage client n°1 pour {prenom}"
          src="/avis/avis1.webp"
          class="w-full rounded-2xl shadow-lg shadow-[#c181ff]/10 border-4 border-white transition-transform"
        />
      </div>
      <div id="slide-1" class="inline-block px-2 w-[85%] cursor-pointer">
        <img
          alt="Témoignage client n°2 pour {prenom}"
          src="/avis/avis2.webp"
          class="w-full rounded-2xl shadow-lg shadow-[#c181ff]/10 border-4 border-white transition-transform"
        />
      </div>
      <div id="slide-2" class="inline-block px-2 w-[85%] cursor-pointer">
        <img
          alt="Témoignage client n°3 pour {prenom}"
          src="/avis/avis3.webp"
          class="w-full rounded-2xl shadow-lg shadow-[#c181ff]/10 border-4 border-white transition-transform"
        />
      </div>
    </div>
  </section>

  <hr class="my-2 border-[#e1d6e7]" />

  <section class="my-2">
    <div class="font-semibold py-2 text-xl text-[#c2016e]">
      Tu veux me rejoindre ? 😏
    </div>
    <div class="mb-4 text-sm">
      Super, j'ai hâte de te <strong>parler en privé</strong>! Je réponds
      généralement <strong>dans les 10 minutes</strong>.<br /><br />
      → Clique simplement ci-dessous pour commencer (<strong
        >{price} seulement pour tout débloquer</strong
      >)<br />
      → Une fois inscrit, cherche "<strong>{profile.userName}</strong>" et
      envoie-moi un message <br />→ Je suis
      <strong>beaucoup plus réactive</strong> sur My Secret qu'ailleurs 🔥
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
    class="uppercase cursor-pointer bg-gradient-to-b from-[#e70182] to-[#c2016e] border-b-4 border-[#881757] text-white font-semibold py-4 flex items-center justify-center rounded-3xl my-2 space-x-4 animate-pulse-slow"
  >
    DISCUTER AVEC MOI MAINTENANT
  </a>
</div>
