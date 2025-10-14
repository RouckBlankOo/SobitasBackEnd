import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../products/schemas/product.schema';
import { Category } from '../../categories/schemas/category.schema';
import { Subcategory } from '../../subcategories/schemas/subcategory.schema';
import { Brand } from '../../brands/schemas/brand.schema';
import { productsSeedData } from './products.seed';
import { categoriesSeedData, subcategoriesSeedData } from './categories.seed';
import { brandsSeedData } from './brands.seed';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
  ) {}

  async seedAll() {
    this.logger.log('Starting database seeding...');

    try {
      // Clear existing data
      await this.clearDatabase();

      // Seed in order (dependencies first)
      await this.seedBrands();
      await this.seedCategories();
      await this.seedSubcategories();
      await this.seedProducts();

      this.logger.log('✅ Database seeding completed successfully!');
      return {
        success: true,
        message: 'Database seeded successfully',
        counts: {
          brands: await this.brandModel.countDocuments(),
          categories: await this.categoryModel.countDocuments(),
          subcategories: await this.subcategoryModel.countDocuments(),
          products: await this.productModel.countDocuments(),
        }
      };
    } catch (error) {
      this.logger.error('❌ Database seeding failed:', error);
      throw error;
    }
  }

  private async clearDatabase() {
    this.logger.log('Clearing existing data...');
    
    await Promise.all([
      this.productModel.deleteMany({}),
      this.categoryModel.deleteMany({}),
      this.subcategoryModel.deleteMany({}),
      this.brandModel.deleteMany({}),
    ]);

    this.logger.log('✓ Database cleared');
  }

  private async seedBrands() {
    this.logger.log('Seeding brands...');
    
    const brands = await this.brandModel.insertMany(brandsSeedData);
    
    this.logger.log(`✓ Seeded ${brands.length} brands`);
  }

  private async seedCategories() {
    this.logger.log('Seeding categories...');
    
    const categories = await this.categoryModel.insertMany(categoriesSeedData);
    
    this.logger.log(`✓ Seeded ${categories.length} categories`);
  }

  private async seedSubcategories() {
    this.logger.log('Seeding subcategories...');
    
    // Get category IDs
    const categories = await this.categoryModel.find({}).lean();
    const categoryMap = new Map(
      categories.map(cat => [cat.designation_fr, cat._id])
    );

    // Map subcategories to category IDs
    const subcategoriesWithIds = subcategoriesSeedData.map(sub => {
      const { category, ...rest } = sub as any;
      return {
        ...rest,
        categoryId: categoryMap.get(category),
      };
    });

    const subcategories = await this.subcategoryModel.insertMany(subcategoriesWithIds);
    
    this.logger.log(`✓ Seeded ${subcategories.length} subcategories`);
  }

  private async seedProducts() {
    this.logger.log('Seeding products...');
    
    // Get brand, category, and subcategory IDs (use .lean() to get plain objects)
    const brands = await this.brandModel.find({}).lean();
    const categories = await this.categoryModel.find({}).lean();
    const subcategories = await this.subcategoryModel.find({}).lean();

    const brandMap = new Map(brands.map(b => [b.designation_fr, b._id]));
    const categoryMap = new Map(categories.map(c => [c.designation_fr, c._id]));
    const subcategoryMap = new Map(subcategories.map(s => [s.designation, s._id]));

    // Generate slugs and map IDs
    const productsWithIds = productsSeedData.map((product, index) => {
      const slug = product.designation_fr
        .toLowerCase()
        .replace(/[éèê]/g, 'e')
        .replace(/[àâ]/g, 'a')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const categoryId = categoryMap.get(product.category);
      const subcategoryId = subcategoryMap.get(product.subcategory);

      return {
        ...product,
        slug,
        title: product.designation_fr,
        brand: brandMap.get(product.brand),
        category: categoryId,
        subCategory: subcategoryId ? [subcategoryId] : [],
        discountPercentage: product.oldPrice 
          ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
          : 0,
        aggregateRating: 4 + Math.random(), // Random rating between 4-5
        reviewCount: Math.floor(Math.random() * 50) + 5, // Random 5-55 reviews
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const products = await this.productModel.insertMany(productsWithIds);
    
    this.logger.log(`✓ Seeded ${products.length} products`);
  }

  // Individual seed methods for selective seeding
  async seedProductsOnly() {
    this.logger.log('Seeding products only...');
    await this.productModel.deleteMany({});
    await this.seedProducts();
    return { success: true, message: 'Products seeded successfully' };
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
}

