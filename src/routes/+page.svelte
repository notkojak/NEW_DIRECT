<script>
  import { onMount } from "svelte";
  import RealHome from "$lib/components/RealHome.svelte";
  import DogHome from "$lib/components/DogHome.svelte";
  import { siteSettings } from "$lib/config/siteSettings.js";
  import { detectUserType, devLog } from "$lib/utils/detection.js";

  let isLoading = true;
  let isBot = false;
  let isOrBot = false;

  onMount(async () => {
    devLog("=== ROUTE +page (Home) - onMount ===");

    // Détection utilisateur avec helper
    const userAgent = navigator.userAgent || "";
    const language = navigator.language || "";
    const detection = await detectUserType(userAgent, language);

    isBot = detection.isBot;
    isOrBot = detection.isOrBot;

    devLog("Detection:", detection);

    isLoading = false;
  });
</script>

<svelte:head>
  <!-- SEO Cloaking: Optimisé pour blog personnel (vu par Google) -->
  <title>{siteSettings.seo.title}</title>

  <!-- Meta description randomisée pour blog -->
  <meta
    name="description"
    content={[
      `Découvrez mon blog personnel ${siteSettings.name} ! Je partage mon quotidien, mes photos et mes aventures. Rejoignez-moi dans cette belle expérience digitale.`,
      `Bienvenue sur ${siteSettings.name} ! Mon blog pour partager ma vie, mes passions et mes coups de cœur. Suivez mon quotidien et mes aventures uniques.`,
      `${siteSettings.name}, c'est mon blog personnel ! Photos, vidéos et partage de mon quotidien. Une aventure digitale authentique à découvrir.`,
      `Explorez mon univers sur ${siteSettings.name} ! Je partage mon quotidien, mes créations et mes moments précieux. Blog lifestyle et passion.`,
      `Mon blog ${siteSettings.name} : un espace pour partager ma vie, mes photos et mes aventures. Rejoignez ma communauté digitale !`,
    ][Math.floor(Math.random() * 5)]}
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
  <meta
    name="keywords"
    content="{siteSettings.seo
      .keywords}, blog personnel, quotidien, partage de vie, photos, vidéos, lifestyle, influenceur, créateur de contenu, aventure digitale, communauté, passion"
  />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteSettings.seo.siteName} />
  <meta property="og:title" content={siteSettings.seo.title} />
  <meta
    property="og:description"
    content={siteSettings.seo.defaultDescription}
  />
  <meta property="og:image" content={siteSettings.images.ogImage} />
  <meta property="og:url" content={siteSettings.url} />
  <meta property="og:locale" content={siteSettings.seo.locale} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@{siteSettings.social.twitter}" />
  <meta name="twitter:title" content={siteSettings.seo.title} />
  <meta
    name="twitter:description"
    content={siteSettings.seo.defaultDescription}
  />
  <meta name="twitter:image" content={siteSettings.images.ogImage} />

  <!-- Canonical URL -->
  <link rel="canonical" href={siteSettings.url} />

  <!-- Structured Data - Même pour tous (blog personnel) -->
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteSettings.name,
    "description": siteSettings.seo.defaultDescription,
    "url": siteSettings.url,
    "publisher": {
      "@type": "Organization",
      "name": siteSettings.name,
      "url": siteSettings.url
    }
  })}
  </script>
</svelte:head>

{#if isLoading}
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"
  ></div>
{:else if !isOrBot}
  <!-- Utilisateurs FR/EU - Voir RealHome (contenu MySecret) -->
  <RealHome />
{:else}
  <!-- Bots/US - Voir DogHome (page d'accueil) -->
  <DogHome />
{/if}
