// ============================================================
//  PACKS SEED DATA — Anti-Gravity & Aerial Fitness Bundles
//  50+ packs, each containing 3-5 related products
//  Note: Product SKUs are resolved dynamically in seed.service.ts
// ============================================================

// Real pack images from uploads folder
const PACK_IMAGES = [
  '/uploads/produits/April2024/pack_muscle_sec.webp',
  '/uploads/produits/April2024/pack_prise_de_masse-2.webp',
  '/uploads/produits/April2024/pack_prise_de_masse.webp',
  '/uploads/produits/April2024/pack_seche_extreme.webp',
  '/uploads/produits/April2025/arginine_210_gr_ostrovit.webp',
  '/uploads/produits/April2025/glutamine_300g_ostrovit.webp',
  '/uploads/produits/April2025/hydroxycut_hardcore_super_elite_120_caps.webp',
  '/uploads/produits/April2025/mass_gainer_7kg_-_warriors.webp',
  '/uploads/produits/April2025/test_hd_élite_120_caps.webp',
  '/uploads/produits/April2025/whey_pro_warriors_2kg.webp',
  '/uploads/produits/April2025/whey_pro_warriors_2kg_warriors.webp',
  '/uploads/produits/December2025/pack_hard_2.webp',
  '/uploads/produits/December2025/pack_hard_mass_1.webp',
  '/uploads/produits/December2025/pack_realsolate_1.webp',
  '/uploads/produits/December2025/paxk_whey_1.webp',
  '/uploads/produits/February2026/bcaa_gluta_500g_-_scenit_nutrition.webp',
  '/uploads/produits/February2026/best_collagen_premium_350g_-_scenit_nutrition.webp',
  '/uploads/produits/February2026/best_zma_-_120_caps_-_scenit_nutrition.webp',
  '/uploads/produits/February2026/full_mass_7_kg_-_soul_project.webp',
  '/uploads/produits/February2026/instant_real_mass_272kg_-_scenit_nutrition.webp',
  '/uploads/produits/February2026/multi_vita120_caps_-_scenit_nutrition.webp',
  '/uploads/produits/February2026/vitamin_d3_4000_iu_-120_capsule_-_ostrovit.webp',
  '/uploads/produits/September2023/animal_cuts_42doses.webp',
  '/uploads/produits/September2023/animal_cuts_42_doses.webp',
  '/uploads/produits/September2023/animal_cuts_42_sachets.webp',
  '/uploads/produits/September2023/animal_cuts_no-stim_powder_42_doses.webp',
  '/uploads/produits/September2023/animal_pak.webp',
  '/uploads/produits/September2023/animal_pak_-_30_packs.webp',
  '/uploads/produits/September2023/animal_pak_-_44_packs.webp',
  '/uploads/produits/September2023/animal_pak_44_scoops_powder.webp',
  '/uploads/produits/September2023/animal_stak_23packs.webp',
  '/uploads/produits/September2023/animal_whey_isolate_loaded_227kg.webp',
  '/uploads/produits/September2024/big_ramy_labs_-_bcaa_300g.webp',
  '/uploads/produits/September2024/big_ramy_labs_-_beef_mass_gainer_49kg.webp',
  '/uploads/produits/September2024/big_ramy_labs_-_big_whey_2kg.webp',
  '/uploads/produits/September2024/big_ramy_labs_-_creatine_300g.webp',
  '/uploads/produits/September2024/big_ramy_labs_-_iso_big_2kg.webp',
  '/uploads/produits/September2024/big_whey_2kg_-_big_ramy_labs.webp',
  '/uploads/produits/September2024/compact_whey_gold_2kg_-_galvanize_chrome.webp',
  '/uploads/produits/September2024/compact_whey_gold_protein_2kg.webp',
  '/uploads/produits/September2024/iso_big_21kg_-_big_ramy_labs.webp',
];

let packImageIndex = 0;

interface PackData {
    name: string;
    slug: string;
    description: string;
    productSkuPrefixes: string[];  // match by SKU prefix in generated products
    discountPercent: number;        // bundle discount 10-30%
    stock: number;
    images: Array<{ url: string; alt: string }>;
    isActive: boolean;
    isFeatured: boolean;
    category: string;
}

function slugify(s: string) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const rawPacks = [
    // ===== BEGINNER PACKS =====
    { name: 'Pack Anti-Gravité Débutant Essentiel', desc: 'Kit de démarrage complet pour débuter le yoga anti-gravité : hamac, ancrage plafond, tapis et sangle. Idéal pour pratiquer la décompression vertébrale et les inversions à domicile.', cats: ['AGF-1001', 'AGF-1007', 'AGF-1016', 'AGF-1012'], disc: 15, stock: 80, feat: true, cat: 'Kits Débutants' },
    { name: 'Pack Yoga Aérien Starter Bleu', desc: 'Ensemble débutant hamac bleu + tapis grip + sangle yoga. Parfait pour les premières inversions en toute sécurité.', cats: ['AGF-1001', 'AGF-1016', 'AGF-1012'], disc: 12, stock: 60, feat: true, cat: 'Kits Débutants' },
    { name: 'Pack Découverte Anti-Gravité', desc: 'Pack découverte idéal pour les curieux du yoga aérien. Hamac cocon + rouleau massage + huile essentielle relaxation.', cats: ['AGF-1003', 'AGF-1013', 'AGF-1022'], disc: 10, stock: 50, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Initiation Suspension', desc: 'Initiez-vous à l\'entraînement en suspension avec ce kit : sangles suspension, ancrage universel et guide d\'exercices.', cats: ['AGF-1005', 'AGF-1007', 'AGF-1006'], disc: 13, stock: 70, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Premier Pas Aérien Violet', desc: 'Hamac violet + bloc yoga + sangle pour débuter en douceur le yoga anti-gravité avec le bon matériel ergonomique.', cats: ['AGF-1001', 'AGF-1011', 'AGF-1012'], disc: 10, stock: 45, feat: false, cat: 'Kits Débutants' },

    // ===== PRO & ADVANCED PACKS =====
    { name: 'Pack Aerial Pro Studio Complet', desc: 'Kit professionnel pour studio de yoga aérien : tissu aérien 6 m, cerceau Lyra, ancrage plafond 1000 kg, portique autoportant et tapis fitness. Certifié pour usage commercial.', cats: ['AGF-1002', 'AGF-1004', 'AGF-1019', 'AGF-1018', 'AGF-1017'], disc: 20, stock: 20, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Acrobate Aérien Elite', desc: 'Tissu aérien professionnel + cerceau Lyra + kit ancrage pro pour acrobates et artistes circassiens exigeants.', cats: ['AGF-1002', 'AGF-1004', 'AGF-1019'], disc: 18, stock: 25, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Force Suspension Pro', desc: 'Kit suspension professionnel pour CrossFit et calisthénics aérien : Sangles Pro 400 kg + sangles élastiques + rig portable.', cats: ['AGF-1005', 'AGF-1006', 'AGF-1020'], disc: 15, stock: 30, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Instructeur Nomade', desc: 'Tout pour un instructeur en déplacement : rig portable + hamac yoga + tissu aérien + sac transport. Déploiement 5 minutes.', cats: ['AGF-1020', 'AGF-1001', 'AGF-1002'], disc: 20, stock: 15, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Studio Home Gym Aérien', desc: 'Portique autoportant + hamac + tapis yoga + ancrage universel. Transformez votre espace en studio aérien pro à domicile.', cats: ['AGF-1018', 'AGF-1001', 'AGF-1016', 'AGF-1007'], disc: 22, stock: 18, feat: true, cat: 'Kits Avancés' },

    // ===== PILATES & BARRE PACKS =====
    { name: 'Pack Pilates Aérien Fusion', desc: 'Fusion parfaite du Pilates et du yoga aérien : hamac cocon + tapis fitness 10 mm + sangle multiposition + rouleau massage.', cats: ['AGF-1003', 'AGF-1017', 'AGF-1012', 'AGF-1013'], disc: 15, stock: 40, feat: true, cat: 'Kits Débutants' },
    { name: 'Pack Barre Float Essentiel', desc: 'Kit Barre aérien : tapis grip + sangle yoga + brassière sport + legging haute performance. La tenue parfaite pour votre pratique.', cats: ['AGF-1016', 'AGF-1012', 'AGF-1009', 'AGF-1008'], disc: 12, stock: 55, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Corps Complet Aerial Body', desc: 'Programme complet corps entier : hamac + sangles suspension + tapis mat + bloc yoga + crème récupération.', cats: ['AGF-1001', 'AGF-1005', 'AGF-1016', 'AGF-1011', 'AGF-1021'], disc: 18, stock: 35, feat: true, cat: 'Kits Avancés' },

    // ===== WELLNESS & RECOVERY PACKS =====
    { name: 'Pack Bien-Être Anti-Gravité Total', desc: 'Pour une récupération optimale : hamac cocon + rouleau massage + crème arnica + huile essentielle relaxation. Libérez votre corps de la gravité.', cats: ['AGF-1003', 'AGF-1013', 'AGF-1021', 'AGF-1022'], disc: 13, stock: 65, feat: true, cat: 'Compléments de Bien-Être' },
    { name: 'Pack Récupération Muscle Aérien', desc: 'Kit récupération post-entraînement : rouleau haute densité + crème musculaire arnica + sangle étirement + huile essentielle.', cats: ['AGF-1013', 'AGF-1021', 'AGF-1012', 'AGF-1022'], disc: 10, stock: 80, feat: false, cat: 'Compléments de Bien-Être' },
    { name: 'Pack Détente & Soin Corps', desc: 'Hamac cocon + huile essentielle eucalyptus + crème relaxante. Idéal pour les séances de yoga restauratif et récupération profonde.', cats: ['AGF-1003', 'AGF-1022', 'AGF-1021'], disc: 11, stock: 70, feat: false, cat: 'Compléments de Bien-Être' },

    // ===== WARDROBE & STYLE PACKS =====
    { name: 'Pack Tenue Aerial Complète Noir', desc: 'Look complet pour le yoga aérien : tenue coordonnée noir (brassière + legging) + tapis yoga. Stretch 4 voies confort total.', cats: ['AGF-1010', 'AGF-1016'], disc: 14, stock: 75, feat: true, cat: 'Vêtements de Fitness' },
    { name: 'Pack Sportswear Aerial Rose', desc: 'Tenue complète rose pastel + sangle yoga + bloc : le combo parfait pour une séance de yoga aérien stylée et efficace.', cats: ['AGF-1010', 'AGF-1012', 'AGF-1011'], disc: 12, stock: 60, feat: false, cat: 'Vêtements de Fitness' },
    { name: 'Pack Tenue Aerial + Accessoires', desc: 'Legging + brassière sport + rouleau massage + sangle : tout ce dont vous avez besoin pour performer et récupérer en beauté.', cats: ['AGF-1008', 'AGF-1009', 'AGF-1013', 'AGF-1012'], disc: 15, stock: 50, feat: false, cat: 'Vêtements de Fitness' },

    // ===== SPECIALTY PACKS =====
    { name: 'Pack Décompression Colonne', desc: 'Spécialement conçu pour la décompression vertébrale : hamac yoga + kit ancrage plafond + tapis fitness + rouleau massage dos.', cats: ['AGF-1001', 'AGF-1019', 'AGF-1017', 'AGF-1013'], disc: 16, stock: 40, feat: true, cat: 'Kits Débutants' },
    { name: 'Pack Anti-Stress Gravity Free', desc: 'Hamac cocon + huile essentielle lavande + crème relaxante + sangle yoga. Pour décompresser et se libérer du stress articulaire.', cats: ['AGF-1003', 'AGF-1022', 'AGF-1021', 'AGF-1012'], disc: 14, stock: 55, feat: false, cat: 'Compléments de Bien-Être' },
    { name: 'Pack Posture & Équilibre', desc: 'Kit correcteur de posture : sangles suspension + bloc yoga + tapis grip + sangle. Améliorez votre alignement vertébral par l\'anti-gravité.', cats: ['AGF-1005', 'AGF-1011', 'AGF-1016', 'AGF-1012'], disc: 13, stock: 60, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Flexibilité Aérien', desc: 'Amélioration de la flexibilité garantie : tissu aérien + sangle yoga multidimensionnelle + rouleau massage + bloc yoga.', cats: ['AGF-1002', 'AGF-1012', 'AGF-1013', 'AGF-1011'], disc: 15, stock: 45, feat: true, cat: 'Accessoires de Yoga' },
    { name: 'Pack Cardio Aérien Intense', desc: 'Sangles suspension + sangles élastiques + tapis fitness 10 mm + portique portable. Le pack idéal pour un cardio-training aérien intense.', cats: ['AGF-1005', 'AGF-1006', 'AGF-1017', 'AGF-1020'], disc: 18, stock: 30, feat: false, cat: 'Kits Avancés' },

    // ===== FAMILY & DUO PACKS =====
    { name: 'Pack Duo Yoga Aérien Partenaire', desc: 'Deux hamacs + un rig autoportant double + deux tapis yoga. Pratiquez le yoga aérien en duo avec votre partenaire ou un ami.', cats: ['AGF-1001', 'AGF-1018', 'AGF-1016'], disc: 20, stock: 25, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Famille Anti-Gravité', desc: 'Un portique familial + three hamacs adaptatifs + deux tapis yoga. Le fitness aérien pour toute la famille en toute sécurité.', cats: ['AGF-1018', 'AGF-1001', 'AGF-1016'], disc: 22, stock: 15, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Mère & Bébé Aérien Doux', desc: 'Hamac cocon extra-doux + tapis fitness 10 mm + crème relaxante + sangle yoga. Pour le yoga postnatal aérien en toute délicatesse.', cats: ['AGF-1003', 'AGF-1017', 'AGF-1021', 'AGF-1012'], disc: 12, stock: 35, feat: false, cat: 'Kits Débutants' },

    // ===== SPECIAL PROMO PACKS =====
    { name: 'Pack Flash Sale Aérien 30%', desc: 'Offre flash : hamac yoga + sangles suspension + tapis yoga à -30%! Quantités limitées, édition spéciale vente flash anti-gravité.', cats: ['AGF-1001', 'AGF-1005', 'AGF-1016'], disc: 30, stock: 20, feat: true, cat: 'Kits Débutants' },
    { name: 'Pack Ramadan Yoga Aérien', desc: 'Édition spéciale Ramadan : hamac cocon + diffuseur huiles essentielles + crème détente + sangle yoga. Reconnectez-vous à votre corps.', cats: ['AGF-1003', 'AGF-1022', 'AGF-1021', 'AGF-1012'], disc: 15, stock: 40, feat: true, cat: 'Compléments de Bien-Être' },
    { name: 'Pack Back to School Fitness', desc: 'Prêt pour la rentrée fitness : sangles suspension + tapis yoga + legging + brassière sport. Le kit complet jeune athlète aérien.', cats: ['AGF-1005', 'AGF-1016', 'AGF-1008', 'AGF-1009'], disc: 18, stock: 50, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Cadeau Yoga Aérien Premium', desc: 'Le cadeau idéal : hamac couleur au choix + sangle + bloc + tapis, le tout dans un beau coffret cadeau. Parfait pour les fêtes.', cats: ['AGF-1001', 'AGF-1012', 'AGF-1011', 'AGF-1016'], disc: 10, stock: 60, feat: true, cat: 'Kits Débutants' },

    // ===== MORE SPECIALTY PACKS =====
    { name: 'Pack Crossfit Aérien Homme', desc: 'Pack taillé pour les hommes pratiquant le CrossFit aérien : sangles pro 400 kg + ancrage universel + tapis fitness + rouleau récupération.', cats: ['AGF-1005', 'AGF-1007', 'AGF-1017', 'AGF-1013'], disc: 15, stock: 40, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Crossfit Aérien Femme', desc: 'Sangles suspension + brassière sport + legging + rouleau massage. Le combo parfait pour les femmes qui défient la gravité en CrossFit.', cats: ['AGF-1005', 'AGF-1009', 'AGF-1008', 'AGF-1013'], disc: 15, stock: 40, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Thérapie Aérien Seniors', desc: 'Adapté aux seniors : hamac cocon doux + crème arnica anti-douleur + rouleau mousse souple + sangle étirement confort. Douleurs articulaires adieu.', cats: ['AGF-1003', 'AGF-1021', 'AGF-1013', 'AGF-1012'], disc: 13, stock: 45, feat: false, cat: 'Compléments de Bien-Être' },
    { name: 'Pack Préparation Físique Complète', desc: 'Hamac yoga + sangles TRX alternatives + tapis fitness + crème récupération + sangle yoga. Entraînement complet corps entier anti-gravité.', cats: ['AGF-1001', 'AGF-1005', 'AGF-1017', 'AGF-1021', 'AGF-1012'], disc: 20, stock: 25, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Aérien Photogénique Couleur', desc: 'Hamac coloré + tenue coordonnée + bloc yoga photographique. Parfait pour les sessions Instagram de yoga aérien esthétique.', cats: ['AGF-1001', 'AGF-1010', 'AGF-1011'], disc: 12, stock: 55, feat: false, cat: 'Vêtements de Fitness' },
    { name: 'Pack Inversion Thérapeutique', desc: 'Spécialisé inversions thérapeutiques : hamac solid + ancrage 1000 kg + tapis protection + rouleau colonne. Pour la santé vertébrale.', cats: ['AGF-1001', 'AGF-1019', 'AGF-1016', 'AGF-1013'], disc: 17, stock: 30, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Aérien Low Budget', desc: 'Budget maîtrisé, qualité au rendez-vous : hamac simple + sangle yoga + tapis fin. Pour commencer le yoga aérien sans se ruiner.', cats: ['AGF-1001', 'AGF-1012', 'AGF-1016'], disc: 10, stock: 100, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Ancrage & Sécurité Pro', desc: 'Sécurité maximale : fixation plafond 1000 kg + mousqueton pro + sangles de sécurité + notice d\'installation. Installez vos équipements sereinement.', cats: ['AGF-1019', 'AGF-1007'], disc: 10, stock: 60, feat: false, cat: 'Rigs et Structures' },
    { name: 'Pack Voyage Fitness Aérien', desc: 'Rig portable + hamac compact + sangle + tapis voyage mince. Emportez votre studio aérien partout dans le monde.', cats: ['AGF-1020', 'AGF-1001', 'AGF-1012', 'AGF-1014'], disc: 14, stock: 35, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Yoga Plein Air', desc: 'Profitez de l\'extérieur : rig portable + hamac + tapis outdoor résistant UV + crème solaire sport. Yoga aérien dans la nature.', cats: ['AGF-1020', 'AGF-1001', 'AGF-1017'], disc: 13, stock: 40, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Master Aerial Arts', desc: 'Le nec plus ultra des arts aériens : tissu 8 m + cerceau Lyra + ancrage pro + tapis chute + portique + crème récupération.', cats: ['AGF-1002', 'AGF-1004', 'AGF-1019', 'AGF-1017', 'AGF-1021'], disc: 25, stock: 10, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Acro-Yoga Partenaires', desc: 'Hamac large + sangles acro + tapis spacieux + rouleau massage double. Idéal pour la pratique de l\'acroyoga en duo en anti-gravité.', cats: ['AGF-1001', 'AGF-1005', 'AGF-1016', 'AGF-1013'], disc: 18, stock: 22, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Yoga Prénatal Aérien', desc: 'Hamac cocon doux + tapis épais protection + sangle douce + crème anti-vergetures. Yoga prénatal en suspension adapté et sécurisé.', cats: ['AGF-1003', 'AGF-1017', 'AGF-1012', 'AGF-1021'], disc: 12, stock: 30, feat: false, cat: 'Kits Débutants' },
    { name: 'Pack Rééducation Anti-Gravité', desc: 'Hamac thérapeutique + sangles rééducation + rouleau massage + crème arnica. Programme de rééducation par l\'anti-gravité pour dos et articulations.', cats: ['AGF-1001', 'AGF-1006', 'AGF-1013', 'AGF-1021'], disc: 14, stock: 35, feat: false, cat: 'Compléments de Bien-Être' },
    { name: 'Pack Méditation Aérien', desc: 'Hamac cocon relaxation + huile essentielle méditation + sangle yoga + tapis doux. Méditez suspendu dans les airs pour une sérénité totale.', cats: ['AGF-1003', 'AGF-1022', 'AGF-1012', 'AGF-1016'], disc: 11, stock: 50, feat: false, cat: 'Compléments de Bien-Être' },
    { name: 'Pack Performance Sportive Aérien', desc: 'Sangles suspension pro + sangles élastiques + tapis fitness + bloc yoga + crème récupération. La solution complète pour la performance sportive en 0G.', cats: ['AGF-1005', 'AGF-1006', 'AGF-1017', 'AGF-1011', 'AGF-1021'], disc: 20, stock: 25, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Souplesse & Grâce', desc: 'Tissu aérien + sangle yoga + bloc yoga + rouleau massage. Développez une souplesse de danseuse aérienne en quelques semaines.', cats: ['AGF-1002', 'AGF-1012', 'AGF-1011', 'AGF-1013'], disc: 15, stock: 40, feat: false, cat: 'Accessoires de Yoga' },
    { name: 'Pack Anti-Gravité Complet Ultime', desc: 'Le pack ultime tout inclus : portique + hamac + tissu + sangles + tapis + crème récupération + huile essentielle. Tout pour votre studio aérien parfait.', cats: ['AGF-1018', 'AGF-1001', 'AGF-1002', 'AGF-1005', 'AGF-1016', 'AGF-1021'], disc: 28, stock: 8, feat: true, cat: 'Kits Avancés' },
    { name: 'Pack Promotion Été Aerial', desc: 'Pack d\'été : hamac extérieur + rig portable + tapis UV resist + huile bronzante sport. Votre parcours anti-gravité sous le soleil tunisien.', cats: ['AGF-1001', 'AGF-1020', 'AGF-1017', 'AGF-1022'], disc: 20, stock: 30, feat: true, cat: 'Kits Débutants' },
    { name: 'Pack Pilates Intensity Pro', desc: 'Pilates aérien intensif : hamac + sangles élastiques + tapis Pilates + bloc + crème récupération. Résultat corps tonique garanti.', cats: ['AGF-1001', 'AGF-1006', 'AGF-1016', 'AGF-1011', 'AGF-1021'], disc: 17, stock: 28, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Yoga Aérien Weekend Retreat', desc: 'L\'essentiel pour un weekend de retreat yoga aérien : hamac + tapis + sangle + huile + crème + legging. La retraite dans votre salon.', cats: ['AGF-1001', 'AGF-1016', 'AGF-1012', 'AGF-1022', 'AGF-1021', 'AGF-1008'], disc: 19, stock: 35, feat: false, cat: 'Kits Avancés' },
    { name: 'Pack Initiation Cirque Aérien', desc: 'Idéal pour les clubs de cirque : cerceau Lyra + tissu aérien + ancrage pro + tapis chute. Tout pour initier vos élèves aux arts aériens.', cats: ['AGF-1004', 'AGF-1002', 'AGF-1019', 'AGF-1017'], disc: 22, stock: 12, feat: false, cat: 'Kits Avancés' },
];

export const packsSeedData: PackData[] = rawPacks.map((p, i) => ({
    name: p.name,
    slug: slugify(p.name),
    description: p.desc,
    productSkuPrefixes: p.cats,
    discountPercent: p.disc,
    stock: p.stock,
    images: Array.from({ length: Math.min(3, Math.max(1, Math.floor(i % 3) + 1)) }, (_, idx) => {
        const imageUrl = PACK_IMAGES[packImageIndex % PACK_IMAGES.length];
        packImageIndex++;
        return {
            url: imageUrl,
            alt: `${p.name} — image ${idx + 1}`,
        };
    }),
    isActive: true,
    isFeatured: p.feat,
    category: p.cat,
}));

