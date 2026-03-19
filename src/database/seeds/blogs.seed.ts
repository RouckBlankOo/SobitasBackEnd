// Article images available in /uploads/articles/ (REAL IMAGE PATHS)
const ARTICLE_IMAGES = [
  '/uploads/articles/August2025/5EKKr7boAMOo8Rbgrx2O.webp',
  '/uploads/articles/August2025/BPUTDZJwGoykkHupD7W6.webp',
  '/uploads/articles/August2025/JoZGY33N90YxbvkOBX4W.webp',
  '/uploads/articles/August2025/qeetvDGl0fJszB9e2X94.webp',
  '/uploads/articles/August2025/Qhgh54gyLcgBXskZ4bKo.webp',
  '/uploads/articles/December2023/ensemble-legumes-verts-blancs.jpg',
  '/uploads/articles/December2023/melange-allergenes-alimentaires-courants-pour-humains.jpg',
  '/uploads/articles/February2025/0eRZyyaXFc7FYHuPxzq9.webp',
  '/uploads/articles/February2025/0GIxx26sw5AGFEHEBFtM.webp',
  '/uploads/articles/February2025/0s0EpwLBcjU9WmvjKD8z.webp',
  '/uploads/articles/February2025/1dKfUbyPtRqJXVbO0Rru.webp',
  '/uploads/articles/February2025/22U653IFIMDD4n6CeZAU.webp',
  '/uploads/articles/February2025/27VAwft7AUzxnwD3sC3T.webp',
  '/uploads/articles/February2025/2H4qMUi0iS91P8LRhmr0.webp',
  '/uploads/articles/February2025/4MfsA4dslubUzv3i7hIn.webp',
  '/uploads/articles/February2025/4tzs1k9ehR4VdNBPse3l.webp',
  '/uploads/articles/February2025/5eVp6KBQ64i6zmHupctx.webp',
  '/uploads/articles/February2025/5guKjPygmzavKl0jYTXz.webp',
  '/uploads/articles/February2025/5iCtqxlYU11wDNwNGsik.webp',
  '/uploads/articles/February2025/5uGtIresBofIROSwWgv0.webp',
  '/uploads/articles/February2025/5wcK7PJDbwJRMtApU25b.webp',
  '/uploads/articles/February2025/5z63iWLClfAXFa9roRyR.webp',
  '/uploads/articles/February2025/6koQDvj4MEhwxAK5DwBe.webp',
  '/uploads/articles/February2025/6M9IaXD07udbdKyHDWxR.jpeg',
  '/uploads/articles/February2025/6PjBSPJMZUMGQs0cNGXU.webp',
  '/uploads/articles/February2025/6uCJm4q5tMfn1OALEb33.webp',
  '/uploads/articles/February2025/7ciXOfU1KKnBrSaIhiUP.webp',
  '/uploads/articles/February2025/7TeRaCgjl2014Coa2mEC.webp',
  '/uploads/articles/February2025/8ayHNMvqsG1kD8bBjdH5.webp',
  '/uploads/articles/February2025/8Uwt90lgjyYdMxhGP7em.webp',
  '/uploads/articles/February2025/a4xykSMWzeH4kA0we0Zm.webp',
  '/uploads/articles/February2025/AhmXKG976ukh0ppXkk4A.webp',
  '/uploads/articles/February2025/ajndXNDcROAIaXJss0fa.webp',
  '/uploads/articles/February2025/AkVBxuq6DXrq1QVUDrC3.webp',
  '/uploads/articles/February2025/AL1Yaro8oxaQ0vW8RE4T.webp',
  '/uploads/articles/February2025/ARksA0fM745fhGFD9LDc.webp',
  '/uploads/articles/February2025/aTq3Q8bB29Z6nbjfgBtj.webp',
  '/uploads/articles/February2025/atTUaQYjlIU88Jgy9Akl.webp',
  '/uploads/articles/February2025/aYABdsfFNETW1zTVtBYW.webp',
  '/uploads/articles/February2025/BG3WPUflZoFT8s9ibKQv.webp',
  '/uploads/articles/February2025/bMPoXGG1mSbdaVF6GGMJ.webp',
  '/uploads/articles/February2025/BSCwWe92R8K06oKBLBEH.webp',
  '/uploads/articles/February2025/c2S9AnYpRzLMQofEgbu0.webp',
  '/uploads/articles/February2025/C6nzcjY00L6TjVdTjWJq.webp',
  '/uploads/articles/February2025/cCjFsvFbcsTbgFyCoIk7.webp',
  '/uploads/articles/February2025/cFmTfLaD2xsnjjNQBNBr.webp',
  '/uploads/articles/February2025/CoYiiXFS3XExTWGPUCqk.webp',
  '/uploads/articles/February2025/cSE5NyMlhHqfo0O1EKjS.webp',
  '/uploads/articles/February2025/d6QsnmAF1UWDZGroig7c.webp',
  '/uploads/articles/February2025/dflNAS2ij18fTOtVvZKP.webp',
  '/uploads/articles/February2025/E1UOytCBufoispXWVUFd.webp',
  '/uploads/articles/February2025/EoWemDJE8aO5eR06oPPl.webp',
  '/uploads/articles/February2025/es78jxzs24Xc7WAChn8L.jpg',
  '/uploads/articles/February2025/F1eJziDg1QK0YTeBJ1zu.jpg',
  '/uploads/articles/February2025/f8lXiHfQpvxabEJzYGuQ.webp',
  '/uploads/articles/February2025/fFETA57imD3L63Jcje4f.webp',
  '/uploads/articles/February2025/GBX7LUKIHtilsL3nQUDN.webp',
  '/uploads/articles/February2025/GnvtIC79lXxhlmMgigjU.webp',
  '/uploads/articles/February2025/gzKOw5SUVRJtPxJNpFZu.webp',
  '/uploads/articles/February2025/GzwZ92CaYbrPzBCL9KXQ.webp',
  '/uploads/articles/February2025/h8Audd2ALJ1IxJdQNKZt.jpg',
  '/uploads/articles/February2025/HcHDhn1cMNPBIbldmCRW.webp',
  '/uploads/articles/February2025/hlumgZpZcE5g46X1HEmv.webp',
  '/uploads/articles/February2025/i9evG6Tr2VjtDgY1FikF.webp',
  '/uploads/articles/February2025/iddCmbD7l0QaVXsMyktB.webp',
  '/uploads/articles/February2025/If9qPSlAqEyDVj1K1Jiv.webp',
  '/uploads/articles/February2025/ilUNJBmwjHiizZYgbSAk.webp',
  '/uploads/articles/February2025/io3xSxfBre1kLO0Jtlao.webp',
  '/uploads/articles/February2025/IVctoNnbCpNgrDXy9XSP.webp',
  '/uploads/articles/February2025/IyoldDWvLXRIvkg5MwSy.webp',
  '/uploads/articles/February2025/JWcY0nNxgkKhveOX2gO8.webp',
  '/uploads/articles/February2025/jzb5J8ubMNo39xBopF8l.webp',
  '/uploads/articles/February2025/K19AscblLmlLOmyVtAeH.webp',
  '/uploads/articles/February2025/k1OJkN6tEEFBiGEhMudj.webp',
  '/uploads/articles/February2025/k1TbwO7BPVwPQAf4Crnv.webp',
  '/uploads/articles/February2025/KATLahtaVQjzq1RcSrGL.webp',
  '/uploads/articles/February2025/kYtVUcQw2tJoKmWmjGyt.webp',
  '/uploads/articles/February2025/l2uLrPDYBBXKnJzlB8uH.webp',
  '/uploads/articles/February2025/LE87qljkoMDXrCE3u0SG.webp',
  '/uploads/articles/February2025/lOL0QHyGWJv7XE6RlUu3.webp',
  '/uploads/articles/February2025/ls5eCDj2HpQjU04OYiPE.webp',
  '/uploads/articles/February2025/lTzpbtWLfE4wYB2zj6s8.webp',
  '/uploads/articles/February2025/lXVSGF8ofVkNRhsT2vS3.webp',
  '/uploads/articles/February2025/M0Wyb7EqzZkahGyaG9Cb.webp',
  '/uploads/articles/February2025/MsDuqyXEcIhEwuGgHXiQ.webp',
  '/uploads/articles/February2025/MSyxKUfVe7oNGJa0DeDN.webp',
  '/uploads/articles/February2025/nyCaOIJEVBI8EMmTGCIy.webp',
  '/uploads/articles/February2025/nYWjWU6LqpOcJmzLvNQ4.webp',
  '/uploads/articles/February2025/nzlvHgX79YnINWi6rhsE.webp',
  '/uploads/articles/February2025/OHeuKnXS6XXxXlmFzpaw.webp',
  '/uploads/articles/February2025/oWDDVR3GwSt0wG6YZJc5.webp',
  '/uploads/articles/February2025/PdVTpHazBfBj5P3cW2cP.webp',
  '/uploads/articles/February2025/pfcMRKbQLFNNqxpUUJKi.webp',
  '/uploads/articles/February2025/pGmtEvNBMyJckurGxA2p.webp',
  '/uploads/articles/February2025/QcmNshC0nYz2txsevjvu.webp',
  '/uploads/articles/February2025/qMv3bDkzkOaM3prFRIuH.webp',
  '/uploads/articles/February2025/QQTG0KgnVTY6wlTlMhLp.webp',
  '/uploads/articles/February2025/QtC72fRjZBi40AISIjqW.webp',
];

let currentImageIndex = 0;
function getNextImage(): string {
  const image = ARTICLE_IMAGES[currentImageIndex % ARTICLE_IMAGES.length];
  currentImageIndex++;
  return image;
}

export const blogsSeedData = [
  {
    title: 'Guide Ultime de la Protéine Whey',
    title_fr: 'Guide Ultime de la Protéine Whey',
    slug: 'guide-ultime-proteine-whey',
    category: 'Compléments',
    excerpt: 'Découvrez tout ce que vous devez savoir sur la whey : types, bienfaits, timing optimal et comment choisir la meilleure pour vos objectifs.',
    content: `<h2>Qu'est-ce que la Whey Protein?</h2>
<p>La whey, ou protéine de lactosérum, est l'une des deux protéines présentes dans le lait (l'autre étant la caséine). C'est une protéine complète contenant tous les acides aminés essentiels.</p>

<h3>Types de Whey</h3>
<ul>
<li><strong>Whey Concentrée:</strong> 70-80% de protéines, contient un peu de lactose et de graisses</li>
<li><strong>Whey Isolate:</strong> 90%+ de protéines, très faible en lactose et graisses</li>
<li><strong>Whey Hydrolysée:</strong> Pré-digérée pour une absorption ultra-rapide</li>
</ul>

<h3>Bienfaits Principaux</h3>
<p>La whey est rapidement absorbée, ce qui en fait le choix idéal post-entraînement. Elle stimule la synthèse protéique musculaire et favorise la récupération.</p>`,
    image: { url: getNextImage(), alt: 'Whey Protein Guide' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['protéines', 'whey', 'musculation', 'nutrition'],
    reading_time: '8 min',
    views: 1245,
  },
  {
    title: 'Créatine: Bienfaits Scientifiquement Prouvés',
    title_fr: 'Créatine: Bienfaits Scientifiquement Prouvés',
    slug: 'creatine-bienfaits-scientifiques',
    category: 'Compléments',
    excerpt: 'La créatine est l\'un des suppléments les plus étudiés. Découvrez ses bienfaits réels, la posologie optimale et les mythes à éviter.',
    content: `<h2>Qu'est-ce que la Créatine?</h2>
<p>La créatine est une molécule naturellement présente dans nos muscles. Elle joue un rôle crucial dans la production d'énergie rapide lors d'efforts intenses.</p>

<h3>Bienfaits Scientifiques</h3>
<ul>
<li>Amélioration des performances en force (+15-20%)</li>
<li>Augmentation de la masse musculaire maigre</li>
<li>Récupération améliorée entre les séries</li>
<li>Bénéfices cognitifs potentiels</li>
</ul>

<h3>Dosage Recommandé</h3>
<p><strong>Phase de charge:</strong> 20g/jour pendant 5-7 jours (optionnel)</p>
<p><strong>Phase d'entretien:</strong> 3-5g/jour en continu</p>`,
    image: { url: getNextImage(), alt: 'Creatine Benefits' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['créatine', 'performance', 'force', 'science'],
    reading_time: '6 min',
    views: 987,
  },
  {
    title: '10 Idées de Petit-Déjeuner Riche en Protéines',
    title_fr: '10 Idées de Petit-Déjeuner Riche en Protéines',
    slug: 'petit-dejeuner-proteine',
    category: 'Recettes',
    excerpt: 'Commencez votre journée avec ces délicieux petit-déjeuners riches en protéines qui vous garderont rassasié et énergique.',
    content: `<h2>Pourquoi les Protéines au Petit-Déjeuner?</h2>
<p>Un petit-déjeuner riche en protéines aide à contrôler l'appétit, maintient la masse musculaire et stabilise la glycémie tout au long de la matinée.</p>

<h3>Top 10 Recettes</h3>
<ol>
<li><strong>Omelette aux Blancs d'Œufs:</strong> 5 blancs + légumes (30g protéines)</li>
<li><strong>Greek Yogurt Bowl:</strong> Yaourt grec + granola + fruits (25g)</li>
<li><strong>Protein Pancakes:</strong> Banane + œufs + whey (28g)</li>
<li><strong>Smoothie Protéiné:</strong> Whey + banane + beurre d'amande (35g)</li>
<li><strong>Cottage Cheese Toast:</strong> Pain complet + fromage blanc + saumon fumé (30g)</li>
</ol>`,
    image: { url: getNextImage(), alt: 'High Protein Breakfast' },
    author: 'Chef Antoine Health',
    published: true,
    tags: ['recettes', 'petit-déjeuner', 'protéines', 'nutrition'],
    reading_time: '5 min',
    views: 2103,
  },
  {
    title: 'BCAA vs EAA: Lequel Choisir?',
    title_fr: 'BCAA vs EAA: Lequel Choisir?',
    slug: 'bcaa-vs-eaa-comparaison',
    category: 'Compléments',
    excerpt: 'BCAA ou EAA? Comprendre les différences entre ces acides aminés et déterminer lequel correspond le mieux à vos objectifs.',
    content: `<h2>BCAA: Les Basics</h2>
<p>Les BCAA (Branched-Chain Amino Acids) sont 3 acides aminés essentiels: leucine, isoleucine et valine.</p>

<h2>EAA: La Version Complète</h2>
<p>Les EAA (Essential Amino Acids) incluent les 9 acides aminés essentiels que votre corps ne peut pas produire.</p>

<h3>Comparaison</h3>
<table>
<tr><th>Aspect</th><th>BCAA</th><th>EAA</th></tr>
<tr><td>Acides aminés</td><td>3 (Leu, Ile, Val)</td><td>9 essentiels</td></tr>
<tr><td>Synthèse protéique</td><td>Stimule</td><td>Complète</td></tr>
<tr><td>Prix</td><td>Moins cher</td><td>Plus cher</td></tr>
</table>

<h3>Verdict</h3>
<p>Les EAA sont scientifiquement supérieurs pour la croissance musculaire car ils fournissent tous les éléments nécessaires.</p>`,
    image: { url: getNextImage(), alt: 'BCAA vs EAA' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['BCAA', 'EAA', 'acides aminés', 'science'],
    reading_time: '7 min',
    views: 856,
  },
  {
    title: 'Nutrition Pré-Entraînement: Guide Complet',
    title_fr: 'Nutrition Pré-Entraînement: Guide Complet',
    slug: 'nutrition-pre-entrainement',
    category: 'Nutrition',
    excerpt: 'Optimisez vos performances avec ces stratégies de nutrition pré-entraînement basées sur la science.',
    content: `<h2>Timing des Repas</h2>
<p>Le timing de votre repas pré-workout influence directement votre performance et votre confort digestif.</p>

<h3>Options selon le Timing</h3>
<ul>
<li><strong>2-3h avant:</strong> Repas complet (protéines + glucides + graisses saines)</li>
<li><strong>1-2h avant:</strong> Snack léger (banane + beurre d'amande)</li>
<li><strong>30-60min avant:</strong> Liquide/rapide (shake protéiné + fruits)</li>
</ul>

<h3>Suppléments Pré-Workout</h3>
<p><strong>Caféine:</strong> 200-400mg pour l'énergie et la concentration</p>
<p><strong>Créatine:</strong> 5g améliore la force et l'endurance</p>
<p><strong>Citrulline:</strong> 6-8g pour la congestion musculaire</p>
<p><strong>Bêta-Alanine:</strong> 3-5g réduit la fatigue musculaire</p>`,
    image: { url: getNextImage(), alt: 'Pre-Workout Nutrition' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['nutrition', 'pré-workout', 'performance', 'timing'],
    reading_time: '9 min',
    views: 1432,
  },
  {
    title: 'Meal Prep pour la Prise de Masse',
    title_fr: 'Meal Prep pour la Prise de Masse',
    slug: 'meal-prep-prise-masse',
    category: 'Recettes',
    excerpt: 'Plans de repas et recettes simples pour préparer une semaine de nutrition optimale pour la croissance musculaire.',
    content: `<h2>Les Fondamentaux du Meal Prep</h2>
<p>Le meal prep vous permet de contrôler vos macros, économiser du temps et rester constant dans votre nutrition.</p>

<h3>Plan Hebdomadaire (3000 kcal/jour)</h3>
<p><strong>Repas 1 - Petit-déjeuner:</strong></p>
<ul>
<li>100g flocons d'avoine</li>
<li>4 œufs entiers</li>
<li>1 banane</li>
<li>Protéines: 35g | Glucides: 65g | Lipides: 20g</li>
</ul>

<p><strong>Repas 2 - Déjeuner:</strong></p>
<ul>
<li>200g poulet grillé</li>
<li>250g riz basmati</li>
<li>Légumes vapeur</li>
<li>Protéines: 50g | Glucides: 70g | Lipides: 10g</li>
</ul>

<h3>Tips Meal Prep</h3>
<ol>
<li>Cuisinez par batch le dimanche</li>
<li>Utilisez des contenants compartimentés</li>
<li>Variez les sauces pour éviter la monotonie</li>
</ol>`,
    image: { url: getNextImage(), alt: 'Meal Prep Muscle Gain' },
    author: 'Chef Antoine Health',
    published: true,
    tags: ['meal prep', 'recettes', 'prise de masse', 'nutrition'],
    reading_time: '10 min',
    views: 1789,
  },
  {
    title: 'Comprendre les Macronutriments',
    title_fr: 'Comprendre les Macronutriments',
    slug: 'comprendre-macronutriments',
    category: 'Nutrition',
    excerpt: 'Guide complet sur les protéines, glucides et lipides: rôles, sources et ratios optimaux pour vos objectifs.',
    content: `<h2>Les 3 Macronutriments Essentiels</h2>

<h3>1. Protéines (4 kcal/g)</h3>
<p><strong>Rôle:</strong> Construction et réparation musculaire, enzymes, hormones</p>
<p><strong>Sources:</strong> Viandes, poissons, œufs, produits laitiers, légumineuses</p>
<p><strong>Besoins:</strong> 1.6-2.2g par kg de poids corporel pour les athlètes</p>

<h3>2. Glucides (4 kcal/g)</h3>
<p><strong>Rôle:</strong> Source d'énergie principale, performance sportive</p>
<p><strong>Sources:</strong> Riz, pâtes, pain, fruits, légumes</p>
<p><strong>Besoins:</strong> 3-7g/kg selon l'activité</p>

<h3>3. Lipides (9 kcal/g)</h3>
<p><strong>Rôle:</strong> Hormones, absorption de vitamines, énergie</p>
<p><strong>Sources:</strong> Huiles, noix, avocats, poissons gras</p>
<p><strong>Besoins:</strong> 0.8-1.2g/kg minimum</p>`,
    image: { url: getNextImage(), alt: 'Understanding Macros' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['macronutriments', 'nutrition', 'basics', 'éducation'],
    reading_time: '8 min',
    views: 2456,
  },
  {
    title: 'Meilleurs Suppléments pour Débutants',
    title_fr: 'Meilleurs Suppléments pour Débutants',
    slug: 'supplements-debutants',
    category: 'Compléments',
    excerpt: 'Nouveau dans le monde des suppléments? Voici les essentiels qui apportent réellement des résultats.',
    content: `<h2>Top 5 Suppléments pour Démarrer</h2>

<h3>1. Protéine Whey</h3>
<p>Le supplément le plus utile pour atteindre vos besoins protéiques quotidiens facilement.</p>
<p><strong>Dosage:</strong> 1-2 scoops par jour (25-50g protéines)</p>

<h3>2. Créatine Monohydrate</h3>
<p>Le supplément le plus étudié et efficace pour la force et la masse musculaire.</p>
<p><strong>Dosage:</strong> 5g par jour</p>

<h3>3. Multivitamines</h3>
<p>Assurance nutritionnelle pour combler les carences potentielles.</p>
<p><strong>Dosage:</strong> Selon recommandations du produit</p>

<h3>4. Oméga-3</h3>
<p>Anti-inflammatoire, santé cardiovasculaire et cérébrale.</p>
<p><strong>Dosage:</strong> 2-3g EPA+DHA par jour</p>

<h3>5. Vitamine D3</h3>
<p>Essentielle pour les os, l'immunité et la performance.</p>
<p><strong>Dosage:</strong> 2000-5000 UI par jour</p>`,
    image: { url: getNextImage(), alt: 'Best Supplements Beginners' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['suppléments', 'débutants', 'essentiels', 'guide'],
    reading_time: '6 min',
    views: 3201,
  },
  {
    title: 'Sèche: Stratégie Complète',
    title_fr: 'Sèche: Stratégie Complète',
    slug: 'seche-strategie-complete',
    category: 'Nutrition',
    excerpt: 'Guide étape par étape pour perdre du gras tout en préservant votre masse musculaire durement acquise.',
    content: `<h2>Phase de Sèche: Les Fondamentaux</h2>

<h3>1. Calculer vos Besoins</h3>
<p>Commencez avec un déficit de 300-500 kcal sous votre maintenance.</p>

<h3>2. Macros pour la Sèche</h3>
<ul>
<li><strong>Protéines:</strong> 2-2.5g/kg (priorité pour préserver le muscle)</li>
<li><strong>Lipides:</strong> 0.8-1g/kg (santé hormonale)</li>
<li><strong>Glucides:</strong> Le reste des calories</li>
</ul>

<h3>3. Stratégies Avancées</h3>
<p><strong>Refeeds:</strong> 1 jour/semaine avec glucides élevés</p>
<p><strong>NEAT:</strong> Augmentez l'activité quotidienne (marche)</p>
<p><strong>Cardio:</strong> 2-3 sessions LISS par semaine</p>

<h3>4. Suppléments Utiles</h3>
<ul>
<li>Caféine: thermogène et énergie</li>
<li>EAA: préservation musculaire en déficit</li>
<li>Multivitamines: combler les carences</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Cutting Diet Strategy' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['sèche', 'perte de gras', 'diet', 'stratégie'],
    reading_time: '11 min',
    views: 1876,
  },
  {
    title: 'Timing de la Nutrition Post-Entraînement',
    title_fr: 'Timing de la Nutrition Post-Entraînement',
    slug: 'nutrition-post-entrainement',
    category: 'Nutrition',
    excerpt: 'La fenêtre anabolique existe-t-elle vraiment? Tout sur la nutrition post-workout basée sur la science.',
    content: `<h2>Mythes et Réalités</h2>

<h3>La Fenêtre Anabolique</h3>
<p>Contrairement à la croyance populaire, la "fenêtre" est beaucoup plus large que 30 minutes. L'important est votre nutrition totale sur 24h.</p>

<h3>Timing Post-Workout</h3>
<p><strong>Idéal:</strong> Dans les 2-3h après l'entraînement</p>
<p><strong>Acceptable:</strong> Même 4-6h si vos besoins totaux sont atteints</p>

<h3>Composition du Repas</h3>
<p><strong>Protéines:</strong> 20-40g de protéines rapidement absorbées</p>
<p><strong>Glucides:</strong> 0.5-1g/kg pour reconstituer le glycogène</p>
<p><strong>Ratio:</strong> 2:1 ou 3:1 (glucides:protéines)</p>

<h3>Exemples de Repas</h3>
<ul>
<li>2 scoops whey + banane + miel</li>
<li>Poulet + riz + légumes</li>
<li>Shake: whey + avoine + fruits</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Post-Workout Nutrition' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['post-workout', 'nutrition', 'timing', 'récupération'],
    reading_time: '7 min',
    views: 1234,
  },
  {
    title: 'Guide des Protéines Végétales',
    title_fr: 'Guide des Protéines Végétales',
    slug: 'proteines-vegetales-guide',
    category: 'Nutrition',
    excerpt: 'Sources de protéines végétales complètes pour construire du muscle sans produits animaux.',
    content: `<h2>Protéines Végétales Complètes</h2>

<h3>Top Sources (par 100g)</h3>
<ul>
<li><strong>Tempeh:</strong> 19g protéines, profil complet</li>
<li><strong>Edamame:</strong> 11g, tous les acides aminés</li>
<li><strong>Quinoa:</strong> 14g (cuit), protéine complète</li>
<li><strong>Graines de chanvre:</strong> 32g, omega-3</li>
<li><strong>Spiruline:</strong> 57g, B12, fer</li>
</ul>

<h3>Combinaisons Protéiques</h3>
<p>Associez différentes sources pour obtenir un profil complet:</p>
<ul>
<li>Riz + Haricots</li>
<li>Pain + Beurre d'arachide</li>
<li>Pâtes + Lentilles</li>
</ul>

<h3>Suppléments Vegan</h3>
<p><strong>Protéine en poudre:</strong> Pois, riz, chanvre combinés</p>
<p><strong>B12:</strong> 1000mcg par jour</p>
<p><strong>Créatine:</strong> 5g/jour (vegan friendly)</p>`,
    image: { url: getNextImage(), alt: 'Vegan Protein Guide' },
    author: 'Chef Antoine Health',
    published: true,
    tags: ['vegan', 'végétal', 'protéines', 'nutrition'],
    reading_time: '8 min',
    views: 1543,
  },
  {
    title: 'Sommeil et Récupération Musculaire',
    title_fr: 'Sommeil et Récupération Musculaire',
    slug: 'sommeil-recuperation-musculaire',
    category: 'Lifestyle',
    excerpt: 'Le sommeil est le supplément le plus sous-estimé. Découvrez comment optimiser votre récupération nocturne.',
    content: `<h2>Pourquoi le Sommeil est Crucial</h2>
<p>Pendant le sommeil, votre corps libère 70% de son hormone de croissance quotidienne et répare les tissus musculaires endommagés.</p>

<h3>Recommandations pour les Athlètes</h3>
<ul>
<li><strong>Durée:</strong> 7-9h par nuit minimum</li>
<li><strong>Régularité:</strong> Se coucher/lever à heures fixes</li>
<li><strong>Qualité:</strong> Sommeil profond ininterrompu</li>
</ul>

<h3>Optimiser votre Sommeil</h3>
<p><strong>1-2h avant:</strong></p>
<ul>
<li>Éviter les écrans (lumière bleue)</li>
<li>Température fraîche (18-20°C)</li>
<li>Obscurité totale</li>
<li>Bruit blanc si nécessaire</li>
</ul>

<h3>Suppléments pour le Sommeil</h3>
<ul>
<li><strong>Magnésium:</strong> 400mg 1h avant</li>
<li><strong>Glycine:</strong> 3g améliore la qualité</li>
<li><strong>Mélatonine:</strong> 0.5-3mg (occasionnel)</li>
<li><strong>ZMA:</strong> Zinc, magnésium, B6</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Sleep and Recovery' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['sommeil', 'récupération', 'lifestyle', 'performance'],
    reading_time: '9 min',
    views: 2187,
  },
  {
    title: 'Hydratation pour la Performance',
    title_fr: 'Hydratation pour la Performance',
    slug: 'hydratation-performance',
    category: 'Lifestyle',
    excerpt: 'Une déshydratation de seulement 2% peut réduire vos performances de 20%. Guide complet de l\'hydratation.',
    content: `<h2>Besoins Hydriques des Athlètes</h2>

<h3>Calcul de Base</h3>
<p><strong>Formule:</strong> Poids (kg) x 0.033 = Litres par jour</p>
<p><strong>Exemple:</strong> 80kg x 0.033 = 2.64L minimum</p>

<h3>Ajustements selon l'Activité</h3>
<ul>
<li>Entraînement léger: +500ml</li>
<li>Entraînement intense: +1-1.5L</li>
<li>Chaleur/humidité: +500ml-1L</li>
</ul>

<h3>Timing de l'Hydratation</h3>
<p><strong>Avant entraînement:</strong> 400-600ml 2-3h avant</p>
<p><strong>Pendant:</strong> 200-300ml toutes les 15-20min</p>
<p><strong>Après:</strong> 150% du poids perdu en sueur</p>

<h3>Électrolytes</h3>
<p>Pour entraînements >60min:</p>
<ul>
<li>Sodium: 300-600mg/L</li>
<li>Potassium: 100-200mg/L</li>
<li>Magnésium: 50-100mg/L</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Hydration Performance' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['hydratation', 'performance', 'lifestyle', 'santé'],
    reading_time: '6 min',
    views: 1098,
  },
  {
    title: 'Jeûne Intermittent pour Athlètes',
    title_fr: 'Jeûne Intermittent pour Athlètes',
    slug: 'jeune-intermittent-athletes',
    category: 'Nutrition',
    excerpt: 'Le jeûne intermittent peut-il coexister avec la performance sportive? Protocoles et considérations.',
    content: `<h2>Protocoles de Jeûne</h2>

<h3>16/8 (Le Plus Populaire)</h3>
<p>16h de jeûne, 8h de fenêtre alimentaire</p>
<p><strong>Exemple:</strong> Jeûne de 20h à 12h, manger de 12h à 20h</p>

<h3>14/10 (Pour Débutants)</h3>
<p>14h de jeûne, 10h d'alimentation</p>
<p>Plus facile à maintenir à long terme</p>

<h3>Warrior Diet (20/4)</h3>
<p>20h de jeûne, 4h d'alimentation</p>
<p>Avancé, nécessite adaptation</p>

<h3>Entraînement et Jeûne</h3>
<p><strong>À jeun:</strong></p>
<ul>
<li>✅ Cardio léger/modéré</li>
<li>⚠️ HIIT (possible mais intense)</li>
<li>❌ Musculation lourde (sous-optimal)</li>
</ul>

<h3>Considérations Importantes</h3>
<ul>
<li>Toujours atteindre vos macros totales</li>
<li>EAA pendant le jeûne si entraînement</li>
<li>Pas optimal pour prise de masse pure</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Intermittent Fasting Athletes' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['jeûne intermittent', 'IF', 'nutrition', 'timing'],
    reading_time: '10 min',
    views: 1765,
  },
  {
    title: 'Caséine vs Whey: Protéine de Nuit',
    title_fr: 'Caséine vs Whey: Protéine de Nuit',
    slug: 'caseine-vs-whey-nuit',
    category: 'Compléments',
    excerpt: 'Faut-il prendre de la caséine avant de dormir? Comparaison et recommandations basées sur la science.',
    content: `<h2>Les Différences Clés</h2>

<h3>Vitesse d'Absorption</h3>
<p><strong>Whey:</strong> Absorption rapide (1-2h)</p>
<p><strong>Caséine:</strong> Absorption lente (6-8h)</p>

<h3>Moment Optimal</h3>
<p><strong>Whey:</strong></p>
<ul>
<li>Au réveil</li>
<li>Post-entraînement</li>
<li>Entre les repas</li>
</ul>

<p><strong>Caséine:</strong></p>
<ul>
<li>Avant le coucher</li>
<li>Périodes de jeûne prolongé</li>
<li>Entre les gros repas</li>
</ul>

<h3>Bénéfices de la Caséine Nocturne</h3>
<ul>
<li>Anti-catabolique pendant le sommeil</li>
<li>Synthèse protéique soutenue 8h</li>
<li>Satiété prolongée</li>
<li>Amélioration de la récupération</li>
</ul>

<h3>Dosage Recommandé</h3>
<p>30-40g de caséine micellaire 30min avant le coucher</p>`,
    image: { url: getNextImage(), alt: 'Casein vs Whey Night' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['caséine', 'whey', 'protéines', 'timing'],
    reading_time: '7 min',
    views: 1432,
  },
  {
    title: 'Top 15 Aliments Brûle-Graisse',
    title_fr: 'Top 15 Aliments Brûle-Graisse',
    slug: 'aliments-brule-graisse',
    category: 'Nutrition',
    excerpt: 'Ces aliments augmentent légèrement votre métabolisme et facilitent la perte de graisse de manière naturelle.',
    content: `<h2>Aliments Thermogéniques</h2>

<h3>Les 15 Meilleurs</h3>
<ol>
<li><strong>Piment de Cayenne:</strong> Capsaïcine active le métabolisme</li>
<li><strong>Thé Vert:</strong> EGCG + caféine, oxydation des graisses</li>
<li><strong>Café:</strong> Caféine thermogénique puissant</li>
<li><strong>Eau Glacée:</strong> Calories brûlées pour réchauffer</li>
<li><strong>Poissons Gras:</strong> Omega-3 anti-inflammatoire</li>
<li><strong>Œufs Entiers:</strong> Protéines + choline</li>
<li><strong>Vinaigre de Cidre:</strong> Contrôle glycémie</li>
<li><strong>Cannelle:</strong> Sensibilité à l'insuline</li>
<li><strong>Gingembre:</strong> Thermogénique naturel</li>
<li><strong>Légumes Crucifères:</strong> Fibre + volume</li>
<li><strong>Pamplemousse:</strong> Contrôle appétit</li>
<li><strong>Yaourt Grec:</strong> Probiotiques + protéines</li>
<li><strong>Baies:</strong> Antioxydants + fibres</li>
<li><strong>Noix:</strong> Graisses saines + satiété</li>
<li><strong>Poulet/Dinde:</strong> Effet thermique élevé</li>
</ol>

<p><strong>Note:</strong> Ces aliments aident mais ne compensent pas un mauvais régime global!</p>`,
    image: { url: getNextImage(), alt: 'Fat Burning Foods' },
    author: 'Chef Antoine Health',
    published: true,
    tags: ['nutrition', 'perte de gras', 'aliments', 'métabolisme'],
    reading_time: '8 min',
    views: 2876,
  },
  {
    title: 'Carb Cycling Expliqué',
    title_fr: 'Carb Cycling Expliqué',
    slug: 'carb-cycling-explique',
    category: 'Nutrition',
    excerpt: 'Stratégie avancée de manipulation des glucides pour optimiser la composition corporelle et la performance.',
    content: `<h2>Qu'est-ce que le Carb Cycling?</h2>
<p>Alternance stratégique de jours riches et faibles en glucides selon vos entraînements et objectifs.</p>

<h3>Protocole de Base</h3>
<p><strong>Jours High Carbs:</strong> Entraînement intense (jambes, dos)</p>
<ul>
<li>Protéines: 2g/kg</li>
<li>Glucides: 4-5g/kg</li>
<li>Lipides: 0.5g/kg</li>
</ul>

<p><strong>Jours Moderate Carbs:</strong> Entraînement modéré (bras, épaules)</p>
<ul>
<li>Protéines: 2g/kg</li>
<li>Glucides: 2-3g/kg</li>
<li>Lipides: 0.7g/kg</li>
</ul>

<p><strong>Jours Low Carbs:</strong> Repos ou cardio léger</p>
<ul>
<li>Protéines: 2.2g/kg</li>
<li>Glucides: 0.5-1g/kg</li>
<li>Lipides: 1g/kg</li>
</ul>

<h3>Avantages</h3>
<ul>
<li>Optimisation hormonale (leptine, insuline)</li>
<li>Performance maintenue</li>
<li>Flexibilité métabolique</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Carb Cycling' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['carb cycling', 'glucides', 'stratégie', 'avancé'],
    reading_time: '9 min',
    views: 1654,
  },
  {
    title: 'Oméga-3: Guide Complet',
    title_fr: 'Oméga-3: Guide Complet',
    slug: 'omega-3-guide-complet',
    category: 'Compléments',
    excerpt: 'Tout sur les acides gras essentiels: EPA, DHA, sources, dosage et bénéfices prouvés.',
    content: `<h2>Types d'Oméga-3</h2>

<h3>EPA (Acide Eicosapentaénoïque)</h3>
<p>Anti-inflammatoire puissant, santé cardiovasculaire</p>

<h3>DHA (Acide Docosahexaénoïque)</h3>
<p>Santé cérébrale, vision, développement neurologique</p>

<h3>ALA (Végétal)</h3>
<p>Conversion limitée (5-10%) en EPA/DHA</p>

<h2>Sources Alimentaires</h2>
<ul>
<li><strong>Saumon sauvage:</strong> 2.5g par portion</li>
<li><strong>Maquereau:</strong> 3g par portion</li>
<li><strong>Sardines:</strong> 2g par portion</li>
<li><strong>Graines de lin:</strong> ALA (végétal)</li>
<li><strong>Noix:</strong> ALA</li>
</ul>

<h3>Dosage Recommandé</h3>
<p><strong>Général:</strong> 2-3g EPA+DHA combinés</p>
<p><strong>Athlètes:</strong> 3-4g pour anti-inflammatoire</p>
<p><strong>Ratio:</strong> 2:1 EPA:DHA optimal</p>

<h3>Bénéfices Scientifiques</h3>
<ul>
<li>Réduction inflammation</li>
<li>Santé cardiovasculaire</li>
<li>Fonction cognitive</li>
<li>Récupération musculaire</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Omega-3 Guide' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['omega-3', 'suppléments', 'santé', 'anti-inflammatoire'],
    reading_time: '8 min',
    views: 1345,
  },
  {
    title: '5 Erreurs Courantes de Régime',
    title_fr: '5 Erreurs Courantes de Régime',
    slug: 'erreurs-courantes-regime',
    category: 'Nutrition',
    excerpt: 'Évitez ces erreurs fréquentes qui sabotent vos progrès et ralentissent vos résultats.',
    content: `<h2>Les 5 Erreurs qui Bloquent vos Progrès</h2>

<h3>1. Déficit Calorique Trop Agressif</h3>
<p><strong>Erreur:</strong> Couper 1000+ kcal d'un coup</p>
<p><strong>Solution:</strong> Déficit modéré de 300-500 kcal maximum</p>
<p><strong>Pourquoi:</strong> Préserve le muscle et le métabolisme</p>

<h3>2. Protéines Insuffisantes</h3>
<p><strong>Erreur:</strong> Moins de 1.6g/kg</p>
<p><strong>Solution:</strong> 1.8-2.2g/kg en déficit calorique</p>
<p><strong>Pourquoi:</strong> Préservation musculaire cruciale</p>

<h3>3. Éliminer les Glucides</h3>
<p><strong>Erreur:</strong> Zéro glucides = performance minimale</p>
<p><strong>Solution:</strong> Au moins 2g/kg même en sèche</p>
<p><strong>Pourquoi:</strong> Énergie pour entraînements intenses</p>

<h3>4. Négliger les Lipides</h3>
<p><strong>Erreur:</strong> Graisses sous 0.5g/kg</p>
<p><strong>Solution:</strong> 0.8-1g/kg minimum</p>
<p><strong>Pourquoi:</strong> Production hormonale essentielle</p>

<h3>5. Pas de Tracking</h3>
<p><strong>Erreur:</strong> Estimation à l'œil</p>
<p><strong>Solution:</strong> Peser et tracker au moins 2 semaines</p>
<p><strong>Pourquoi:</strong> Objectivité et ajustements précis</p>`,
    image: { url: getNextImage(), alt: 'Diet Mistakes' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['erreurs', 'régime', 'diet', 'conseils'],
    reading_time: '7 min',
    views: 2234,
  },
  {
    title: 'Vitamine D: La Vitamine Soleil',
    title_fr: 'Vitamine D: La Vitamine Soleil',
    slug: 'vitamine-d-soleil',
    category: 'Compléments',
    excerpt: 'Pourquoi 80% des athlètes sont carencés et comment optimiser vos niveaux de vitamine D.',
    content: `<h2>Importance de la Vitamine D</h2>

<h3>Rôles Essentiels</h3>
<ul>
<li><strong>Santé osseuse:</strong> Absorption du calcium</li>
<li><strong>Système immunitaire:</strong> Défense renforcée</li>
<li><strong>Performance:</strong> Force musculaire optimale</li>
<li><strong>Humeur:</strong> Production de sérotonine</li>
<li><strong>Testostérone:</strong> Niveaux hormonaux</li>
</ul>

<h3>Carence: Symptômes</h3>
<ul>
<li>Fatigue chronique</li>
<li>Douleurs musculaires</li>
<li>Récupération lente</li>
<li>Humeur dépressive</li>
<li>Infections fréquentes</li>
</ul>

<h3>Sources et Dosage</h3>
<p><strong>Soleil:</strong> 15-30min exposition quotidienne</p>
<p><strong>Alimentaire:</strong> Poissons gras, œufs enrichis (insuffisant seul)</p>
<p><strong>Supplémentation:</strong></p>
<ul>
<li>Maintenance: 2000-4000 UI/jour</li>
<li>Correction carence: 5000-10000 UI/jour</li>
<li>Forme: D3 (cholécalciférol) supérieure</li>
</ul>

<h3>Test Sanguin</h3>
<p>Optimal: 50-70 ng/mL (125-175 nmol/L)</p>`,
    image: { url: getNextImage(), alt: 'Vitamin D Guide' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['vitamine D', 'suppléments', 'santé', 'performance'],
    reading_time: '8 min',
    views: 1876,
  },
  {
    title: 'Diète Flexible: Guide IIFYM',
    title_fr: 'Diète Flexible: Guide IIFYM',
    slug: 'diete-flexible-iifym',
    category: 'Nutrition',
    excerpt: 'Si ça rentre dans vos macros (IIFYM), vous pouvez le manger. Guide de la flexibilité alimentaire intelligente.',
    content: `<h2>Qu'est-ce que IIFYM?</h2>
<p>"If It Fits Your Macros" - Liberté alimentaire dans les limites de vos macronutriments quotidiens.</p>

<h3>Principes de Base</h3>
<ol>
<li><strong>Calculez vos macros:</strong> Protéines, glucides, lipides</li>
<li><strong>Atteignez vos totaux:</strong> Peu importe les sources</li>
<li><strong>Aucun aliment interdit:</strong> Tout avec modération</li>
<li><strong>Contexte total:</strong> 24h comptent, pas un repas</li>
</ol>

<h3>Règle 80/20</h3>
<p><strong>80% aliments whole foods:</strong></p>
<ul>
<li>Viandes maigres</li>
<li>Grains complets</li>
<li>Fruits et légumes</li>
<li>Sources saines</li>
</ul>

<p><strong>20% aliments plaisir:</strong></p>
<ul>
<li>Pizza</li>
<li>Glace</li>
<li>Chocolat</li>
<li>Tout ce qui vous fait plaisir!</li>
</ul>

<h3>Avantages</h3>
<ul>
<li>Adhérence à long terme</li>
<li>Pas de frustration</li>
<li>Vie sociale normale</li>
<li>Résultats similaires au clean eating</li>
</ul>

<h3>Applications Recommandées</h3>
<p>MyFitnessPal, MacroFactor, Cronometer</p>`,
    image: { url: getNextImage(), alt: 'Flexible Dieting IIFYM' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['IIFYM', 'diète flexible', 'macros', 'lifestyle'],
    reading_time: '9 min',
    views: 2109,
  },
  {
    title: 'Récupération par Foam Rolling',
    title_fr: 'Récupération par Foam Rolling',
    slug: 'foam-rolling-recuperation',
    category: 'Lifestyle',
    excerpt: 'Technique d\'auto-massage myofascial pour améliorer la récupération et réduire les courbatures.',
    content: `<h2>Qu'est-ce que le Foam Rolling?</h2>
<p>L'auto-massage myofascial aide à détendre les fascias, améliorer la mobilité et accélérer la récupération.</p>

<h3>Bénéfices Scientifiques</h3>
<ul>
<li>Réduction des courbatures (DOMS)</li>
<li>Amélioration de la mobilité articulaire</li>
<li>Augmentation du flux sanguin</li>
<li>Relâchement des tensions</li>
<li>Prévention des blessures</li>
</ul>

<h3>Protocole d'Utilisation</h3>
<p><strong>Durée:</strong> 30-60 secondes par zone</p>
<p><strong>Pression:</strong> Modérée (6-7/10 douleur)</p>
<p><strong>Fréquence:</strong> Quotidienne ou post-workout</p>

<h3>Zones Clés à Cibler</h3>
<ol>
<li><strong>Quadriceps:</strong> Avant des cuisses</li>
<li><strong>IT Band:</strong> Côté externe cuisses</li>
<li><strong>Ischio-jambiers:</strong> Arrière cuisses</li>
<li><strong>Mollets:</strong> Gastrocnémiens</li>
<li><strong>Fessiers:</strong> Piriforme</li>
<li><strong>Dos:</strong> Latissimus, thoracique</li>
</ol>

<h3>Erreurs à Éviter</h3>
<ul>
<li>❌ Rouler trop vite</li>
<li>❌ Appui direct sur articulations</li>
<li>❌ Retenir sa respiration</li>
<li>❌ Sur zones inflammées</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Foam Rolling Recovery' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['foam rolling', 'récupération', 'mobilité', 'lifestyle'],
    reading_time: '7 min',
    views: 1543,
  },
  {
    title: 'Suivre vos Progrès au-delà de la Balance',
    title_fr: 'Suivre vos Progrès au-delà de la Balance',
    slug: 'suivre-progres-balance',
    category: 'Lifestyle',
    excerpt: 'Le poids ne raconte pas toute l\'histoire. Méthodes objectives pour mesurer votre transformation.',
    content: `<h2>Pourquoi la Balance Ment</h2>
<p>Le poids fluctue de 1-3kg quotidiennement à cause de l'hydratation, sodium, glycogène et digestion.</p>

<h3>Méthodes de Suivi Objectives</h3>

<p><strong>1. Photos de Progrès</strong></p>
<ul>
<li>Même heure, même éclairage, même pose</li>
<li>Face, profil, dos</li>
<li>Hebdomadaire ou bi-hebdomadaire</li>
<li>Comparez mois par mois</li>
</ul>

<p><strong>2. Mensurations Corporelles</strong></p>
<ul>
<li>Tour de taille (nombril)</li>
<li>Tour de hanches</li>
<li>Tour de cuisses</li>
<li>Tour de bras</li>
<li>Tour de poitrine</li>
</ul>

<p><strong>3. Performance en Salle</strong></p>
<ul>
<li>Charges soulevées</li>
<li>Répétitions réalisées</li>
<li>Volume total hebdomadaire</li>
<li>Endurance cardio</li>
</ul>

<p><strong>4. Vêtements Témoins</strong></p>
<p>Un jean qui ne rentrait pas? Voilà un progrès réel!</p>

<p><strong>5. Marqueurs de Santé</strong></p>
<ul>
<li>Qualité de sommeil</li>
<li>Niveaux d'énergie</li>
<li>Humeur générale</li>
<li>Récupération</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Progress Tracking' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['progrès', 'tracking', 'mesures', 'transformation'],
    reading_time: '8 min',
    views: 1987,
  },
  {
    title: 'Caféine pour la Performance',
    title_fr: 'Caféine pour la Performance',
    slug: 'cafeine-performance',
    category: 'Compléments',
    excerpt: 'La caféine est l\'ergogène le plus étudié. Dosage, timing et stratégies d\'utilisation optimales.',
    content: `<h2>Comment la Caféine Fonctionne</h2>
<p>Bloque l'adénosine (molécule de fatigue) et stimule le système nerveux central.</p>

<h3>Bénéfices Performance</h3>
<ul>
<li><strong>Force:</strong> +3-5% sur max</li>
<li><strong>Endurance:</strong> +10-15% temps à épuisement</li>
<li><strong>Concentration:</strong> Focus mental amélioré</li>
<li><strong>Perception effort:</strong> Entraînement semble plus facile</li>
<li><strong>Thermogénique:</strong> Légère augmentation métabolisme</li>
</ul>

<h3>Dosage Optimal</h3>
<p><strong>Performance:</strong> 3-6mg par kg de poids corporel</p>
<p><strong>Exemple 80kg:</strong> 240-480mg (2-4 cafés)</p>
<p><strong>Timing:</strong> 30-60min avant entraînement</p>
<p><strong>Pic effet:</strong> 45min après ingestion</p>

<h3>Sources de Caféine</h3>
<ul>
<li><strong>Café:</strong> 100mg par tasse</li>
<li><strong>Pre-workout:</strong> 150-300mg</li>
<li><strong>Pilules:</strong> 200mg standardisé</li>
<li><strong>Thé:</strong> 40-70mg</li>
</ul>

<h3>Stratégies Avancées</h3>
<p><strong>Cycling:</strong> 1 semaine off toutes les 6-8 semaines</p>
<p><strong>Timing:</strong> Éviter 6h avant le coucher</p>`,
    image: { url: getNextImage(), alt: 'Caffeine Performance' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['caféine', 'performance', 'pre-workout', 'suppléments'],
    reading_time: '7 min',
    views: 1654,
  },
  {
    title: 'Magnésium: Le Minéral Oublié',
    title_fr: 'Magnésium: Le Minéral Oublié',
    slug: 'magnesium-mineral-oublie',
    category: 'Compléments',
    excerpt: '300+ réactions enzymatiques dépendent du magnésium. Pourquoi vous en manquez probablement.',
    content: `<h2>Importance du Magnésium</h2>

<h3>Fonctions Critiques</h3>
<ul>
<li><strong>Production d'énergie:</strong> ATP synthesis</li>
<li><strong>Contraction musculaire:</strong> Et relaxation</li>
<li><strong>Système nerveux:</strong> Neurotransmetteurs</li>
<li><strong>Sommeil:</strong> GABA, mélatonine</li>
<li><strong>Santé osseuse:</strong> Avec calcium, vitamine D</li>
</ul>

<h3>Symptômes de Carence</h3>
<ul>
<li>Crampes musculaires fréquentes</li>
<li>Fatigue persistante</li>
<li>Sommeil de mauvaise qualité</li>
<li>Anxiété augmentée</li>
<li>Paupières qui tremblent</li>
</ul>

<h3>Sources Alimentaires</h3>
<p><strong>Riches en magnésium (mg/100g):</strong></p>
<ul>
<li>Graines de courge: 550mg</li>
<li>Amandes: 270mg</li>
<li>Épinards cuits: 87mg</li>
<li>Chocolat noir 70%: 228mg</li>
<li>Avocat: 29mg</li>
</ul>

<h3>Supplémentation</h3>
<p><strong>Formes biodisponibles:</strong></p>
<ul>
<li>Magnésium Glycinate: Absorption optimale, sommeil</li>
<li>Magnésium Citrate: Bonne absorption</li>
<li>Magnésium Threonate: Cerveau</li>
<li>Éviter: Oxyde (faible absorption)</li>
</ul>

<p><strong>Dosage:</strong> 400-600mg/jour</p>
<p><strong>Timing:</strong> Soirée pour sommeil</p>`,
    image: { url: getNextImage(), alt: 'Magnesium Guide' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['magnésium', 'minéraux', 'suppléments', 'sommeil'],
    reading_time: '8 min',
    views: 1432,
  },
  {
    title: 'Timing des Repas pour la Perte de Gras',
    title_fr: 'Timing des Repas pour la Perte de Gras',
    slug: 'timing-repas-perte-gras',
    category: 'Nutrition',
    excerpt: 'Le timing des repas influence-t-il vraiment la perte de gras? Analyse scientifique et recommandations.',
    content: `<h2>Calories In vs Calories Out</h2>
<p>Le timing est secondaire par rapport au total calorique quotidien. MAIS il peut optimiser vos résultats.</p>

<h3>Fréquence des Repas</h3>
<p><strong>Mythes:</strong></p>
<ul>
<li>❌ 6 repas/jour "boost" le métabolisme (faux)</li>
<li>❌ Manger après 18h fait grossir (faux)</li>
<li>❌ Petit-déjeuner obligatoire (faux)</li>
</ul>

<p><strong>Réalité:</strong></p>
<ul>
<li>✅ 3-6 repas = résultats similaires si calories égales</li>
<li>✅ Choisissez selon vos préférences</li>
<li>✅ Adhérence > protocole optimal théorique</li>
</ul>

<h3>Distribution Protéines</h3>
<p><strong>Optimal:</strong> 20-40g par repas, espacés 3-4h</p>
<p><strong>Raison:</strong> Stimulation maximale MPS (muscle protein synthesis)</p>

<h3>Timing Glucides</h3>
<p><strong>Autour entraînement:</strong></p>
<ul>
<li>Pré-workout: Énergie disponible</li>
<li>Post-workout: Récupération glycogène</li>
</ul>

<p><strong>Soir:</strong> Pas de problème si dans vos macros!</p>

<h3>Jeûne Nocturne</h3>
<p>10-12h entre dîner et petit-déj = naturel et bénéfique</p>`,
    image: { url: getNextImage(), alt: 'Meal Timing Fat Loss' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['timing', 'repas', 'perte de gras', 'nutrition'],
    reading_time: '9 min',
    views: 1765,
  },
  {
    title: 'Alimentation Consciente pour Athlètes',
    title_fr: 'Alimentation Consciente pour Athlètes',
    slug: 'alimentation-consciente-athletes',
    category: 'Lifestyle',
    excerpt: 'Au-delà des macros: développer une relation saine avec la nourriture pour des résultats durables.',
    content: `<h2>Qu'est-ce que le Mindful Eating?</h2>
<p>Manger en pleine conscience: attention aux signaux de faim, satiété et plaisir alimentaire.</p>

<h3>Principes de Base</h3>
<ol>
<li><strong>Écouter la faim:</strong> Physique vs émotionnelle</li>
<li><strong>Manger lentement:</strong> 20min minimum par repas</li>
<li><strong>Sans distractions:</strong> Pas de téléphone/TV</li>
<li><strong>Savourer:</strong> Textures, saveurs, arômes</li>
<li><strong>Satiété:</strong> S'arrêter à 80% plein</li>
</ol>

<h3>Techniques Pratiques</h3>
<p><strong>Scan de la faim (1-10):</strong></p>
<ul>
<li>1-3: Très faim (attendu trop)</li>
<li>4-5: Faim modérée (idéal pour manger)</li>
<li>6-7: Satisfait (arrêter ici)</li>
<li>8-10: Trop plein (inconfortable)</li>
</ul>

<p><strong>Pause mid-meal:</strong></p>
<p>Stop à mi-repas, évaluer satiété, continuer si nécessaire</p>

<h3>Bénéfices</h3>
<ul>
<li>Meilleure digestion</li>
<li>Contrôle portions naturel</li>
<li>Réduction binges</li>
<li>Relation saine avec nourriture</li>
<li>Adhérence long terme</li>
</ul>

<h3>Pour les Athlètes</h3>
<p>Compatible avec tracking macros: mindful + précis = optimal</p>`,
    image: { url: getNextImage(), alt: 'Mindful Eating Athletes' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['mindful eating', 'alimentation consciente', 'lifestyle', 'psychologie'],
    reading_time: '8 min',
    views: 1234,
  },
  {
    title: 'Aliments Boostant l\'Immunité',
    title_fr: 'Aliments Boostant l\'Immunité',
    slug: 'aliments-immunite',
    category: 'Nutrition',
    excerpt: 'Renforcez votre système immunitaire naturellement avec ces aliments et nutriments clés.',
    content: `<h2>Nutriments Clés Immunité</h2>

<h3>Vitamine C</h3>
<p><strong>Rôle:</strong> Antioxydant, production globules blancs</p>
<p><strong>Sources:</strong> Citrus (150mg), poivrons (190mg), brocoli (90mg)</p>
<p><strong>Besoin:</strong> 500-1000mg/jour athlètes</p>

<h3>Vitamine D</h3>
<p><strong>Rôle:</strong> Activation cellules immunitaires</p>
<p><strong>Sources:</strong> Soleil, poissons gras, suppléments</p>
<p><strong>Besoin:</strong> 2000-5000 UI/jour</p>

<h3>Zinc</h3>
<p><strong>Rôle:</strong> Développement cellules immunitaires</p>
<p><strong>Sources:</strong> Huîtres, viande rouge, graines citrouille</p>
<p><strong>Besoin:</strong> 15-30mg/jour</p>

<h3>Probiotiques</h3>
<p><strong>Rôle:</strong> 70% immunité dans le gut</p>
<p><strong>Sources:</strong> Yaourt, kéfir, kimchi, choucroute</p>

<h2>Top 10 Aliments Immunité</h2>
<ol>
<li>Baies (antioxydants)</li>
<li>Agrumes (vitamine C)</li>
<li>Ail (allicine antibactérienne)</li>
<li>Gingembre (anti-inflammatoire)</li>
<li>Épinards (vitamines A, C, E)</li>
<li>Amandes (vitamine E)</li>
<li>Curcuma (curcumine)</li>
<li>Thé vert (EGCG)</li>
<li>Kiwis (vitamine C)</li>
<li>Poissons gras (omega-3)</li>
</ol>`,
    image: { url: getNextImage(), alt: 'Immunity Boosting Foods' },
    author: 'Chef Antoine Health',
    published: true,
    tags: ['immunité', 'santé', 'nutrition', 'aliments'],
    reading_time: '7 min',
    views: 1876,
  },
  {
    title: 'Alcool et Fitness: La Vérité',
    title_fr: 'Alcool et Fitness: La Vérité',
    slug: 'alcool-fitness-verite',
    category: 'Lifestyle',
    excerpt: 'Impact réel de l\'alcool sur la performance, récupération et composition corporelle. Stratégies de minimisation des dégâts.',
    content: `<h2>Effets de l'Alcool sur le Corps</h2>

<h3>Impact Récupération</h3>
<ul>
<li><strong>Sommeil:</strong> REM perturbé, qualité réduite 40%</li>
<li><strong>Synthèse protéique:</strong> Diminuée jusqu'à 30%</li>
<li><strong>Testostérone:</strong> Réduite temporairement</li>
<li><strong>Cortisol:</strong> Augmenté (catabolique)</li>
<li><strong>Hydratation:</strong> Effet diurétique</li>
</ul>

<h3>Impact Performance</h3>
<ul>
<li>Coordination réduite 24-48h</li>
<li>Force diminuée post-consommation</li>
<li>Endurance affectée</li>
<li>Temps de réaction ralenti</li>
</ul>

<h3>Calories Vides</h3>
<p>Alcool = 7 kcal/g (presque autant que lipides!)</p>
<ul>
<li>Bière: 150 kcal</li>
<li>Vin: 120 kcal</li>
<li>Shot vodka: 100 kcal</li>
<li>Cocktails sucrés: 200-400 kcal</li>
</ul>

<h3>Stratégies "Damage Control"</h3>
<ol>
<li><strong>Modération:</strong> Max 2-3 verres occasionnellement</li>
<li><strong>Hydratation:</strong> 1 verre d'eau entre chaque alcool</li>
<li><strong>Repas protéiné avant:</strong> Ralentit absorption</li>
<li><strong>Éviter sucre:</strong> Spiritueux > cocktails sucrés</li>
<li><strong>Repos next day:</strong> Pas d'entraînement intense</li>
</ol>`,
    image: { url: getNextImage(), alt: 'Alcohol and Fitness' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['alcool', 'lifestyle', 'performance', 'récupération'],
    reading_time: '9 min',
    views: 2345,
  },
  {
    title: 'Gestion du Stress pour les Gains',
    title_fr: 'Gestion du Stress pour les Gains',
    slug: 'gestion-stress-gains',
    category: 'Lifestyle',
    excerpt: 'Le stress chronique tue vos gains. Techniques scientifiques pour gérer le cortisol et optimiser la récupération.',
    content: `<h2>Impact du Stress sur les Gains</h2>

<h3>Cortisol: L'Hormone du Stress</h3>
<p><strong>Effets négatifs chroniques:</strong></p>
<ul>
<li>Catabolisme musculaire augmenté</li>
<li>Storage de graisse abdominale</li>
<li>Suppression testostérone</li>
<li>Système immunitaire affaibli</li>
<li>Récupération ralentie</li>
</ul>

<h3>Techniques de Réduction</h3>

<p><strong>1. Méditation (10min/jour)</strong></p>
<ul>
<li>Réduction cortisol 23%</li>
<li>Apps: Headspace, Calm</li>
<li>Moment: Matin ou avant coucher</li>
</ul>

<p><strong>2. Respiration Box</strong></p>
<ol>
<li>Inspire 4 secondes</li>
<li>Retiens 4 secondes</li>
<li>Expire 4 secondes</li>
<li>Retiens 4 secondes</li>
<li>Répète 5 cycles</li>
</ol>

<p><strong>3. Activité Physique Modérée</strong></p>
<ul>
<li>Marche nature: inflammation réduite</li>
<li>Yoga: flexibility + mental</li>
<li>Tai Chi: mouvement méditatif</li>
</ul>

<p><strong>4. Sommeil Prioritaire</strong></p>
<p>7-9h non-négociable pour régulation hormonale</p>

<h3>Suppléments Anti-Stress</h3>
<ul>
<li><strong>Ashwagandha:</strong> 300-600mg (adaptogène)</li>
<li><strong>Rhodiola:</strong> 200-600mg (énergie + stress)</li>
<li><strong>L-Théanine:</strong> 200mg (calme sans sédation)</li>
<li><strong>Magnésium:</strong> 400mg (relaxation)</li>
</ul>`,
    image: { url: getNextImage(), alt: 'Stress Management' },
    author: 'Coach Marc Nutrition',
    published: true,
    tags: ['stress', 'cortisol', 'lifestyle', 'récupération'],
    reading_time: '10 min',
    views: 1654,
  },
  {
    title: 'Guide du Split d\'Entraînement Parfait',
    title_fr: 'Guide du Split d\'Entraînement Parfait',
    slug: 'split-entrainement-parfait',
    category: 'Sport',
    excerpt: 'PPL, Upper/Lower, Bro Split ou Full Body? Trouvez le split idéal pour vos objectifs et disponibilité.',
    content: `<h2>Comparer les Splits Populaires</h2>

<h3>1. Push/Pull/Legs (PPL)</h3>
<p><strong>Fréquence:</strong> 6 jours/semaine</p>
<p><strong>Structure:</strong></p>
<ul>
<li>Push: Pecs, delts, triceps</li>
<li>Pull: Dos, biceps, arrière delts</li>
<li>Legs: Quads, ischio, mollets</li>
</ul>
<p><strong>Pour qui:</strong> Intermédiaires/avancés, temps disponible</p>

<h3>2. Upper/Lower</h3>
<p><strong>Fréquence:</strong> 4 jours/semaine</p>
<p><strong>Structure:</strong></p>
<ul>
<li>Upper: Tous exercices haut du corps</li>
<li>Lower: Tous exercices bas du corps</li>
</ul>
<p><strong>Pour qui:</strong> Tous niveaux, rééquilibrés</p>

<h3>3. Full Body</h3>
<p><strong>Fréquence:</strong> 3-4 jours/semaine</p>
<p><strong>Structure:</strong> Tous groupes chaque session</p>
<p><strong>Pour qui:</strong> Débutants, gains force rapides</p>

<h3>4. Bro Split</h3>
<p><strong>Fréquence:</strong> 5-6 jours/semaine</p>
<p><strong>Structure:</strong> 1 muscle majeur/jour</p>
<p><strong>Pour qui:</strong> Récupération limitée, bodybuilders</p>

<h3>Recommandations</h3>
<p><strong>Débutants (0-1 an):</strong> Full Body 3x/semaine</p>
<p><strong>Intermédiaires (1-3 ans):</strong> Upper/Lower ou PPL</p>
<p><strong>Avancés (3+ ans):</strong> PPL ou spécialisé</p>`,
    image: { url: getNextImage(), alt: 'Training Split Guide' },
    author: 'Dr. Sarah Fitness',
    published: true,
    tags: ['entraînement', 'split', 'musculation', 'programme'],
    reading_time: '11 min',
    views: 2876,
  },
];
