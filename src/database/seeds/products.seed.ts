export const productsSeedData = [
  // PROTEINS - Whey Protein
  {
    designation: "Whey Protein Isolate Premium",
    designation_fr: "Whey Protéine Isolate Premium",
    description: "Pure whey protein isolate with 90% protein content. Fast absorption, ideal for post-workout recovery.",
    description_fr: "Protéine whey isolate pure avec 90% de teneur en protéines. Absorption rapide, idéale pour la récupération post-entraînement.",
    price: 189.00,
    oldPrice: 220.00,
    currency: "TND",
    brand: "Sobitas Pro",
    category: "Protéines",
    subcategory: "Whey Protein",
    inStock: true,
    stock: 50,
    images: [
      { url: "/assets/whey-isolate.jpg", alt: "Whey Protein Isolate" }
    ],
    features: [
      "90% de protéines pures",
      "Sans lactose",
      "Absorption rapide",
      "Ideal post-workout",
      "Goût chocolat/vanille"
    ],
    tags: ["proteine", "whey", "isolate", "musculation"],
    isFeatured: true,
    isFlashSale: false,
    weight: "2kg",
    servingSize: "30g",
    servingsPerContainer: 66,
    nutritionFacts: {
      calories: 120,
      protein: 27,
      carbs: 2,
      fat: 1,
      fiber: 0
    }
  },
  {
    designation: "Whey Protein Concentrate",
    designation_fr: "Whey Protéine Concentrée",
    description: "High-quality whey protein concentrate with 80% protein content. Perfect blend of taste and nutrition.",
    description_fr: "Protéine whey concentrée de haute qualité avec 80% de teneur en protéines. Mélange parfait de goût et nutrition.",
    price: 149.00,
    oldPrice: 175.00,
    currency: "TND",
    brand: "Sobitas Pro",
    category: "Protéines",
    subcategory: "Whey Protein",
    inStock: true,
    stock: 75,
    images: [
      { url: "/assets/whey-concentrate.jpg", alt: "Whey Protein Concentrate" }
    ],
    features: [
      "80% de protéines",
      "Excellent goût",
      "Bon rapport qualité-prix",
      "Riche en BCAA",
      "Multiple saveurs"
    ],
    tags: ["proteine", "whey", "concentrate", "fitness"],
    isFeatured: true,
    isFlashSale: false,
    weight: "2kg",
    servingSize: "30g",
    servingsPerContainer: 66
  },
  {
    designation: "Whey Protein Hydrolysate",
    designation_fr: "Whey Protéine Hydrolysée",
    description: "Pre-digested whey protein for fastest absorption. Premium quality for serious athletes.",
    description_fr: "Protéine whey pré-digérée pour absorption la plus rapide. Qualité premium pour athlètes sérieux.",
    price: 229.00,
    currency: "TND",
    brand: "Sobitas Elite",
    category: "Protéines",
    subcategory: "Whey Protein",
    inStock: true,
    stock: 30,
    images: [
      { url: "/assets/whey-hydro.jpg", alt: "Whey Protein Hydrolysate" }
    ],
    features: [
      "Absorption ultra-rapide",
      "Pré-digérée",
      "95% de protéines",
      "Sans ballonnements",
      "Qualité pharmaceutique"
    ],
    tags: ["proteine", "whey", "hydrolysate", "premium"],
    isFeatured: false,
    isFlashSale: true,
    weight: "2kg",
    servingSize: "25g",
    servingsPerContainer: 80
  },

  // PROTEINS - Casein
  {
    designation: "Micellar Casein Night",
    designation_fr: "Caséine Micellaire Nuit",
    description: "Slow-digesting protein perfect for overnight muscle recovery. Sustained amino acid release.",
    description_fr: "Protéine à digestion lente parfaite pour la récupération musculaire nocturne. Libération prolongée d'acides aminés.",
    price: 169.00,
    currency: "TND",
    brand: "Sobitas Pro",
    category: "Protéines",
    subcategory: "Casein",
    inStock: true,
    stock: 40,
    images: [
      { url: "/assets/casein.jpg", alt: "Micellar Casein" }
    ],
    features: [
      "Digestion lente (7-8h)",
      "Parfait avant le coucher",
      "Anti-catabolique",
      "85% de protéines",
      "Sensation de satiété"
    ],
    tags: ["proteine", "casein", "nuit", "recovery"],
    isFeatured: true,
    weight: "1.8kg",
    servingSize: "30g",
    servingsPerContainer: 60
  },

  // PROTEINS - Vegan
  {
    designation: "Plant Protein Blend",
    designation_fr: "Protéine Végétale Mélange",
    description: "Complete plant-based protein from pea, rice, and hemp. Perfect for vegans and vegetarians.",
    description_fr: "Protéine végétale complète de pois, riz et chanvre. Parfaite pour végétariens et végétaliens.",
    price: 159.00,
    currency: "TND",
    brand: "Sobitas Natural",
    category: "Protéines",
    subcategory: "Vegan Protein",
    inStock: true,
    stock: 35,
    images: [
      { url: "/assets/vegan-protein.jpg", alt: "Plant Protein" }
    ],
    features: [
      "100% végétale",
      "Protéine complète",
      "Sans lactose",
      "Sans gluten",
      "Riche en fibres"
    ],
    tags: ["proteine", "vegan", "vegetale", "bio"],
    isFeatured: true,
    weight: "1.5kg",
    servingSize: "30g",
    servingsPerContainer: 50
  },

  // PRE-WORKOUT
  {
    designation: "Pre-Workout Explosive Energy",
    designation_fr: "Pre-Workout Énergie Explosive",
    description: "Maximum energy and focus formula. Contains caffeine, beta-alanine, and citrulline for explosive workouts.",
    description_fr: "Formule énergie et concentration maximale. Contient caféine, bêta-alanine et citrulline pour entraînements explosifs.",
    price: 129.00,
    oldPrice: 149.00,
    currency: "TND",
    brand: "Sobitas Energy",
    category: "Pre-Workout",
    subcategory: "Stimulant Pre-Workout",
    inStock: true,
    stock: 60,
    images: [
      { url: "/assets/pre-workout.webp", alt: "Pre-Workout Energy" }
    ],
    features: [
      "300mg de caféine",
      "Énergie explosive",
      "Focus mental accru",
      "Pumps musculaires",
      "Endurance améliorée"
    ],
    tags: ["pre-workout", "energie", "focus", "performance"],
    isFeatured: true,
    isFlashSale: true,
    weight: "300g",
    servingSize: "15g",
    servingsPerContainer: 20
  },
  {
    designation: "Pre-Workout Pump Formula",
    designation_fr: "Pre-Workout Formule Pump",
    description: "Stimulant-free pre-workout focused on muscle pumps and blood flow. Perfect for evening workouts.",
    description_fr: "Pre-workout sans stimulant concentré sur les pumps musculaires et la circulation sanguine. Parfait pour entraînements du soir.",
    price: 119.00,
    currency: "TND",
    brand: "Sobitas Energy",
    category: "Pre-Workout",
    subcategory: "Non-Stimulant Pre-Workout",
    inStock: true,
    stock: 45,
    images: [
      { url: "/assets/pump-formula.jpg", alt: "Pump Formula" }
    ],
    features: [
      "Sans stimulant",
      "Pumps intenses",
      "Vasodilatation",
      "Citrulline malate 8g",
      "Parfait le soir"
    ],
    tags: ["pre-workout", "pump", "no-stim", "circulation"],
    isFeatured: false,
    weight: "350g",
    servingSize: "17.5g",
    servingsPerContainer: 20
  },

  // BCAA & AMINO ACIDS
  {
    designation: "BCAA 2:1:1 Instantized",
    designation_fr: "BCAA 2:1:1 Instantanisé",
    description: "Essential amino acids in optimal 2:1:1 ratio. Supports muscle recovery and reduces fatigue.",
    description_fr: "Acides aminés essentiels en ratio optimal 2:1:1. Soutient la récupération musculaire et réduit la fatigue.",
    price: 99.00,
    currency: "TND",
    brand: "Sobitas Pro",
    category: "Acides Aminés",
    subcategory: "BCAA",
    inStock: true,
    stock: 80,
    images: [
      { url: "/assets/bcaa.jpg", alt: "BCAA Powder" }
    ],
    features: [
      "Ratio 2:1:1 optimal",
      "Solubilité instantanée",
      "Recovery rapide",
      "Anti-catabolique",
      "Saveurs rafraîchissantes"
    ],
    tags: ["bcaa", "recovery", "amino", "intra-workout"],
    isFeatured: true,
    weight: "500g",
    servingSize: "10g",
    servingsPerContainer: 50
  },
  {
    designation: "EAA Complete Amino Matrix",
    designation_fr: "EAA Matrice Amino Complète",
    description: "All 9 essential amino acids for complete muscle protein synthesis support.",
    description_fr: "Les 9 acides aminés essentiels pour un soutien complet de la synthèse protéique musculaire.",
    price: 119.00,
    currency: "TND",
    brand: "Sobitas Pro",
    category: "Acides Aminés",
    subcategory: "EAA",
    inStock: true,
    stock: 55,
    images: [
      { url: "/assets/eaa.jpg", alt: "EAA Powder" }
    ],
    features: [
      "9 acides aminés essentiels",
      "Synthèse protéique maximale",
      "Hydratation cellulaire",
      "0 calories",
      "Absorption rapide"
    ],
    tags: ["eaa", "amino", "recovery", "performance"],
    isFeatured: false,
    weight: "400g",
    servingSize: "13g",
    servingsPerContainer: 30
  },

  // CREATINE
  {
    designation: "Creatine Monohydrate Micronized",
    designation_fr: "Créatine Monohydrate Micronisée",
    description: "Pure creatine monohydrate for increased strength, power, and muscle mass.",
    description_fr: "Créatine monohydrate pure pour force, puissance et masse musculaire accrues.",
    price: 79.00,
    oldPrice: 95.00,
    currency: "TND",
    brand: "Sobitas Pro",
    category: "Créatine",
    subcategory: "Monohydrate",
    inStock: true,
    stock: 100,
    images: [
      { url: "/assets/creatine.jpg", alt: "Creatine Monohydrate" }
    ],
    features: [
      "100% pure monohydrate",
      "Micronisée",
      "Force et puissance",
      "Gain de masse",
      "Scientifiquement prouvée"
    ],
    tags: ["creatine", "force", "puissance", "masse"],
    isFeatured: true,
    isFlashSale: true,
    weight: "500g",
    servingSize: "5g",
    servingsPerContainer: 100
  },

  // WEIGHT GAINER
  {
    designation: "Mass Gainer 3000",
    designation_fr: "Gainer de Masse 3000",
    description: "High-calorie mass gainer with quality proteins and complex carbs. Perfect for hardgainers.",
    description_fr: "Gainer haute calorie avec protéines de qualité et glucides complexes. Parfait pour les ectomorphes.",
    price: 179.00,
    currency: "TND",
    brand: "Sobitas Mass",
    category: "Gainers",
    subcategory: "Mass Gainer",
    inStock: true,
    stock: 40,
    images: [
      { url: "/assets/mass-gainer.jpg", alt: "Mass Gainer" }
    ],
    features: [
      "1000+ calories par portion",
      "50g de protéines",
      "Glucides complexes",
      "Vitamines et minéraux",
      "Goût délicieux"
    ],
    tags: ["gainer", "masse", "calories", "prise-de-masse"],
    isFeatured: true,
    weight: "3kg",
    servingSize: "150g",
    servingsPerContainer: 20
  },

  // FAT BURNERS
  {
    designation: "Thermogenic Fat Burner",
    designation_fr: "Brûleur de Graisse Thermogénique",
    description: "Powerful thermogenic formula to support fat loss and energy levels during cutting.",
    description_fr: "Formule thermogénique puissante pour soutenir la perte de graisse et les niveaux d'énergie pendant la sèche.",
    price: 139.00,
    currency: "TND",
    brand: "Sobitas Lean",
    category: "Brûleurs de Graisse",
    subcategory: "Thermogenic",
    inStock: true,
    stock: 50,
    images: [
      { url: "/assets/fat-burner.jpg", alt: "Fat Burner" }
    ],
    features: [
      "Boost métabolique",
      "Thermogenèse accrue",
      "Contrôle de l'appétit",
      "Énergie soutenue",
      "Formule scientifique"
    ],
    tags: ["fat-burner", "seche", "perte-de-poids", "thermogenic"],
    isFeatured: true,
    weight: "120 capsules",
    servingSize: "2 capsules",
    servingsPerContainer: 60
  },

  // MULTIVITAMINS
  {
    designation: "Complete Multivitamin Complex",
    designation_fr: "Complexe Multivitaminé Complet",
    description: "Comprehensive vitamin and mineral formula designed for active lifestyles and athletes.",
    description_fr: "Formule complète de vitamines et minéraux conçue pour modes de vie actifs et athlètes.",
    price: 89.00,
    currency: "TND",
    brand: "Sobitas Health",
    category: "Vitamines",
    subcategory: "Multivitamins",
    inStock: true,
    stock: 70,
    images: [
      { url: "/assets/multivitamin.jpg", alt: "Multivitamin" }
    ],
    features: [
      "25+ vitamines et minéraux",
      "Antioxydants puissants",
      "Support immunitaire",
      "Énergie quotidienne",
      "1 capsule par jour"
    ],
    tags: ["vitamines", "mineraux", "sante", "immunite"],
    isFeatured: false,
    weight: "90 capsules",
    servingSize: "1 capsule",
    servingsPerContainer: 90
  },

  // OMEGA-3
  {
    designation: "Omega-3 Fish Oil Ultra Pure",
    designation_fr: "Huile de Poisson Oméga-3 Ultra Pure",
    description: "High-potency omega-3 fatty acids for heart, brain, and joint health.",
    description_fr: "Acides gras oméga-3 haute puissance pour la santé cardiaque, cérébrale et articulaire.",
    price: 95.00,
    currency: "TND",
    brand: "Sobitas Health",
    category: "Suppléments",
    subcategory: "Omega-3",
    inStock: true,
    stock: 65,
    images: [
      { url: "/assets/omega3.jpg", alt: "Omega-3" }
    ],
    features: [
      "2000mg par portion",
      "EPA & DHA concentrés",
      "Pureté testée",
      "Sans arrière-goût",
      "Santé cardiovasculaire"
    ],
    tags: ["omega3", "sante", "coeur", "cerveau"],
    isFeatured: false,
    weight: "120 softgels",
    servingSize: "2 softgels",
    servingsPerContainer: 60
  },

  // ACCESSORIES - Shakers
  {
    designation: "Premium Shaker Bottle 700ml",
    designation_fr: "Shaker Premium 700ml",
    description: "Leak-proof shaker bottle with mixing ball and measurements. BPA-free.",
    description_fr: "Shaker anti-fuite avec boule de mélange et graduations. Sans BPA.",
    price: 25.00,
    currency: "TND",
    brand: "Sobitas Gear",
    category: "Accessoires",
    subcategory: "Shakers",
    inStock: true,
    stock: 150,
    images: [
      { url: "/assets/shaker.jpg", alt: "Shaker Bottle" }
    ],
    features: [
      "700ml capacité",
      "100% anti-fuite",
      "Sans BPA",
      "Boule de mélange",
      "Graduations claires"
    ],
    tags: ["shaker", "accessoire", "equipement"],
    isFeatured: false
  },

  // ACCESSORIES - Gloves
  {
    designation: "Training Gloves Pro",
    designation_fr: "Gants d'Entraînement Pro",
    description: "Professional training gloves with wrist support and padded palm for maximum grip.",
    description_fr: "Gants d'entraînement professionnels avec support poignet et paume rembourrée pour grip maximum.",
    price: 45.00,
    currency: "TND",
    brand: "Sobitas Gear",
    category: "Accessoires",
    subcategory: "Equipment",
    inStock: true,
    stock: 80,
    images: [
      { url: "/assets/gloves.jpg", alt: "Training Gloves" }
    ],
    features: [
      "Support poignet",
      "Paume rembourrée",
      "Respirant",
      "Grip antidérapant",
      "Velcro ajustable"
    ],
    tags: ["gants", "equipement", "musculation"],
    isFeatured: false
  },

  // ACCESSORIES - Resistance Bands
  {
    designation: "Resistance Bands Set",
    designation_fr: "Set de Bandes de Résistance",
    description: "Complete set of 5 resistance bands with varying resistance levels for versatile training.",
    description_fr: "Set complet de 5 bandes de résistance avec différents niveaux pour entraînement polyvalent.",
    price: 65.00,
    currency: "TND",
    brand: "Sobitas Gear",
    category: "Accessoires",
    subcategory: "Equipment",
    inStock: true,
    stock: 45,
    images: [
      { url: "/assets/resistance-bands.jpg", alt: "Resistance Bands" }
    ],
    features: [
      "5 niveaux de résistance",
      "Latex naturel",
      "Portable",
      "Polyvalent",
      "Sac de transport inclus"
    ],
    tags: ["bandes", "elastiques", "equipement", "fitness"],
    isFeatured: false
  }
];

