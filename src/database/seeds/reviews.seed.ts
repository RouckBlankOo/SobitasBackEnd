// ============================================================
//  REVIEWS SEED DATA — Tunisian customers
//  Generates 50+ realistic reviews per product with Tunisian names
// ============================================================

interface ReviewSeed {
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  productId: string;
  approved: boolean;
  featured: boolean;
  isTestimonial: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tunisian first names (male and female)
const TUNISIAN_FIRST_NAMES = [
  // Male names
  'Mohamed',
  'Ahmed',
  'Ali',
  'Hamza',
  'Youssef',
  'Amine',
  'Karim',
  'Sami',
  'Mehdi',
  'Anis',
  'Wassim',
  'Firas',
  'Rami',
  'Zied',
  'Walid',
  'Bilel',
  'Nabil',
  'Sofien',
  'Hatem',
  'Malek',
  'Oussama',
  'Houssem',
  'Khalil',
  'Salah',
  'Tarek',
  'Aymen',
  'Bassem',
  'Chaker',
  'Farouk',
  'Marouane',
  'Hichem',
  'Imed',
  'Jamel',
  'Khaled',
  'Lotfi',
  'Makrem',
  'Nizar',
  'Omar',
  'Rached',
  'Samir',
  'Adel',
  'Yassine',
  'Seif',
  'Aziz',
  'Nader',
  'Slim',
  'Hedi',
  'Moncef',
  'Ridha',
  'Saber',

  // Female names
  'Amira',
  'Asma',
  'Chiraz',
  'Dorra',
  'Emna',
  'Fadwa',
  'Ghada',
  'Hanen',
  'Imen',
  'Jihen',
  'Khadija',
  'Leila',
  'Marwa',
  'Nadia',
  'Olfa',
  'Rania',
  'Sabrine',
  'Takwa',
  'Wafa',
  'Yosra',
  'Zahra',
  'Amel',
  'Bochra',
  'Cyrine',
  'Dalia',
  'Eya',
  'Ferial',
  'Haifa',
  'Ikram',
  'Jalila',
  'Karima',
  'Lamia',
  'Meriem',
  'Najoua',
  'Oumayma',
  'Raja',
  'Salma',
  'Sihem',
  'Souad',
  'Samia',
  'Rim',
  'Nour',
  'Sonia',
  'Manel',
  'Nesrine',
  'Houda',
  'Latifa',
  'Mouna',
  'Raoudha',
  'Selma',
];

// Tunisian last names
const TUNISIAN_LAST_NAMES = [
  'Ben Ali',
  'Trabelsi',
  'Ben Salah',
  'Karoui',
  'Ben Amor',
  'Mejri',
  'Gharbi',
  'Jebali',
  'Hamdi',
  'Arbi',
  'Ben Abdallah',
  'Saidi',
  'Ben Mohamed',
  'Slimani',
  'Oueslati',
  'Kchaou',
  'Brahmi',
  'Zaouali',
  'Derbel',
  'Agrebi',
  'Ben Youssef',
  'Mestiri',
  'Hammami',
  'Nouira',
  'Dridi',
  'Sassi',
  'Jouini',
  'Ben Fredj',
  'Khemiri',
  'Rezgui',
  'Ben Ahmed',
  'Guiza',
  'Hamrouni',
  'Miled',
  'Gharsallah',
  'Moussa',
  'Ben Rejeb',
  'Chouchane',
  'Frigui',
  'Jmai',
  'Ben Slama',
  'Ksibi',
  'Letaief',
  'Manai',
  'Ncib',
  'Omrane',
  'Riahi',
  'Soltani',
  'Tounsi',
  'Zoghlami',
  'Belhadj',
  'Chaari',
  'Dhahri',
  'Essid',
  'Farhat',
  'Ghanmi',
  'Haddad',
  'Jelassi',
  'Kammoun',
  'Landoulsi',
];

// Email domains popular in Tunisia
const EMAIL_DOMAINS = [
  '@gmail.com',
  '@hotmail.com',
  '@yahoo.fr',
  '@outlook.com',
  '@live.fr',
  '@hotmail.fr',
  '@gmail.com',
  '@outlook.fr',
  '@yahoo.com',
  '@protonmail.com',
];

// Review comments in French (realistic Tunisian fitness enthusiast reviews)
const POSITIVE_COMMENTS = [
  "Excellent produit! J'ai commencé à voir des résultats après seulement 2 semaines. Très satisfait.",
  'Qualité irréprochable, livraison rapide. Je recommande vivement Sobitas!',
  'Parfait pour ma routine de musculation. Le goût est agréable et le prix est correct.',
  "Très bon rapport qualité-prix. C'est mon troisième achat et je ne suis jamais déçu.",
  "Produit authentique et efficace. J'ai gagné 3kg de muscle en un mois!",
  'Livraison rapide à Tunis. Produit conforme à la description. Top!',
  "Je l'utilise depuis 3 mois, résultats visibles. Merci Sobitas pour le service impeccable.",
  'Meilleur prix en Tunisie! Qualité premium, je ne commande plus ailleurs.',
  'Parfait! Digestion facile, pas de ballonnements. Très satisfait de mon achat.',
  'Produit original, emballage intact. Reçu en 48h à Sfax. Excellent!',
  'Très bon produit pour la prise de masse. Je le recommande à tous mes amis du gym.',
  'Efficace et bon goût! Mon préféré pour le post-workout. Livraison nickel.',
  'Rapport qualité-prix imbattable. Service client réactif. Continue comme ça!',
  "Mon produit favori depuis 6 mois. Résultats garantis si tu es sérieux à l'entraînement.",
  'Livraison super rapide! Produit de qualité, exactement ce que je cherchais.',
  'Je prends ce produit tous les jours. Force et endurance améliorées. Merci!',
  "Excellent pour la récupération après l'effort. Plus de courbatures!",
  "Top qualité! Meilleur que les autres marques que j'ai essayées.",
  'Produit conforme, bien emballé. Livré à Sousse en 2 jours. Parfait!',
  "Mon coach me l'a recommandé et je ne regrette pas. Vraiment efficace!",
  "Très bon produit, je vois déjà la différence après 3 semaines d'utilisation.",
  'Qualité premium à prix abordable. Sobitas est devenu ma référence!',
  'Parfait pour les entraînements intensifs. Énergie et focus garantis!',
  'Produit authentique, date de péremption ok. Très satisfait de ma commande.',
  'Je recommande à 100%! Efficace et le service client est au top.',
  "Meilleur supplément que j'ai essayé. Résultats rapides et visibles!",
  'Livraison express et produit de qualité. Je recommanderai sans hésiter.',
  'Excellent rapport qualité-prix pour la Tunisie. Bravo Sobitas!',
  'Produit efficace, goût agréable. Mon 4ème achat et toujours satisfait!',
  'Parfait pour la prise de masse sèche. Je gagne du muscle sans gras.',
  "Super produit! Ma femme et moi l'utilisons après nos séances. Top!",
  'Livraison rapide à Bizerte. Produit conforme et bien protégé. Merci!',
  "Qualité irréprochable! J'ai plus d'énergie pendant mes entraînements.",
  "Très bon produit pour le prix. Je n'achète plus ailleurs depuis que j'ai découvert Sobitas.",
  "Efficace et digeste. Pas de problème d'estomac comme avec d'autres marques.",
  'Mon préféré absolument! Goût délicieux et résultats au rendez-vous.',
  'Produit authentique et original. Scannez le code QR pour vérifier!',
  "Je l'utilise avant chaque entraînement. Pump garanti!",
  'Excellent pour la définition musculaire. Visible après 1 mois!',
  'Livraison impeccable. Produit bien emballé. Service Sobitas toujours au top!',
];

const MIXED_COMMENTS = [
  "Bon produit dans l'ensemble, mais le goût pourrait être amélioré. Reste efficace!",
  "Produit efficace mais un peu cher. J'attends les promotions pour commander.",
  'Qualité correcte. Livraison un peu longue (5 jours) mais produit conforme.',
  'Bon produit mais la dose recommandée est un peu élevée pour moi.',
  "Efficace pour l'entraînement. Le packaging pourrait être mieux.",
  'Résultats satisfaisants après 1 mois. Prix un peu élevé mais ça vaut le coup.',
  "Produit correct. J'aurais aimé plus de saveurs disponibles.",
  'Bon rapport qualité-prix. Seul bémol: solubilité moyenne.',
  'Efficace mais le goût vanille est un peu artificiel. Reste un bon produit.',
  'Produit conforme. Livraison correcte mais emballage pourrait être renforcé.',
];

const VERY_POSITIVE_COMMENTS = [
  "WOW! Le meilleur produit que j'ai jamais essayé! Résultats incroyables en seulement 2 semaines! 🔥",
  'Absolument parfait! Qualité exceptionnelle, livraison ultra rapide, service impeccable. 10/10!',
  'Je suis impressionné par la qualité! Déjà 5kg de muscle en 6 semaines. Sobitas vous êtes les meilleurs! 💪',
  'Produit exceptionnel! Ma force a augmenté de 30% en 1 mois. Je recommande les yeux fermés!',
  "Incroyable! Le goût, la qualité, l'efficacité... tout est parfait! Ma meilleure découverte de l'année!",
  "Franchement bluffé par les résultats! Plus d'énergie, meilleure récupération, gains constants. TOP!",
  'Le meilleur prix en Tunisie pour cette qualité premium! Sobitas cartonne! 🏆',
  "J'ai testé toutes les marques disponibles en Tunisie, Sobitas est N°1 sans hésitation!",
  "Résultats spectaculaires! Mes amis du gym n'en reviennent pas de ma transformation!",
  'Qualité professionnelle! Digne des meilleurs produits européens. Bravo Sobitas! 🇹🇳',
];

/**
 * Generate a random Tunisian customer name
 */
function generateTunisianName(): {
  firstName: string;
  lastName: string;
  fullName: string;
} {
  const firstName =
    TUNISIAN_FIRST_NAMES[
      Math.floor(Math.random() * TUNISIAN_FIRST_NAMES.length)
    ];
  const lastName =
    TUNISIAN_LAST_NAMES[Math.floor(Math.random() * TUNISIAN_LAST_NAMES.length)];
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
  };
}

/**
 * Generate a realistic Tunisian email from a name
 */
function generateTunisianEmail(firstName: string, lastName: string): string {
  const cleanFirst = firstName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const cleanLast = lastName
    .toLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const domain =
    EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];

  const patterns = [
    `${cleanFirst}.${cleanLast}${domain}`,
    `${cleanFirst}${cleanLast}${domain}`,
    `${cleanFirst}.${cleanLast}${Math.floor(Math.random() * 99)}${domain}`,
    `${cleanFirst[0]}${cleanLast}${domain}`,
    `${cleanFirst}_${cleanLast}${domain}`,
    `${cleanFirst}${Math.floor(Math.random() * 999)}${domain}`,
  ];

  return patterns[Math.floor(Math.random() * patterns.length)];
}

/**
 * Generate a review comment based on rating
 */
function generateComment(rating: number): string {
  if (rating === 5) {
    const comments = [...VERY_POSITIVE_COMMENTS, ...POSITIVE_COMMENTS];
    return comments[Math.floor(Math.random() * comments.length)];
  } else if (rating === 4) {
    return POSITIVE_COMMENTS[
      Math.floor(Math.random() * POSITIVE_COMMENTS.length)
    ];
  } else if (rating === 3) {
    return MIXED_COMMENTS[Math.floor(Math.random() * MIXED_COMMENTS.length)];
  } else if (rating === 2) {
    return "Produit moyen. J'attendais mieux pour ce prix.";
  } else {
    return 'Déçu par ce produit. Ne correspond pas à mes attentes.';
  }
}

/**
 * Generate a rating (weighted toward positive reviews)
 * Distribution: 60% give 5 stars, 25% give 4 stars, 10% give 3 stars, 5% give 1-2 stars
 */
function generateRating(): number {
  const rand = Math.random();
  if (rand < 0.6) return 5; // 60% - 5 stars
  if (rand < 0.85) return 4; // 25% - 4 stars
  if (rand < 0.95) return 3; // 10% - 3 stars
  if (rand < 0.98) return 2; // 3% - 2 stars
  return 1; // 2% - 1 star
}

/**
 * Generate random date within last 6 months
 */
function generateRandomDate(): Date {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const randomTime =
    sixMonthsAgo.getTime() +
    Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(randomTime);
}

/**
 * Generate reviews for a specific product
 */
export function generateReviewsForProduct(
  productId: string,
  count: number = 55,
): ReviewSeed[] {
  const reviews: ReviewSeed[] = [];
  const usedEmails = new Set<string>();

  for (let i = 0; i < count; i++) {
    const { firstName, lastName, fullName } = generateTunisianName();
    let email = generateTunisianEmail(firstName, lastName);

    // Ensure unique emails per product
    let attempts = 0;
    while (usedEmails.has(email) && attempts < 10) {
      email = generateTunisianEmail(firstName, lastName);
      attempts++;
    }
    usedEmails.add(email);

    const rating = generateRating();
    const comment = generateComment(rating);
    const createdAt = generateRandomDate();

    // 90% of reviews are approved
    const approved = Math.random() < 0.9;

    // 10% of 5-star reviews are featured
    const featured = rating === 5 && Math.random() < 0.1;

    reviews.push({
      customerName: fullName,
      customerEmail: email,
      rating,
      comment,
      productId,
      approved,
      featured,
      isTestimonial: false,
      createdAt,
      updatedAt: createdAt,
    });
  }

  // Sort by date (newest first)
  return reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

/**
 * Generate reviews for all products
 */
export function generateAllReviews(productIds: string[]): ReviewSeed[] {
  const allReviews: ReviewSeed[] = [];

  for (const productId of productIds) {
    // Generate 50-60 reviews per product for variety
    const reviewCount = Math.floor(Math.random() * 11) + 50; // 50-60 reviews
    const productReviews = generateReviewsForProduct(productId, reviewCount);
    allReviews.push(...productReviews);
  }

  return allReviews;
}
