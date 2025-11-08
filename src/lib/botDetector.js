// Système complet de détection de bots
export class BotDetector {
  constructor() {
    // Liste complète des User-Agents de bots et crawlers
    this.botPatterns = {
      // Google bots
      google: [
        'Googlebot',
        'Googlebot-News',
        'Googlebot-Image', 
        'Googlebot-Video',
        'Mediapartners-Google',
        'AdsBot-Google',
        'Googlebot-Mobile',
        'Googlebot-Desktop'
      ],
      
      // Autres crawlers majeurs
      crawlers: [
        'Bingbot',
        'Slurp', // Yahoo
        'DuckDuckBot',
        'Baiduspider',
        'YandexBot',
        'facebookexternalhit',
        'Twitterbot',
        'LinkedInBot',
        'WhatsApp',
        'Applebot',
        'ia_archiver', // Alexa
        'archive.org_bot'
      ],
      
      // SEO et marketing bots (à bloquer)
      seoBots: [
        'AhrefsBot',
        'MJ12bot',
        'SemrushBot',
        'SEMrushBot',
        'RavenCrawler',
        'DotBot',
        'AspiegelBot',
        'DataForSeoBot',
        'Go-http-client',
        'NetcraftSurveyAgent',
        'PetalBot',
        'SenutoBot',
        'Screaming Frog',
        'SiteAuditBot',
        'Sparkler',
        'TurnitinBot',
        'Vagabondo',
        'ZoominfoBot',
        'zgrab'
      ],
      
      // Scrapers et bots malveillants
      malicious: [
        'python-requests',
        'curl',
        'wget',
        'nikto',
        'sqlmap',
        'nmap',
        'masscan',
        'zmeu',
        'Morfeus',
        'Shellshock',
        'Botify',
        'Crawly',
        'Deepnet',
        'Exabot',
        'Gigabot',
        'Heritrix',
        'ICC-Crawler',
        'Nutch',
        'OpenCrawler',
        'PMAFind',
        'SBIder',
        'ScoutJet',
        'SearchmetricsBot',
        'SeznamBot',
        'Sosospider',
        'Speedy Spider',
        'Steeler',
        'TinEye',
        'Voyager',
        'Wget',
        'Yacy'
      ]
    };
    
    // Patterns génériques de bots
    this.genericPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /crawling/i,
      /fetch/i,
      /scanner/i,
      /checker/i,
      /monitor/i,
      /audit/i,
      /seo/i,
      /analytics/i,
      /metric/i,
      /probe/i,
      /harvest/i,
      /extract/i,
      /index/i,
      /search/i,
      /crawl/i
    ];
    
    // IPs connues de Google (à bloquer si nécessaire)
    this.googleIPRanges = [
      '66.249.64.0/19',
      '66.249.70.0/24',
      '66.249.71.0/24',
      '66.249.72.0/24',
      '66.249.73.0/24',
      '66.249.74.0/24',
      '66.249.75.0/24',
      '66.249.76.0/24',
      '66.249.77.0/24',
      '66.249.78.0/24',
      '66.249.79.0/24',
      '108.177.8.0/21',
      '108.177.12.0/22',
      '108.177.15.0/24',
      '142.250.0.0/15',
      '142.251.0.0/16',
      '172.217.0.0/16',
      '172.253.0.0/16',
      '173.194.0.0/16',
      '209.85.128.0/17',
      '209.85.208.0/20',
      '209.85.224.0/19',
      '209.85.236.0/22',
      '209.85.240.0/20',
      '216.58.192.0/19',
      '216.58.208.0/20',
      '216.58.224.0/19',
      '216.239.32.0/19'
    ];
  }

  // Détecter si un User-Agent est un bot
  isBot(userAgent = '', clientIP = '') {
    if (!userAgent) return true; // Pas de UA = suspect
    
    const ua = userAgent.toLowerCase();
    
    // Vérifier les patterns spécifiques
    for (const category of Object.values(this.botPatterns)) {
      for (const pattern of category) {
        if (ua.includes(pattern.toLowerCase())) {
          return true;
        }
      }
    }
    
    // Vérifier les patterns génériques
    for (const pattern of this.genericPatterns) {
      if (pattern.test(ua)) {
        return true;
      }
    }
    
    // Vérifier les caractéristiques suspectes
    if (this.hasSuspiciousCharacteristics(userAgent)) {
      return true;
    }
    
    // Vérifier l'IP si fournie
    if (clientIP && this.isGoogleIP(clientIP)) {
      return true;
    }
    
    return false;
  }

  // Détecter spécifiquement les bots Google
  isGoogleBot(userAgent = '') {
    if (!userAgent) return false;
    
    const ua = userAgent.toLowerCase();
    return this.botPatterns.google.some(pattern => 
      ua.includes(pattern.toLowerCase())
    );
  }

  // Détecter les bots SEO/marketing (à bloquer agressivement)
  isSEOBot(userAgent = '') {
    if (!userAgent) return false;
    
    const ua = userAgent.toLowerCase();
    return this.botPatterns.seoBots.some(pattern => 
      ua.includes(pattern.toLowerCase())
    );
  }

  // Vérifier les caractéristiques suspectes
  hasSuspiciousCharacteristics(userAgent) {
    // User-Agent trop court ou vide
    if (!userAgent || userAgent.length < 10) return true;
    
    // User-Agent trop long (souvent fake)
    if (userAgent.length > 500) return true;
    
    // Contient des caractères inhabituels
    if (/[\x00-\x1F\x7F]/.test(userAgent)) return true;
    
    // User-Agent qui ressemble à un script
    if (/^(python|java|perl|ruby|php|curl|wget|go|node|dart)/i.test(userAgent)) return true;
    
    // User-Agent avec seulement des mots-clés bot
    if (/(bot|crawler|spider|scraper)/i.test(userAgent) && 
        userAgent.split(' ').length < 3) {
      return true;
    }
    
    return false;
  }

  // Vérifier si l'IP appartient à Google
  isGoogleIP(ip) {
    // Simple vérification pour les IPs Google connues
    const googleIPRanges = [
      /^66\.249\./,
      /^108\.177\./,
      /^142\.250\./,
      /^142\.251\./,
      /^172\.217\./,
      /^172\.253\./,
      /^173\.194\./,
      /^209\.85\./,
      /^216\.58\./,
      /^216\.239\./
    ];
    
    return googleIPRanges.some(range => range.test(ip));
  }

  // Obtenir la catégorie du bot
  getBotCategory(userAgent = '') {
    if (!userAgent) return 'unknown';
    
    const ua = userAgent.toLowerCase();
    
    for (const [category, patterns] of Object.entries(this.botPatterns)) {
      for (const pattern of patterns) {
        if (ua.includes(pattern.toLowerCase())) {
          return category;
        }
      }
    }
    
    return 'generic';
  }

  // Générer une réponse adaptée pour les bots
  generateBotResponse(userAgent, clientIP) {
    const category = this.getBotCategory(userAgent);
    
    if (category === 'google' || this.isGoogleBot(userAgent)) {
      // Pour Google : donner accès au contenu dog
      return {
        shouldBlock: false,
        redirectTo: '/dog',
        contentType: 'dog',
        reason: 'Google bot detected - redirecting to dog content'
      };
    }
    
    if (category === 'seoBots' || category === 'malicious') {
      // Bloquer agressivement les bots SEO et malveillants
      return {
        shouldBlock: true,
        statusCode: 403,
        reason: `${category} bot blocked`
      };
    }
    
    // Pour les autres crawlers : accès limité
    return {
      shouldBlock: false,
      redirectTo: '/dog',
      contentType: 'dog',
      reason: 'Crawler detected - limited access'
    };
  }

  // Logger les détections de bots
  logBotDetection(userAgent, clientIP, category, action) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      userAgent: userAgent.substring(0, 200),
      clientIP,
      category,
      action
    };
    

    
    // En production, vous pourriez vouloir stocker ces logs
    // dans une base de données ou un service de logging
  }
}

export const botDetector = new BotDetector();
