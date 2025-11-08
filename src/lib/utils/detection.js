import { botDetector } from '$lib/botDetector.js';

/**
 * Détecte le pays de l'utilisateur via l'API Hoskes
 * @returns {Promise<Object>} Informations de géolocalisation
 */
async function detectCountry() {
  try {
    const response = await fetch('https://geoapi-hoskes.onrender.com/json.gp', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    devLog("Hoskes API response:", data);
    
    return {
      countryCode: data.hoskes_locplugin_countryCode || null,
      countryName: data.hoskes_locplugin_countryName || null,
      city: data.hoskes_locplugin_city || null,
      region: data.hoskes_locplugin_region || null,
      inEU: data.hoskes_locplugin_inEUunion === 1,
      ip: data.hoskes_locplugin_request || null
    };
  } catch (error) {
    console.error("Erreur détection pays:", error);
    return {
      countryCode: null,
      countryName: null,
      city: null,
      region: null,
      inEU: false,
      ip: null
    };
  }
}

/**
 * Détecte le type d'utilisateur (bot, non-FR, ou FR)
 * @param {string} userAgent - User agent du navigateur
 * @param {string} language - Langue du navigateur
 * @param {string} clientIP - IP du client (optionnel, côté serveur)
 * @returns {Promise<Object>} Informations sur le type d'utilisateur
 */
export async function detectUserType(userAgent = "", language = "", clientIP = "") {
  const isBot = botDetector.isBot(userAgent, clientIP);
  
  // Détection du pays via API Hoskes
  const geoData = await detectCountry();
  const isNonFR = geoData.countryCode !== null && geoData.countryCode !== 'FR';
  
  // isOrBot = true si bot OU non-FR
  const isOrBot = isBot || isNonFR;
  
  return {
    isBot,
    isNonFR,
    isFR: geoData.countryCode === 'FR',
    isOrBot,
    geoData,
    shouldShowDogContent: isOrBot, // Afficher contenu chien
    shouldShowRealContent: !isOrBot // Afficher contenu dating
  };
}

/**
 * Détecte si l'environnement est en développement
 * @returns {boolean}
 */
export function isDevelopment() {
  return import.meta.env.DEV;
}

/**
 * Log conditionnel (seulement en dev)
 * @param {...any} args - Arguments à logger
 */
export function devLog(...args) {
  if (isDevelopment()) {
    console.log(...args);
  }
}

/**
 * Sanitize une chaîne de recherche
 * @param {string} query - Chaîne à nettoyer
 * @returns {string} Chaîne nettoyée
 */
export function sanitizeSearchQuery(query) {
  if (!query) return "";
  return query
    .toLowerCase()
    .trim()
    .replace(/[<>]/g, '') // Supprimer < et >
    .replace(/[^\w\s-]/g, ''); // Garder seulement lettres, chiffres, espaces et tirets
}
