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
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  Headers,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

  @Get('flash-sale')
  @ApiOperation({ summary: 'Get flash sale products' })
  async getFlashSaleProducts() {
    return this.productsService.getFlashSaleProducts();
  }

  @Get('search/:query')
  @ApiOperation({ summary: 'Search products by text' })
  async searchProducts(@Param('query') query: string, @Query('limit') limit?: number) {
    return this.productsService.searchProducts(query, limit || 10);
  }

  @Get('category/:categorySlug')
  @ApiOperation({ summary: 'Get products by category slug' })
  async getProductsByCategory(
    @Param('categorySlug') categorySlug: string,
    @Query() filters: ProductFilterDto
  ) {
    return this.productsService.getProductsByCategory(categorySlug, filters);
  }

  @Get('subcategory/:subcategorySlug')
  @ApiOperation({ summary: 'Get products by subcategory slug' })
  async getProductsBySubcategory(
    @Param('subcategorySlug') subcategorySlug: string,
    @Query() filters: ProductFilterDto
  ) {
    return this.productsService.getProductsBySubcategory(subcategorySlug, filters);
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
    @Query('limit') limit?: number
  ) {
    return this.productsService.getRelatedProducts(id, category, limit || 4);
  }

  // Admin-only endpoints for dashboard
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new product (Admin only)' })
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    // Handle file uploads if provided
    if (files && files.length > 0) {
      // Process uploaded files and add URLs to DTO
      createProductDto.images = files.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: file.originalname
      }));
    }
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update product (Admin only)' })
  @UseInterceptors(FilesInterceptor('images', 10))
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    // Handle file uploads if provided
    if (files && files.length > 0) {
      updateProductDto.images = files.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: file.originalname
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
  async updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.productsService.updateStock(id, quantity);
  }

  // Endpoint matching your frontend's fetchAllProducts
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all products for admin selection (Admin only)' })
  async getAllForAdmin() {
    const result = await this.productsService.findAll({ limit: 1000 });
    return result.products.map(product => ({
      _id: (product as any)._id || (product as any).id,
      designation_fr: product.designation_fr || product.designation || product.title,
      name: product.name || product.title,
      slug: product.slug
    }));
  }

  // ISR Revalidation endpoint
  @Post('revalidate')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Trigger ISR revalidation for Next.js frontends (Admin only)' })
  async triggerRevalidation(
    @Body('productId') productId: string,
    @Body('secret') secret: string,
    @Headers('x-revalidate-secret') headerSecret: string,
  ) {
    // Verify secret from body or header
    const revalidateSecret = this.configService.get('REVALIDATE_SECRET');
    
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
    const revalidateSecret = this.configService.get('REVALIDATE_SECRET');
    const adminUrl = this.configService.get('ADMIN_FRONTEND_URL');
    const ecommerceUrl = this.configService.get('ECOMMERCE_FRONTEND_URL');

    const urls = [
      `${adminUrl}/api/revalidate?secret=${revalidateSecret}&path=/products/${slug}`,
      `${ecommerceUrl}/api/revalidate?secret=${revalidateSecret}&path=/products/${slug}`,
      `${ecommerceUrl}/api/revalidate?secret=${revalidateSecret}&path=/products`,
    ].filter(url => url && !url.includes('undefined'));
    
    const results = await Promise.allSettled(
      urls.map(url => 
        fetch(url, { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }).catch(err => {
          console.error(`Failed to revalidate ${url}:`, err.message);
          return null;
        })
      )
    );

    return results;
  }
}
