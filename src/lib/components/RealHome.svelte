<script>
  import "@fontsource-variable/bricolage-grotesque";
  import "@fontsource-variable/inter";
  import dayjs from "dayjs";
  import { ArrowRight, Plus, X } from "lucide-svelte";
  import { onMount } from "svelte";

  export let locationData = null;

  // Importer les profils de chiens pour la section
  import dogProfiles from "$lib/data/dog-profiles.json";

  let texteAffiche = "";
  const textes = ["rencontres", "matches", "dates"];
  let index = 0;
  let currentText = "";
  let isDeleting = false;
  let textIndex = 0;
  let typingSpeed = 100;
  let pauseDuration = 1000;
  let interval;
  let monip = "";
  let price = "1,14€";
  let activeIndex = null;
  const date = dayjs().format("DD/MM/YYYY");
  let link =
    `https://invitation.my-secret.net/?v=soft&userName=Nina&userDistance=7&userPhotos=53&userPicture=https://my-secret.net/brune/NINA_PROFIL.webp&s1=HOMEE&s2=` +
    date;

  let isOpen = false;
  let isLoading = true;

  // Variables pour le système de scroll
  let testimonialScroll;
  let reviewsScroll;
  let slideElements = [];
  let reviewElements = [];
  let currentSlideIndex = 0;
  let currentReviewIndex = 0;
  let autoScrollInterval;
  let resetScrollTimeout;

  function handleScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
    if (resetScrollTimeout) {
      clearTimeout(resetScrollTimeout);
    }
    resetScrollTimeout = setTimeout(() => {
      // startAutoScroll();
    }, 3000);
  }

  function scrollToSlide(index) {
    if (!testimonialScroll || !slideElements[index]) return;
    testimonialScroll.scrollTo({
      left: slideElements[index].offsetLeft,
      behavior: "smooth",
    });
    currentSlideIndex = index;
  }

  function scrollToSlide2(index) {
    if (!reviewsScroll || !reviewElements[index]) return;
    reviewsScroll.scrollTo({
      left: reviewElements[index].offsetLeft,
      behavior: "smooth",
    });
    currentReviewIndex = index;
  }

  const femmesEnLigne = Math.floor(Math.random() * 31) + 2830;

  function toggle(index) {
    activeIndex = activeIndex === index ? null : index;
  }

  function toggleForm() {
    isOpen = !isOpen;

    const interval = setInterval(() => {
      const ageSelect = document.querySelector('select[name="birthdate"]');
      if (ageSelect) {
        const defaultAgeOption = ageSelect.querySelector(
          "option[selected][disabled]",
        );
        if (defaultAgeOption) defaultAgeOption.textContent = "Ton âge";
      }

      const cguCheckboxContainer = document.querySelector(
        ".ptprelinker-checkbox__cgu-container",
      );
      if (cguCheckboxContainer) {
        const cguCheckbox = cguCheckboxContainer.querySelector(
          'input[type="checkbox"]',
        );
        if (cguCheckbox) cguCheckbox.checked = true;
        cguCheckboxContainer.style.display = "none";
      }

      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput) emailInput.placeholder = "Ton email";

      const pseudoInput = document.querySelector('input[name="login"]');
      if (pseudoInput) pseudoInput.placeholder = "Ton pseudo";
    }, 100);
  }

  function updateText() {
    if (isDeleting) {
      currentText = textes[index].substring(0, textIndex--);
      if (textIndex < 0) {
        isDeleting = false;
        index = (index + 1) % textes.length;
        textIndex = 0;
        clearInterval(interval);
        setTimeout(() => {
          interval = setInterval(updateText, typingSpeed);
        }, pauseDuration);
      }
    } else {
      currentText = textes[index].substring(0, textIndex++);
      if (textIndex > textes[index].length) {
        isDeleting = true;
        clearInterval(interval);
        setTimeout(() => {
          interval = setInterval(updateText, typingSpeed);
        }, pauseDuration);
      }
    }
    texteAffiche = currentText;
  }

  // Utiliser les données de localisation du layout
  onMount(async () => {
    if (!locationData) return;

    try {
      const ipay = await fetch(
        `https://api.ipregistry.co/` +
          locationData.hoskes_locplugin_request +
          `?key=d3vt0gu96nu3q8tq`,
      ).then((r) => r.json());

      if (locationData.hoskes_locplugin_city && !ipay.carrier.name) {
        monip = "vers " + locationData.hoskes_locplugin_city;
      } else {
        monip = "";
      }

      const countryCode = locationData.hoskes_locplugin_countryCode;

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
    } finally {
      isLoading = false;
    }

    // Démarrer l'animation de texte
    interval = setInterval(updateText, typingSpeed);

    // Initialiser les éléments DOM après un délai
    setTimeout(() => {
      testimonialScroll = document.querySelector(".testimonial-scroll.avis");
      reviewsScroll = document.querySelector(".testimonial-scroll.reviews");
    }, 500);
  });
</script>

<main class="w-full bg-white">
  <div class="bg-gradient-to-r from-[#ff64b4] to-[#e999c2] pb-2 pt-2 w-full">
    <div
      class="flex items-center justify-center px-6 py-3 mx-4 bg- rounded-xl relative"
    >
      <div>
        <img
          src="/logow.webp"
          loading="lazy"
          alt="logo MySecret"
          class="w-[70%] m-auto"
        />
      </div>
      <!-- <div
        id="homepage"
        on:click={toggleForm}
        class="flex items-center bg-opacity-[0.4] text-black underline space-x-2 justify-center w 3/4 px-4 rounded absolute -bottom-4"
      >
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mt-1"></div>
        <div>
          <span class="text-sm font-semibold">
            {femmesEnLigne} femmes en ligne {monip}
          </span>
        </div>
      </div> -->
      <!-- <div><Menu/></div> -->
    </div>

    <div class="relative lg:w-5/12 lg:m-auto">
      <div
        class="bricolage relative text-white font-medium text-3xl text-center w-[80%] m-auto my-10 typed-words tracking-tighter"
      >
        Le site de rencontres qui met du piment <span class="icon-emoji-hero">
        </span>
        dans tes {texteAffiche}
      </div>
      <div
        on:click={toggleForm}
        id="homepage"
        class="w-[80%] m-auto flex justify-center"
      >
        <div
          id="homepage"
          class="flex items-center justify-center w-full px-6 py-4 m-auto space-x-2 text-sm font-semibold text-white uppercase bg-black rounded-3xl"
        >
          <div id="homepage">S'inscrire sur MySecret</div>
          <div id="homepage">
            <ArrowRight id="homepage" class="w-4 pt-0.5" />
          </div>
        </div>
      </div>
      <div class="flex pl-2 my-8 space-x-2 overflow-x-auto">
        <img src="/spice/1.webp" alt="1" class="rounded-[30px] h-[500px]" />
        <img src="/spice/2.webp" alt="2" class="rounded-[30px] h-[500px]" />
        <img src="/spice/3.webp" alt="3" class="rounded-[30px] h-[500px]" />
        <img src="/spice/4.webp" alt="4" class="rounded-[30px] h-[500px]" />
        <img src="/spice/5.webp" alt="5" class="rounded-[30px] h-[500px]" />
        <img src="/spice/6.webp" alt="6" class="rounded-[30px] h-[500px]" />
        <img src="/spice/7.webp" alt="7" class="rounded-[30px] h-[500px]" />
        <img src="/spice/8.webp" alt="8" class="rounded-[30px] h-[500px]" />
      </div>
    </div>
  </div>
  <div
    class="flex flex-col font-semibold text-[27px] m-5 my-12 space-y-10 bricolage tracking-tighter"
  >
    <div>
      MySecret compte + de
      <span class="text-[#ff64b4]">500 000 membres </span>inscrits.
    </div>

    <div>
      Nos membres ont échangés plus de <span class="text-[#ff64b4]"
        >10 millions de messages</span
      > (et pas que)
    </div>

    <div>
      Des <span class="text-[#ff64b4]">centaines de personnes</span> se rencontrent
      chaque jour avec le même objectif
    </div>
  </div>

  <section class="my-12">
    <div
      class="font-bold text-[36px] w-3/4 m-auto text-center bricolage tracking-tighter"
    >
      Ça va être simple de t'amuser
    </div>

    <div class="w-3/4 m-auto text-center text-gray-600">
      Ici, les rencontres sont plus épicées, plus sécurisées, plus adaptées à
      toi et à tes envies...
    </div>
  </section>

  <section class="flex flex-col space-y-4">
    <div class="bg-[#fff3f6] mx-4 rounded-3xl py-4">
      <img
        src="/spice/ban1.webp"
        alt="ban1"
        class="object-cover aspect-square w-[90%] m-auto rounded-3xl mb-6"
      />
      <div
        class="bg-white rounded-xl text-[#ff64b4] font-semibold space-x-2 py-2 px-4 mx-6 my-2 inline-flex"
      >
        <img src="/spice/loupe.png" alt="loupe" class="w-6" />
        <div class="bricolage">Choisis ton badge</div>
      </div>
      <div class="mx-6 text-2xl font-semibold tracking-tighter bricolage">
        Selon tes envies
      </div>
      <div class="mx-6 text-[#737373]">
        Trouve des membres qui correspondent (vraiment) à tes préférences et
        fais des rencontres sur mesure. Utilise ton Feed pour suivre l'actualité
        de tes matches et des autres personnes autour de toi.
      </div>
    </div>

    <div class="bg-[#fff3f6] mx-4 rounded-3xl py-4">
      <img
        src="/spice/ban2.webp"
        alt="ban2"
        class="object-cover aspect-square w-[90%] m-auto rounded-3xl mb-6"
      />

      <div
        class="bg-white rounded-xl text-[#ff64b4] font-semibold space-x-2 py-2 px-4 mx-6 my-2 inline-flex"
      >
        <img src="/spice/loupe.png" alt="loupe" class="w-6" />
        <div class="bricolage">Filtre photo</div>
      </div>
      <div class="mx-6 text-2xl font-semibold tracking-tighter bricolage">
        C'est à toi de voir
      </div>
      <div class="mx-6 text-[#737373]">
        Choisis de voir des photos Soft ou Hard des autres membres selont es
        préférences. Contrôle ce que tu vois pour une expérience emoji ou plus
        emoji
      </div>
    </div>

    <div class="bg-[#fff3f6] mx-4 rounded-3xl py-4">
      <img
        src="/spice/ban3.webp"
        alt="ban3"
        class="object-cover aspect-square w-[90%] m-auto rounded-3xl mb-6"
      />

      <div
        class="bg-white rounded-xl text-[#ff64b4] font-semibold space-x-2 py-2 px-4 mx-6 my-2 inline-flex"
      >
        <img src="/spice/loupe.png" alt="loupe" class="w-6" />
        <div class="bricolage">Album photo privé</div>
      </div>
      <div class="mx-6 text-2xl font-semibold tracking-tighter bricolage">
        Tu décides
      </div>
      <div class="mx-6 text-[#737373]">
        Sur MySecret, t'as le choix de partager ce que tu veux avec les autres
        membres. Passe ton album en modep rivé pour vivre une expérience 100%
        confidentielle.
      </div>
    </div>
  </section>

  <section>
    <div
      class="w-3/4 m-auto my-12 text-3xl font-semibold tracking-tighter text-center"
    >
      Conçu pour ton plaisir
    </div>
    <div class="flex flex-col space-y-6">
      <div class="bg-[#fff3f6] mx-4 rounded-3xl py-4">
        <img
          src="/spice/ban4.jpg"
          alt="ban4"
          class="object-cover aspect-square w-[90%] m-auto rounded-3xl mb-6"
        />

        <div
          class="bg-white rounded-xl text-[#ff64b4] font-semibold space-x-2 py-2 px-4 my-2 mx-6 inline-flex"
        >
          <img src="/spice/loupe.png" alt="loupe" class="w-6" />
          <div class="bricolage">Profils vérifiés</div>
        </div>
        <div class="mx-6 text-2xl font-semibold tracking-tighter bricolage">
          No fakes, que des membres MySecret
        </div>
        <div class="mx-6 text-[#737373]">
          On a mis en place dans l’appli, un système de vérification pour éviter
          les fakes. Ici, tu verras toutes sortes de profils, mais que des vrais
          membres très chaud comme toi.
        </div>
      </div>

      <div class="bg-[#fff3f6] mx-4 rounded-3xl py-4">
        <img
          src="/spice/ban5.webp"
          alt="ban5"
          class="object-cover aspect-square w-[90%] m-auto rounded-3xl mb-6"
        />

        <div
          class="bg-white rounded-xl text-[#ff64b4] font-semibold space-x-2 py-2 px-4 mx-6 my-2 inline-flex"
        >
          <img src="/spice/loupe.png" alt="loupe" class="w-6" />
          <div class="bricolage">Discrétion</div>
        </div>
        <div class="mx-6 text-2xl font-semibold tracking-tighter bricolage">
          Date en toute tranquillité
        </div>
        <div class="mx-6 text-[#737373]">
          Que ce soit pour discuter, matcher ou planifier une rencontre, on a
          mis le paquet pour te permettre de vivre des expériences
          occasionnelles en toute intimité. Alors, profite pleinement de chaque
          moment avec la tranquillité d'esprit que tu mérites.
        </div>
      </div>

      <div class="bg-[#fff3f6] mx-4 rounded-3xl py-4">
        <img
          src="/spice/ban6.webp"
          alt="ban1"
          class="object-cover aspect-square w-[90%] m-auto rounded-3xl mb-6"
        />

        <div
          class="bg-white rounded-xl text-[#ff64b4] font-semibold space-x-2 py-2 px-4 mx-6 my-2 inline-flex"
        >
          <img src="/spice/loupe.png" alt="loupe" class="w-6" />
          <div class="bricolage">Fonctionnalité exclusive</div>
        </div>
        <div class="mx-6 text-2xl font-semibold tracking-tighter bricolage">
          Ce que tu voulais, tu l’as ici
        </div>
        <div class="mx-6 text-[#737373]">
          Découvre des profils qui partagent tes envies grâce à nos
          fonctionnalités exclusives. Rencontre uniquement des personnes qui
          correspondent vraiment à tes attentes.
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header de Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-4"
        >
          <span class="text-sm font-semibold text-purple-700"
            >CheiRencontre</span
          >
        </div>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Des rencontres <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
            >canines</span
          > exceptionnelles
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez nos adorables compagnons à quatre pattes prêts pour des
          moments de complicité et d'amour.
        </p>
      </div>

      <!-- Grille de Profils - Même Design que [slug] -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {#each dogProfiles.slice(0, 6) as profile}
          <div class="space-y-6">
            <!-- Photos - Même Design que [slug] -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden group">
              <!-- Main Photo with Overlay - Hauteur optimisée -->
              <div class="relative w-full h-[400px]">
                <img
                  src={profile.photos[0]}
                  alt={profile.name}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div class="absolute bottom-6 left-6 right-6">
                    <div class="text-white">
                      <h3 class="text-3xl font-bold mb-2 drop-shadow-lg">
                        {profile.name}
                      </h3>
                      <p class="text-white/95 text-lg drop-shadow">
                        {profile.breed} • {profile.age} ans • {profile.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Photo Gallery -->
              <div class="p-6 bg-gradient-to-br from-gray-50 to-white">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-lg font-semibold text-gray-900">
                    Plus de photos
                  </h4>
                  <span class="text-sm text-gray-500"
                    >{profile.photos.length - 1} photos</span
                  >
                </div>
                <div class="grid grid-cols-3 gap-4">
                  {#each profile.photos.slice(1) as photo, index}
                    <div class="relative group/photo aspect-square">
                      <img
                        src={photo}
                        alt={`${profile.name} - Photo ${index + 2}`}
                        class="w-full h-full object-cover rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/40 group-hover/photo:from-black/20 group-hover/photo:via-black/10 group-hover/photo:to-black/60 rounded-xl transition-all duration-300 flex items-end justify-center pb-3"
                      >
                        <svg
                          class="w-6 h-6 text-white opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>

            <!-- Bio & Information - Même Design que [slug] -->
            <div class="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <!-- Header avec nom - Simplifié -->
              <div class="mb-6">
                <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {profile.name}
                </h2>
                <div class="flex flex-wrap items-center gap-3 text-sm">
                  <span
                    class="flex items-center px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span class="font-medium">{profile.breed}</span>
                  </span>
                  <span
                    class="flex items-center px-3 py-1 bg-blue-100 rounded-full"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span class="font-medium text-blue-700"
                      >{profile.age} ans</span
                    >
                  </span>
                  <span
                    class="flex items-center px-3 py-1 bg-pink-100 rounded-full"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span class="font-medium text-pink-700"
                      >{profile.gender}</span
                    >
                  </span>
                </div>
              </div>

              <!-- Bio Section -->
              <div class="mb-8">
                <div class="flex items-center mb-4">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    Biographie
                  </h3>
                </div>
                <div
                  class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4"
                >
                  <p class="text-gray-700 leading-relaxed">{profile.bio}</p>
                </div>
              </div>

              <!-- Intérêts & Personnalité Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Intérêts -->
                <div>
                  <div class="flex items-center mb-4">
                    <div
                      class="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      Intérêts
                    </h3>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    {#each profile.interests as interest}
                      <span
                        class="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-sm font-medium hover:from-pink-200 hover:to-purple-200 transition-colors cursor-pointer"
                      >
                        {interest}
                      </span>
                    {/each}
                  </div>
                </div>

                <!-- Personnalité -->
                <div>
                  <div class="flex items-center mb-4">
                    <div
                      class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      Personnalité
                    </h3>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    {#each profile.personality as trait}
                      <span
                        class="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium hover:from-purple-200 hover:to-pink-200 transition-colors cursor-pointer"
                      >
                        {trait}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>

              <!-- Bouton Action -->
              <div class="mt-8">
                <a
                  href="/{profile.slug}"
                  class="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Voir le profil complet
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Bouton Voir Plus -->
      <div class="text-center mt-12">
        <a
          href="/dogs"
          class="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border border-purple-200"
        >
          <span>Voir tous les chiens</span>
          <ArrowRight class="w-5 h-5" />
        </a>
      </div>
    </div>
  </section>

  <button
    class="bg-[#21211c] text-[#f4eee9] flex flex-col space-y-7 py-24 mt-4 w-full"
  >
    <div
      class="text-center text-3xl font-semibold w-[70%] m-auto bricolage tracking-tighter"
    >
      Tu vas adorer sucomber au 🌶️
    </div>
    <div class="m-auto mx-2 text-center">
      T'es sur le point de passer au niveau supérieur
    </div>
    <div
      id="homepage"
      on:click={toggleForm}
      class="bg-gradient-to-r text-sm uppercase from-[#ff64b4] to-[#fa94b1] rounded-3xl w-[90%] m-auto text-white font-semibold py-4 px-6 flex justify-center items-center space-x-2"
    >
      <div id="homepage">Pimente tes rencontres</div>
      <div id="homepage"><ArrowRight id="homepage" class="w-4 pt-0.5" /></div>
    </div>
  </button>

  <section>
    <div
      class="bricolage text-[#ff64b4] bg-[#fef9f4] flex my-4 m-auto w-[150px] text-sm font-semibold justify-center rounded-xl py-2 px-4"
    >
      Nos réponses
    </div>
    <div class="text-3xl font-bold tracking-tighter text-center bricolage">
      Questions fréquentes
    </div>

    <!-- Début de l'accordéon -->
    <div class="">
      <div class="bg-[#fff3f6] m-4 rounded-2xl">
        <button
          class="flex justify-between items-center p-4 cursor-pointer bricolage w-full"
          on:click={() => toggle(0)}
        >
          <div class="font-medium">MySecret (en vrai) c'est quoi?</div>
          <div>
            {#if activeIndex != 0}<Plus class="w-4" />{:else}<X
                class="w-4"
                if={activeIndex === 0}
              />{/if}
          </div>
        </button>
        {#if activeIndex === 0}
          <div class="p-4 pt-0">
            MySecret est ta nouvelle web-appli de rencontres pimentées
            disponible sur navigateur.<br />
            Tu pourras donc naviguer depuis ton mobile ou ton ordi en toute tranquillité.
          </div>
        {/if}
      </div>

      <div class="bg-[#fff3f6] m-4 rounded-2xl">
        <button
          class="flex justify-between items-center p-4 cursor-pointer bricolage w-full"
          on:click={() => toggle(1)}
        >
          <div class="font-medium">MySecret, c’est pour qui ?</div>
          <div>
            {#if activeIndex != 1}<Plus class="w-4" />{:else}<X
                class="w-4"
                if={activeIndex === 1}
              />{/if}
          </div>
        </button>
        {#if activeIndex === 1}
          <div class="p-4 pt-0">
            MySecret s'adresse à toutes les personnes ouvertes d’esprit qui
            veulent faire des rencontres pimentées en France, en Belgique ou en
            Suisse. Que tu sois solo ou en couple, on a tout ce qu’il faut...
          </div>
        {/if}
      </div>

      <div class="bg-[#fff3f6] m-4 rounded-2xl">
        <button
          class="flex justify-between items-center p-4 cursor-pointer bricolage w-full"
          on:click={() => toggle(2)}
        >
          <div class="font-medium text-left">
            Est-ce que la discrétion est vraiment présente ?
          </div>
          <div>
            {#if activeIndex != 2}<Plus class="w-4" />{:else}<X
                class="w-4"
                if={activeIndex === 2}
              />{/if}
          </div>
        </button>
        {#if activeIndex === 2}
          <div class="p-4 pt-0">
            Absolument ! MySecret a été pensé pour permettre à chacun.e de
            s'amuser en toute discrétion. Avec des fonctionnalités telles que
            l'album photo privé et des garanties de confidentialité, ta vie
            privée est bien gardée.
          </div>
        {/if}
      </div>

      <div class="bg-[#fff3f6] m-4 rounded-2xl">
        <button
          class="flex justify-between items-center p-4 cursor-pointer bricolage w-full"
          on:click={() => toggle(3)}
        >
          <div class="font-medium text-left">
            On trouve vraiment des esprits libres pour des coups d’un soir ?
          </div>
          <div>
            {#if activeIndex != 3}<Plus class="w-4" />{:else}<X
                class="w-4"
                if={activeIndex === 3}
              />{/if}
          </div>
        </button>
        {#if activeIndex === 3}
          <div class="p-4 pt-0">
            C’est l'endroit idéal pour trouver des esprits libres désireux de
            vivre des expériences épicées, que ce soit pour des coups d'un soir
            ou des rencontres sans attaches. Avec une communauté de plus de 100
            000 membres et plus de 1 million de messages échangés, tu trouveras
            certainement des personnes prêtes à se laisser aller...
          </div>
        {/if}
      </div>

      <div class="bg-[#fff3f6] m-4 rounded-2xl">
        <button
          class="flex justify-between p-4 cursor-pointer bricolage w-full"
          on:click={() => toggle(4)}
        >
          <div class="font-medium text-left">
            Comment la recherche fonctionne-t-elle ?
          </div>
          <div>
            {#if activeIndex != 4}<Plus class="w-4" />{:else}<X
                class="w-4"
                if={activeIndex === 4}
              />{/if}
          </div>
        </button>
        {#if activeIndex === 4}
          <div class="p-4 pt-0">
            Sur MySecret, tu seras par la puissance du matchmaking. On te
            propose des profils selon tes critères de recherche. Le principe est
            simple : Tu likes les esprits libres qui t’intéressent et si la
            personne te like en retour, it’s a match !
          </div>
        {/if}
      </div>
    </div>
    <!-- Fin de l'accordéon -->
  </section>

  <div class="bg-gradient-to-r from-[#ff64b4] to-[#fa94b1] py-4">
    <div
      class="text-white text-center flex justify-center mt-2 mx-1 font-medium text-[32px] items-center bricolage tracking-tighter space-x-3 flex-wrap"
    >
      <div class="break-words">Met plus de</div>
      <img src="/spice/piment.png" alt="Chaud" class="w-8 h-8" />,
      <div class="break-words">dans tes plans</div>
      <img src="/spice/peche.png" alt="Kiffer" class="w-8 h-8" />
      <div class="break-words">avec MySecret</div>
    </div>

    <div
      id="homepage"
      on:click={toggleForm}
      class="bg-black rounded-3xl w-[90%] m-auto text-white font-semibold py-4 px-6 flex justify-center items-center space-x-2 mt-6"
    >
      <div id="homepage">Je m'inscris</div>
      <div id="homepage"><ArrowRight id="homepage" class="w-4 pt-0.5" /></div>
    </div>
    <div class="flex justify-center mt-2 space-x-2 text-center text-white">
      <div>Ca va être</div>
      <img src="/spice/chaud.png" alt="Chaud" class="w-6 h-6" />,
      <div>mais tu vas</div>
      <img src="/spice/coeur.png" alt="Kiffer" class="w-6 h-6" />
    </div>
  </div>

  <div
    class="fixed inset-0 bg-[#fff3f6]"
    style:display={isOpen ? "block" : "none"}
  >
    <div class="flex items-center justify-between m-5 items-center">
      <img
        src="/spice/logoms.png"
        loading="lazy"
        alt="logo $MySecret"
        class="w-32 -rotate-[5deg]"
      />

      <button class="p-2 bg-white rounded-full" on:click={toggleForm}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide-icon lucide lucide-x w-5 h-5"
          ><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg
        >
      </button>
    </div>

    <div class="flex flex-col items-center justify-center mt-10">
      <div class="text-xl font-semibold text-center bricolage">
        Prêt pour une aventure ?
      </div>
      <div class="my-2 text-sm font-medium text-center text-gray-500">
        Crée ton compte sur My Secret - Étape 1/2
      </div>
      <div class="mx-4 bg-white rounded-3xl w-[90%] mt-4">
        <div id="form-homepage" />
      </div>
    </div>
  </div>
</main>

<style>
  .icon-emoji-hero {
    background-image: url(https://cdn.prod.website-files.com/65ec22575ccfa2b58813b318/6601a5eaa6ad76973d11c33c_Piment%20Rouge.png);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    display: inline-block;
  }

  .typed-words::after {
    content: "|";
    display: inline;
    animation: blink-animation 1s infinite;
  }

  @keyframes blink-animation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .bricolage {
    font-family: "Bricolage Grotesque Variable", sans-serif;
  }

  main {
    font-family: "Inter Variable", sans-serif;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
  }
</style>
