import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return await createdProduct.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Product with this slug already exists');
      }
      throw error;
    }
  }

  async findAll(filters: ProductFilterDto = {}): Promise<{
    products: Product[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const { page = 1, limit = 10, search, category, brand, inStock, minPrice, maxPrice } = filters;
    
    const query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    if (brand) {
      query.brand = brand;
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

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(
        id,
        { 
          $inc: { stock: -quantity },
          $set: { inStock: quantity > 0 }
        },
        { new: true }
      )
      .exec();
    
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    
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
        venteflashDate: { $gte: new Date() }
      })
      .sort({ venteflashDate: 1 })
      .exec();
  }

  async getRelatedProducts(productId: string, category: string, limit: number = 4): Promise<Product[]> {
    return this.productModel
      .find({ 
        _id: { $ne: productId },
        category,
        status: true,
        inStock: true
      })
      .limit(limit)
      .exec();
  }

  async searchProducts(query: string, limit: number = 10): Promise<Product[]> {
    return this.productModel
      .find({
        $text: { $search: query },
        status: true
      })
      .limit(limit)
      .exec();
  }
}