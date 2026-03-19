import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Product, ProductSchema } from '../../products/schemas/product.schema';
import {
  Category,
  CategorySchema,
} from '../../categories/schemas/category.schema';
import {
  Subcategory,
  SubcategorySchema,
} from '../../subcategories/schemas/subcategory.schema';
import { Brand, BrandSchema } from '../../brands/schemas/brand.schema';
import { Review, ReviewSchema } from '../../reviews/schemas/review.schema';
import { User, UserSchema } from '../../users/schemas/user.schema';
import { Order, OrderSchema } from '../../orders/schemas/order.schema';
import { Blog, BlogSchema } from '../../blogs/schemas/blog.schema';
import { Aroma, AromaSchema } from '../../aromas/schemas/aroma.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Brand.name, schema: BrandSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: User.name, schema: UserSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Aroma.name, schema: AromaSchema },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule { }
