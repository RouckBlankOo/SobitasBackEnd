const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/sobitas-db');
  const db = mongoose.connection.db;

  // List all collections
  const collections = await db.listCollections().toArray();
  console.log('=== ALL COLLECTIONS ===');
  collections.forEach(c => console.log(' -', c.name));

  // Check packs collection
  try {
    const packsCount = await db.collection('packs').countDocuments();
    console.log('\n=== PACKS COLLECTION ===');
    console.log('Count:', packsCount);
    if (packsCount > 0) {
      const sample = await db.collection('packs').find().limit(5).toArray();
      sample.forEach(p => console.log(' Pack:', p.designation_fr || p.title, '| _id:', p._id));
    } else {
      console.log('  (empty)');
    }
  } catch (e) {
    console.log('No packs collection:', e.message);
  }

  // Check products with type=pack
  const packProducts = await db.collection('products').find({ type: 'pack' }).toArray();
  console.log('\n=== PRODUCTS WITH type=pack ===');
  console.log('Count:', packProducts.length);
  packProducts.forEach(p => console.log(' Product-Pack:', p.title, '| price:', p.price, '| status:', p.status, '| inStock:', p.inStock));

  // Check ALL products count
  const totalProducts = await db.collection('products').countDocuments();
  console.log('\n=== TOTAL PRODUCTS ===');
  console.log('Count:', totalProducts);

  // Products by type
  const types = await db.collection('products').aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } }
  ]).toArray();
  console.log('\n=== PRODUCTS BY TYPE ===');
  types.forEach(t => console.log(' type:', JSON.stringify(t._id), '| count:', t.count));

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
