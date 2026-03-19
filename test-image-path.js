const mongoose = require('mongoose');

async function testImagePath() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sobitas-db');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
    const product = await Product.findOne({ designation_fr: /Whey.*Isolate/ }).lean();

    console.log('\n=== PRODUCT IMAGE PATH TEST ===\n');
    console.log('Product:', product.designation_fr);
    console.log('mainImage:', product.mainImage);
    console.log('mainImage.url:', product.mainImage?.url);
    console.log('');

    // Simulate getImageSrc logic
    let imagePath = "/images/placeholder.png";
    if (product.mainImage && typeof product.mainImage.url === 'string') {
      imagePath = product.mainImage.url;
    }
    console.log('getImageSrc would return:', imagePath);

    // Simulate cleanPath
    const cleanPath = imagePath.replace(/^\/+/, "");
    console.log('cleanPath:', cleanPath);
    console.log('starts with assets/:', cleanPath.startsWith('assets/'));
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testImagePath();
