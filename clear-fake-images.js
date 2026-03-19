const mongoose = require('mongoose');

async function clearAssetImages() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sobitas-db');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    console.log('\n=== CLEARING FAKE /assets/ IMAGE PATHS ===\n');

    // Find all products with /assets/ paths
    const productsWithAssets = await Product.find({
      $or: [
        { 'mainImage.url': /^\/assets\// },
        { 'images.url': /^\/assets\// }
      ]
    }).lean();

    console.log(`Found ${productsWithAssets.length} products with /assets/ paths\n`);

    // Update all products: remove mainImage and images with /assets/ paths
    const result = await Product.updateMany(
      {
        $or: [
          { 'mainImage.url': /^\/assets\// },
          { 'images.url': /^\/assets\// }
        ]
      },
      {
        $unset: {
          mainImage: "",
          images: ""
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} products`);
    console.log('All products now have no mainImage/images fields');
    console.log('They will show placeholder until you upload real images\n');

    // Verify
    const verifyProducts = await Product.find({}).limit(3).lean();
    console.log('=== VERIFICATION (first 3 products) ===\n');
    verifyProducts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.designation_fr || p.title}`);
      console.log(`   mainImage: ${p.mainImage || 'undefined'}`);
      console.log(`   images: ${p.images ? JSON.stringify(p.images) : 'undefined'}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

clearAssetImages();
