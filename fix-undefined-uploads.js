const mongoose = require('mongoose');

async function fixUndefinedUploads() {
  try {
    await mongoose.connect('mongodb://localhost:27017/sobitas-db');

    console.log('\n=== FIXING /uploads/undefined REFERENCES ===\n');

    // Fix in all possible collections
    const collections = ['blogs', 'products', 'packs', 'services', 'announces', 'slides'];

    for (const collectionName of collections) {
      try {
        const Collection = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }));

        // Find documents with /uploads/undefined
        const found = await Collection.find({
          $or: [
            { 'image.url': '/uploads/undefined' },
            { 'mainImage.url': '/uploads/undefined' },
            { 'images.url': '/uploads/undefined' },
            { 'cover.url': '/uploads/undefined' },
            { cover: '/uploads/undefined' }
          ]
        }).lean();

        if (found.length > 0) {
          console.log(`${collectionName}: Found ${found.length} documents with /uploads/undefined`);

          // Remove the broken image fields
          const result = await Collection.updateMany(
            {
              $or: [
                { 'image.url': '/uploads/undefined' },
                { 'mainImage.url': '/uploads/undefined' },
                { 'images.url': '/uploads/undefined' },
                { 'cover.url': '/uploads/undefined' },
                { cover: '/uploads/undefined' }
              ]
            },
            {
              $unset: {
                image: "",
                mainImage: "",
                images: "",
                cover: ""
              }
            }
          );

          console.log(`  ✅ Updated ${result.modifiedCount} documents\n`);
        } else {
          console.log(`${collectionName}: No issues found ✓\n`);
        }
      } catch (err) {
        console.log(`${collectionName}: Collection doesn't exist or error - ${err.message}\n`);
      }
    }

    console.log('=== VERIFICATION ===\n');

    // Verify blogs
    const Blog = mongoose.model('Blog', new mongoose.Schema({}, { strict: false }));
    const blogs = await Blog.find().limit(3).lean();
    blogs.forEach((b, i) => {
      console.log(`Blog ${i + 1}: ${b.title || b.title_fr}`);
      console.log(`  image: ${b.image ? JSON.stringify(b.image) : 'undefined'}\n`);
    });

    console.log('✅ All /uploads/undefined references have been removed!\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixUndefinedUploads();
