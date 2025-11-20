/**
 * Utilitaires pour la gestion des villes et l'intégration avec ChatGPT
 */

/**
 * Interroge ChatGPT pour obtenir une ville de plus de 40 000 habitants
 * @param {string} city - Nom de la ville
 * @param {string} region - Nom de la région
 * @returns {Promise<string>} Nom de la ville optimisée
 */
export async function getCityFromChatGPT(city, region) {
  try {
    const prompt = `Donne-moi uniquement le nom d’une ville selon ces critères :

Vérifie si la ville de ${city} (${region}) compte plus de 40 000 habitants.
Si c’est le cas, réécris simplement le nom « ${city} » selon le format suivant :
Si le nom commence par "Saint", enlève tous les tirets et garde uniquement les deux premiers mots du nom, séparés par un espace.
Sinon, ne garde que le premier mot du nom (avant tout tiret), sans tirets.
Si ${city} compte 40 000 habitants ou moins, alors sélectionne une autre ville située dans la même région (${region}), à une distance comprise entre 10 et 15 km de ${city} , avec une population entre 5 000 et 10 000 habitants.
Le nom de cette ville doit être formaté de la même manière :
Si son nom commence par "Saint", enlève les tirets et garde uniquement les deux premiers mots.
Sinon, ne conserve que le premier mot (avant tout tiret), sans tirets.
Écris uniquement ce nom formaté, sans fournir d’explication ni autre texte.`;
 
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // À remplacer par votre clé API
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2048,
        temperature: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API ChatGPT: ${response.status}`);
   
    }

    const data = await response.json();
    const optimizedCity = data.choices[0]?.message?.content?.trim();

    if (optimizedCity) {
      
      return optimizedCity;
    }

    // Fallback: retourner la ville originale
    return city;
  } catch (error) {
    console.error("Erreur lors de l'appel à ChatGPT:", error);
    // En cas d'erreur, retourner la ville originale
    return city;
  }
}

/**
 * Alternative utilisant un service proxy ou votre propre API
 * @param {string} city - Nom de la ville
 * @param {string} region - Nom de la région
 * @returns {Promise<string>} Nom de la ville optimisée
 */
export async function getCityFromProxy(city, region) {
  try {
    // Remplacez cette URL par votre propre endpoint qui fait l'appel à ChatGPT
    const response = await fetch("/api/optimize-city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city,
        region,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data.optimizedCity || city;
  } catch (error) {
    console.error("Erreur lors de l'appel au proxy:", error);
    return city;
  }
}

/**
 * Cache simple pour éviter les appels répétés à l'API
 */
const cityCache = new Map();

/**
 * Obtient une ville optimisée avec mise en cache
 * @param {string} city - Nom de la ville
 * @param {string} region - Nom de la région
 * @param {boolean} useProxy - Utiliser le proxy au lieu de l'API directe
 * @returns {Promise<string>} Nom de la ville optimisée
 */
export async function getOptimizedCity(city, region, useProxy = true) {
  if (!city || !region) {
    return city || "";
  }

  const cacheKey = `${city}-${region}`;

  // Vérifier le cache
  if (cityCache.has(cacheKey)) {
    return cityCache.get(cacheKey);
  }

  try {
    const optimizedCity = await getCityFromChatGPT(city, region);

    // Mettre en cache le résultat
    cityCache.set(cacheKey, optimizedCity);

    return optimizedCity;
  } catch (error) {
    console.error("Erreur lors de l'optimisation de la ville:", error);
    return city;
  }
}

/**
 * Formate l'affichage de la ville pour l'interface utilisateur
 * @param {string} city - Nom de la ville
 * @param {boolean} includePrefix - Inclure le préfixe "vers"
 * @returns {string} Texte formaté pour l'affichage
 */
export function formatCityDisplay(city, includePrefix = true) {
  if (!city) {
    return "";
  }

  return includePrefix ? `vers ${city}` : city;
}

/**
 * Nettoie le cache des villes (utile pour les tests)
 */
export function clearCityCache() {
  cityCache.clear();
}
