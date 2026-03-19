const mongoose = require('mongoose');

async function testCurrentImages() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sobitas-db');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    const products = await Product.find().limit(3).lean();

    console.log('\n=== CURRENT IMAGE PATHS ===\n');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title || p.designation_fr}`);
      console.log(`   mainImage.url: ${p.mainImage?.url || 'undefined'}`);
      console.log(`   images[0].url: ${p.images?.[0]?.url || 'undefined'}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testCurrentImages();
