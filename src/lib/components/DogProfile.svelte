<script>
  export let dogProfile;

  let mobileMenuOpen = false;
  let profileDropdownOpen = false;
  let scrolled = false;

  import { onMount } from "svelte";
  import { siteSettings } from "$lib/config/siteSettings.js";

  onMount(() => {
    // Gestion du scroll pour l'effet sur le header
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };

    window.addEventListener("scroll", handleScroll);

    // Fermer les dropdowns quand on clique ailleurs
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        profileDropdownOpen = false;
      }
      if (!event.target.closest(".mobile-menu-container")) {
        mobileMenuOpen = false;
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<!-- Affichage du profil chien pour bots/US -->
<div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
  <!-- Enhanced Header Navigation -->
  <header
    class="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 {scrolled
      ? 'py-2 shadow-xl'
      : 'py-3'}"
  >
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
      <!-- Top Bar -->
      <div class="flex items-center justify-between py-3 sm:py-4">
        <!-- Logo & Brand -->
        <div class="flex items-center space-x-3">
          <button
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation mobile-menu-container"
            on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          >
            <svg
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {#if mobileMenuOpen}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              {/if}
            </svg>
          </button>

          <a href="/" class="flex items-center group">
            <div class="hidden sm:block">
              <span class="font-bold text-gray-900 text-lg"
                >{siteSettings.name}</span
              >
              <div class="text-xs text-gray-500">{dogProfile.keyword}</div>
            </div>
            <span class="sm:hidden font-bold text-gray-900 text-base"
              >{siteSettings.name}</span
            >
          </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          <a
            href="/"
            class="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >Accueil</a
          >
          <a
            href="/dogs"
            class="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >Tous les chiens</a
          >
          <a
            href="/about"
            class="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >À propos</a
          >
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-1 sm:space-x-2">
          <!-- Search -->
          <button
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation group"
          >
            <svg
              class="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <!-- Notifications -->
          <button
            class="relative p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation group"
          >
            <svg
              class="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"
            ></span>
          </button>

          <!-- Profile Dropdown -->
          <div class="relative profile-dropdown">
            <button
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation group"
              on:click={() => (profileDropdownOpen = !profileDropdownOpen)}
            >
              <div
                class="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-xs font-bold">U</span>
              </div>
              <svg
                class="hidden sm:block w-4 h-4 text-gray-700 group-hover:text-purple-600 transition-colors {profileDropdownOpen
                  ? 'rotate-180'
                  : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {#if profileDropdownOpen}
              <div
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
              >
                <div class="p-4 border-b border-gray-200">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white font-bold">U</span>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">Utilisateur</div>
                      <div class="text-sm text-gray-500">
                        user@{siteSettings.url}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="py-2">
                  <a
                    href="/profile"
                    class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
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
                    Mon Profil
                  </a>
                  <a
                    href="/favorites"
                    class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Mes Favoris
                  </a>
                  <a
                    href="/settings"
                    class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Paramètres
                  </a>
                </div>
                <div class="py-2 border-t border-gray-200">
                  <button
                    class="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <svg
                      class="w-4 h-4 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      {#if mobileMenuOpen}
        <div
          class="lg:hidden py-4 border-t border-gray-100 bg-gray-50 -mx-3 px-3 mobile-menu-container"
        >
          <nav class="space-y-1">
            <a
              href="/"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="text-gray-700 font-medium">Accueil</span>
            </a>
            <a
              href="/dogs"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-700"
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
              <span class="text-gray-700 font-medium">Tous les chiens</span>
            </a>
            <a
              href="/about"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-gray-700 font-medium">À propos</span>
            </a>
          </nav>
        </div>
      {/if}
    </div>
  </header>

  <!-- Profil Content -->
  <main class="max-w-6xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Photos -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden group">
          <!-- Main Photo with Overlay - Hauteur optimisée -->
          <div class="relative w-full h-[400px] lg:h-[500px]">
            <img
              src={dogProfile.photos[0]}
              alt={`Profil de ${dogProfile.keyword}, ${dogProfile.breed} de ${dogProfile.age} ans`}
              loading="eager"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="absolute bottom-6 left-6 right-6">
                <div class="text-white">
                  <h3 class="text-3xl font-bold mb-2 drop-shadow-lg">
                    {dogProfile.keyword}
                  </h3>
                  <p class="text-white/95 text-lg drop-shadow">
                    {dogProfile.breed} • {dogProfile.age} ans
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
                >{dogProfile.photos.length - 1} photos</span
              >
            </div>
            <div class="grid grid-cols-3 gap-4">
              {#each dogProfile.photos.slice(1) as photo, index}
                <div class="relative group/photo aspect-square">
                  <img
                    src={photo}
                    alt={`${dogProfile.keyword} - Photo ${index + 2}`}
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

        <!-- Bio & Information -->
        <article
          class="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mt-6"
          itemscope
          itemtype="https://schema.org/Person"
        >
          <!-- Header avec nom - Simplifié -->
          <div class="mb-6">
            <h1
              class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4"
              itemprop="name"
            >
              {dogProfile.keyword}
            </h1>
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
                <span class="font-medium">{dogProfile.breed}</span>
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
                  >{dogProfile.age} ans</span
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
                  >{dogProfile.gender}</span
                >
              </span>
            </div>
          </div>

          <!-- Bio Section -->
          <section class="mb-8">
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
              <h2 class="text-lg font-semibold text-gray-900">Biographie</h2>
            </div>
            <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4">
              <p class="text-gray-700 leading-relaxed" itemprop="description">
                {dogProfile.bio}
              </p>
            </div>
          </section>

          <!-- Intérêts & Personnalité Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Intérêts -->
            <section>
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
                <h2 class="text-lg font-semibold text-gray-900">Intérêts</h2>
              </div>
              <div class="flex flex-wrap gap-2" itemprop="knowsAbout">
                {#each dogProfile.interests as interest}
                  <span
                    class="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-sm font-medium hover:from-pink-200 hover:to-purple-200 transition-colors cursor-pointer"
                  >
                    {interest}
                  </span>
                {/each}
              </div>
            </section>

            <!-- Personnalité -->
            <section>
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 class="text-lg font-semibold text-gray-900">
                  Personnalité
                </h2>
              </div>
              <div class="flex flex-wrap gap-2">
                {#each dogProfile.personality as trait}
                  <span
                    class="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 transition-colors cursor-pointer"
                  >
                    {trait}
                  </span>
                {/each}
              </div>
            </section>
          </div>
        </article>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Carte de profil principale -->
        <div
          class="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-100"
        >
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {dogProfile.keyword}
            </h2>
            <div
              class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full"
            >
              <span class="text-sm font-medium text-purple-700"
                >{dogProfile.breed}</span
              >
            </div>
          </div>

          <!-- Informations principales -->
          <div class="space-y-4">
            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-blue-600"
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
                </div>
                <span class="text-sm text-gray-600">Âge</span>
              </div>
              <span class="font-semibold text-gray-900"
                >{dogProfile.age} ans</span
              >
            </div>

            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-pink-600"
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
                </div>
                <span class="text-sm text-gray-600">Genre</span>
              </div>
              <span class="font-semibold text-gray-900"
                >{dogProfile.gender}</span
              >
            </div>

            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </div>
                <span class="text-sm text-gray-600">Taille</span>
              </div>
              <span class="font-semibold text-gray-900">{dogProfile.size}</span>
            </div>

            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <span class="text-sm text-gray-600">Poids</span>
              </div>
              <span class="font-semibold text-gray-900"
                >{dogProfile.health.weight}</span
              >
            </div>
          </div>
        </div>

        <!-- Carte Préférences -->
        <div
          class="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-blue-100"
        >
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Préférences</h3>
          </div>

          <div class="space-y-3">
            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Énergie</span>
              </div>
              <span
                class="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {dogProfile.preferences.energy}
              </span>
            </div>

            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Avec enfants</span>
              </div>
              <span
                class="px-3 py-1 {dogProfile.preferences.goodWithKids
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                  : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'} rounded-full text-sm font-medium"
              >
                {dogProfile.preferences.goodWithKids ? "✓ Oui" : "✗ Non"}
              </span>
            </div>

            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Avec chiens</span>
              </div>
              <span
                class="px-3 py-1 {dogProfile.preferences.goodWithDogs
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                  : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'} rounded-full text-sm font-medium"
              >
                {dogProfile.preferences.goodWithDogs ? "✓ Oui" : "✗ Non"}
              </span>
            </div>

            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Avec chats</span>
              </div>
              <span
                class="px-3 py-1 {dogProfile.preferences.goodWithCats
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                  : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'} rounded-full text-sm font-medium"
              >
                {dogProfile.preferences.goodWithCats ? "✓ Oui" : "✗ Non"}
              </span>
            </div>

            <div
              class="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Toilettage</span>
              </div>
              <span
                class="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {dogProfile.preferences.grooming}
              </span>
            </div>
          </div>
        </div>

        <!-- Carte Contact & Actions -->
        <div
          class="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white"
        >
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Contactez la propriétaire</h3>
            <p class="text-white/80 text-sm">{dogProfile.owner.name}</p>
          </div>

          <div class="space-y-3">
            <button
              class="w-full bg-white text-purple-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Envoyer un message
            </button>

            <div class="flex space-x-3">
              <button
                class="flex-1 bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium hover:bg-white/30 transition-all"
              >
                <svg
                  class="w-5 h-5 mx-auto mb-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-xs">Favori</span>
              </button>

              <button
                class="flex-1 bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium hover:bg-white/30 transition-all"
              >
                <svg
                  class="w-5 h-5 mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span class="text-xs">Partager</span>
              </button>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-white/20 text-center">
            <p class="text-white/60 text-xs">
              Membre depuis {dogProfile.owner.joined}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Statistiques</h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-purple-600">
                {dogProfile.stats.views}
              </div>
              <div class="text-sm text-gray-600">Vues</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-pink-600">
                {dogProfile.stats.likes}
              </div>
              <div class="text-sm text-gray-600">Likes</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-600">
                {dogProfile.stats.messages}
              </div>
              <div class="text-sm text-gray-600">Messages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white py-8 mt-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="font-semibold mb-4">{siteSettings.name}</h4>
          <p class="text-gray-400">
            La meilleure plateforme de rencontres pour chiens.
          </p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Liens utiles</h4>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="/about" class="hover:text-white transition-colors"
                >À propos</a
              >
            </li>
            <li>
              <a href="/privacy" class="hover:text-white transition-colors"
                >Confidentialité</a
              >
            </li>
            <li>
              <a href="/terms" class="hover:text-white transition-colors"
                >Conditions</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Contact</h4>
          <p class="text-gray-400">contact@{siteSettings.url.slice(8)}</p>
          <p class="text-gray-400">Profil: {dogProfile.keyword}</p>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 {siteSettings.name}. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Styles personnalisés si nécessaires */
</style>
