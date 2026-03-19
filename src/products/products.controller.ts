import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  Patch,
  UseInterceptors,
  UploadedFiles,
  Headers,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  // Public endpoints for e-commerce frontend
  @Get()
  @ApiOperation({ summary: 'Get all products with filtering' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findAll(@Query() filters: ProductFilterDto) {
    return this.productsService.findAll(filters);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  async getFeaturedProducts(@Query('limit') limit?: number) {
    return this.productsService.getFeaturedProducts(limit || 6);
  }

  @Get('packs/featured')
  @ApiOperation({ summary: 'Get featured packs' })
  async getFeaturedPacks(@Query('limit') limit?: number) {
    return this.productsService.getFeaturedPacks(limit || 6);
  }

  @Get('flash-sale')
  @ApiOperation({ summary: 'Get flash sale products' })
  async getFlashSaleProducts() {
    return this.productsService.getFlashSaleProducts();
  }

  @Get('search/:query')
  @ApiOperation({ summary: 'Search products by text' })
  async searchProducts(
    @Param('query') query: string,
    @Query('limit') limit?: number,
  ) {
    return this.productsService.searchProducts(query, limit || 10);
  }

  @Get('category/:categorySlug')
  @ApiOperation({ summary: 'Get products by category slug' })
  async getProductsByCategory(
    @Param('categorySlug') categorySlug: string,
    @Query() filters: ProductFilterDto,
  ) {
    return this.productsService.getProductsByCategory(categorySlug, filters);
  }

  @Get('subcategory/:subcategorySlug')
  @ApiOperation({ summary: 'Get products by subcategory slug' })
  async getProductsBySubcategory(
    @Param('subcategorySlug') subcategorySlug: string,
    @Query() filters: ProductFilterDto,
  ) {
    return this.productsService.getProductsBySubcategory(
      subcategorySlug,
      filters,
    );
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related products' })
  async getRelatedProducts(
    @Param('id') id: string,
    @Query('category') category: string,
    @Query('limit') limit?: number,
  ) {
    return this.productsService.getRelatedProducts(id, category, limit || 4);
  }

  // Admin-only endpoints for dashboard
  @Post('admin/new-with-file')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new product with file upload (Admin only)' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `product-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async createWithFile(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    console.log('=== CREATE WITH FILE ===');
    console.log('Files received:', files?.length || 0);
    console.log(
      'Files details:',
      files?.map((f) => ({
        filename: f.filename,
        originalname: f.originalname,
        size: f.size,
      })),
    );
    // Handle file uploads if provided
    if (files && files.length > 0) {
      // Set mainImage to the first uploaded file
      createProductDto.mainImage = {
        url: `/uploads/${files[0].filename}`,
        alt: files[0].originalname,
      };
      // Set images array to all uploaded files
      createProductDto.images = files.map((file) => ({
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      }));
      console.log('Setting mainImage:', createProductDto.mainImage);
      console.log('Setting images:', createProductDto.images);
    } else {
      console.log('No files provided in request');
    }
    const result = await this.productsService.create(createProductDto);
    console.log('Create result:', result);
    return result;
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new product (Admin only)' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `product-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    // Handle file uploads if provided
    if (files && files.length > 0) {
      // Set mainImage to the first uploaded file
      createProductDto.mainImage = {
        url: `/uploads/${files[0].filename}`,
        alt: files[0].originalname,
      };
      // Set images array to all uploaded files
      createProductDto.images = files.map((file) => ({
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      }));
    }
    return this.productsService.create(createProductDto);
  }

  @Put('admin/update-with-file/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update product with file upload (Admin only)' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `product-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async updateWithFile(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    console.log('=== UPDATE WITH FILE ===');
    console.log('Product ID:', id);
    console.log('Files received:', files?.length || 0);
    console.log(
      'Files details:',
      files?.map((f) => ({
        filename: f.filename,
        originalname: f.originalname,
        size: f.size,
      })),
    );
    // Handle file uploads if provided
    if (files && files.length > 0) {
      // Set mainImage to the first uploaded file
      updateProductDto.mainImage = {
        url: `/uploads/${files[0].filename}`,
        alt: files[0].originalname,
      };
      updateProductDto.images = files.map((file) => ({
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      }));
      console.log('Setting mainImage:', updateProductDto.mainImage);
      console.log('Setting images:', updateProductDto.images);
    } else {
      console.log('No files provided in request');
    }
    const result = await this.productsService.update(id, updateProductDto);
    console.log('Update result:', result);
    return result;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update product (Admin only)' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `product-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    // Handle file uploads if provided
    if (files && files.length > 0) {
      // Set mainImage to the first uploaded file
      updateProductDto.mainImage = {
        url: `/uploads/${files[0].filename}`,
        alt: files[0].originalname,
      };
      updateProductDto.images = files.map((file) => ({
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      }));
    }
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete product (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return { message: 'Product deleted successfully' };
  }

  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Toggle product status (Admin only)' })
  async toggleStatus(@Param('id') id: string) {
    return this.productsService.toggleStatus(id);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update product stock (Admin only)' })
  async updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ) {
    return this.productsService.updateStock(id, quantity);
  }

  // Endpoint matching your frontend's fetchAllProducts
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get all products for admin selection (Admin only)',
  })
  async getAllForAdmin() {
    const result = await this.productsService.findAll({ limit: 1000 });
    return result.products.map((product) => {
      const productDoc = product as unknown as {
        _id?: string;
        id?: string;
        designation_fr?: string;
        designation?: string;
        title?: string;
        name?: string;
        slug?: string;
      };
      return {
        _id: productDoc._id || productDoc.id,
        designation_fr:
          productDoc.designation_fr ||
          productDoc.designation ||
          productDoc.title,
        name: productDoc.name || productDoc.title,
        slug: productDoc.slug,
      };
    });
  }

  // ISR Revalidation endpoint
  @Post('revalidate')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Trigger ISR revalidation for Next.js frontends (Admin only)',
  })
  async triggerRevalidation(
    @Body('productId') productId: string,
    @Body('secret') secret: string,
    @Headers('x-revalidate-secret') headerSecret: string,
  ) {
    // Verify secret from body or header
    const revalidateSecret =
      this.configService.get<string>('REVALIDATE_SECRET');

    if (!revalidateSecret) {
      throw new BadRequestException('Revalidation secret not configured');
    }

    if (secret !== revalidateSecret && headerSecret !== revalidateSecret) {
      throw new UnauthorizedException('Invalid revalidation secret');
    }

    if (!productId) {
      throw new BadRequestException('Product ID is required');
    }

    const product = await this.productsService.findOne(productId);

    // Call Next.js revalidation endpoints
    await this.revalidateNextJS(product.slug);

    return {
      revalidated: true,
      slug: product.slug,
      timestamp: new Date().toISOString(),
    };
  }

  // Private helper to call Next.js revalidation
  private async revalidateNextJS(slug: string) {
    const revalidateSecret =
      this.configService.get<string>('REVALIDATE_SECRET');
    const adminUrl = this.configService.get<string>('ADMIN_FRONTEND_URL');
    const ecommerceUrl = this.configService.get<string>(
      'ECOMMERCE_FRONTEND_URL',
    );

    const urls = [
      `${adminUrl}/api/revalidate?secret=${revalidateSecret}&path=/products/${slug}`,
      `${ecommerceUrl}/api/revalidate?secret=${revalidateSecret}&path=/products/${slug}`,
      `${ecommerceUrl}/api/revalidate?secret=${revalidateSecret}&path=/products`,
    ].filter((url) => url && !url.includes('undefined'));

    const results = await Promise.allSettled(
      urls.map((url) =>
        fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }).catch((err: unknown) => {
          const error = err as Error;
          console.error(`Failed to revalidate ${url}:`, error.message);
          return null;
        }),
      ),
    );

    return results;
  }
}
