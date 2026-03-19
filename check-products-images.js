const mongoose = require('mongoose');

async function checkProducts() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sobitas-db');
    console.log('Connected to MongoDB');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    const products = await Product.find().limit(5).lean();

    console.log('\n=== PRODUCTS IMAGE DATA ===\n');
    products.forEach((p, i) => {
      console.log(`Product ${i + 1}: ${p.title || p.designation_fr}`);
      console.log('mainImage:', p.mainImage);
      console.log('images:', p.images);
      console.log('cover:', p.cover);
      console.log('---\n');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkProducts();
