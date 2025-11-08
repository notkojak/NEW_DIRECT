<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { siteSettings } from "$lib/config/siteSettings.js";

  let countdown = 5;

  // Redirect to home page after countdown
  onMount(() => {
    if ($page.status === 404) {
      const interval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
          clearInterval(interval);
          goto("/");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  });
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
  <div class="text-center max-w-md">
    <div class="mb-8">
      <div class="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        404
      </div>
    </div>
    
    <h1 class="text-3xl font-bold text-gray-900 mb-4">
      Page introuvable
    </h1>
    
    <p class="text-gray-600 mb-8">
      Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
    </p>
    
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <p class="text-sm text-gray-500 mb-2">
        Redirection automatique dans
      </p>
      <div class="text-4xl font-bold text-purple-600">
        {countdown}s
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/"
        class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
      >
        Retour à l'accueil
      </a>
      
      <a
        href="/dogs"
        class="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all border-2 border-purple-200"
      >
        Voir les profils
      </a>
    </div>
    
    <p class="text-sm text-gray-500 mt-8">
      {siteSettings.name} - {siteSettings.tagline}
    </p>
  </div>
</div>
