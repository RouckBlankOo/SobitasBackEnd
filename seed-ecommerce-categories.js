/**
 * Seed script: replace DB categories/subcategories with the original
 * e-commerce ones (Compléments Alimentaires, Perte de Poids, etc.)
 */

const http = require("http");

const BASE = "http://localhost:3003/api";
let TOKEN = "";

// ─── HTTP helper ───────────────────────────────────────────
function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE + path);
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
      },
    };
    const req = http.request(opts, (res) => {
      let chunks = "";
      res.on("data", (c) => (chunks += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(chunks) });
        } catch {
          resolve({ status: res.statusCode, data: chunks });
        }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

// ─── Data ──────────────────────────────────────────────────
const CATEGORIES = [
  {
    designation_fr: "Compléments Alimentaires",
    designation: "Dietary Supplements",
    slug: "dietary-supplements",
    description: "Compléments alimentaires et suppléments nutritionnels pour sportifs : acides aminés, vitamines, minéraux et plus.",
    meta_description: "Compléments alimentaires pour sportifs - acides aminés, vitamines, minéraux",
    meta_keywords: "compléments alimentaires,suppléments,nutrition sportive,vitamines,minéraux",
    active: true,
    order: 1,
    featured: true,
    subcategories: [
      { designation_fr: "Acides Aminés", designation: "Amino Acids", slug: "amino-acids", order: 1 },
      { designation_fr: "BCAA", designation: "BCAA", slug: "bcaa", order: 2 },
      { designation_fr: "Citrulline", designation: "Citrulline", slug: "citrulline", order: 3 },
      { designation_fr: "Créatine", designation: "Creatine", slug: "creatine", order: 4 },
      { designation_fr: "EAA", designation: "EAA", slug: "eaa", order: 5 },
      { designation_fr: "Glutamine", designation: "Glutamine", slug: "glutamine", order: 6 },
      { designation_fr: "HMB", designation: "HMB", slug: "hmb", order: 7 },
      { designation_fr: "L-Arginine", designation: "L-Arginine", slug: "l-arginine", order: 8 },
      { designation_fr: "Minéraux", designation: "Minerals", slug: "minerals", order: 9 },
      { designation_fr: "Omega 3", designation: "Omega 3", slug: "omega-3", order: 10 },
      { designation_fr: "Boosters Hormonaux", designation: "Hormone Boosters", slug: "hormone-boosters", order: 11 },
      { designation_fr: "Vitamines", designation: "Vitamins", slug: "vitamins", order: 12 },
      { designation_fr: "ZMA", designation: "ZMA", slug: "zma", order: 13 },
      { designation_fr: "Beta Alanine", designation: "Beta Alanine", slug: "beta-alanine", order: 14 },
      { designation_fr: "Ashwagandha", designation: "Ashwagandha", slug: "ashwagandha", order: 15 },
      { designation_fr: "Tribulus", designation: "Tribulus", slug: "tribulus", order: 16 },
      { designation_fr: "Collagène", designation: "Collagen", slug: "collagen", order: 17 },
      { designation_fr: "Zinc", designation: "Zinc", slug: "zinc", order: 18 },
      { designation_fr: "Magnésium", designation: "Magnesium", slug: "magnesium", order: 19 },
    ],
  },
  {
    designation_fr: "Perte de Poids",
    designation: "Weight Loss",
    slug: "weight-loss",
    description: "Brûleurs de graisse, CLA et L-Carnitine pour accompagner votre objectif de perte de poids.",
    meta_description: "Compléments pour la perte de poids - brûleurs de graisse, CLA, L-Carnitine",
    meta_keywords: "perte de poids,brûleur de graisse,CLA,L-Carnitine,minceur",
    active: true,
    order: 2,
    featured: true,
    subcategories: [
      { designation_fr: "CLA", designation: "CLA", slug: "cla", order: 1 },
      { designation_fr: "Brûleur de Graisse", designation: "Fat Burner", slug: "fat-burner", order: 2 },
      { designation_fr: "L-Carnitine", designation: "L-Carnitine", slug: "l-carnitine", order: 3 },
      { designation_fr: "Brûleurs de Graisse", designation: "Fat Burners", slug: "fat-burners", order: 4 },
    ],
  },
  {
    designation_fr: "Prise de Masse",
    designation: "Mass Gain",
    slug: "mass-gain",
    description: "Gainers riches en calories et protéines pour favoriser la prise de masse musculaire.",
    meta_description: "Gainers et compléments pour la prise de masse musculaire",
    meta_keywords: "prise de masse,gainer,glucides,protéines,musculation",
    active: true,
    order: 3,
    featured: true,
    subcategories: [
      { designation_fr: "Gainers Haute Énergie", designation: "High Energy Gainers", slug: "high-energy-gainers", order: 1 },
      { designation_fr: "Gainers Riches en Protéines", designation: "Protein-Rich Gainers", slug: "protein-rich-gainers", order: 2 },
      { designation_fr: "Glucides", designation: "Carbohydrates", slug: "carbohydrates", order: 3 },
    ],
  },
  {
    designation_fr: "Protéines",
    designation: "Proteins",
    slug: "proteins",
    description: "Whey, caséine, isolat et protéines complètes pour la récupération et la croissance musculaire.",
    meta_description: "Protéines whey, isolat, caséine pour musculation et récupération",
    meta_keywords: "protéines,whey,isolat,caséine,musculation,récupération",
    active: true,
    order: 4,
    featured: true,
    subcategories: [
      { designation_fr: "Whey Protéine", designation: "Whey Protein", slug: "whey-protein", order: 1 },
      { designation_fr: "Whey Isolat", designation: "Whey Isolate", slug: "whey-isolate", order: 2 },
      { designation_fr: "Caséine", designation: "Casein Protein", slug: "casein-protein", order: 3 },
      { designation_fr: "Protéines Complètes", designation: "Complete Proteins", slug: "complete-proteins", order: 4 },
      { designation_fr: "Protéine de Bœuf", designation: "Beef Protein", slug: "beef-protein", order: 5 },
      { designation_fr: "Protéines Capillaires", designation: "Hair Proteins", slug: "hair-proteins", order: 6 },
      { designation_fr: "Whey Hydrolysée", designation: "Hydrolyzed Whey", slug: "hydrolyzed-whey", order: 7 },
    ],
  },
  {
    designation_fr: "Suppléments d'Entraînement",
    designation: "Training Supplements",
    slug: "training-supplements",
    description: "Pre-workout, intra-workout et post-workout pour optimiser vos performances et votre récupération.",
    meta_description: "Suppléments pre-workout, intra et post-workout pour sportifs",
    meta_keywords: "pre-workout,intra-workout,post-workout,récupération,entraînement",
    active: true,
    order: 5,
    featured: true,
    subcategories: [
      { designation_fr: "Pré-Entraînement", designation: "Pre-Workout", slug: "pre-workout", order: 1 },
      { designation_fr: "Intra-Entraînement", designation: "Intra-Workout", slug: "intra-workout", order: 2 },
      { designation_fr: "Récupération Post-Entraînement", designation: "Post-Workout Recovery", slug: "post-workout-recovery", order: 3 },
    ],
  },
  {
    designation_fr: "Équipements & Accessoires Sportifs",
    designation: "Sports Equipment & Accessories",
    slug: "sports-equipment-accessories",
    description: "Ceintures, gants, bandes, shakers et équipements pour un entraînement complet et sécurisé.",
    meta_description: "Équipements et accessoires sportifs - ceintures, gants, shakers, bandes",
    meta_keywords: "équipement sportif,accessoires,ceinture musculation,gants,shaker",
    active: true,
    order: 6,
    featured: true,
    subcategories: [
      { designation_fr: "Bandes de Soutien Musculaire", designation: "Muscle Support Bands", slug: "muscle-support-bands", order: 1 },
      { designation_fr: "Ceinture de Musculation", designation: "Weightlifting Belt", slug: "weightlifting-belt", order: 2 },
      { designation_fr: "Gants de Musculation & Fitness", designation: "Weightlifting & Fitness Gloves", slug: "weightlifting-fitness-gloves", order: 3 },
      { designation_fr: "Shakers & Gourdes Sport", designation: "Shakers & Sports Bottles", slug: "shakers-sports-bottles", order: 4 },
      { designation_fr: "T-Shirts de Sport", designation: "Sports T-Shirts", slug: "sports-t-shirts", order: 5 },
      { designation_fr: "Équipement de Musculation", designation: "Weightlifting Equipment", slug: "weightlifting-equipment", order: 6 },
      { designation_fr: "Équipement Cardio & Fitness", designation: "Cardio Fitness Equipment", slug: "cardio-fitness-equipment", order: 7 },
    ],
  },
];

// ─── Main ──────────────────────────────────────────────────
async function main() {
  console.log("=== Seeding original e-commerce categories ===\n");

  // 1. Login
  console.log("1. Logging in as admin...");
  // Try multiple known credentials
  const creds = [
    { email: "admin@sobitas.com", password: "Admin@123" },
    { email: "admin@sobitas.com", password: "admin123" },
    { email: "admin_fixed@sobitas.tn", password: "password123" },
    { email: "webmaster@gmail.com", password: "BiBos@2024" },
  ];
  let login;
  for (const c of creds) {
    console.log(`   Trying ${c.email} ...`);
    login = await request("POST", "/auth/login", c);
    if (login.data.access_token) break;
  }
  if (!login.data.access_token) {
    console.error("All login attempts failed. Last response:", login.data);
    process.exit(1);
  }
  TOKEN = login.data.access_token;
  console.log("   Logged in.\n");

  // 2. Delete all existing subcategories
  console.log("2. Deleting existing subcategories...");
  const subsRes = await request("GET", "/admin/subcategories/get/all");
  const existingSubs = Array.isArray(subsRes.data) ? subsRes.data : [];
  for (const sub of existingSubs) {
    await request("DELETE", `/admin/subcategories/delete/${sub._id}`);
  }
  console.log(`   Deleted ${existingSubs.length} subcategories.\n`);

  // 3. Delete all existing categories
  console.log("3. Deleting existing categories...");
  const catsRes = await request("GET", "/categories");
  const existingCats = Array.isArray(catsRes.data) ? catsRes.data : [];
  for (const cat of existingCats) {
    await request("DELETE", `/categories/${cat._id}`);
  }
  console.log(`   Deleted ${existingCats.length} categories.\n`);

  // 4. Create new categories + subcategories
  console.log("4. Creating categories and subcategories...\n");
  let totalSubs = 0;

  for (const catDef of CATEGORIES) {
    const { subcategories, ...catData } = catDef;

    const created = await request("POST", "/categories", catData);
    if (created.status >= 400) {
      console.error(`   FAILED to create category "${catData.designation_fr}":`, created.data);
      continue;
    }

    const catId = created.data._id;
    console.log(`   ✓ ${catData.designation_fr}  (${catId})`);

    // Create subcategories for this category
    for (const subDef of subcategories) {
      const subPayload = {
        ...subDef,
        categoryId: catId,
        active: true,
        description: `${subDef.designation_fr} - ${catData.designation_fr}`,
      };
      const subCreated = await request("POST", "/admin/subcategories/new", subPayload);
      if (subCreated.status >= 400) {
        console.error(`     FAILED sub "${subDef.designation_fr}":`, subCreated.data);
      } else {
        console.log(`     ✓ ${subDef.designation_fr}`);
        totalSubs++;
      }
    }
    console.log();
  }

  console.log("=== DONE ===");
  console.log(`Created ${CATEGORIES.length} categories and ${totalSubs} subcategories.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
