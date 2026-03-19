import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AromasController } from './aromas.controller';
import { AromasService } from './aromas.service';
import { Aroma, AromaSchema } from './schemas/aroma.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Aroma.name, schema: AromaSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [AromasController],
  providers: [AromasService],
  exports: [AromasService],
})
export class AromasModule {}
