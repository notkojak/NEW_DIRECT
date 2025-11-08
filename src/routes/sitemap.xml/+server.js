import dogProfiles from '$lib/data/dog-profiles.json';
import { siteSettings } from '$lib/config/siteSettings.js';

export async function GET() {
  // Générer les URLs pour tous les profils de chiens
  const profileUrls = dogProfiles.map(dog => `
    <url>
      <loc>${siteSettings.url}/${dog.slug}</loc>
      <lastmod>${dog.createdAt || new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  // Générer le XML de la sitemap
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteSettings.url}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${profileUrls}
</urlset>`;

  // Retourner la sitemap avec les headers appropriés
  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600' // Cache pour 1 heure
    }
  });
}
