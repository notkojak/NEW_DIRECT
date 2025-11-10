<script>
  import { onMount } from "svelte";
  import dogProfiles from "$lib/data/dog-profiles.json";
  import { sanitizeSearchQuery } from "$lib/utils/detection.js";
  import { siteSettings } from "$lib/config/siteSettings.js";
  let featuredDogs = [];
  let isLoading = true;
  let searchQuery = "";
  let selectedBreed = "all";
  let selectedAge = "all";

  // Extraire les races uniques des profils
  const breeds = [...new Set(dogProfiles.map((dog) => dog.breed))];
  const ages = ["0-2 ans", "3-5 ans", "6-8 ans", "9+ ans"];

  onMount(async () => {
    // Utiliser directement les profils du JSON
    featuredDogs = dogProfiles;
    isLoading = false;
  });

  function filteredDogs() {
    const sanitizedQuery = sanitizeSearchQuery(searchQuery);

    return featuredDogs.filter((dog) => {
      const matchesSearch =
        dog.keyword.toLowerCase().includes(sanitizedQuery) ||
        dog.breed.toLowerCase().includes(sanitizedQuery);
      const matchesBreed =
        selectedBreed === "all" || dog.breed === selectedBreed;
      const matchesAge =
        selectedAge === "all" ||
        (selectedAge === "0-2 ans" && dog.age <= 2) ||
        (selectedAge === "3-5 ans" && dog.age >= 3 && dog.age <= 5) ||
        (selectedAge === "6-8 ans" && dog.age >= 6 && dog.age <= 8) ||
        (selectedAge === "9+ ans" && dog.age >= 9);
      return matchesSearch && matchesBreed && matchesAge;
    });
  }
</script>

{#if isLoading}
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4"
  >
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Chargement des profils...</p>
    </div>
  </div>
{:else}
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <!-- Header Navigation -->
    <header
      class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg">🐕</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                {siteSettings.name}
              </h1>
              <p class="text-sm text-gray-600">
                {siteSettings.description}
              </p>
            </div>
          </div>

          <nav class="hidden md:flex items-center space-x-6">
            <a
              href="#accueil"
              class="text-gray-700 hover:text-blue-600 transition-colors"
              >Accueil</a
            >
            <a
              href="#profils"
              class="text-gray-700 hover:text-blue-600 transition-colors"
              >Profils</a
            >
            <a
              href="#comment-ca-marche"
              class="text-gray-700 hover:text-blue-600 transition-colors"
              >Comment ça marche</a
            >
            <a
              href="#temoignages"
              class="text-gray-700 hover:text-blue-600 transition-colors"
              >Témoignages</a
            >
            <button
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Inscription gratuite
            </button>
          </nav>

          <button class="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg
              class="w-6 h-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section id="accueil" class="relative py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Trouvez l'âme sœur<br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                >de votre chien</span
              >
            </h2>
            <p class="text-xl text-gray-700 mb-8 leading-relaxed">
              Rejoignez la plus grande communauté de maîtres de chiens en
              France. Des milliers de profils vérifiés pour des amitiés, des
              jeux et des rencontres inoubliables.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Commencer gratuitement
              </button>
              <button
                class="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-blue-500 transition-colors"
              >
                Découvrir les profils
              </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-12">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 mb-1">50,000+</div>
                <div class="text-gray-600">Chiens inscrits</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-1">
                  25,000+
                </div>
                <div class="text-gray-600">Matchs réussis</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600 mb-1">4.8/5</div>
                <div class="text-gray-600">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filters -->
    <section class="py-12 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h3 class="text-3xl font-bold text-center text-gray-900 mb-8">
          Recherchez le compagnon idéal
        </h3>

        <div class="bg-gray-50 rounded-2xl p-6">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Rechercher par nom, race..."
              bind:value={searchQuery}
              class="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />

            <select
              bind:value={selectedBreed}
              class="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">Toutes les races</option>
              {#each breeds as breed}
                <option value={breed}>{breed}</option>
              {/each}
            </select>

            <select
              bind:value={selectedAge}
              class="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">Tous les âges</option>
              {#each ages as age}
                <option value={age}>{age}</option>
              {/each}
            </select>

            <button
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Rechercher
            </button>
          </div>

          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>{filteredDogs().length} profils trouvés</span>
            <div class="flex space-x-4">
              <button class="hover:text-blue-600 transition-colors"
                >Tri par popularité</button
              >
              <button class="hover:text-blue-600 transition-colors"
                >Tri par récence</button
              >
              <button class="hover:text-blue-600 transition-colors"
                >Tri par proximité</button
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Profiles -->
    <section id="profils" class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h3 class="text-4xl font-bold text-gray-900 mb-4">
            Profils populaires
          </h3>
          <p class="text-xl text-gray-600">
            Découvrez les chiens les plus appréciés de notre communauté
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {#each filteredDogs().slice(0, 5) as dog}
            <div class="space-y-6">
              <!-- Photos - Même Design que [slug] -->
              <div class="bg-white rounded-2xl shadow-xl overflow-hidden group">
                <!-- Main Photo with Overlay -->
                <div
                  class="relative w-full h-[300px] sm:h-[350px] lg:h-[400px]"
                >
                  <img
                    src={dog.photos[0]}
                    alt={`Profil de ${dog.keyword}, ${dog.breed} de ${dog.age} ans`}
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div class="absolute bottom-6 left-6 right-6">
                      <div class="text-white">
                        <h3 class="text-3xl font-bold mb-2 drop-shadow-lg">
                          {dog.keyword}
                        </h3>
                        <p class="text-white/95 text-lg drop-shadow">
                          {dog.breed} • {dog.age} ans
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
                      >{dog.photos.length - 1} photos</span
                    >
                  </div>
                  <div class="grid grid-cols-3 gap-4">
                    {#each dog.photos.slice(1, 4) as photo, index}
                      <div class="relative group/photo aspect-square">
                        <img
                          src={photo}
                          alt={`${dog.keyword} - Photo ${index + 2}`}
                          loading="lazy"
                          decoding="async"
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
                <!-- Header avec nom -->
                <div class="mb-6">
                  <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {dog.keyword}
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
                      <span class="font-medium">{dog.breed}</span>
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
                        >{dog.age} ans</span
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
                      <span class="font-medium text-pink-700">{dog.gender}</span
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
                    <p class="text-gray-700 leading-relaxed">{dog.bio}</p>
                  </div>
                </div>

                <!-- Intérêts & Personnalité Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                      {#each dog.interests.slice(0, 3) as interest}
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
                      {#each dog.personality.slice(0, 3) as trait}
                        <span
                          class="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium hover:from-purple-200 hover:to-pink-200 transition-colors cursor-pointer"
                        >
                          {trait}
                        </span>
                      {/each}
                    </div>
                  </div>
                </div>

                <!-- Bouton Action avec lien correct -->
                <div class="mt-8">
                  <a
                    href="/{dog.slug}"
                    class="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Voir le profil complet
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="text-center mt-12">
          <a
            href="/dogs"
            class="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border border-purple-200"
          >
            <span>Voir tous les chiens</span>
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="comment-ca-marche" class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h3 class="text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h3>
          <p class="text-xl text-gray-600">
            Trouvez le compagnon idéal en 3 étapes simples
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span class="text-white text-3xl font-bold">1</span>
            </div>
            <h4 class="text-2xl font-bold text-gray-900 mb-4">
              Inscrivez-vous
            </h4>
            <p class="text-gray-700 leading-relaxed">
              Créez un profil gratuit pour votre chien en quelques minutes.
              Ajoutez des photos, décrivez sa personnalité et spécifiez vos
              préférences.
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span class="text-white text-3xl font-bold">2</span>
            </div>
            <h4 class="text-2xl font-bold text-gray-900 mb-4">
              Découvrez des profils
            </h4>
            <p class="text-gray-700 leading-relaxed">
              Parcourez des milliers de profils vérifiés. Utilisez nos filtres
              avancés pour trouver le compagnon parfait selon vos critères.
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span class="text-white text-3xl font-bold">3</span>
            </div>
            <h4 class="text-2xl font-bold text-gray-900 mb-4">
              Faites des rencontres
            </h4>
            <p class="text-gray-700 leading-relaxed">
              Contactez les maîtres qui vous intéressent et organisez des
              rencontres. Votre chien pourra enfin se faire de nouveaux amis !
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="temoignages" class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h3 class="text-4xl font-bold text-gray-900 mb-4">
            Ils ont trouvé l'amour
          </h3>
          <p class="text-xl text-gray-600">
            Découvrez les témoignages de nos membres
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"
              >
                <span class="text-blue-600 font-bold text-lg">SC</span>
              </div>
              <div>
                <h5 class="font-semibold text-gray-900">Sophie C.</h5>
                <div class="flex text-yellow-400">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed mb-4">
              "Mon Labrador a trouvé son meilleur ami grâce à {siteSettings.name}
              ! Ils se voient chaque semaine au parc. C'est génial de voir comme
              ils s'amusent ensemble."
            </p>
            <p class="text-sm text-gray-500">
              <strong>Max</strong> • Labrador • 3 ans
            </p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4"
              >
                <span class="text-purple-600 font-bold text-lg">ML</span>
              </div>
              <div>
                <h5 class="font-semibold text-gray-900">Marc L.</h5>
                <div class="flex text-yellow-400">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed mb-4">
              "Application géniale ! J'ai rencontré d'autres maîtres super
              sympas et mon Berger Allemand adore maintenant ses nouveaux
              copains de jeu."
            </p>
            <p class="text-sm text-gray-500">
              <strong>Niko</strong> • Berger Allemand • 5 ans
            </p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4"
              >
                <span class="text-green-600 font-bold text-lg">ED</span>
              </div>
              <div>
                <h5 class="font-semibold text-gray-900">Emma D.</h5>
                <div class="flex text-yellow-400">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed mb-4">
              "Mon Caniche était un peu timide, mais grâce aux rencontres
              organisées via l'appli, il est devenu beaucoup plus sociable. Je
              recommande vivement !"
            </p>
            <p class="text-sm text-gray-500">
              <strong>Luna</strong> • Caniche • 2 ans
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center text-white">
        <h3 class="text-4xl font-bold mb-6">
          Prêt à faire rencontrer votre chien ?
        </h3>
        <p class="text-xl mb-8 text-blue-100">
          Rejoignez des milliers de maîtres et donnez à votre compagnon une vie
          sociale riche et épanouie.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            S'inscrire gratuitement
          </button>
          <button
            class="bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all"
          >
            En savoir plus
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div
                class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <span class="text-white font-bold text-sm">🐕</span>
              </div>
              <span class="font-bold text-white text-lg">
                {siteSettings.name}
              </span>
            </div>
            <p class="text-sm">
              Le premier site de rencontres pour chiens en France. Des milliers
              de profils vérifiés pour des amitiés canines.
            </p>
          </div>

          <div>
            <h5 class="font-semibold text-white mb-4">Découvrir</h5>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Comment ça marche</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Profils populaires</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Success stories</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 class="font-semibold text-white mb-4">Communauté</h5>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Événements</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Groupes locaux</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Conseils</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors">Forum</a>
              </li>
            </ul>
          </div>

          <div>
            <h5 class="font-semibold text-white mb-4">Suivez-nous</h5>
            <div class="flex space-x-4">
              <a
                href="#"
                class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; 2024 {siteSettings.name}. Tous droits réservés. |
            <a href="#" class="hover:text-white transition-colors"
              >Mentions légales</a
            >
            •
            <a href="#" class="hover:text-white transition-colors"
              >Confidentialité</a
            >
            •
            <a href="#" class="hover:text-white transition-colors">CGU</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
{/if}
