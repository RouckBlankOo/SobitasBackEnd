/**
 * Seed packs into the PACKS collection (not products).
 * Run: node seed-packs-collection.js
 */
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sobitas-db';

const packSchema = new mongoose.Schema({
  designation_fr: String,
  designation: String,
  slug: { type: String, unique: true },
  cover: String,
  mainImage: { url: String, alt: String },
  images: [{ url: String, alt: String }],
  prix: String,
  promo: String,
  qte: String,
  publier: String,
  description_fr: String,
  meta_description_fr: String,
  pack: String,
  new_product: String,
  best_seller: String,
  rupture: String,
  brand_id: String,
  nutrition_values: String,
  questions: String,
  zone1: String,
  zone2: String,
  zone3: String,
  zone4: String,
  meta: String,
  content_seo: String,
  displayOrder: Number,
}, { timestamps: true, collection: 'packs' });

const Pack = mongoose.model('Pack', packSchema);

function slugify(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const PACKS = [
  {
    designation_fr: 'Pack Muscle Sec',
    description_fr: 'Pack complet pour la prise de muscle sec : Whey Isolate + BCAA + Créatine. Idéal pour les sportifs cherchant un physique découpé et performant.',
    prix: '189',
    promo: '229',
    qte: '50',
    best_seller: '1',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2024/pack_muscle_sec.webp', alt: 'Pack Muscle Sec' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Whey Isolate 2kg</li><li>BCAA 300g</li><li>Créatine Monohydrate 300g</li></ul>',
    zone2: '<h3>Avantages</h3><p>Combinaison optimale pour maximiser la synthèse protéique, accélérer la récupération et améliorer la force musculaire sans rétention d\'eau.</p>',
    nutrition_values: 'Protéines: 25g par dose | BCAA: 5g | Créatine: 5g',
  },
  {
    designation_fr: 'Pack Prise de Masse Extrême',
    description_fr: 'Le pack ultime pour la prise de masse : Mass Gainer 7kg + Créatine + Multivitamines. Formule haute calorie pour les hardgainers.',
    prix: '219',
    promo: '279',
    qte: '35',
    best_seller: '1',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2024/pack_prise_de_masse-2.webp', alt: 'Pack Prise de Masse Extrême' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Mass Gainer 7kg</li><li>Créatine 300g</li><li>Multivitamines 120 caps</li></ul>',
    zone2: '<h3>Avantages</h3><p>Plus de 1200 calories par shake, enrichi en créatine pour la force et multivitamines pour combler les carences. Résultats visibles dès 4 semaines.</p>',
    nutrition_values: 'Calories: 1200 par dose | Protéines: 50g | Glucides: 200g',
  },
  {
    designation_fr: 'Pack Prise de Masse Essentiel',
    description_fr: 'Pack essentiel pour démarrer la prise de masse : Whey Protein 2kg + Mass Gainer 3kg. Le duo gagnant pour les débutants et intermédiaires.',
    prix: '175',
    promo: '210',
    qte: '60',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2024/pack_prise_de_masse.webp', alt: 'Pack Prise de Masse Essentiel' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Whey Protein 2kg</li><li>Mass Gainer 3kg</li></ul>',
    zone2: '<h3>Avantages</h3><p>Apport protéique et calorique équilibré pour une prise de masse progressive et contrôlée.</p>',
    nutrition_values: 'Protéines: 30g par dose | Calories: 600 par shake gainer',
  },
  {
    designation_fr: 'Pack Sèche Extrême',
    description_fr: 'Pack sèche haute performance : Brûleur de graisse + Whey Isolate + L-Carnitine. Pour une définition musculaire maximale.',
    prix: '159',
    promo: '199',
    qte: '45',
    best_seller: '0',
    new_product: '1',
    mainImage: { url: '/uploads/produits/April2024/pack_seche_extreme.webp', alt: 'Pack Sèche Extrême' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Hydroxycut Hardcore 120 caps</li><li>Whey Isolate 900g</li><li>L-Carnitine 1000mg</li></ul>',
    zone2: '<h3>Avantages</h3><p>Triple action : thermogénèse, préservation musculaire et transport des graisses. Le combo idéal pour la sèche.</p>',
    nutrition_values: 'Protéines: 25g | L-Carnitine: 1000mg | Caféine: 200mg',
  },
  {
    designation_fr: 'Pack Hard Mass',
    description_fr: 'Pack puissance pour une masse musculaire dense : Full Mass 7kg + BCAA Glutamine + ZMA. Nutrition complète post-entraînement.',
    prix: '249',
    promo: '299',
    qte: '25',
    best_seller: '1',
    new_product: '0',
    mainImage: { url: '/uploads/produits/December2025/pack_hard_2.webp', alt: 'Pack Hard Mass' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Full Mass 7kg</li><li>BCAA Glutamine 500g</li><li>ZMA 120 caps</li></ul>',
    zone2: '<h3>Avantages</h3><p>Apport calorique massif + récupération optimale + meilleur sommeil et taux de testostérone naturellement boostés.</p>',
    nutrition_values: 'Calories: 1500 par dose | BCAA: 7g | Zinc: 30mg',
  },
  {
    designation_fr: 'Pack Hard Mass Premium',
    description_fr: 'Le premium de la prise de masse : Real Mass 2.7kg + Big Whey 2kg + Créatine + Multivitamines. Formule professionnelle complète.',
    prix: '329',
    promo: '399',
    qte: '15',
    best_seller: '1',
    new_product: '1',
    mainImage: { url: '/uploads/produits/December2025/pack_hard_mass_1.webp', alt: 'Pack Hard Mass Premium' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Instant Real Mass 2.7kg</li><li>Big Whey 2kg</li><li>Créatine 300g</li><li>Multi Vita 120 caps</li></ul>',
    zone2: '<h3>Avantages</h3><p>Pack 4-en-1 premium pour une prise de masse structurée : gains massifs, force accrue et santé préservée.</p>',
    nutrition_values: 'Protéines: 55g combinées | Créatine: 5g | 23 vitamines & minéraux',
  },
  {
    designation_fr: 'Pack Real Isolate',
    description_fr: 'Pack protéine pure isolée : Iso Big 2kg + Collagène Premium + Vitamine D3. Pour athlètes exigeants en quête de qualité maximale.',
    prix: '199',
    promo: '249',
    qte: '40',
    best_seller: '0',
    new_product: '1',
    mainImage: { url: '/uploads/produits/December2025/pack_realsolate_1.webp', alt: 'Pack Real Isolate' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Iso Big Isolate 2kg</li><li>Collagène Premium 350g</li><li>Vitamine D3 4000 IU 120 caps</li></ul>',
    zone2: '<h3>Avantages</h3><p>Protéine ultra-filtrée 90% + santé articulaire + renforcement osseux et immunitaire. Idéal toute l\'année.</p>',
    nutrition_values: 'Protéines: 27g (isolate) | Collagène: 10g | Vitamine D3: 4000 IU',
  },
  {
    designation_fr: 'Pack Whey Performance',
    description_fr: 'Pack performance quotidienne : Whey Pro 2kg + BCAA 300g. Le duo indispensable pour la récupération et la croissance musculaire.',
    prix: '169',
    promo: '199',
    qte: '70',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/December2025/paxk_whey_1.webp', alt: 'Pack Whey Performance' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Whey Pro Warriors 2kg</li><li>BCAA 300g</li></ul>',
    zone2: '<h3>Avantages</h3><p>Protéine de lactosérum concentrée + acides aminés ramifiés pour une récupération rapide et une construction musculaire optimale.</p>',
    nutrition_values: 'Protéines: 24g par dose | BCAA: 5g (ratio 2:1:1)',
  },
  {
    designation_fr: 'Pack Animal Power',
    description_fr: 'Pack force brute Animal : Animal Pak 44 packs + Animal Stak 21 packs. La référence des suppléments de force et performance hardcore.',
    prix: '289',
    promo: '349',
    qte: '20',
    best_seller: '1',
    new_product: '0',
    mainImage: { url: '/uploads/produits/September2023/animal_pak.webp', alt: 'Pack Animal Power' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Animal Pak 44 packs</li><li>Animal Stak 21 packs</li></ul>',
    zone2: '<h3>Avantages</h3><p>Support hormonal naturel + complexe multivitamines-minéraux complet. Le combo légendaire pour les athlètes de force.</p>',
    nutrition_values: 'Vitamines: 60+ nutriments | Tribulus, Ashwagandha, ZMA',
  },
  {
    designation_fr: 'Pack Fat Burner Pro',
    description_fr: 'Pack brûle-graisse professionnel : Animal Cuts 42 doses + Whey Isolate 900g + BCAA. Sèche agressive avec préservation musculaire.',
    prix: '209',
    promo: '259',
    qte: '30',
    best_seller: '0',
    new_product: '1',
    mainImage: { url: '/uploads/produits/September2023/animal_cuts_42doses.webp', alt: 'Pack Fat Burner Pro' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Animal Cuts 42 doses</li><li>Whey Isolate 900g</li><li>BCAA 300g</li></ul>',
    zone2: '<h3>Avantages</h3><p>Thermogénèse puissante + rétention musculaire + anti-catabolisme. Le protocole de sèche des champions.</p>',
    nutrition_values: 'Complexe thermogénique | Protéines: 25g | BCAA: 5g',
  },
  {
    designation_fr: 'Pack Big Ramy Starter',
    description_fr: 'Pack signature Big Ramy Labs : Big Whey 2kg + BCAA 300g + Créatine 300g. Qualité premium du champion Mr. Olympia.',
    prix: '185',
    promo: '225',
    qte: '55',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/September2024/big_ramy_labs_-_big_whey_2kg.webp', alt: 'Pack Big Ramy Starter' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Big Whey 2kg</li><li>BCAA 300g</li><li>Créatine 300g</li></ul>',
    zone2: '<h3>Avantages</h3><p>La gamme du 2x Mr. Olympia. Formules testées et approuvées par les athlètes d\'élite.</p>',
    nutrition_values: 'Protéines: 25g | BCAA: 7g | Créatine: 5g',
  },
  {
    designation_fr: 'Pack Big Ramy Mass',
    description_fr: 'Pack masse musculaire Big Ramy : Beef Mass Gainer 4.9kg + Iso Big 2kg. Megacalories + protéine ultra-pure pour une croissance explosive.',
    prix: '259',
    promo: '319',
    qte: '20',
    best_seller: '1',
    new_product: '0',
    mainImage: { url: '/uploads/produits/September2024/big_ramy_labs_-_beef_mass_gainer_49kg.webp', alt: 'Pack Big Ramy Mass' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Beef Mass Gainer 4.9kg</li><li>Iso Big Isolate 2kg</li></ul>',
    zone2: '<h3>Avantages</h3><p>Protéine de bœuf + isolate de whey : le mélange anabolique le plus puissant pour les hardgainers.</p>',
    nutrition_values: 'Calories: 1350 par dose gainer | Protéines: 30g isolate',
  },
  {
    designation_fr: 'Pack Scenit Complet',
    description_fr: 'Pack nutrition complète Scenit : BCAA Glutamine 500g + Multivitamines 120 caps + Collagène 350g. Santé et performance réunies.',
    prix: '155',
    promo: '189',
    qte: '45',
    best_seller: '0',
    new_product: '1',
    mainImage: { url: '/uploads/produits/February2026/bcaa_gluta_500g_-_scenit_nutrition.webp', alt: 'Pack Scenit Complet' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>BCAA Glutamine 500g</li><li>Multi Vita 120 caps</li><li>Collagène Premium 350g</li></ul>',
    zone2: '<h3>Avantages</h3><p>Récupération + immunité + articulations. Le trio santé indispensable pour les sportifs réguliers.</p>',
    nutrition_values: 'BCAA: 7g | Glutamine: 3g | Collagène: 10g | 23 vitamines',
  },
  {
    designation_fr: 'Pack Galvanize Gold',
    description_fr: 'Pack premium Galvanize Chrome : Compact Whey Gold 2kg + Créatine + ZMA. Qualité suisse pour des résultats supérieurs.',
    prix: '215',
    promo: '265',
    qte: '25',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/September2024/compact_whey_gold_2kg_-_galvanize_chrome.webp', alt: 'Pack Galvanize Gold' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Compact Whey Gold 2kg</li><li>Créatine Monohydrate 300g</li><li>Best ZMA 120 caps</li></ul>',
    zone2: '<h3>Avantages</h3><p>Whey concentrée premium + créatine micronisée + optimisation hormonale nocturne. Qualité européenne certifiée.</p>',
    nutrition_values: 'Protéines: 26g | Créatine: 5g | Zinc: 30mg | Magnésium: 450mg',
  },
  {
    designation_fr: 'Pack Endurance Pro',
    description_fr: 'Pack endurance et récupération : BCAA Glutamine + L-Arginine 210g + Vitamine D3. Pour les sports d\'endurance et la récupération active.',
    prix: '145',
    promo: '179',
    qte: '40',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2025/arginine_210_gr_ostrovit.webp', alt: 'Pack Endurance Pro' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>L-Arginine 210g OstroVit</li><li>BCAA Glutamine 500g</li><li>Vitamine D3 4000 IU 120 caps</li></ul>',
    zone2: '<h3>Avantages</h3><p>Vasodilatation + récupération musculaire + renforcement immunitaire. Idéal pour runners, cyclistes et sportifs d\'endurance.</p>',
    nutrition_values: 'L-Arginine: 3g | BCAA: 5g | Vitamine D3: 4000 IU',
  },
  {
    designation_fr: 'Pack Warriors Duo',
    description_fr: 'Pack double Warriors : Whey Pro 2kg x2 saveurs différentes + shaker offert. Variez les plaisirs protéinés au quotidien.',
    prix: '195',
    promo: '238',
    qte: '35',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2025/whey_pro_warriors_2kg.webp', alt: 'Pack Warriors Duo' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Whey Pro Warriors 2kg (Chocolat)</li><li>Whey Pro Warriors 2kg (Vanille)</li><li>Shaker Warriors offert</li></ul>',
    zone2: '<h3>Avantages</h3><p>4kg de protéines au total + shaker premium. 2 mois de nutrition protéique complète.</p>',
    nutrition_values: 'Protéines: 24g par dose | 4kg total | 2 saveurs',
  },
  {
    designation_fr: 'Pack Récupération Totale',
    description_fr: 'Pack récupération musculaire avancée : Glutamine 300g + BCAA 300g + Collagène 350g. Triple action anti-catabolique.',
    prix: '165',
    promo: '199',
    qte: '50',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2025/glutamine_300g_ostrovit.webp', alt: 'Pack Récupération Totale' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Glutamine 300g OstroVit</li><li>BCAA 300g</li><li>Collagène Premium 350g</li></ul>',
    zone2: '<h3>Avantages</h3><p>Réparation des fibres musculaires + protection articulaire + immunité renforcée. Le pack récupération complet.</p>',
    nutrition_values: 'Glutamine: 5g | BCAA: 5g | Collagène: 10g',
  },
  {
    designation_fr: 'Pack Débutant Complet',
    description_fr: 'Le pack parfait pour débuter en musculation : Whey 2kg + Créatine + Multivitamines + BCAA. Tout ce dont un débutant a besoin.',
    prix: '235',
    promo: '289',
    qte: '40',
    best_seller: '1',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2025/whey_pro_warriors_2kg_warriors.webp', alt: 'Pack Débutant Complet' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Whey Pro 2kg</li><li>Créatine 300g</li><li>Multi Vita 120 caps</li><li>BCAA 300g</li></ul>',
    zone2: '<h3>Avantages</h3><p>Pack 4-en-1 spécialement conçu pour les débutants. Tout est inclus pour des résultats optimaux dès le premier mois.</p>',
    nutrition_values: 'Protéines: 24g | Créatine: 5g | BCAA: 5g | 23 vitamines',
  },
  {
    designation_fr: 'Pack Sèche Animal',
    description_fr: 'Pack sèche pro Animal Universal : Animal Cuts Powder 42 doses + Animal Whey Isolate 2.27kg. La combinaison ultime de la sèche hardcore.',
    prix: '275',
    promo: '339',
    qte: '15',
    best_seller: '0',
    new_product: '1',
    mainImage: { url: '/uploads/produits/September2023/animal_cuts_no-stim_powder_42_doses.webp', alt: 'Pack Sèche Animal' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Animal Cuts Powder No-Stim 42 doses</li><li>Animal Whey Isolate 2.27kg</li></ul>',
    zone2: '<h3>Avantages</h3><p>Brûleur sans stimulants + isolate ultra-pure. Pour une sèche sans les effets secondaires de la caféine.</p>',
    nutrition_values: 'Brûleur sans stimulant | Protéines: 25g isolate pur',
  },
  {
    designation_fr: 'Pack Masse Warriors',
    description_fr: 'Pack full mass Warriors : Mass Gainer 7kg + Créatine 300g + Shaker. Pack masse musculaire économique et efficace.',
    prix: '199',
    promo: '245',
    qte: '30',
    best_seller: '0',
    new_product: '0',
    mainImage: { url: '/uploads/produits/April2025/mass_gainer_7kg_-_warriors.webp', alt: 'Pack Masse Warriors' },
    zone1: '<h3>Contenu du Pack</h3><ul><li>Mass Gainer Warriors 7kg</li><li>Créatine 300g</li><li>Shaker Warriors offert</li></ul>',
    zone2: '<h3>Avantages</h3><p>7kg de gainer haute calorie + créatine pour la force. Le meilleur rapport qualité-prix pour la prise de masse.</p>',
    nutrition_values: 'Calories: 1100 par dose | Protéines: 40g | Créatine: 5g',
  },
];

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing packs collection
  const deletedCount = await Pack.deleteMany({});
  console.log(`Cleared ${deletedCount.deletedCount} old packs from packs collection`);

  // Also clean up the stale pack-type products from products collection
  const Product = mongoose.connection.db.collection('products');
  const deletedProducts = await Product.deleteMany({ type: 'pack' });
  console.log(`Cleaned ${deletedProducts.deletedCount} stale type=pack products from products collection`);

  // Create uploads/packs directory entry
  const fs = require('fs');
  const path = require('path');
  const packsDir = path.join(__dirname, 'uploads', 'packs');
  if (!fs.existsSync(packsDir)) {
    fs.mkdirSync(packsDir, { recursive: true });
    console.log('Created uploads/packs directory');
  }

  // Insert packs
  let successCount = 0;
  for (const packData of PACKS) {
    const slug = slugify(packData.designation_fr);
    const doc = {
      ...packData,
      slug,
      designation: packData.designation_fr,
      cover: packData.mainImage.url,
      images: [packData.mainImage],
      publier: '1',
      pack: '1',
      rupture: '',
      meta_description_fr: packData.description_fr.slice(0, 160),
      displayOrder: successCount,
    };
    try {
      await Pack.create(doc);
      successCount++;
      console.log(`  ✅ ${packData.designation_fr} — ${packData.prix} TND`);
    } catch (e) {
      console.log(`  ❌ ${packData.designation_fr}: ${e.message}`);
    }
  }

  // Verify
  const total = await Pack.countDocuments();
  console.log(`\n=== DONE ===`);
  console.log(`Packs collection: ${total} packs`);

  const remainingProducts = await Product.countDocuments({ type: 'pack' });
  console.log(`Products collection (type=pack): ${remainingProducts} (should be 0)`);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
