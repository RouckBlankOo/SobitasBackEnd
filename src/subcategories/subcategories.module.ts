import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';
import { Subcategory, SubcategorySchema } from './schemas/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategory.name, schema: SubcategorySchema },
    ]),
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  exports: [SubcategoriesService],
})
export class SubcategoriesModule {}
