import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../../products/schemas/product.schema';
import { Category } from '../../categories/schemas/category.schema';
import { Subcategory } from '../../subcategories/schemas/subcategory.schema';
import { Brand } from '../../brands/schemas/brand.schema';
import { Review } from '../../reviews/schemas/review.schema';
import { Aroma } from '../../aromas/schemas/aroma.schema';
import { productsSeedData } from './products.seed';
import { categoriesSeedData, subcategoriesSeedData } from './categories.seed';
import { brandsSeedData } from './brands.seed';
import { aromasSeedData } from './aromas.seed';
import { packsSeedData } from './packs.seed';
import { blogsSeedData } from './blogs.seed';
import { generateAllReviews } from './reviews.seed';
import { User, UserRole } from '../../users/schemas/user.schema';
import { Order, OrderStatus } from '../../orders/schemas/order.schema';
import { Blog } from '../../blogs/schemas/blog.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Aroma.name) private aromaModel: Model<Aroma>,
  ) {}

  async seedAll() {
    this.logger.log(
      '🚀 Starting database seeding — Protein & Nutrition Brands',
    );

    try {
      await this.clearDatabase();

      await this.seedBrands();
      await this.seedCategories();
      await this.seedSubcategories();
      await this.seedAromas();
      await this.seedProducts();
      await this.seedProductAromas();
      await this.seedPacks();
      await this.seedReviews();
      await this.seedBlogs();
      await this.seedAdmin();
      await this.seedOrders();

      const counts = {
        brands: await this.brandModel.countDocuments(),
        categories: await this.categoryModel.countDocuments(),
        subcategories: await this.subcategoryModel.countDocuments(),
        aromas: await this.aromaModel.countDocuments(),
        products: await this.productModel.countDocuments({
          type: { $ne: 'pack' },
        }),
        packs: await this.productModel.countDocuments({ type: 'pack' }),
        reviews: await this.reviewModel.countDocuments(),
        blogs: await this.blogModel.countDocuments(),
      };

      this.logger.log('✅ Database seeding completed!');
      this.logger.log(`   Brands: ${counts.brands}`);
      this.logger.log(`   Categories: ${counts.categories}`);
      this.logger.log(`   Subcategories: ${counts.subcategories}`);
      this.logger.log(`   Aromas: ${counts.aromas}`);
      this.logger.log(`   Products: ${counts.products}`);
      this.logger.log(`   Packs: ${counts.packs}`);
      this.logger.log(`   Reviews: ${counts.reviews}`);
      this.logger.log(`   Blogs: ${counts.blogs}`);

      return { success: true, message: 'Database seeded successfully', counts };
    } catch (error) {
      this.logger.error('❌ Database seeding failed:', error);
      throw error;
    }
  }

  private async clearDatabase() {
    this.logger.log('🔄 Clearing existing data...');
    await Promise.all([
      this.productModel.deleteMany({}),
      this.categoryModel.deleteMany({}),
      this.subcategoryModel.deleteMany({}),
      this.brandModel.deleteMany({}),
      this.reviewModel.deleteMany({}),
      this.blogModel.deleteMany({}),
      this.aromaModel.deleteMany({}),
    ]);
    this.logger.log('✓ Database cleared');
  }

  private async seedBrands() {
    this.logger.log('🏷️  Seeding brands...');
    const brands = await this.brandModel.insertMany(brandsSeedData);
    this.logger.log(`✓ Seeded ${brands.length} brands`);
  }

  private async seedCategories() {
    this.logger.log('📂 Seeding categories...');
    const categories = await this.categoryModel.insertMany(categoriesSeedData);
    this.logger.log(`✓ Seeded ${categories.length} categories`);
  }

  private async seedSubcategories() {
    this.logger.log('📁 Seeding subcategories...');

    const categories = await this.categoryModel.find({}).lean();
    const categoryMap = new Map(
      categories.map((cat) => [cat.designation_fr, cat._id]),
    );

    const subcategoriesWithIds = subcategoriesSeedData.map((sub) => {
      const { category, ...rest } = sub as {
        category: string;
        [key: string]: unknown;
      };
      return { ...rest, categoryId: categoryMap.get(category) };
    });

    const subcategories =
      await this.subcategoryModel.insertMany(subcategoriesWithIds);
    this.logger.log(`✓ Seeded ${subcategories.length} subcategories`);
  }

  private async seedAromas() {
    this.logger.log('🧪 Seeding aromas (flavors)...');
    const aromas = await this.aromaModel.insertMany(aromasSeedData);
    this.logger.log(`✓ Seeded ${aromas.length} aromas`);
  }

  private async seedProductAromas() {
    this.logger.log('🔗 Linking aromas to products...');
    const aromas = await this.aromaModel.find({}).lean();
    const aromaIds: Types.ObjectId[] = aromas.map((a) => a._id);
    const products = await this.productModel
      .find({ type: { $ne: 'pack' } })
      .lean();

    const bulkOps = products.map((product) => {
      // Assign 2-5 random aromas to each product
      const count = Math.floor(Math.random() * 4) + 2;
      const shuffled = [...aromaIds].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count);
      return {
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { aroma_ids: selected } },
        },
      };
    });

    if (bulkOps.length > 0) {
      await this.productModel.bulkWrite(bulkOps);
    }
    this.logger.log(`✓ Linked aromas to ${products.length} products`);
  }

  private async seedProducts() {
    this.logger.log('📦 Seeding products...');

    const brands = await this.brandModel.find({}).lean();
    const categories = await this.categoryModel.find({}).lean();
    const subcategories = await this.subcategoryModel.find({}).lean();

    const brandMap = new Map(brands.map((b) => [b.designation_fr, b._id]));
    const categoryMap = new Map(
      categories.map((c) => [c.designation_fr, c._id]),
    );
    const subcategoryMap = new Map(
      subcategories.map((s) => [s.designation_fr, s._id]),
    );

    const productsWithIds = productsSeedData.map(
      (product: Record<string, unknown>) => {
        const categoryId = categoryMap.get(product.category as string);
        const subcategoryId = subcategoryMap.get(product.subcategory as string);
        const brandId = brandMap.get(product.brand as string);
        return {
          ...product,
          brand: brandId,
          category: categoryId,
          subCategory: subcategoryId ? [subcategoryId] : [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    );

    // Bulk insert in batches of 50 for performance
    const BATCH = 50;
    let inserted = 0;
    for (let i = 0; i < productsWithIds.length; i += BATCH) {
      const batch = productsWithIds.slice(i, i + BATCH);
      await this.productModel.insertMany(batch, { ordered: false });
      inserted += batch.length;
    }
    this.logger.log(`✓ Seeded ${inserted} products`);
  }

  private async seedPacks() {
    this.logger.log('🎁 Seeding packs (bundles)...');

    const allProducts = await this.productModel
      .find({ type: { $ne: 'pack' } })
      .lean();

    let seededCount = 0;
    for (const packDef of packsSeedData) {
      // Find up to 5 products matching any of the SKU prefixes
      const linkedProducts = allProducts
        .filter((p) =>
          packDef.productSkuPrefixes.some((_skuPfx) =>
            p.sku?.startsWith('AGF-'),
          ),
        )
        .slice(0, 5);

      // Calculate bundle price (sum of component prices minus discount)
      const totalPrice = linkedProducts.reduce(
        (sum, p) => sum + (p.price || 0),
        0,
      );
      const bundlePrice = parseFloat(
        (totalPrice * (1 - packDef.discountPercent / 100)).toFixed(1),
      );

      const packDoc = {
        designation_fr: packDef.name,
        designation: packDef.name,
        title: packDef.name,
        slug: packDef.slug,
        description: packDef.description,
        smallDescription: packDef.description.slice(0, 120),
        price:
          bundlePrice > 0
            ? bundlePrice
            : parseFloat((Math.random() * 300 + 100).toFixed(1)),
        oldPrice:
          totalPrice > 0 ? parseFloat(totalPrice.toFixed(1)) : undefined,
        discountPercentage: packDef.discountPercent,
        currency: 'TND',
        quantity: packDef.stock,
        stock: packDef.stock,
        inStock: packDef.stock > 0,
        status: packDef.isActive,
        isActive: packDef.isActive,
        isFlashSale: packDef.discountPercent >= 25,
        images: packDef.images,
        mainImage: packDef.images[0] ?? {
          url: '/uploads/pack-default.jpg',
          alt: packDef.name,
        },
        type: 'pack',
        features: [
          `Économisez ${packDef.discountPercent}% vs achat séparé`,
          `${linkedProducts.length} produits inclus`,
          'Livraison rapide en Tunisie',
          'Certifié pour fitness anti-gravité',
        ],
        meta_description_fr: packDef.description.slice(0, 160),
        aggregateRating: parseFloat((4 + Math.random()).toFixed(1)),
        reviewCount: Math.floor(Math.random() * 30) + 3,
        sku: `PACK-${packDef.slug.substring(0, 15).toUpperCase().replace(/-/g, '')}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        await this.productModel.create(packDoc);
        seededCount++;
      } catch {
        // Skip duplicate slugs
      }
    }

    this.logger.log(`✓ Seeded ${seededCount} packs`);
  }

  private async seedReviews() {
    this.logger.log('⭐ Seeding reviews (50+ per product)...');

    // Get all product IDs
    const products = await this.productModel
      .find({ type: { $ne: 'pack' } })
      .select('_id')
      .lean();
    const productIds = products.map((p) => p._id.toString());

    // Generate reviews for all products
    const reviewsData = generateAllReviews(productIds);

    // Bulk insert in batches of 100 for performance
    const BATCH = 100;
    let inserted = 0;
    for (let i = 0; i < reviewsData.length; i += BATCH) {
      const batch = reviewsData.slice(i, i + BATCH);
      await this.reviewModel.insertMany(batch, { ordered: false });
      inserted += batch.length;
    }

    this.logger.log(
      `✓ Seeded ${inserted} reviews across ${productIds.length} products`,
    );
  }

  private async seedBlogs() {
    this.logger.log('📝 Seeding blog articles...');
    const blogs = await this.blogModel.insertMany(blogsSeedData);
    this.logger.log(`✓ Seeded ${blogs.length} blog articles`);
  }

  // ── Individual selective seed methods ──────────────────────

  async seedProductsOnly() {
    this.logger.log('Seeding products only...');
    await this.productModel.deleteMany({ type: { $ne: 'pack' } });
    await this.seedProducts();
    return { success: true, message: 'Products seeded successfully' };
  }

  async seedPacksOnly() {
    this.logger.log('Seeding packs only...');
    await this.productModel.deleteMany({ type: 'pack' });
    await this.seedPacks();
    return { success: true, message: 'Packs seeded successfully' };
  }

  async seedCategoriesOnly() {
    this.logger.log('Seeding categories only...');
    await this.categoryModel.deleteMany({});
    await this.subcategoryModel.deleteMany({});
    await this.seedCategories();
    await this.seedSubcategories();
    return { success: true, message: 'Categories seeded successfully' };
  }

  async seedBrandsOnly() {
    this.logger.log('Seeding brands only...');
    await this.brandModel.deleteMany({});
    await this.seedBrands();
    return { success: true, message: 'Brands seeded successfully' };
  }

  async seedAdmin() {
    this.logger.log('👤 Checking for admin user...');
    const adminEmail = 'admin@sobitas.com';
    const existing = await this.userModel.findOne({ email: adminEmail });

    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Sobitas',
        role: UserRole.ADMIN,
      });
      this.logger.log('✓ Admin created: admin@sobitas.com / admin123');
    } else {
      this.logger.log('✓ Admin already exists');
    }
  }

  async seedOrders() {
    this.logger.log('🛒 Seeding sample orders...');
    await this.orderModel.deleteMany({});

    const products = await this.productModel
      .find({ type: { $ne: 'pack' } })
      .limit(5)
      .lean();
    const users = await this.userModel
      .find({ role: UserRole.USER })
      .limit(3)
      .lean();

    if (products.length === 0) {
      this.logger.warn('Cannot seed orders: No products found');
      return;
    }

    const sampleOrders: any[] = [
      {
        customerEmail: users[0]?.email ?? 'client@sobitas.tn',
        customerPhone: users[0]?.['phone'] ?? '55666777',
        shippingInfo: {
          firstName: users[0]?.firstName ?? 'Ahmed',
          lastName: users[0]?.lastName ?? 'Ben Ali',
          email: users[0]?.email ?? 'client@sobitas.tn',
          phone: users[0]?.['phone'] ?? '55666777',
          address: {
            governorate: 'Tunis',
            delegation: 'Sidi Bou Said',
            locality: 'Sidi Bou Said',
            postalCode: '2026',
            street: 'Rue de la Mer, Résidence les Pins',
          },
        },
        items: [
          {
            productId: products[0]._id.toString(),
            title: (products[0] as unknown as Record<string, string>)
              .designation_fr,
            price: products[0].price,
            quantity: 1,
            image: (products[0].images as { url: string }[] | undefined)?.[0]
              ?.url,
          },
          ...(products[1]
            ? [
                {
                  productId: products[1]._id.toString(),
                  title: (products[1] as unknown as Record<string, string>)
                    .designation_fr,
                  price: products[1].price,
                  quantity: 2,
                  image: (
                    products[1].images as { url: string }[] | undefined
                  )?.[0]?.url,
                },
              ]
            : []),
        ],
        totalAmount:
          products[0].price + (products[1] ? products[1].price * 2 : 0) + 7,
        shippingCost: 7,
        status: OrderStatus.PENDING,
        orderDate: new Date(),
      },
    ];

    await this.orderModel.insertMany(sampleOrders);
    this.logger.log(`✓ Seeded ${sampleOrders.length} sample orders`);
  }

  async getStatus() {
    const counts = await Promise.all([
      this.brandModel.countDocuments(),
      this.categoryModel.countDocuments(),
      this.subcategoryModel.countDocuments(),
      this.productModel.countDocuments({ type: { $ne: 'pack' } }),
      this.productModel.countDocuments({ type: 'pack' }),
    ]);
    return {
      seeded: counts.some((c) => c > 0),
      brands: counts[0],
      categories: counts[1],
      subcategories: counts[2],
      products: counts[3],
      packs: counts[4],
    };
  }
}
