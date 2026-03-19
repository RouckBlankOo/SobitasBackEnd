const mongoose = require('mongoose');

async function migrateProductImages() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sobitas-db');
    console.log('Connected to MongoDB\n');

    // Use updateMany with MongoDB operator to set mainImage from first element of images array
    const result = await mongoose.connection.db.collection('products').updateMany(
      {
        $or: [
          { mainImage: { $exists: false } },
          { mainImage: null }
        ],
        images: { $exists: true, $ne: [] }
      },
      [
        {
          $set: {
            mainImage: { $arrayElemAt: ['$images', 0] }
          }
        }
      ]
    );

    console.log(`Updated ${result.modifiedCount} products\n`);

    // Verify the update
    const products = await mongoose.connection.db.collection('products').find().limit(3).toArray();

    console.log('=== VERIFICATION ===\n');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title || p.designation_fr}`);
      console.log(`   mainImage: ${JSON.stringify(p.mainImage)}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

migrateProductImages();
