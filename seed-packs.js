/**
 * Seed script: Replace old yoga/aerial packs with sport nutrition packs.
 * Packs are stored as Products with type: 'pack'.
 */

const http = require("http");

const BASE = "http://localhost:3003/api";
let TOKEN = "";

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

// ─── Pack definitions ──────────────────────────────────────
const PACK_IMAGES = [
  "/uploads/produits/April2024/pack_muscle_sec.webp",
  "/uploads/produits/April2024/pack_prise_de_masse-2.webp",
  "/uploads/produits/April2024/pack_prise_de_masse.webp",
  "/uploads/produits/April2024/pack_seche_extreme.webp",
  "/uploads/produits/December2025/pack_hard_2.webp",
  "/uploads/produits/December2025/pack_hard_mass_1.webp",
  "/uploads/produits/December2025/pack_realsolate_1.webp",
  "/uploads/produits/December2025/paxk_whey_1.webp",
];

const PACKS = [
  {
    title: "Pack Muscle Sec",
    designation: "Pack Muscle Sec",
    designation_fr: "Pack Muscle Sec",
    slug: "pack-muscle-sec",
    description: "Le pack idéal pour développer une masse musculaire sèche et définie. Inclut whey isolate, créatine monohydrate et BCAA pour une récupération optimale.",
    smallDescription: "Whey Isolate + Créatine + BCAA pour un physique sec et musclé.",
    price: 189,
    oldPrice: 235,
    mainImage: { url: PACK_IMAGES[0], alt: "Pack Muscle Sec" },
    features: ["Économisez 20%", "3 produits inclus", "Livraison gratuite"],
    aggregateRating: 4.9,
    reviewCount: 28,
  },
  {
    title: "Pack Prise de Masse Extrême",
    designation: "Pack Prise de Masse Extrême",
    designation_fr: "Pack Prise de Masse Extrême",
    slug: "pack-prise-de-masse-extreme",
    description: "Gagnez du volume rapidement avec ce pack complet : mass gainer haute calorie, whey protéine et créatine pour des résultats visibles en quelques semaines.",
    smallDescription: "Mass Gainer + Whey + Créatine pour une prise de masse rapide.",
    price: 219,
    oldPrice: 280,
    mainImage: { url: PACK_IMAGES[1], alt: "Pack Prise de Masse Extrême" },
    features: ["Économisez 22%", "3 produits inclus", "Résultats rapides"],
    aggregateRating: 4.8,
    reviewCount: 35,
  },
  {
    title: "Pack Prise de Masse Essentiel",
    designation: "Pack Prise de Masse Essentiel",
    designation_fr: "Pack Prise de Masse Essentiel",
    slug: "pack-prise-de-masse-essentiel",
    description: "L'essentiel pour la prise de masse : un gainer riche en protéines associé à de la glutamine et des acides aminés essentiels pour nourrir vos muscles 24h/24.",
    smallDescription: "Gainer + Glutamine + EAA pour une prise de masse progressive.",
    price: 175,
    oldPrice: 215,
    mainImage: { url: PACK_IMAGES[2], alt: "Pack Prise de Masse Essentiel" },
    features: ["Économisez 19%", "3 produits inclus", "Masse progressive"],
    aggregateRating: 4.7,
    reviewCount: 22,
  },
  {
    title: "Pack Sèche Extrême",
    designation: "Pack Sèche Extrême",
    designation_fr: "Pack Sèche Extrême",
    slug: "pack-seche-extreme",
    description: "Brûlez les graisses tout en préservant la masse musculaire. Ce pack combine un brûleur puissant, de la L-Carnitine et du CLA pour une sèche rapide et efficace.",
    smallDescription: "Fat Burner + L-Carnitine + CLA pour une sèche optimale.",
    price: 159,
    oldPrice: 199,
    mainImage: { url: PACK_IMAGES[3], alt: "Pack Sèche Extrême" },
    features: ["Économisez 20%", "3 produits inclus", "Sèche rapide"],
    aggregateRating: 4.8,
    reviewCount: 31,
  },
  {
    title: "Pack Hard Mass",
    designation: "Pack Hard Mass",
    designation_fr: "Pack Hard Mass",
    slug: "pack-hard-mass",
    description: "Pour les athlètes qui veulent aller plus loin. Ce pack premium associe un mass gainer haute performance, de la créatine HCL et un booster hormonal naturel pour une croissance musculaire maximale.",
    smallDescription: "Mass Gainer Pro + Créatine HCL + Booster Hormonal.",
    price: 249,
    oldPrice: 320,
    mainImage: { url: PACK_IMAGES[4], alt: "Pack Hard Mass" },
    features: ["Économisez 22%", "3 produits inclus", "Performance max"],
    aggregateRating: 4.9,
    reviewCount: 19,
  },
  {
    title: "Pack Hard Mass Premium",
    designation: "Pack Hard Mass Premium",
    designation_fr: "Pack Hard Mass Premium",
    slug: "pack-hard-mass-premium",
    description: "Le pack ultime pour les passionnés de musculation. Inclut gainer, whey concentrée, créatine, BCAA et multivitamines — tout ce qu'il faut pour transformer votre physique.",
    smallDescription: "Gainer + Whey + Créatine + BCAA + Multivitamines — le pack 5-en-1.",
    price: 329,
    oldPrice: 420,
    mainImage: { url: PACK_IMAGES[5], alt: "Pack Hard Mass Premium" },
    features: ["Économisez 22%", "5 produits inclus", "Pack complet"],
    aggregateRating: 4.9,
    reviewCount: 42,
  },
  {
    title: "Pack Real Isolate",
    designation: "Pack Real Isolate",
    designation_fr: "Pack Real Isolate",
    slug: "pack-real-isolate",
    description: "Pour ceux qui exigent la pureté. Whey isolate ultra-filtrée, glutamine pure et ZMA pour une récupération musculaire optimale et un sommeil réparateur.",
    smallDescription: "Whey Isolate + Glutamine + ZMA pour pureté et récupération.",
    price: 199,
    oldPrice: 255,
    mainImage: { url: PACK_IMAGES[6], alt: "Pack Real Isolate" },
    features: ["Économisez 22%", "3 produits inclus", "Pureté maximale"],
    aggregateRating: 4.8,
    reviewCount: 26,
  },
  {
    title: "Pack Whey Performance",
    designation: "Pack Whey Performance",
    designation_fr: "Pack Whey Performance",
    slug: "pack-whey-performance",
    description: "Le pack polyvalent par excellence. Whey protéine de qualité, pre-workout explosif et shaker premium pour des entraînements de haute intensité.",
    smallDescription: "Whey + Pre-Workout + Shaker pour des performances au top.",
    price: 169,
    oldPrice: 210,
    mainImage: { url: PACK_IMAGES[7], alt: "Pack Whey Performance" },
    features: ["Économisez 20%", "3 produits inclus", "Énergie explosive"],
    aggregateRating: 4.7,
    reviewCount: 38,
  },
];

// ─── Main ──────────────────────────────────────────────────
async function main() {
  console.log("=== Seeding Featured Packs ===\n");

  // 1. Login
  console.log("1. Logging in as admin...");
  const login = await request("POST", "/auth/login", {
    email: "admin@sobitas.com",
    password: "Admin@123",
  });
  if (!login.data.access_token) {
    console.error("Login failed:", login.data);
    process.exit(1);
  }
  TOKEN = login.data.access_token;
  console.log("   Logged in.\n");

  // 2. Delete old packs (products with type: 'pack')
  console.log("2. Deleting old packs...");
  const allRes = await request("GET", "/products?limit=1000");
  const allProducts = allRes.data.products || allRes.data || [];
  const oldPacks = allProducts.filter((p) => p.type === "pack");
  let deletedCount = 0;
  for (const pack of oldPacks) {
    const del = await request("DELETE", `/products/${pack._id}`);
    if (del.status < 400) deletedCount++;
  }
  console.log(`   Deleted ${deletedCount}/${oldPacks.length} old packs.\n`);

  // 3. Create new packs
  console.log("3. Creating new sport nutrition packs...\n");
  let created = 0;

  for (const packDef of PACKS) {
    // Remove fields not in the DTO
    const { reviewCount, ...packFields } = packDef;
    const payload = {
      ...packFields,
      type: "pack",
      status: true,
      isActive: true,
      inStock: true,
      quantity: 50,
      stock: 50,
      currency: "TND",
      sku: `PACK-${packDef.slug}`,
    };

    const res = await request("POST", "/products", payload);
    if (res.status >= 400) {
      console.error(`   FAILED "${packDef.title}":`, res.data);
    } else {
      console.log(`   ✓ ${packDef.title}  (${res.data._id}) — ${packDef.price} TND`);
      created++;
    }
  }

  console.log(`\n=== DONE === Created ${created}/${PACKS.length} packs.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
