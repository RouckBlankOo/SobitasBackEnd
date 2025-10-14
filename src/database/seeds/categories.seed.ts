export const categoriesSeedData = [
  {
    designation_fr: "Protéines",
    designation: "Proteins",
    slug: "proteines",
    description: "Toutes les protéines pour la construction musculaire et la récupération",
    active: true,
    order: 1,
    featured: true
  },
  {
    designation_fr: "Pre-Workout",
    designation: "Pre-Workout",
    slug: "pre-workout",
    description: "Suppléments pré-entraînement pour énergie et performance maximales",
    active: true,
    order: 2,
    featured: true
  },
  {
    designation_fr: "Acides Aminés",
    designation: "Amino Acids",
    slug: "acides-amines",
    description: "BCAA, EAA et autres acides aminés essentiels",
    active: true,
    order: 3,
    featured: false
  },
  {
    designation_fr: "Créatine",
    designation: "Creatine",
    slug: "creatine",
    description: "Créatine pour force, puissance et gain musculaire",
    active: true,
    order: 4,
    featured: false
  },
  {
    designation_fr: "Gainers",
    designation: "Mass Gainers",
    slug: "gainers",
    description: "Suppléments pour prise de masse et calories",
    active: true,
    order: 5,
    featured: false
  },
  {
    designation_fr: "Brûleurs de Graisse",
    designation: "Fat Burners",
    slug: "bruleurs-de-graisse",
    description: "Produits pour la perte de poids et la sèche",
    active: true,
    order: 6,
    featured: false
  },
  {
    designation_fr: "Vitamines",
    designation: "Vitamins",
    slug: "vitamines",
    description: "Multivitamines et suppléments pour la santé",
    active: true,
    order: 7,
    featured: false
  },
  {
    designation_fr: "Suppléments",
    designation: "Supplements",
    slug: "supplements",
    description: "Autres suppléments pour la santé et le bien-être",
    active: true,
    order: 8,
    featured: false
  },
  {
    designation_fr: "Accessoires",
    designation: "Accessories",
    slug: "accessoires",
    description: "Équipement et accessoires de fitness",
    active: true,
    order: 9,
    featured: false
  }
];

export const subcategoriesSeedData = [
  // Protéines subcategories
  { designation: "Whey Protein", designation_fr: "Whey Protein", slug: "whey-protein", category: "Protéines", order: 1, active: true },
  { designation: "Casein", designation_fr: "Caséine", slug: "casein", category: "Protéines", order: 2, active: true },
  { designation: "Vegan Protein", designation_fr: "Protéine Végétale", slug: "vegan-protein", category: "Protéines", order: 3, active: true },
  
  // Pre-Workout subcategories
  { designation: "Stimulant Pre-Workout", designation_fr: "Pre-Workout Stimulant", slug: "stimulant-pre-workout", category: "Pre-Workout", order: 1, active: true },
  { designation: "Non-Stimulant Pre-Workout", designation_fr: "Pre-Workout Non-Stimulant", slug: "non-stimulant-pre-workout", category: "Pre-Workout", order: 2, active: true },
  
  // Amino Acids subcategories
  { designation: "BCAA", designation_fr: "BCAA", slug: "bcaa", category: "Acides Aminés", order: 1, active: true },
  { designation: "EAA", designation_fr: "EAA", slug: "eaa", category: "Acides Aminés", order: 2, active: true },
  
  // Creatine subcategories
  { designation: "Monohydrate", designation_fr: "Monohydrate", slug: "monohydrate", category: "Créatine", order: 1, active: true },
  
  // Gainers subcategories
  { designation: "Mass Gainer", designation_fr: "Mass Gainer", slug: "mass-gainer", category: "Gainers", order: 1, active: true },
  
  // Fat Burners subcategories
  { designation: "Thermogenic", designation_fr: "Thermogénique", slug: "thermogenic", category: "Brûleurs de Graisse", order: 1, active: true },
  
  // Vitamins subcategories
  { designation: "Multivitamins", designation_fr: "Multivitamines", slug: "multivitamins", category: "Vitamines", order: 1, active: true },
  
  // Supplements subcategories
  { designation: "Omega-3", designation_fr: "Omega-3", slug: "omega-3", category: "Suppléments", order: 1, active: true },
  
  // Accessories subcategories
  { designation: "Shakers", designation_fr: "Shakers", slug: "shakers", category: "Accessoires", order: 1, active: true },
  { designation: "Equipment", designation_fr: "Équipement", slug: "equipment", category: "Accessoires", order: 2, active: true }
];
