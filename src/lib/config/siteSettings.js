/**
 * Configuration centralisée du site
 * Tous les paramètres globaux du site sont définis ici
 */

export const siteSettings = {
  // Informations principales du site
  name: "MarineBlog",
  tagline: "Site de Blogs en France",
  description: "Le N°1 des blogs pour chiens en France",
  
  // URLs
  url: "https://marineblog.net",
  domain: "marineblog.net",
  
  // SEO
  seo: {
    title: "MarineBlog - Site de blogs ",
    defaultDescription: "MarineBlog : N°1 des blogs chiens en France. +50 000 articles de blogs, 25 000 matchs réussis. Trouvez l'âme sœur de votre chien gratuitement.",
    keywords: "rencontres chiens, site rencontre chien, adoption chiens France, amis pour chiens, socialisation canine, club de chiens, match chien",
    author: "MarineBlog",
    language: "fr",
    locale: "fr_FR",
    geoRegion: "FR",
    geoPlacename: "France",
    siteName: "MarineBlog"
  },
  
  // Images
  images: {
    logo: "/logo-marineblog.png",
    favicon: "/favicon.ico",
    ogImage: "/og-marineblog-home.jpg",
    twitterImage: "/twitter-marineblog-home.jpg",
    defaultProfileImage: "/default-dog-profile.jpg"
  },
  
  // Réseaux sociaux
  social: {
    twitter: "@MarineBlog",
    facebook: "https://www.facebook.com/MarineBlog",
    instagram: "https://www.instagram.com/marineblog",
    twitterUrl: "https://twitter.com/MarineBlog"
  },
  
  // Contact
  contact: {
    email: "contact@marineblog.net",
    phone: "+33-1-23-45-67-89",
    supportEmail: "support@marineblog.net"
  },
  
  // Statistiques (pour affichage marketing)
  stats: {
    totalMembers: "50 000",
    totalMatches: "25 000",
    citiesCovered: "500"
  },
  
  // Configuration technique
  technical: {
    googleSiteVerification: "votre-google-verification-code",
    bingSiteVerification: "votre-bing-verification-code",
    analyticsId: "UA-XXXXXXXXX-X",
    clarityId: "tgqcokz0tf"
  },
  
  // Coordonnées géographiques (pour structured data)
  geo: {
    latitude: "48.8566",
    longitude: "2.3522"
  }
};

/**
 * Fonction helper pour générer une URL complète
 * @param {string} path - Chemin relatif (ex: "/profil/bella")
 * @returns {string} URL complète
 */
export function getFullUrl(path = "") {
  return `${siteSettings.url}${path}`;
}

/**
 * Fonction helper pour générer le titre de page
 * @param {string} pageTitle - Titre spécifique de la page
 * @returns {string} Titre complet
 */
export function getPageTitle(pageTitle = "") {
  if (!pageTitle) return siteSettings.seo.title;
  return `${pageTitle} | ${siteSettings.name}`;
}

/**
 * Fonction helper pour générer les meta tags Open Graph
 * @param {Object} options - Options pour les meta tags
 * @returns {Object} Meta tags formatés
 */
export function getOgTags(options = {}) {
  return {
    title: options.title || siteSettings.seo.title,
    description: options.description || siteSettings.seo.defaultDescription,
    image: options.image || getFullUrl(siteSettings.images.ogImage),
    url: options.url || siteSettings.url,
    type: options.type || "website",
    siteName: siteSettings.name,
    locale: siteSettings.seo.locale
  };
}

/**
 * Fonction helper pour générer les meta tags Twitter Card
 * @param {Object} options - Options pour les meta tags
 * @returns {Object} Meta tags formatés
 */
export function getTwitterTags(options = {}) {
  return {
    card: "summary_large_image",
    site: siteSettings.social.twitter,
    creator: siteSettings.social.twitter,
    title: options.title || siteSettings.seo.title,
    description: options.description || siteSettings.seo.defaultDescription,
    image: options.image || getFullUrl(siteSettings.images.twitterImage)
  };
}

export default siteSettings;
