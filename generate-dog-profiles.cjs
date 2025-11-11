const fs = require('fs');
const path = require('path');

// Charger les pseudos depuis config.json
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'config.json'), 'utf-8'));
const keywords = config.pseudos;

// Données pour générer des profils réalistes et variés
const dogNames = {
  male: [
    'Max', 'Charlie', 'Rocky', 'Buddy', 'Cooper', 'Duke', 'Bear', 'Tucker', 'Jake', 'Rex',
    'Sam', 'Zeus', 'Oscar', 'Winston', 'Bruno', 'Dexter', 'Bentley', 'Milo', 'Finn', 'Gus',
    'Archie', 'Ollie', 'Louie', 'Bobby', 'Rudy', 'Cody', 'Blue', 'Gizmo', 'Patch', 'Scout',
    'Ace', 'Rex', 'Thor', 'Leo', 'Simba', 'Floyd', 'Hugo', 'Igor', 'Jax', 'Kai'
  ],
  female: [
    'Luna', 'Bella', 'Daisy', 'Lucy', 'Sadie', 'Roxy', 'Zoe', 'Molly', 'Lola', 'Coco',
    'Nina', 'Mia', 'Stella', 'Chloe', 'Sophie', 'Lily', 'Grace', 'Ruby', 'Rosie', 'Luna',
    'Ava', 'Isla', 'Poppy', 'Millie', 'Tilly', 'Evie', 'Luna', 'Freya', 'Willow', 'Honey',
    'Bella', 'Daisy', 'Molly', 'Rosie', 'Luna', 'Coco', 'Ruby', 'Lily', 'Poppy', 'Willow'
  ]
};

const breeds = [
  'Golden Retriever', 'Labrador', 'Berger Allemand', 'Bouledogue Français', 'Caniche', 'Beagle', 'Husky',
  'Rottweiler', 'Braque Allemand', 'Yorkshire', 'Berger Australien', 'Corgi', 'Shih Tzu', 'Boxer',
  'Dalmatien', 'Bichon Frisé', 'Westie', 'Cocker Spaniel', 'Jack Russell', 'Border Collie',
  'Berger Blanc Suisse', 'Dogue de Bordeaux', 'Épagneul Breton', 'Teckel', 'Malinois',
  'Setter Irlandais', 'Basset Hound', 'Mastiff', 'Shar Pei', 'Chow-Chow', 'Akita',
  'Shiba Inu', 'Bouvier Bernois', 'Leonberg', 'Terre-Neuve', 'Saint-Bernard', 'Dobermann'
];


const personalities = [
  'Joueur', 'Loyal', 'Énergique', 'Doux', 'Intelligent', 'Amical', 'Protecteur', 'Affectueux',
  'Curieux', 'Calme', 'Sociable', 'Courageux', 'Gai', 'Indépendant', 'Obéissant', 'Vif',
  'Patient', 'Aventureux', 'Câlin', 'Malicieux', 'Gourmand', 'Dormeur', 'Explorateur',
  'Chasseur', 'Nageur', 'Coureur', 'Sauteur', 'Aboyeur', 'Rongeur', 'Creuseur', 'Grimpeur',
  'Bavard', 'Timide', 'Dominant', 'Soumis', 'Têtu', 'Paresseux', 'Hyperactif', 'Mystérieux',
  'Comique', 'Élégant', 'Rustique', 'Sophistiqué', 'Sportif', 'Artistique', 'Philosophe', 'Rêveur'
];

const specialSkills = [
  'Rapporte la balle du premier coup', 'Ouvre les portes seul', 'Comprend plus de 50 mots',
  'Fait le beau sur commande', 'Détecte les orages', 'Apprend un tour en 5 minutes',
  'Surveille la maison comme un pro', 'Sait nager sous l\'eau', 'Peut rester immobile 10 minutes',
  'Chante quand on lui demande', 'Fait du vélo avec son maître', 'Attrape les mouches en vol',
  'Guide les autres chiens', 'Peut porter 5 sacs de courses', 'Sait utiliser le distributeur',
  'Détecte le sucre dans les aliments', 'Fait des puzzles', 'Peut rester seul 8h sans aboyer',
  'Appelle le téléphone en cas d\'urgence', 'Sait faire le mort', 'Peut compter jusqu\'à 5'
];

const favoriteFoods = [
  'Carottes crues', 'Poulet grillé', 'Pommes', 'Yaourt nature', 'Cacahuètes sans sel',
  'Bananes', 'Patates douces', 'Saumon fumé', 'Brocolis vapeur', 'Fromage cottage',
  'Myrtilles', 'Dinde cuite', 'Courgettes', 'Œufs durs', 'Riz brun',
  'Mangues', 'Thon en conserve', 'Épinards', 'Haricots verts', 'Fromage à pâte dure'
];

const favoriteToys = [
  'Balle en caoutchouc', 'Os à mâcher', 'Jouet à peluche', 'Frisbee', 'Corde à tirer',
  'Kong garni', 'Baballe sonore', 'Jeu d\'intelligence', 'Tunnel d\'agilité', 'Anneau de fetch',
  'Ballon de plage', 'Jouet interactif', 'Puzzle alimentaire', 'Doudou personnalisé', 'Sifflet à chien',
  'Laser pour jouer', 'Fontaine à eau', 'Tapis de léchage', 'Sac de transport', 'Harnais de randonnée'
];

const sleepingHabits = [
  'Dort dans son panier près du lit', 'Préfère le canapé', 'S\'étale sur toute la moquette',
  'Fait des ronflements adorables', 'Dort en boule comme un chat', 'Doit avoir une couverture',
  'Change de place 3 fois par nuit', 'Dort la tête sur l\'oreiller', 'Fait des rêves (court dans son sommeil)',
  'Doit dormir contre son maître', 'A son propre lit de luxe', 'Dort dans la chambre des enfants',
  'Fait le gardien la nuit', 'Dort dehors s\'il fait beau', 'Aime les siestes en plein soleil'
];

const interests = [
  'Longues balades en forêt', 'Jeu de balle intense', 'Natation dans le lac', 'Parcs à chiens animés',
  'Friandises gastronomiques', 'Câlins sur le canapé', 'Dressage avancé', 'Agility sportive',
  'Randonnées en montagne', 'Balades en voiture', 'Frisbee compétitif', 'Course à pied',
  'Chasse au trésor', 'Socialisation canine', 'Jeu de corde', 'Piscine pour chiens',
  'Photo shooting', 'Voyages en camping', 'Pique-niques', 'Surf sur les vagues', 'Ski en hiver',
  'Camping sauvage', 'Visites de parcs', 'Rencontres avec d\'autres chiens', 'Jouets interactifs',
  'Musique classique', 'Films d\'aventure', 'Cuisine maison', 'Jardinage', 'Bricolage'
];

// Fonction pour générer une bio unique pour un chien (du point de vue du propriétaire)
function generateBio(keyword, name, breed, age, gender, interests, personality) {
  const templates = [
    `Salut, c'est ${keyword} ! J'ai un ${breed} magnifique qui s'appelle ${name}. Il a ${age} ans et est plutôt ${personality.toLowerCase()}. On adore ${interests.slice(0, 2).join(' et ')} ensemble. ${name} est vraiment ${personality} et on cherche des compagnons de jeu pour partager de bons moments.`,
    `Bonjour ! Moi c'est ${keyword} et je suis le propriétaire de ${name}, un superbe ${breed} ${gender} de ${age} ans. J'adore ${interests.slice(0, 3).join(', ')} avec lui. ${name} est un chien ${personality.toLowerCase()} et j'aimerais qu'il rencontre d'autres chiens pour ${interests[2] || 'jouer'}.`,
    `Hey ! Je suis ${keyword} et j'ai un ${breed} fantastique de ${age} ans qui s'appelle ${name}. C'est un ${gender} avec une personnalité ${personality.toLowerCase()} ! On adore particulièrement ${interests.slice(0, 2).join(' et ')} et je cherche des amis pour ${name} afin qu'il puisse ${interests[1] || 's\'amuser'}.`
  ];
  
  return randomChoice(templates);
}

// Fonction pour générer une méta-description fixe basée sur le keyword
function generateMetaDescription(keyword) {
  const descriptions = [
    `Découvrez le blog de ${keyword} ! Je partage mon quotidien, mes photos et mes aventures uniques. Rejoignez-moi dans cette expérience digitale authentique.`,
    `Bienvenue sur le blog de ${keyword} ! Partage de ma vie, mes passions et mes créations. Suivez mon quotidien et mes aventures personnelles.`,
    `Le blog personnel de ${keyword} ! Photos, vidéos et partage de mes moments précieux. Une aventure digitale à découvrir chaque jour.`,
    `Explorez l'univers de ${keyword} ! Je partage mon quotidien, mes expériences et mes coups de cœur. Blog lifestyle et passion authentique.`,
    `Mon blog ${keyword} : un espace pour partager ma vie, mes photos et mes aventures. Rejoignez ma communauté digitale bienveillante.`,
    `Bienvenue dans le monde de ${keyword} ! Partage de mon quotidien, mes passions et mes moments uniques. Découvrez une vie authentique.`,
    `Le blog de ${keyword} ! Je vous fais découvrir mon quotidien, mes photos et mes aventures. Une expérience digitale unique et personnelle.`,
    `Suivez le quotidien de ${keyword} ! Photos, vidéos et partage de mes moments de vie. Blog personnel et authentique.`,
    `Blog de ${keyword} : partage de vie, photos et aventures. Découvrez mon quotidien et mes passions digitales au quotidien.`,
    `Bienvenue sur le blog de ${keyword} ! Je partage mon quotidien, mes créations et mes expériences uniques. Un voyage personnel à partager.`
  ];
  
  // Utiliser le hash du keyword pour choisir une description fixe
  const hash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return descriptions[hash % descriptions.length];
}

// Fonction pour générer un nombre aléatoire
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour sélectionner un élément aléatoire dans un tableau
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Fonction pour générer plusieurs choix uniques
function randomChoices(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Fonction pour créer un slug identique au keyword
function createSlug(keyword) {
  return keyword.toLowerCase();
}


// Fonction pour récupérer une vraie photo depuis l'API Dog CEO
const https = require('https');

function fetchDogImage() {
  return new Promise((resolve, reject) => {
    https.get('https://dog.ceo/api/breeds/image/random', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.message);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Fonction pour récupérer 4 photos pour un profil
async function fetchProfilePhotos() {
  const photos = [];
  for (let i = 0; i < 4; i++) {
    try {
      const url = await fetchDogImage();
      photos.push(url);
    } catch (error) {
      console.error('Erreur lors de la récupération d\'une photo:', error);
      photos.push('https://images.dog.ceo/breeds/labrador/n02099712_100.jpg'); // Photo par défaut
    }
  }
  return photos;
}

// Fonction pour générer un profil de chien (asynchrone pour récupérer les photos)
async function generateDogProfile(keyword, index) {
  const gender = randomChoice(['Mâle', 'Femelle']);
  const namePool = gender === 'Mâle' ? dogNames.male : dogNames.female;
  const name = randomChoice(namePool);
  const breed = randomChoice(breeds);
  const age = randomBetween(1, 12);
    const size = randomChoice(['Petit', 'Moyen', 'Grand']);
  const energy = randomChoice(['Faible', 'Moyen', 'Élevé']);
  const grooming = randomChoice(['Faible', 'Moyen', 'Élevé']);
  const selectedInterests = randomChoices(interests, randomBetween(4, 8));
  const personality = randomChoice(personalities);
  const specialSkill = randomChoice(specialSkills);
  const favoriteFood = randomChoice(favoriteFoods);
  const favoriteToy = randomChoice(favoriteToys);
  const sleepingHabit = randomChoice(sleepingHabits);
  
  // Générer la bio unique (du point de vue du propriétaire)
  const bio = generateBio(keyword, name, breed, age, gender, selectedInterests, personality);
  
  // Récupérer 4 vraies photos depuis l'API Dog CEO
  const photos = await fetchProfilePhotos();
  
  return {
    id: index + 1,
    keyword: keyword.toLowerCase(),
    slug: createSlug(keyword),
    name: name,
    breed: breed,
    age: age,
    gender: gender,
        size: size,
    bio: bio,
    photos: photos,
    personality: randomChoices(personalities, randomBetween(4, 7)),
    interests: selectedInterests,
    specialSkill: specialSkill,
    favoriteFood: favoriteFood,
    favoriteToy: favoriteToy,
    sleepingHabit: sleepingHabit,
    adoptionFee: randomBetween(50, 500) + '€',
    availableForAdoption: Math.random() > 0.3,
    lastVetVisit: new Date(Date.now() - randomBetween(1, 180) * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    microchipId: 'MC' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    preferences: {
      size: size,
      energy: energy,
      goodWithKids: Math.random() > 0.3,
      goodWithDogs: Math.random() > 0.2,
      goodWithCats: Math.random() > 0.7,
      grooming: grooming
    },
    health: {
      vaccinated: true,
      neutered: Math.random() > 0.5,
      weight: `${randomBetween(3, 50)} kg`,
      lastCheckup: new Date(Date.now() - randomBetween(1, 90) * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
    },
    owner: {
      name: randomChoice([
        'Emma Wilson', 'Oliver Brown', 'Sophia Martin', 'Lucas Davis', 'Mia Garcia',
        'Noah Thomas', 'Ava Jackson', 'Ethan White', 'Isabella Moore', 'Liam Taylor',
        'Sophia Anderson', 'Mason Thomas', 'Charlotte Jackson', 'William White'
      ]),
      age: randomBetween(22, 55),
      bio: randomChoice([
        'Amoureux des chiens passionné, je cherche le partenaire parfait pour mon compagnon !',
        'Ma vie tourne autour de mon chien et je veux lui trouver les meilleurs amis !',
        'Passionné d\'animaux depuis toujours, j\'adore voir mon chien s\'épanouir !',
        'Je crois que chaque chien mérite d\'avoir des amis pour être heureux !'
      ]),
      joined: new Date(Date.now() - randomBetween(15, 365) * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
    },
    stats: {
      views: randomBetween(25, 800),
      likes: randomBetween(5, 150),
      messages: randomBetween(0, 35)
    },
    createdAt: new Date().toISOString(),
    seo: {
      title: `${name} - ${breed} de ${age} ans | ${keyword}`,
      description: `Découvrez ${name}, un magnifique ${breed} de ${age} ans. ${name} est ${gender.toLowerCase()} et cherche des compagnons de jeu. Profil ${keyword}`,
      metaDescription: generateMetaDescription(keyword), // Méta-description fixe pour le blog
      keywords: [keyword, name.toLowerCase(), breed.toLowerCase(), 'rencontres chiens', `adoption ${breed}`]
    }
  };
}

// Fonction principale pour générer tous les profils
async function generateAllProfiles() {
  console.log('🐕 Génération des profils de chiens à partir des pseudos...');
  console.log(`📝 ${keywords.length} pseudos trouvés dans config.json`);
  
  // Créer le répertoire data s'il n'existe pas
  const outputDir = path.join(__dirname, 'src', 'lib', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'dog-profiles.json');
  
  // Charger les profils existants
  let existingProfiles = [];
  if (fs.existsSync(outputPath)) {
    try {
      const fileContent = fs.readFileSync(outputPath, 'utf-8');
      existingProfiles = JSON.parse(fileContent);
      console.log(`📂 ${existingProfiles.length} profils existants chargés`);
    } catch (error) {
      console.log('⚠️  Erreur lors du chargement des profils existants, création d\'un nouveau fichier');
      existingProfiles = [];
    }
  }
  
  // Créer un Map des profils existants par keyword
  const existingKeywords = new Map();
  existingProfiles.forEach(profile => {
    existingKeywords.set(profile.keyword.toLowerCase(), profile);
  });
  
  const profiles = [...existingProfiles];
  let newProfilesCount = 0;
  let skippedCount = 0;
  
  // Générer un profil pour chaque mot-clé qui n'existe pas déjà
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i].toLowerCase();
    
    if (existingKeywords.has(keyword)) {
      console.log(`⏭️  Profil existant pour "${keyword}", ignoré`);
      skippedCount++;
      continue;
    }
    
    const profile = await generateDogProfile(keyword, profiles.length);
    profiles.push(profile);
    newProfilesCount++;
    
    if (newProfilesCount % 50 === 0) {
      console.log(`✅ ${newProfilesCount} nouveaux profils générés...`);
    }
  }
  
  // Sauvegarder le fichier JSON
  fs.writeFileSync(outputPath, JSON.stringify(profiles, null, 2), 'utf-8');
  
  console.log(`\n🎉 Génération terminée !`);
  console.log(`   - Nouveaux profils créés: ${newProfilesCount}`);
  console.log(`   - Profils existants conservés: ${skippedCount}`);
  console.log(`   - Total profils: ${profiles.length}`);
  console.log(`📁 Fichier sauvegardé: ${outputPath}`);
  
  // Générer le sitemap
  generateSitemap(profiles);
  
  // Afficher des statistiques détaillées
  console.log('\n📊 Statistiques détaillées:');
  console.log(`   - Total profils: ${profiles.length}`);
  console.log(`   - Races uniques: ${new Set(profiles.map(p => p.breed)).size}`);
    console.log(`   - Mâles: ${profiles.filter(p => p.gender === 'Mâle').length}`);
  console.log(`   - Femelles: ${profiles.filter(p => p.gender === 'Femelle').length}`);
  console.log(`   - Âge moyen: ${(profiles.reduce((sum, p) => sum + p.age, 0) / profiles.length).toFixed(1)} ans`);
  console.log(`   - Photos fixes: ${profiles.length * 4} (4 par profil)`);
  
  // Exemples de profils générés
  console.log('\n🔍 Exemples de profils:');
  profiles.slice(0, 3).forEach(profile => {
    console.log(`   - ${profile.slug}`);
    console.log(`     ${profile.name} - ${profile.breed}`);
    console.log(`     ${profile.bio.substring(0, 100)}...`);
    console.log('');
  });
}

// Fonction pour générer un sitemap
function generateSitemap(profiles) {
  const baseUrl = `https://${config.siteName}`; // Utiliser le nom du site depuis config
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  // Ajouter la homepage
  sitemap += `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;
  
  // Ajouter chaque profil
  profiles.forEach(profile => {
    sitemap += `  <url>
    <loc>${baseUrl}/${profile.slug}</loc>
    <lastmod>${profile.createdAt.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });
  
  sitemap += `</urlset>`;
  
  // Sauvegarder le sitemap
  const sitemapPath = path.join(__dirname, 'static', 'sitemap-dogs.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  
  console.log(`🗺️  Sitemap généré: ${sitemapPath}`);
  console.log(`📊 ${profiles.length + 1} URLs dans le sitemap`);
}

// Exécuter le script
if (require.main === module) {
  generateAllProfiles().catch(console.error);
}

module.exports = { generateDogProfile, generateAllProfiles };
