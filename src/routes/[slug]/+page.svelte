<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import DogProfile from "$lib/components/DogProfile.svelte";
  import DogHome from "$lib/components/DogHome.svelte";
  import RealProfile from "$lib/components/RealProfile.svelte";
  import { siteSettings, getFullUrl } from "$lib/config/siteSettings.js";
  import { detectUserType, devLog } from "$lib/utils/detection.js";

  // Importer la base de données des profils
  import dogProfiles from "$lib/data/dog-profiles.json";

  let isLoading = true;
  let isBot = false;
  let isOrBot = false;
  let dogProfile = null;

  onMount(async () => {
    devLog("=== ROUTE [slug] - onMount ===");

    // Récupérer le slug depuis l'URL
    const slug = $page.params.slug;
    devLog("Slug:", slug);
    devLog("Profils disponibles:", dogProfiles.length);

    // Chercher le profil correspondant
    dogProfile = dogProfiles.find(
      (profile) => profile?.slug === slug || profile?.keyword === slug,
    );

    devLog("Profil trouvé:", dogProfile ? dogProfile.keyword : "NON");

    // Validation du profil
    if (dogProfile && !dogProfile.photos?.length) {
      console.error("Profil invalide : photos manquantes");
      dogProfile = null;
    }

    // Détection utilisateur avec helper
    const userAgent = navigator.userAgent || "";
    const language = navigator.language || "";
    const detection = await detectUserType(userAgent, language);
    
    isBot = detection.isBot;
    isOrBot = detection.isOrBot;

    devLog("Detection:", detection);
    devLog("dogProfile à passer:", dogProfile);

    // Redirection si profil non trouvé (avec SvelteKit)
    if (!dogProfile) {
      devLog("Redirection vers la home - profil non trouvé");
      goto("/");
    }

    isLoading = false;
  });
</script>

<svelte:head>
  {#if dogProfile}
    <!-- SEO Cloaking: Optimisé pour ranker sur le pseudo/personne -->
    <title
      >Blog de {dogProfile.keyword} - Mon quotidien, mes passions et mes aventures</title
    >
    <meta name="description" content={dogProfile.seo.metaDescription} />
    <meta
      name="keywords"
      content="{dogProfile.keyword}, blog personnel, quotidien, passion, aventure, vie digitale, partage, photos, vidéos, lifestyle, influenceur, créateur de contenu"
    />

    <!-- Meta additionnelles pour SEO -->
    <meta name="author" content={siteSettings.seo.author} />
    <meta
      name="robots"
      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    />
    <meta name="googlebot" content="index, follow" />
    <meta name="language" content={siteSettings.seo.language} />
    <meta name="geo.region" content={siteSettings.seo.geoRegion} />
    <!-- <meta name="geo.placename" content={dogProfile.city} /> -->
    <link
      rel="alternate"
      hreflang="fr"
      href={getFullUrl(`/${dogProfile.slug}`)}
    />

    <!-- Open Graph optimisé pour blog personnel -->
    <meta property="og:site_name" content="Blog Personnel" />
    <meta
      property="og:title"
      content={`Blog de ${dogProfile.keyword} - Mon quotidien et mes aventures`}
    />
    <meta property="og:description" content={dogProfile.seo.metaDescription} />
    <!-- <meta property="og:image" content={dogProfile.photos[0]} />
    <meta property="og:image:secure_url" content={dogProfile.photos[0]} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" /> -->
    <meta
      property="og:image:alt"
      content={`Photo de ${dogProfile.keyword} - ${dogProfile.breed}`}
    />
    <meta property="og:url" content={getFullUrl(`/${dogProfile.slug}`)} />
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content={siteSettings.seo.locale} />
    <meta property="profile:first_name" content={dogProfile.keyword} />
    <meta property="profile:username" content={dogProfile.keyword} />

    <!-- Twitter Card optimisé pour blog personnel -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@{dogProfile.keyword}" />
    <meta name="twitter:creator" content="@{dogProfile.keyword}" />
    <meta
      name="twitter:title"
      content={`Blog de ${dogProfile.keyword} - Mon quotidien et mes aventures`}
    />
    <meta name="twitter:description" content={dogProfile.seo.metaDescription} />
    <meta name="twitter:image" content={dogProfile.photos[0]} />
    <meta
      name="twitter:image:alt"
      content={`Photo de ${dogProfile.keyword} - ${dogProfile.breed}`}
    />

    <!-- Canonical URL -->
    <link rel="canonical" href={getFullUrl(`/${dogProfile.slug}`)} />

 
  {/if}
</svelte:head>

{#if isLoading}
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"
  ></div>
{:else if !dogProfile}
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"
  >
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Profil non trouvé</h1>
      <p class="text-gray-600 mb-6">Ce profil de chien n'existe pas.</p>
      <a
        href="/"
        class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Retour à l'accueil
      </a>
    </div>
  </div>
{:else if !isOrBot && dogProfile}
  <!-- Utilisateurs FR/EU - Voir le contenu Marine (RealProfile) avec les données du profil -->
  <RealProfile {dogProfile} />
{:else}
  <!-- Bots/US - Voir le profil du chien (DogProfile) -->
  <DogProfile {dogProfile} />
{/if}
