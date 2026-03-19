// ============================================================
//  PRODUCTS SEED DATA — Programmatic generator
//  Produces 200+ products for the Anti-Gravity / Aerial Fitness theme
// ============================================================

// Real product images from uploads folder
const REAL_PRODUCT_IMAGES = [
  '/uploads/produits/April2024/14WucA3VKnthyTDGrdV6.webp',
  '/uploads/produits/April2024/1ox0AKHiNReZz7lyFd9h.webp',
  '/uploads/produits/April2024/5FNfdV3E06JhK809gcxc.webp',
  '/uploads/produits/April2024/b9ejGJR58IGKNWQDEcdn.webp',
  '/uploads/produits/April2024/c6YJcuy2NDmYRcH5S2S4.webp',
  '/uploads/produits/April2024/rQdrBmR9YvyaB6YBgmfS.webp',
  '/uploads/produits/April2025/3XZPbCLw9o4ScC85CQSI.webp',
  '/uploads/produits/April2025/60vAY5f9F9LHZCzqebnK.webp',
  '/uploads/produits/April2025/f2cFTNb1JcxTEvAJ0MA2.webp',
  '/uploads/produits/April2025/gx09E0GMSMY9T9CS5cee.webp',
  '/uploads/produits/April2025/NEc4Rc3fJAwEG8ljfT7v.webp',
  '/uploads/produits/April2025/nQFL45ajPuNJxUH1W031.webp',
  '/uploads/produits/April2025/Xpps6iTOedjTAqg0z2nv.webp',
  '/uploads/produits/August2023/100_whey_-_2kg.webp',
  '/uploads/produits/August2023/100_whey_gold_standard_227kg.webp',
  '/uploads/produits/August2023/7NeLf0rtS1kODz6PtSTV.webp',
  '/uploads/produits/August2023/amino_energy_270_g.webp',
  '/uploads/produits/August2023/ashwagandha_90_tabs.webp',
  '/uploads/produits/August2023/beef_aminos_200_tabs.webp',
  '/uploads/produits/August2023/behemoth_preworkout_500g.webp',
  '/uploads/produits/August2023/BsEpjbku7NkBImBhhgu8.webp',
  '/uploads/produits/August2023/C4M8NNB5ft4HFI9JA5C9.webp',
  '/uploads/produits/August2023/carbo-z_mass_gainer_-_3_kg.webp',
  '/uploads/produits/August2023/creatine_monohydrate_-_500g_-quamtrax.webp',
  '/uploads/produits/August2023/delicious_gainer_45kg.webp',
  '/uploads/produits/August2023/enxOM3jIwel97QLzYhe1.webp',
  '/uploads/produits/August2023/EUxH3cLeMqg0XJ8mJBN8.webp',
  '/uploads/produits/August2023/Fct6QVjfAyEGs54vPwlw.webp',
  '/uploads/produits/August2023/fgNpyw647QQsijTiayHs.webp',
  '/uploads/produits/August2023/gloBiTN5vCPT35aNHySW.webp',
  '/uploads/produits/August2023/hard_mass_gainer_-_7kg.webp',
  '/uploads/produits/August2023/JeTFW6Ygcap4Ny2jSkU1.webp',
  '/uploads/produits/August2023/k4AfsOm5AW9fQ7JWZOBQ.webp',
  '/uploads/produits/August2023/max_mass_3xl_6kg.webp',
  '/uploads/produits/August2023/micronized_creatine_powder_317g.webp',
  '/uploads/produits/August2023/N6Tz6vlzQWe8a4FiCYfZ.webp',
  '/uploads/produits/August2023/nniLJu9wcxkYIUMuxuWC.webp',
  '/uploads/produits/August2023/pANexavomTnlAOLqswAs.webp',
  '/uploads/produits/August2023/platinum_creatine_400_gr.webp',
  '/uploads/produits/August2023/qiqqZjXqzFybSv0gqGTf.webp',
  '/uploads/produits/August2023/qn3VskCQe611UYj2Ozwa.webp',
  '/uploads/produits/August2023/real_hydro_100_-_18kg.webp',
  '/uploads/produits/August2023/real_mass_68_kg_-_real_pharm.webp',
  '/uploads/produits/August2023/real_whey_100_-_2250_gr.webp',
  '/uploads/produits/August2023/Ub0HXelLbQX2USm2r0x6.webp',
  '/uploads/produits/August2023/uWHPRuBAo76BUPPYXXZ1.webp',
  '/uploads/produits/August2023/wzaKy4F6WV1rSOOlZHv3.webp',
  '/uploads/produits/August2023/xpX0s4BNMmxirtyd3qNc.webp',
  '/uploads/produits/August2023/ytOPULLQq7o5ABlAyIvd.webp',
  '/uploads/produits/August2023/zinc_90_tab_real_pharm.webp',
  '/uploads/produits/August2023/zma_-120_caps.webp',
  '/uploads/produits/August2023/ZPFS0yLBrn32ButoGs7K.webp',
  '/uploads/produits/August2024/2nyMDWOoR6E6aTc4yXFv.webp',
  '/uploads/produits/August2024/2y786gcmdgaOo0dvNBtZ.webp',
  '/uploads/produits/August2024/6jRR8R7uvFvYQFddu3nm.webp',
  '/uploads/produits/August2024/8iYrIrHjsECnE4hygV6X.webp',
  '/uploads/produits/August2024/anabolic_l-carnitine_3000_mg_-_500_ml.webp',
  '/uploads/produits/August2024/bl4OStxbvOTz0r9CfMcx.webp',
  '/uploads/produits/August2024/c2IuQc8fU6DpXgeaOhpl.webp',
  '/uploads/produits/August2024/gold_creatine_300g.webp',
  '/uploads/produits/August2024/gold_l-arginine_1000_120_tablets.webp',
  '/uploads/produits/August2024/gsn_-_big_mass_gainer_3kg.webp',
  '/uploads/produits/August2024/gsn_-_creatine_monohydrate_200g.webp',
  '/uploads/produits/August2024/gsn_-_isolate_pro_2kg.webp',
  '/uploads/produits/August2024/gsn_-_nitro_whey_2kg.webp',
  '/uploads/produits/August2024/gsn_-_pure_whey_2kg.webp',
  '/uploads/produits/August2024/ICo2k02YBPkdfrGMM3gS.webp',
  '/uploads/produits/August2024/IUWvJ0ToyoOUSvBUsn65.webp',
  '/uploads/produits/August2024/nitro_tech_ripped_18_kg_-_muscletech.webp',
  '/uploads/produits/August2024/P6CIDYHOyJpXHI9dEodv.webp',
  '/uploads/produits/August2024/psychotic_pre-workout.webp',
  '/uploads/produits/August2024/QgCnXkRShWebxbIn43ms.webp',
  '/uploads/produits/August2024/qmA4QvU9joG2kQyotw2N.webp',
  '/uploads/produits/August2024/X6mpyi1j7ShwmaIJtMfW.webp',
  '/uploads/produits/August2024/XR9xu3v02DRef40hfMlD.webp',
  '/uploads/produits/August2024/y1bRWsmyqpnztCqNPsi2.webp',
  '/uploads/produits/August2024/zinc_chelate_-_biotech_usa.webp',
  '/uploads/produits/August2024/zma_60_capsules_hx_nutrition.webp',
  '/uploads/produits/December2023/creatine_monohydrate_500gr-_hx_nutrition.webp',
  '/uploads/produits/December2023/massive_gainer_7kg.webp',
  '/uploads/produits/December2023/RpszLCsW0pxiiOVP0Bdf.webp',
  '/uploads/produits/December2023/sAmxhb4XYgpUHJIz3Gp0.webp',
  '/uploads/produits/February2024/3z5ghlo0G3ZGFT8JWLJe.webp',
  '/uploads/produits/February2024/6IiInoRXnrnMh4sPQdq3.webp',
  '/uploads/produits/February2024/byVYnOTb2PIbCeJSzrxr.webp',
  '/uploads/produits/February2024/D0LCQ8OK5mOsnzUNN2HJ.webp',
  '/uploads/produits/February2024/eoQWn2CpRPykzpxSR7UI.webp',
  '/uploads/produits/February2024/EPm5DEr1cy5SCWzj82Ei.webp',
  '/uploads/produits/February2024/F4JXqIumFr2wNewRyOQm.webp',
  '/uploads/produits/February2024/gold_l-carnitine_3000_500ml.webp',
  '/uploads/produits/February2024/gold_power_core_multivitamin_120_tablets.webp',
  '/uploads/produits/February2024/isFAbjtvUiRrUAzS3WOe.webp',
  '/uploads/produits/February2024/jLnoxwo3yfDM2wASUdGm.webp',
  '/uploads/produits/February2024/LAFhOGCftGzM1qNiukb3.webp',
  '/uploads/produits/February2024/lDVSIu7oezSjW1lq5PFZ.webp',
  '/uploads/produits/February2024/mcLm8o7cokpnWdpYzNwk.webp',
  '/uploads/produits/February2024/O7DrRuGVzGn6eZy7iG5r.webp',
  '/uploads/produits/February2024/OjpqZcLOVhHOrrj3WsrQ.webp',
  '/uploads/produits/February2024/rHiyEsMpUmwFKWt6VZtg.webp',
  '/uploads/produits/February2024/rKUb0JzYEkjiKbVRYK2q.webp',
  '/uploads/produits/February2024/T85wvBtyubuilP2NGgtn.webp',
  '/uploads/produits/February2024/TlaK3rQIf87U9cMdPzRB.webp',
  '/uploads/produits/February2024/TLWCgaNQXfWBbQVW0r8h.webp',
  '/uploads/produits/February2024/USyStTpjnQ0yCgRXrDDJ.webp',
  '/uploads/produits/February2024/Wee4Q41miiNIkI9N0GVo.webp',
  '/uploads/produits/February2024/X4xHCUUSd4bIGexvOpFB.webp',
  '/uploads/produits/February2024/xk6F3lph9rHQd11ZetGh.webp',
  '/uploads/produits/February2024/ZjiiSTCz9rPzvNZIFnSr.webp',
  '/uploads/produits/February2025/100_whey_protein_227kg_-_challenger_nutrition.webp',
  '/uploads/produits/February2025/3xO1Ud1dcJmrSxkhEzvf.webp',
  '/uploads/produits/February2025/5NK1TO9VZPeqVU5eE0Ed.webp',
  '/uploads/produits/February2025/8579g8tHDbWAeVK2JiEu.webp',
  '/uploads/produits/February2025/anabolic_creatine_300g_-_kevin_levrone.webp',
  '/uploads/produits/February2025/Ao0AS164LDpIhTjMR1jS.webp',
  '/uploads/produits/February2025/C3ZWQUmN4CeYMfHXRhej.webp',
  '/uploads/produits/February2025/dY6IaOWz6zfjAsy7HCQX.webp',
  '/uploads/produits/February2025/gsn_-_big_mass_gainer_6kg.webp',
  '/uploads/produits/February2025/h4r37IPQDL6thLm0Kvp3.webp',
  '/uploads/produits/February2025/HlxzOONZpMYvQUaWBTDn.webp',
  '/uploads/produits/February2025/lCOCC5v3KUKfa84pqb3D.webp',
  '/uploads/produits/February2025/premium_v-bulk_55kg_-_victor_martinez.webp',
  '/uploads/produits/February2025/premium_whey_gold_2kg_-_victor_martinez.webp',
  '/uploads/produits/February2025/thunder_gainer_54kg_-_challenger_nutrition.webp',
  '/uploads/produits/February2025/tst_gh_-_biotech_usa.webp',
  '/uploads/produits/February2025/tst_gh_300_g_-_biotech_usa.webp',
  '/uploads/produits/February2025/vitamin_forte_120_caps_-_ostrovit.webp',
  '/uploads/produits/February2026/0ndRLGbJCv1PQRhmhuRv.webp',
  '/uploads/produits/February2026/1ib9s2erRBPwjENXURD1.webp',
  '/uploads/produits/February2026/22LTk5gLFNehbE5m66TZ.webp',
  '/uploads/produits/February2026/2t4OCCiygI4MyzqNLq7d.webp',
  '/uploads/produits/February2026/2xdoVyQXWDFfpsVmFQAd.webp',
  '/uploads/produits/February2026/5AHCT4JjyKc1mZg7llCy.webp',
  '/uploads/produits/February2026/5tLmXFj3pYQIomXVIGg2.webp',
  '/uploads/produits/February2026/6fozd2rmIAI8NhD3Uuva.webp',
  '/uploads/produits/February2026/7kU2f5qckDGsC9Wiujn6.webp',
  '/uploads/produits/February2026/8QjPd5IzJff4UYCBr52s.webp',
  '/uploads/produits/February2026/9cD1h8RYeIvCp18NYKK2.webp',
  '/uploads/produits/February2026/9IT4kQ7cLUwxsrpW8eIt.webp',
  '/uploads/produits/February2026/a5BUPm11GH4OSnsTo56W.webp',
  '/uploads/produits/February2026/ADBnUMRhBmEWlKmgKOSB.webp',
  '/uploads/produits/February2026/AnT3SXDgt2Ga3L8t77F5.webp',
  '/uploads/produits/February2026/axDftDjNZwSkmEwrPSCN.webp',
  '/uploads/produits/February2026/BuJr1yBohq1qLEXPn7Ub.webp',
  '/uploads/produits/February2026/CuT5PHboyzb8Pmg5pF6R.webp',
  '/uploads/produits/February2026/dJqmA3aqF6cy73M6G3Pd.webp',
  '/uploads/produits/February2026/dvu4yWqqS2KDYKLxojXa.webp',
  '/uploads/produits/February2026/gtKdsfqVL9xlxfcE9sxI.webp',
  '/uploads/produits/February2026/hqssUo4cfHCHa13yfvZE.webp',
  '/uploads/produits/February2026/If4kvw9ITWgLj1hdCwef.webp',
  '/uploads/produits/February2026/Ikg7UYWrG6TZLwildojb.webp',
  '/uploads/produits/February2026/iYRwAbL6pmWwpB4zedHt.webp',
  '/uploads/produits/February2026/j0E3KmFcCGDUXrEutyju.webp',
  '/uploads/produits/February2026/KB9q134sg4WzRUkrwufV.webp',
  '/uploads/produits/February2026/KpFb2728PYpJpDi62n9c.webp',
  '/uploads/produits/February2026/M8QkZ9GMD2UeGJ906ay5.webp',
  '/uploads/produits/February2026/MMAsmui7bi1sQNi30rlD.webp',
  '/uploads/produits/February2026/o6nBqwwXmZL7DlrvtaGe.webp',
  '/uploads/produits/February2026/ozUmSzLTibsJZqvj70li.webp',
  '/uploads/produits/February2026/Qj15GhtMCE3EIyRSXrhX.webp',
  '/uploads/produits/February2026/R1uoHkaKg3u9HQG172ZB.webp',
  '/uploads/produits/February2026/r49s2Wy7RNysbaatBnjt.webp',
  '/uploads/produits/February2026/RebwXOvopF3MTQqKHDnW.webp',
  '/uploads/produits/February2026/rWOmo18H28JAeQOreKzx.webp',
  '/uploads/produits/February2026/texqRctkSU9z2pbZMShq.webp',
  '/uploads/produits/February2026/tjWeJ1dFqbIeQemmpI3q.webp',
  '/uploads/produits/February2026/TMdCmjTifWGcgo3eeIFR.webp',
  '/uploads/produits/February2026/U6eeTBAlxzew7OSlWB2J.webp',
  '/uploads/produits/February2026/U7jGbH4xnjB5oNkdAzvd.webp',
  '/uploads/produits/February2026/Uej5CfSgOfWskKFewvsX.webp',
  '/uploads/produits/February2026/uqkRV6WydeWNQJlm63Rw.webp',
  '/uploads/produits/February2026/V3tqdu4TTAK5FK3CcK1o.webp',
  '/uploads/produits/February2026/veVKP1Zf9Hsnb9h1Z0KK.webp',
  '/uploads/produits/February2026/VMntKc4yHIon6pyfi6dt.webp',
  '/uploads/produits/February2026/VTswAKcF3gU3ld7RuzCl.webp',
  '/uploads/produits/February2026/wKfEjogIQghx7IszCUEq.webp',
  '/uploads/produits/February2026/xuWfogTlHtXrnIyiSJjp.webp',
  '/uploads/produits/February2026/YMzkUACTDLCFHm2AlYnI.webp',
  '/uploads/produits/February2026/YyLBRjZpYKg4WKGd9OZl.webp',
  '/uploads/produits/February2026/zAxCWGKn3scRGiMxDgEb.webp',
  '/uploads/produits/February2026/ZM8A9ZkKwfpYgqKRpsO3.webp',
  // Continuing with more images (truncated for brevity - total 753 images available)
  '/uploads/produits/September2023/animal_cuts_42doses.webp',
  '/uploads/produits/September2023/animal_pak.webp',
  '/uploads/produits/September2023/bcaa_12000_457_g.webp',
  '/uploads/produits/September2023/beef_protein_-18_kg.webp',
  '/uploads/produits/September2023/big_monster_7_kg.webp',
  '/uploads/produits/September2023/c4_pre_workout_195_g.webp',
  '/uploads/produits/September2023/combat_protein_powder_181kg.webp',
  '/uploads/produits/September2023/creatine_monohydrate_300gr-_hx_nutrition.webp',
  '/uploads/produits/September2023/gainer_xtreme_544_kg.webp',
  '/uploads/produits/September2023/gold_iso_-_2kg.webp',
  '/uploads/produits/September2023/gold_whey_2_kg.webp',
  '/uploads/produits/September2023/hydro_whey_-159_kg.webp',
  '/uploads/produits/September2023/iso_100_dymatize_23kg.webp',
  '/uploads/produits/September2023/iso_whey_2_kg_hx_nutrition.webp',
  '/uploads/produits/September2023/levro_legendary_mass_3kg.webp',
  '/uploads/produits/September2023/lipo_6_black_60_caps.webp',
  '/uploads/produits/September2023/mass_gainer_zero_-_7kg.webp',
  '/uploads/produits/September2023/nitro_tech_whey_gold_23kg.webp',
  '/uploads/produits/September2023/omega_3.webp',
  '/uploads/produits/September2023/opti-men_-_150tabs.webp',
  '/uploads/produits/September2023/opti-women_120caps.webp',
  '/uploads/produits/September2023/platinum_fish_oil_-100_caps.webp',
  '/uploads/produits/September2023/prostar_100_whey_protein_24kg.webp',
  '/uploads/produits/September2023/pure_whey_isolate_95_22kg.webp',
  '/uploads/produits/September2023/real_isolate_18_kg.webp',
  '/uploads/produits/September2023/serious_mass_-_27_kg.webp',
  '/uploads/produits/September2023/the_ripper_150_g_jnx_sports.webp',
  '/uploads/produits/September2023/whey_gold_standard_908g.webp',
  '/uploads/produits/September2023/xtend_bcaa_420g.webp',
  '/uploads/produits/September2023/zero_isolate_2_kg_-_hx_nutrition.webp',
  '/uploads/produits/January2024/fish_oil_100_softgels.webp',
  '/uploads/produits/January2024/l-carnitine_2000_355ml.webp',
  '/uploads/produits/January2024/t_9_testo_booster_120_caps.webp',
  '/uploads/produits/January2025/bcaa_glutamine_500g_-_quamtrax.webp',
  '/uploads/produits/January2025/bcaa_zero_360g_-_biotech_usa.webp',
  '/uploads/produits/January2025/iso_plus_700_g_-_olimp_sport_nutrition.webp',
  '/uploads/produits/January2025/l-arginine_300g_-_biotech_usa.webp',
  '/uploads/produits/January2026/100_pure_whey_227kg_-_biotech_usa.webp',
  '/uploads/produits/January2026/clear_beef_1800g_-_william_bonac.webp',
  '/uploads/produits/January2026/gold_isolate_2kg_-_v_shape_supps.webp',
  '/uploads/produits/January2026/gold_whey_2kg_-_v_shape_supps.webp',
  '/uploads/produits/January2026/iso_fusion_2kg_-_eric_favre.webp',
  '/uploads/produits/January2026/iso_hydro_zero_1800g_-_william_bonac.webp',
  '/uploads/produits/January2026/omega_3_90_capsules_-_ostrovit.webp',
  '/uploads/produits/January2026/platinum_creatine_400g_-_muscletech.webp',
  '/uploads/produits/January2026/serious_mass_545_kg_-_optimum_nutrition.webp',
  '/uploads/produits/January2026/whey_ultimate_2kg_-_william_bonac.webp',
];

let imageIndex = 0;

// --------------- helpers ---------------
function slug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function pickImages(prefix: string, count: number): Array<{ url: string; alt: string }> {
  // Use real uploaded product images
  const images: Array<{ url: string; alt: string }> = [];
  for (let i = 0; i < count; i++) {
    images.push({
      url: REAL_PRODUCT_IMAGES[imageIndex % REAL_PRODUCT_IMAGES.length],
      alt: `${prefix} image ${i + 1}`,
    });
    imageIndex++;
  }
  return images;
}

function genReviews(productName: string) {
  const comments = [
    `Excellent pour les inversions anti-gravité, je recommande vivement !`,
    `Qualité top, mon dos se porte mieux depuis que j'utilise ce produit.`,
    `Parfait pour la décompression vertébrale et le renforcement du tronc.`,
    `Super produit pour les cours de yoga aérien, très résistant et facile à monter.`,
    `Grande amélioration de ma flexibilité en seulement 2 semaines !`,
    `Idéal pour les débutants. Bon rapport qualité/prix pour le marché tunisien.`,
    `Great for anti-gravity inversions! Very sturdy and comfortable.`,
    `Le tissu est anti-glisse, j'ai pu faire des poses difficiles en toute sécurité.`,
    `Livraison rapide, emballage soigné. Le produit est exactement comme sur les photos.`,
  ];
  const userIds = ['user001', 'user002', 'user003', 'user004', 'user005', 'user006'];
  const count = randInt(1, 3);
  return Array.from({ length: count }, () => ({
    rating: randInt(3, 5),
    user_id: rand(userIds),
    comment: rand(comments),
    date: new Date(Date.now() - randInt(1, 365) * 86400000),
  }));
}

// --------------- base data ---------------

const BRANDS = [
  'OLIMP SPORT NUTRITION', 'DYMATIZE', 'NUTREX RESEARCH', 'API', 'BIOTECH USA',
  'RULE 1', 'BPI SPORTS', 'BSN SUPPLEMENTS', 'CELLUCOR', 'CHALLENGER NUTRITION',
  'KEVIN LEVRONE', 'MUSCLETECH', 'MUTANT', 'Optimum Nutrition', 'OstroVit',
  'Quamtrax', 'Real Pharm', 'Redcon1', 'SCITEC NUTRITION', 'Ultimate Nutrition',
  'Universal Nutrition', 'MusclePharm', 'Invictus', 'MYPROTEIN', 'PROACTIVE',
  'GALVANIZE CHROME', 'SOTEK NUTRITION', 'ACTIVLAB', 'HX NUTRITION', 'PRO CELL',
  'SCIVATION', 'MR.X V-Shape Supps', 'SCENIT NUTRITION', 'KONG SPORT NUTRITION',
  'GOLD\u2019S GYM', 'ERIC FAVRE', 'JNX SPORTS', 'NUTRAGENICS',
  'FA ENGINEERED NUTRITION', 'MONSTER', 'APPLIED NUTRITION', 'TREC NUTRITION',
  '7NUTRITION', 'SOUL PROJECT', 'IHS TECHNOLOGY SUPPLEMENTS', 'MND FITNESS',
  'JX FITNESS', 'GSN Great Sport Nutrition', 'BIG RAMY LABS', 'VICTOR MARTINEZ',
  'WARRIOR SUPPLEMENTS', 'USN Ultimate Sports Nutrition', 'YAVA LABS', 'WILLIAM BONAC',
];

const COLORS = ['Bleu', 'Rouge', 'Violet', 'Vert', 'Noir', 'Rose', 'Orange', 'Blanc', 'Turquoise', 'Gris'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Taille unique'];

// -------  Product templates per category -------

type ProductTemplate = {
  nameFr: string;
  description: string;
  smallDescription: string;
  category: string;
  subcategory: string;
  priceRange: [number, number];
  imagePfx: string;
  features: string[];
};

const templates: ProductTemplate[] = [
  // ---- Hammocks et Tissus Aériens ----
  {
    nameFr: 'Hamac de Yoga Aérien',
    description: 'Hamac de yoga anti-gravité en nylon haute résistance certifié 500 kg. Idéal pour les inversions, la décompression vertébrale et le renforcement du tronc. Tissu anti-glisse à 4 voies d\'étirement pour un confort maximal lors des postures aériennes.',
    smallDescription: 'Hamac yoga aérien certifié 500 kg pour inversions et décompression vertébrale.',
    category: 'Hammocks et Tissus Aériens',
    subcategory: 'Hamacs Simples',
    priceRange: [150, 280],
    imagePfx: 'product-hammock-',
    features: ['Certifié 500 kg', 'Tissu anti-glisse', 'Installation facile', 'Largeur 280 cm', 'Lavable en machine'],
  },
  {
    nameFr: 'Tissu Aérien Professionnel',
    description: 'Tissu aérien de scène professionnel en lycra stretch 4 voies, longueur 5 m à 8 m. Utilisé par les acrobates et danseurs aériens pour des performances artistiques ou des entraînements intensifs anti-gravité.',
    smallDescription: 'Tissu aérien professionnel en lycra stretch 5-8 m pour acrobates et danseurs.',
    category: 'Hammocks et Tissus Aériens',
    subcategory: 'Tissus Aériens',
    priceRange: [90, 200],
    imagePfx: 'product-silk-',
    features: ['Lycra 4 voies', 'Certifié scène', 'Longueur au choix', 'Résistant aux lavages répétés'],
  },
  {
    nameFr: 'Hamac Cocon Anti-Gravité',
    description: 'Hamac cocon enveloppant pour une relaxation profonde et des inversions passives. Réduit le stress articulaire et favorise la décompression de la colonne vertébrale. Tissu respirant certifié hypoallergénique.',
    smallDescription: 'Hamac cocon pour relaxation, inversions passives et décompression vertébrale.',
    category: 'Hammocks et Tissus Aériens',
    subcategory: 'Hamacs Cocon',
    priceRange: [120, 220],
    imagePfx: 'product-cocoon-',
    features: ['Tissu hypoallergénique', 'Design cocon enveloppant', 'Idéal thérapie', 'Charge max 200 kg'],
  },
  {
    nameFr: 'Cerceau Aérien Lyra',
    description: 'Cerceau aérien (Lyra) en acier inoxydable 35 mm pour arts aériens et fitness. Disponible en diamètre 80 cm, 90 cm et 100 cm. Revêtement anti-rouille et texturation anti-glisse pour une prise en main sécurisée.',
    smallDescription: 'Cerceau Lyra en acier inox 35 mm pour arts aériens et fitness.',
    category: 'Hammocks et Tissus Aériens',
    subcategory: 'Cerceaux Aériens (Lyra)',
    priceRange: [200, 320],
    imagePfx: 'product-lyra-',
    features: ['Acier inox 35 mm', 'Anti-rouille', 'Plusieurs diamètres', 'Charge 200 kg'],
  },
  // ---- Équipements de Suspension ----
  {
    nameFr: 'Kit Sangles de Suspension Pro',
    description: 'Kit complet de sangles de suspension professionnelles, alternative aux systèmes TRX. Comprend sangles réglables, amarrage universel, guide d\'exercices et sac de transport. Testées pour 400 kg. Parfait pour entraînements de force, mobilité et fitness anti-gravité.',
    smallDescription: 'Kit complet sangles suspension Pro, alternative TRX, testé 400 kg.',
    category: 'Équipements de Suspension',
    subcategory: 'Alternatives TRX',
    priceRange: [85, 180],
    imagePfx: 'product-straps-',
    features: ['Charge testée 400 kg', 'Réglage rapide', 'Sac inclus', 'Guide d\'exercices PDF', 'Acier inox'],
  },
  {
    nameFr: 'Sangles de Suspension Élastiques',
    description: 'Sangles de suspension avec résistance élastique intégrée pour varier l\'intensité de l\'entraînement en suspension. Idéal pour la rééducation, le Pilates aérien et la progression en force fonctionnelle avec défiance de la gravité.',
    smallDescription: 'Sangles suspension élastiques pour rééducation, Pilates aérien et renforcement.',
    category: 'Équipements de Suspension',
    subcategory: 'Sangles de Suspension',
    priceRange: [70, 140],
    imagePfx: 'product-elastic-',
    features: ['Élasticité variable', 'Rééducation', 'Ancrage universel', 'Anti-dérapant'],
  },
  {
    nameFr: 'Kit Ancrage Plafond Universel',
    description: 'Kit d\'ancrage plafond universel pour hamacs, anneaux, sangles et équipements aériens. Plaque d\'acier renforcée avec mousqueton de 5 000 kg. Installation sur béton, bois ou acier. Certifié pour usage sportif professionnel.',
    smallDescription: 'Kit ancrage plafond universel certifié 5000 kg pour tous équipements aériens.',
    category: 'Équipements de Suspension',
    subcategory: 'Systèmes d\'Ancrage',
    priceRange: [45, 120],
    imagePfx: 'product-anchor-',
    features: ['Charge 5000 kg', 'Universel', 'Acier renforcé', 'Installation multi-supports'],
  },
  // ---- Vêtements de Fitness ----
  {
    nameFr: 'Legging Yoga Aérien Haute Performance',
    description: 'Legging ergonomique en tissu stretch 4 voies pour yoga aérien et Pilates en suspension. Coutures plates anti-friction, taille haute maintien abdominal, tissu respirant UPF 50+. Parfait pour les inversions prolongées sans inconfort.',
    smallDescription: 'Legging haute performance 4 voies pour yoga aérien et postures inversées.',
    category: 'Vêtements de Fitness',
    subcategory: 'Leggings',
    priceRange: [65, 130],
    imagePfx: 'product-legging-',
    features: ['Tissu 4 voies', 'UPF 50+', 'Taille haute', 'Coutures plates', 'Séchage rapide'],
  },
  {
    nameFr: 'Brassière de Sport Aérien',
    description: 'Brassière de sport ultra-supportante pour yoga aérien et fitness en suspension. Bretelles renforcées, bonnets amovibles, tissu antimicrobien. Maintien fort pour les acrobaties et inversions sans risque de glissement.',
    smallDescription: 'Brassière ultra-supportante pour yoga aérien, maintain fort pour inversions.',
    category: 'Vêtements de Fitness',
    subcategory: 'Tops et Brassières de Sport',
    priceRange: [50, 110],
    imagePfx: 'product-bra-',
    features: ['Support fort', 'Antimicrobien', 'Bonnets amovibles', 'Bretelles renforcées'],
  },
  {
    nameFr: 'Tenue Complète Yoga Aérien',
    description: 'Set complet brassière + legging assorti pour yoga aérien et Pilates suspension. Tissu technique stretch 4 voies coordonné, coutures ergonomiques et finitions premium. La tenue idéale pour les sessions anti-gravité en studio.',
    smallDescription: 'Tenue complète brassière + legging pour yoga aérien et Pilates en suspension.',
    category: 'Vêtements de Fitness',
    subcategory: 'Tenues Complètes',
    priceRange: [100, 200],
    imagePfx: 'product-outfit-',
    features: ['Set coordonné', 'Tissu stretch 4 voies', 'Finitions premium', 'Taille haute ajustable'],
  },
  // ---- Accessoires de Yoga ----
  {
    nameFr: 'Bloc de Yoga Anti-Gravité',
    description: 'Bloc de yoga en liège naturel extra-dense pour soutien dans les postures au sol et transitions vers les exercices aériens. Surface anti-dérapante, forme ergonomique avec arêtes biseautées. Pratique pour les débutants en yoga anti-gravité.',
    smallDescription: 'Bloc de yoga en liège naturel pour support lors des transitions sol-aérien.',
    category: 'Accessoires de Yoga',
    subcategory: 'Blocs de Yoga',
    priceRange: [20, 50],
    imagePfx: 'product-block-',
    features: ['Liège naturel', 'Anti-dérapant', 'Arêtes biseautées', 'Écologique'],
  },
  {
    nameFr: 'Sangle de Yoga Multidimensionnelle',
    description: 'Sangle de yoga en coton bio avec boucle D ajustable, spécialement conçue pour les étirements profonds avant et après les sessions de yoga aérien. Aide à maintenir les postures et améliorer la flexibilité sans douleur articulaire.',
    smallDescription: 'Sangle yoga coton bio pour étirements profonds avant/après sessions aériennes.',
    category: 'Accessoires de Yoga',
    subcategory: 'Sangles de Yoga',
    priceRange: [15, 40],
    imagePfx: 'product-strap-',
    features: ['Coton bio', 'Boucle D', 'Longueur 183 cm', 'Résistant', 'Pour tous niveaux'],
  },
  {
    nameFr: 'Rouleau de Massage Aérien',
    description: 'Rouleau de massage (foam roller) à haute densité pour récupération musculaire après les sessions de fitness aérien. Texturation spéciale pour un massage en profondeur des muscles dorsaux, fessiers et ischio-jambiers sollicités lors des inversions.',
    smallDescription: 'Rouleau massage haute densité pour récupération après fitness aérien.',
    category: 'Accessoires de Yoga',
    subcategory: 'Rouleaux de Massage',
    priceRange: [30, 70],
    imagePfx: 'product-roller-',
    features: ['Haute densité', 'Texturation profonde', 'EVA anti-dérapant', 'Longueur 60 cm'],
  },
  // ---- Kits d'Entraînement ----
  {
    nameFr: 'Kit Anti-Gravité Débutant',
    description: 'Kit complet pour débutants en yoga anti-gravité. Inclut un hamac de yoga, des sangles d\'ancrage, un guide d\'entraînement et un tapis de sol. Tout le nécessaire pour commencer à pratiquer les inversions et postures aériennes à domicile en toute sécurité.',
    smallDescription: 'Kit débutant complet : hamac, sangles, guide et tapis pour débuter en yaérien.',
    category: 'Kits d\'Entraînement',
    subcategory: 'Kits Débutants',
    priceRange: [180, 300],
    imagePfx: 'product-kit-beginner-',
    features: ['Hamac inclus', 'Guide anti-gravité', 'Tapis inclus', 'Sangles incluses', 'Débutant friendly'],
  },
  {
    nameFr: 'Kit Aerial Pro Avancé',
    description: 'Kit professionnel pour pratiquants avancés de fitness aérien. Comprend tissu aérien 6 m, cerceau Lyra, sangles pro, système d\'ancrage renforcé et guide de progressions avancées. Pour les studios et athlètes sérieux qui souhaitent défier la gravité au maximum.',
    smallDescription: 'Kit avancé complet : tissu + Lyra + sangles + ancrage pour professionnels.',
    category: 'Kits d\'Entraînement',
    subcategory: 'Kits Avancés',
    priceRange: [350, 600],
    imagePfx: 'product-kit-pro-',
    features: ['Tissu 6 m', 'Lyra inclus', 'Ancrage pro', 'Guide avancé', 'Studio-ready'],
  },
  // ---- Mats et Tapis ----
  {
    nameFr: 'Tapis de Yoga Anti-Dérapant Grip Pro',
    description: 'Tapis de yoga haute performance avec technologie Grip Pro anti-dérapante pour les pratiques combinées sol et hamac. Épaisseur 6 mm, matière TPE écologique, surface texturée sur les deux faces. Idéal pour les transitions entre exercices au sol et postures aériennes.',
    smallDescription: 'Tapis yoga 6 mm Grip Pro anti-dérapant pour pratiques sol et hamac combinées.',
    category: 'Mats et Tapis',
    subcategory: 'Tapis de Yoga',
    priceRange: [55, 120],
    imagePfx: 'product-mat-yoga-',
    features: ['TPE écologique', 'Grip double face', 'Épaisseur 6 mm', '183 x 61 cm', 'Sans PVC'],
  },
  {
    nameFr: 'Tapis de Fitness Épais Anti-Choc',
    description: 'Tapis de fitness extra-épais 10 mm en mousse NBR haute densité pour les exercices d\'atterrissage et réceptions après les mouvements aériens. Protection articulaire maximale pour les genoux, hanches et vertèbres lors des pratiques anti-gravité.',
    smallDescription: 'Tapis fitness 10 mm haute densité NBR pour réceptions et protection articulaire.',
    category: 'Mats et Tapis',
    subcategory: 'Tapis de Fitness',
    priceRange: [60, 130],
    imagePfx: 'product-mat-fitness-',
    features: ['NBR haute densité', 'Épaisseur 10 mm', 'Protection articulaire', '180 x 60 cm', 'Sangle incluse'],
  },
  // ---- Rigs et Structures ----
  {
    nameFr: 'Portique Aérien Autoportant',
    description: 'Portique autoportant en acier galvanisé pour hamacs, anneaux et sangles aériens à domicile ou en studio. Hauteur réglable de 2 m à 3 m, charge maximale 250 kg, installation sans perçage. Démontable et transportable. Certifié aux normes de sécurité européennes.',
    smallDescription: 'Portique autoportant acier galvanisé H.2-3 m, 250 kg, sans perçage.',
    category: 'Rigs et Structures',
    subcategory: 'Portiques Autoportants',
    priceRange: [280, 550],
    imagePfx: 'product-rig-standing-',
    features: ['Acier galvanisé', 'Hauteur réglable', 'Charge 250 kg', 'Sans perçage', 'Démontable', 'Certifié CE'],
  },
  {
    nameFr: 'Kit Fixation Plafond Pro 1000 kg',
    description: 'Kit de fixation plafond professionnel pour yoga aérien et arts du cirque. Plaque acier 10 mm, mousqueton certifié 1 000 kg, vis d\'expansion spéciales béton. Inclut notice d\'installation détaillée. Pour béton, bois massif et poutrelles métalliques.',
    smallDescription: 'Kit fixation plafond pro 1000 kg pour yoga aérien et arts du cirque.',
    category: 'Rigs et Structures',
    subcategory: 'Fixations Plafond',
    priceRange: [60, 150],
    imagePfx: 'product-ceiling-',
    features: ['Charge 1000 kg', 'Acier 10 mm', 'Multi-support', 'Notice incluse', 'Pro certifié'],
  },
  {
    nameFr: 'Rig Aérien Portable',
    description: 'Rig aérien portable et pliable pour les entraînements en extérieur ou en déplacement. Structure aluminium ultraléger 4 kg, déploiement en 5 minutes, hauteur 2,5 m, charge 150 kg. Livré avec sac de transport. Idéal pour instructeurs nomades.',
    smallDescription: 'Rig portable aluminium 4 kg, H.2.5 m, 150 kg, déploiement 5 min.',
    category: 'Rigs et Structures',
    subcategory: 'Rigs Portables',
    priceRange: [220, 420],
    imagePfx: 'product-rig-portable-',
    features: ['Aluminium 4 kg', 'Déploiement 5 min', 'Charge 150 kg', 'Sac inclus', 'Instructeur mobile'],
  },
  // ---- Compléments de Bien-Être ----
  {
    nameFr: 'Crème Récupération Musculaire Aérien',
    description: 'Crème de récupération musculaire à base d\'arnica, de camphre et d\'huiles essentielles de lavande et de menthe poivrée. Formule spécialement développée pour les pratiquants de fitness aérien : soulage les tensions dorsales, épaules et bras après les sessions d\'inversions.',
    smallDescription: 'Crème récupération arnica + menthe pour tensions après fitness aérien.',
    category: 'Compléments de Bien-Être',
    subcategory: 'Compléments de Récupération',
    priceRange: [25, 60],
    imagePfx: 'product-cream-',
    features: ['Arnica bio', 'Lavande & menthe', 'Formule anti-tension', '200 ml', 'Vegan'],
  },
  {
    nameFr: 'Huile Essentielle Relaxation Aérien',
    description: 'Mélange synergique d\'huiles essentielles pour la relaxation et la récupération après les sessions de yoga aérien. Notes d\'eucalyptus, lavande et romarin pour détendre les muscles sollicités lors des inversions et améliorer la qualité du sommeil.',
    smallDescription: 'Huile essentielle eucalyptus-lavande pour relaxation post-yoga aérien.',
    category: 'Compléments de Bien-Être',
    subcategory: 'Huiles Essentielles',
    priceRange: [18, 45],
    imagePfx: 'product-oil-',
    features: ['100% naturelle', 'Eucalyptus + Lavande', 'Relaxation profonde', '30 ml', 'Certifiée bio'],
  },
];

const colors = COLORS;
const sizes = SIZES;

// Generate 200+ products from templates
function generateProducts() {
  const products: any[] = [];
  let skuCounter = 1000;

  templates.forEach((tpl, tplIdx) => {
    // Each template generates several variants (color/size combos) + base product
    const colorSubset = colors.slice(0, randInt(4, 7));
    const sizeSubset = tpl.category === 'Vêtements de Fitness'
      ? ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      : ['Taille unique'];

    const basePrice = randFloat(tpl.priceRange[0], tpl.priceRange[1]);

    // Generate color variants
    colorSubset.forEach((color) => {
      sizeSubset.forEach((size) => {
        skuCounter++;
        const sku = `AGF-${String(skuCounter).padStart(4, '0')}`;
        const variantName = `${tpl.nameFr} — ${color}${sizeSubset.length > 1 ? ' / ' + size : ''}`;
        const hasDiscount = Math.random() < 0.4;
        const discount = hasDiscount ? randInt(5, 20) : 0;
        const oldPrice = hasDiscount ? parseFloat((basePrice / (1 - discount / 100)).toFixed(1)) : undefined;
        const imageCount = randInt(1, 4);
        const brandName = rand(BRANDS);

        products.push({
          designation_fr: variantName,
          designation: variantName,
          title: variantName,
          slug: slug(`${variantName}-${sku}`),
          price: basePrice,
          oldPrice,
          discountPercentage: discount,
          currency: 'TND',
          description: tpl.description,
          smallDescription: tpl.smallDescription,
          category: tpl.category,
          subcategory: tpl.subcategory,
          brand: brandName,
          sku,
          quantity: randInt(10, 500),
          stock: randInt(10, 500),
          inStock: true,
          status: true,
          isActive: true,
          features: tpl.features,
          images: pickImages(tpl.imagePfx, imageCount),
          mainImage: pickImages(tpl.imagePfx, 1)[0],
          isFlashSale: Math.random() < 0.1,
          aggregateRating: randFloat(3.5, 5.0),
          reviewCount: randInt(5, 80),
          reviews: genReviews(variantName),
          zone1: color,
          zone2: size,
          type: tpl.category,
          meta_description_fr: tpl.smallDescription,
        });
      });
    });
  });

  // If total < 200, duplicate some entries with tweaked prices until we reach 200
  while (products.length < 200) {
    skuCounter++;
    const base = products[products.length % templates.length];
    const sku = `AGF-${String(skuCounter).padStart(4, '0')}`;
    const priceVariant = parseFloat((base.price * randFloat(0.85, 1.15)).toFixed(1));
    products.push({
      ...base,
      sku,
      slug: slug(`${base.designation_fr}-${sku}`),
      price: priceVariant,
      oldPrice: base.oldPrice ? parseFloat((base.oldPrice * randFloat(0.85, 1.15)).toFixed(1)) : undefined,
      quantity: randInt(10, 500),
      stock: randInt(10, 500),
      aggregateRating: randFloat(3.5, 5.0),
      reviews: genReviews(base.designation_fr),
    });
  }

  return products;
}

export const productsSeedData = generateProducts();
