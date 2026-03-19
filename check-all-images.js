const mongoose = require('mongoose');

async function checkAllImageData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sobitas-db');

    const Blog = mongoose.model('Blog', new mongoose.Schema({}, { strict: false }));
    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    console.log('\n=== BLOG IMAGE DATA ===\n');
    const blogs = await Blog.find().limit(2).lean();
    blogs.forEach((b, i) => {
      console.log(`Blog ${i + 1}: ${b.title || b.title_fr}`);
      console.log('  image:', b.image);
      console.log('  cover:', b.cover);
      console.log('  Keys:', Object.keys(b).filter(k => k.includes('image') || k.includes('cover')).join(', '));
      console.log('');
    });

    console.log('\n=== PRODUCT IMAGE DATA ===\n');
    const products = await Product.find().limit(2).lean();
    products.forEach((p, i) => {
      console.log(`Product ${i + 1}: ${p.title || p.designation_fr}`);
      console.log('  mainImage:', p.mainImage);
      console.log('  images:', p.images);
      console.log('  cover:', p.cover);
      console.log('  Keys:', Object.keys(p).filter(k => k.includes('image') || k.includes('Image') || k.includes('cover')).join(', '));
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAllImageData();
