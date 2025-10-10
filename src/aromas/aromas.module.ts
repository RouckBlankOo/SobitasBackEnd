import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AromasController } from './aromas.controller';
import { AromasService } from './aromas.service';
import { Aroma, AromaSchema } from './schemas/aroma.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aroma.name, schema: AromaSchema }]),
  ],
  controllers: [AromasController],
  providers: [AromasService],
  exports: [AromasService],
})
export class AromasModule {}

