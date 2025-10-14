import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Product, ProductSchema } from '../../products/schemas/product.schema';
import { Category, CategorySchema } from '../../categories/schemas/category.schema';
import { Subcategory, SubcategorySchema } from '../../subcategories/schemas/subcategory.schema';
import { Brand, BrandSchema } from '../../brands/schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Brand.name, schema: BrandSchema },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

