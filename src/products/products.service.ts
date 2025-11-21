import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Brand } from '../brands/schemas/brand.schema';
import { Category } from '../categories/schemas/category.schema';
import { Subcategory } from '../subcategories/schemas/subcategory.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @Inject(forwardRef(() => EventsGateway))
    private eventsGateway: EventsGateway,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      const savedProduct = await createdProduct.save();

      // Emit WebSocket event
      this.eventsGateway.emitProductCreated(savedProduct);

      return savedProduct;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Product with this slug already exists');
      }
      throw error;
    }
  }

  async findAll(filters: ProductFilterDto = {}): Promise<{
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      brand,
      inStock,
      minPrice,
      maxPrice,
    } = filters;

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filtering: Look up category by slug first, then filter by ObjectId
    if (category) {
      const categoryDoc = await this.categoryModel
        .findOne({
          $or: [
            { slug: category },
            { designation_fr: { $regex: category, $options: 'i' } },
          ],
        })
        .exec();

      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    // Brand filtering: Look up brand by slug first, then filter by ObjectId
    if (brand) {
      const brandDoc = await this.brandModel
        .findOne({
          $or: [
            { slug: brand },
            { designation_fr: { $regex: brand, $options: 'i' } },
          ],
        })
        .exec();

      if (brandDoc) {
        query.brand = brandDoc._id;
      }
    }

    if (inStock !== undefined) {
      query.inStock = inStock;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    const skip = (page - 1) * limit;
    const total = await this.productModel.countDocuments(query);
    const products = await this.productModel
      .find(query)
      .populate('brand')
      .populate('category')
      .populate('subCategory')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    // Validate ObjectId format
    if (!id || id === 'undefined' || id === 'null') {
      throw new BadRequestException('Invalid product ID');
    }

    // Check if it's a valid MongoDB ObjectId format (24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new BadRequestException(`Invalid product ID format: "${id}"`);
    }

    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug }).exec();
    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Emit WebSocket event
    this.eventsGateway.emitProductUpdated(updatedProduct);

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Emit WebSocket event
    this.eventsGateway.emitProductDeleted(id);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(
        id,
        {
          $inc: { stock: -quantity },
          $set: { inStock: quantity > 0 },
        },
        { new: true },
      )
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Emit WebSocket event for stock update
    this.eventsGateway.emitStockUpdate(id, product.stock);

    return product;
  }

  async toggleStatus(id: string): Promise<Product> {
    const product = await this.findOne(id);
    return this.update(id, { status: !product.status });
  }

  async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    return this.productModel
      .find({ status: true, inStock: true })
      .sort({ aggregateRating: -1 })
      .limit(limit)
      .exec();
  }

  async getFlashSaleProducts(): Promise<Product[]> {
    return this.productModel
      .find({
        isFlashSale: true,
        status: true,
        venteflashDate: { $gte: new Date() },
      })
      .sort({ venteflashDate: 1 })
      .exec();
  }

  async getRelatedProducts(
    productId: string,
    category: string,
    limit: number = 4,
  ): Promise<Product[]> {
    return this.productModel
      .find({
        _id: { $ne: productId },
        category,
        status: true,
        inStock: true,
      })
      .limit(limit)
      .exec();
  }

  async searchProducts(query: string, limit: number = 10): Promise<Product[]> {
    return this.productModel
      .find({
        $text: { $search: query },
        status: true,
      })
      .limit(limit)
      .exec();
  }

  async getProductsByCategory(
    categorySlug: string,
    filters: ProductFilterDto = {},
  ): Promise<{
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10 } = filters;

    // First, find the category by slug
    const category = await this.categoryModel
      .findOne({ slug: categorySlug })
      .exec();

    if (!category) {
      throw new NotFoundException(
        `Category with slug "${categorySlug}" not found`,
      );
    }

    // Query products by category ObjectId
    const query: any = {
      category: category._id,
      status: true,
    };

    const skip = (page - 1) * limit;
    const total = await this.productModel.countDocuments(query);
    const products = await this.productModel
      .find(query)
      .populate('brand')
      .populate('category')
      .populate('subCategory')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductsBySubcategory(
    subcategorySlug: string,
    filters: ProductFilterDto = {},
  ): Promise<{
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10 } = filters;

    // First, find the subcategory by slug
    const subcategory = await this.subcategoryModel
      .findOne({ slug: subcategorySlug })
      .exec();

    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory with slug "${subcategorySlug}" not found`,
      );
    }

    // Query products where subCategory array contains the subcategory ObjectId
    const query: any = {
      subCategory: subcategory._id,
      status: true,
    };

    const skip = (page - 1) * limit;
    const total = await this.productModel.countDocuments(query);
    const products = await this.productModel
      .find(query)
      .populate('brand')
      .populate('category')
      .populate('subCategory')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
