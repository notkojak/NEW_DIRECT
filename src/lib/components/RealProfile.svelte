<script>
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { getOptimizedCity, formatCityDisplay } from "$lib/cityUtils.js";

  export let dogProfile = null;

  const date = dayjs().format("DD/MM/YYYY");

  // Utiliser le keyword du profil ou fallback sur "Marine"
  $: prenom = dogProfile?.keyword || dogProfile?.name || "Marine";

  let online = "EN LIGNE";
  const reviewsFolder = "/reviews/"; // Dossier des avis
  const videoSource = "/brune/MS3.mp4";

  let link =
    `https://invitation.my-secret.net/?v=soft&userName=MissCandy&userDistance=7&userPhotos=53&userPicture=https://i.ibb.co/ncXP788/profil.webp&s1=DIRECT2&s2=` +
    date;

  $: titre = `${prenom} - Page Privée`;
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

  // Fonction pour défiler vers une slide spécifique (premier carrousel)
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
    }, 10000); // Réduit à 10 secondes pour être cohérent avec les autres délais
  }

  // Fonction pour défiler vers une slide spécifique (second carrousel)
  function scrollToSlide2(index) {
    if (!reviewsScroll || !reviewElements.length) return;

    // Assurez-vous que l'index est valide
    index = Math.max(0, Math.min(index, reviewElements.length - 1));
    currentReviewIndex = index;

    // Calculer la position de la slide cible
    const targetSlide = reviewElements[index];
    const scrollPosition = targetSlide.offsetLeft - reviewsScroll.offsetLeft;

    // Défiler vers la slide
    reviewsScroll.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    // Réinitialiser le drapeau après un délai (réarmer l'auto-scroll)
    userScrolled = true;
    clearTimeout(resetScrollTimeout);
    resetScrollTimeout = setTimeout(() => {
      userScrolled = false;
    }, 10000); // Réduit à 10 secondes pour être cohérent avec les autres délais
  }

  // Fonction pour mettre à jour les styles des miniatures

  function startAutoScroll() {
    clearInterval(autoScrollInterval);

    autoScrollInterval = setInterval(() => {
      if (!userScrolled) {
        // Passer à la slide suivante dans les deux carrousels
        if (testimonialScroll && slideElements.length) {
          currentSlideIndex = (currentSlideIndex + 1) % slideElements.length;
          scrollToSlide(currentSlideIndex);
        }

        if (reviewsScroll && reviewElements.length) {
          currentReviewIndex = (currentReviewIndex + 1) % reviewElements.length;
          scrollToSlide2(currentReviewIndex);
        }
      }
    }, 8000); // Réduit de 15 secondes à 8 secondes
  }

  function handleScroll(event) {
    // Indiquer que l'utilisateur a fait défiler manuellement
    userScrolled = true;

    // Réinitialiser le drapeau après un délai (réarmer l'auto-scroll)
    clearTimeout(resetScrollTimeout);
    resetScrollTimeout = setTimeout(() => {
      userScrolled = false;
    }, 10000); // Réduit à 10 secondes pour être cohérent avec les autres délais

    // Déterminer quelle slide est actuellement visible
    const scrollContainer = event.currentTarget;
    const isTestimonial = scrollContainer === testimonialScroll;

    if (isTestimonial && slideElements.length) {
      const scrollPosition = scrollContainer.scrollLeft;
      const scrollWidth = scrollContainer.offsetWidth;

      // Trouver la slide la plus visible
      let bestVisibleIndex = 0;
      let bestVisibleArea = 0;

      slideElements.forEach((slide, index) => {
        const slideLeft = slide.offsetLeft - scrollContainer.offsetLeft;
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

      // Mettre à jour l'index et les miniatures
      if (currentSlideIndex !== bestVisibleIndex) {
        currentSlideIndex = bestVisibleIndex;
      }
    } else if (!isTestimonial && reviewElements.length) {
      const scrollPosition = scrollContainer.scrollLeft;
      const scrollWidth = scrollContainer.offsetWidth;

      // Trouver la slide la plus visible
      let bestVisibleIndex = 0;
      let bestVisibleArea = 0;

      reviewElements.forEach((slide, index) => {
        const slideLeft = slide.offsetLeft - scrollContainer.offsetLeft;
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

      // Mettre à jour l'index et les miniatures
      if (currentReviewIndex !== bestVisibleIndex) {
        currentReviewIndex = bestVisibleIndex;
      }
    }
  }

  onMount(async () => {
    const myArray = [
      `EN LIGNE À L'INSTANT`,
      "EN LIGNE IL Y A 3 MINUTES",
      "EN LIGNE IL Y A 4 MINUTES",
    ];

    online = myArray[Math.floor(Math.random() * myArray.length)];

    try {
      const response = await fetch(
        "https://geoapi-hoskes.onrender.com/json.gp",
      );
      const data = await response.json();

      const ipay = await fetch(
        `https://api.ipregistry.co/` +
          data.hoskes_locplugin_request +
          `?key=d3vt0gu96nu3q8tq`,
      ).then((r) => r.json());

      if (data.hoskes_locplugin_city && !ipay.carrier.name) {
        // Utiliser ChatGPT pour optimiser la ville
        const optimizedCity = await getOptimizedCity(
          data.hoskes_locplugin_city,
          data.hoskes_locplugin_regionName,
        );
        //   monip = formatCityDisplay(optimizedCity);
        monip = "vers " + optimizedCity.replace(/-/g, " ");
      } else {
        monip = "";
      }

      const countryCode = data.hoskes_locplugin_countryCode;

      switch (countryCode) {
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
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations IP:",
        error,
      );
    }

    // Créer des références aux gestionnaires d'événements pour pouvoir les supprimer plus tard
    const clickHandlers = [];

    // Fonction d'aide pour gérer les clics sur les miniatures
    function createClickHandler(fn, index) {
      const handler = () => fn(index);
      clickHandlers.push({ element: null, handler, index, fn });
      return handler;
    }

    // Initialiser le défilement automatique avec délai pour s'assurer que le DOM est chargé
    setTimeout(() => {
      testimonialScroll = document.querySelector(".testimonial-scroll.avis");
      reviewsScroll = document.querySelector(".testimonial-scroll.reviews");

      if (testimonialScroll) {
        // Récupérer les slides
        slideElements = [
          document.getElementById("avis-slide-0"),
          document.getElementById("avis-slide-1"),
          document.getElementById("avis-slide-2"),
        ];

        // Ajouter les écouteurs d'événements pour les clics sur les slides
        slideElements.forEach((slide, index) => {
          if (slide) {
            const handler = createClickHandler(scrollToSlide, index);
            slide.addEventListener("click", handler);
            clickHandlers[clickHandlers.length - 1].element = slide;
          }
        });

        // Ajouter l'écouteur d'événement pour le scroll manuel
        testimonialScroll.addEventListener("scroll", handleScroll);

        // Initialiser les styles des miniatures

        // Ajouter les gestionnaires d'événements pour les flèches de navigation
        const prevButton = document.querySelector(".avis-prev-button");
        const nextButton = document.querySelector(".avis-next-button");

        if (prevButton) {
          const handler = () => {
            const prevIndex =
              (currentSlideIndex - 1 + slideElements.length) %
              slideElements.length;
            scrollToSlide(prevIndex);
          };
          prevButton.addEventListener("click", handler);
          clickHandlers.push({ element: prevButton, handler });
        }

        if (nextButton) {
          const handler = () => {
            const nextIndex = (currentSlideIndex + 1) % slideElements.length;
            scrollToSlide(nextIndex);
          };
          nextButton.addEventListener("click", handler);
          clickHandlers.push({ element: nextButton, handler });
        }
      }

      if (reviewsScroll) {
        // Récupérer les slides
        reviewElements = [
          document.getElementById("review-slide-0"),
          document.getElementById("review-slide-1"),
          document.getElementById("review-slide-2"),
          document.getElementById("review-slide-3"),
        ];

        // Ajouter les écouteurs d'événements pour les clics sur les slides
        reviewElements.forEach((slide, index) => {
          if (slide) {
            const handler = createClickHandler(scrollToSlide2, index);
            slide.addEventListener("click", handler);
            clickHandlers[clickHandlers.length - 1].element = slide;
          }
        });

        // Ajouter l'écouteur d'événement pour le scroll manuel
        reviewsScroll.addEventListener("scroll", handleScroll);

        // Ajouter les gestionnaires d'événements pour les flèches de navigation
        const prevButton = document.querySelector(".reviews-prev-button");
        const nextButton = document.querySelector(".reviews-next-button");

        if (prevButton) {
          const handler = () => {
            const prevIndex =
              (currentReviewIndex - 1 + reviewElements.length) %
              reviewElements.length;
            scrollToSlide2(prevIndex);
          };
          prevButton.addEventListener("click", handler);
          clickHandlers.push({ element: prevButton, handler });
        }

        if (nextButton) {
          const handler = () => {
            const nextIndex = (currentReviewIndex + 1) % reviewElements.length;
            scrollToSlide2(nextIndex);
          };
          nextButton.addEventListener("click", handler);
          clickHandlers.push({ element: nextButton, handler });
        }
      }

      // Démarrer le défilement automatique
      // startAutoScroll();

      // Configurer les gestionnaires d'événements pour les miniatures
      const avisMiniaturas = document.querySelectorAll(".avis-thumbnail");
      avisMiniaturas.forEach((miniatura, index) => {
        const handler = createClickHandler(scrollToSlide, index);
        miniatura.addEventListener("click", handler);
        clickHandlers[clickHandlers.length - 1].element = miniatura;
      });

      const reviewsMiniaturas = document.querySelectorAll(".reviews-thumbnail");
      reviewsMiniaturas.forEach((miniatura, index) => {
        const handler = createClickHandler(scrollToSlide2, index);
        miniatura.addEventListener("click", handler);
        clickHandlers[clickHandlers.length - 1].element = miniatura;
      });
    }, 500);

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
      if (reviewsScroll) {
        reviewsScroll.removeEventListener("scroll", handleScroll);
      }

      // Supprimer tous les écouteurs d'événements
      clickHandlers.forEach(({ element, handler }) => {
        if (element) {
          element.removeEventListener("click", handler);
        }
      });
    };
  });
</script>

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
      poster="/brune/NINA_PROFIL2.webp"
      src="/brune/MS3.mp4"
    >
      <track kind="captions" />
    </video>
  </div>

  <h1 class="font-bold uppercase text-[#7e0048] text-lg mt-2 text-center">
    {prenom}
  </h1>

  <p class="py-2 pb-0 m-auto mb-3 font-semibold text-center text- rounded-3xl">
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
    class="cursor-pointer bg-gradient-to-b from-[#7a0040] to-[#7a0040] border-b-4 border-[#5e0036] text-white font-semibold py-4 flex items-center justify-center rounded-2xl my-2 space-x-4"
  >
    <div>ME CONTACTER MAINTENANT</div>
  </a>

  <img
    alt="Preuve de vérification pour le profil de {prenom}"
    src="/brune/MSS.webp"
    class="rounded-[20px] w-[90%] m-auto shadow-xl my-4"
  />

  <section class="pb-1 my-4 rounded-3xl">
    <h2 class="font-bold text-[#7e0048]">JE NE SUIS PAS UNE ESCORTE !! ❌</h2>
    <p class="py-2 text-sm">
      Une bonne fois pour toutes, <b>je ne demande pas d'argent,</b> je cherche
      juste des plans culs pour m'amuser un peu, c'est tout.<br /><br />Je
      préfère généralement les mecs avec <b>un peu d'expérience</b> mais si tu
      es puceau, je vais voir ce que je peux faire... 😉<br /><br />Par contre
      les mecs, <b>respect et discrétion obligatoire SVP,</b> sinon je bloque car
      c'est pas ce que je recherche.
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
      <b>je réponds en quelques minutes.</b>
      <br /><br /> 
      <!-- <br /><br />
      Je préviens l'essai coûte <b>seulement {price} </b>, mais grâce à ça on
      est sûr de tomber sur des mecs sérieux, et toi tu peux contacter
      <b>autant de filles que tu veux et recevoir mes nudes sans limites.</b>
      <br /><br /> -->
      Je préfère passer par <b>My Secret</b> car au moins je ne me fais pas
      harceler comme sur les applis de rencontres,
      <b>ça permet de parler sans se faire spammer</b> par des milliers de gros relous.
      😘
    </p>
  </section>

  <img
    alt="Photo plus osée de {prenom}"
    src="/brune/NINA_HOT3.webp"
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
    <img
      src="/icons/arrow.webp"
      alt="Fleche vers le bas"
      class="w-4 rotate-90"
    />
  </div>

  <a
    href={link}
    class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white font-semibold py-4 flex items-center justify-center rounded-2xl my-2 space-x-4"
  >
    <div>CLIQUE ICI POUR VOIR MON PROFIL</div>
  </a>

  <section class="p-3 pb-0 mt-6 rounded-3xl">
    <h2 class="font-bold text-center text-[#7e0048]">QUELQUES TÉMOIGNAGES</h2>
  </section>

  <section class="pb-3">
    <div class="w-[95%] m-auto p-3 rounded-3xl my-2">
      <img
        alt="Témoignage client n°1 pour {prenom}"
        src="{reviewsFolder}avis1.webp"
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
        alt="Témoignage client n°1 pour {prenom}"
        src="{reviewsFolder}avis2.webp"
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
        alt="Témoignage client n°2 pour {prenom}"
        src="{reviewsFolder}avis3.webp"
        class="shadow-lg shadow-[#c181ff]/10 rounded-2xl"
      />
    </div>
    <div class="text-center m-auto w-[95%] font-semibold text-sm">
      Ce ne sont pas des escortes, tu peux contacter autant de filles que tu
      veux 👌
    </div>
  </section>

  <section class="py-3">
    <div class="w-[95%] m-auto p-3 rounded-3xl my-2">
      <img
        alt="Témoignage client n°3 pour {prenom}"
        src="{reviewsFolder}avis4.webp"
        class="shadow-lg shadow-[#c181ff]/10 rounded-2xl"
      />
    </div>
    <div class="text-center m-auto w-[95%] font-semibold text-sm">
      Si tu es septique, inscris-toi et rejoins-moi, tu verras que ça fonctionne
      vraiment ! 💯🔥
    </div>
  </section>

  <hr class="my-2 border-[#800048]/20" />

  <section class="my-2">
    <div class="font-semibold py-2 text-xl text-center text-[#7e0048]">
      Tu veux me rejoindre ? 😏
    </div>
    <div class="mb-4 text-sm font-semibold text-center">
      Super, tu ne le regretteras pas ! 🔥
      <!-- <br /><br /> -->
      <!-- Et si tu doutes encore tu
      peux tester avec l'offre d'essai à seulement {price} ! -->
       <br /><br />Il te
      suffit de cliquer sur le bouton ci-dessous, de t'inscrire en une minute
      puis de m'envoyer un petit message
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
    <img
      src="/icons/arrow.webp"
      alt="Fleche vers le bas"
      class="w-4 rotate-90"
    />
  </div>

  <a
    href={link}
    class="cursor-pointer bg-gradient-to-b from-[#7e0048] to-[#7e0048] border-b-4 border-[#5e0036] text-white font-semibold py-4 flex items-center justify-center rounded-2xl my-2 space-x-4"
  >
    S'INSCRIRE SUR MY SECRET 🔞
  </a>
</div>

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

  /* Styles pour les témoignages horizontaux */
  .testimonial-scroll {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    scrollbar-width: none;
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

  /* Styles pour les miniatures */
  .avis-thumbnail,
  .reviews-thumbnail {
    position: relative;
    overflow: hidden;
  }

  .avis-thumbnail img,
  .reviews-thumbnail img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
</style>
