import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiOperation({ summary: 'Seed all data (products, categories, brands)' })
  @ApiResponse({ status: 201, description: 'Database seeded successfully' })
  async seedAll() {
    return this.seedService.seedAll();
  }

  @Post('products')
  @ApiOperation({ summary: 'Seed products only' })
  async seedProducts() {
    return this.seedService.seedProductsOnly();
  }

  @Post('categories')
  @ApiOperation({ summary: 'Seed categories only' })
  async seedCategories() {
    return this.seedService.seedCategoriesOnly();
  }

  @Post('brands')
  @ApiOperation({ summary: 'Seed brands only' })
  async seedBrands() {
    return this.seedService.seedBrandsOnly();
  }

  @Get('status')
  @ApiOperation({ summary: 'Get current database status' })
  async getStatus() {
    // This would require injecting the models to count documents
    return {
      message: 'Use POST /seed to seed the database',
      endpoints: {
        all: 'POST /seed',
        products: 'POST /seed/products',
        categories: 'POST /seed/categories',
        brands: 'POST /seed/brands',
      }
    };
  }
}

