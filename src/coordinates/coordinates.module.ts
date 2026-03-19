import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoordinatesService } from './coordinates.service';
import { CoordinatesController } from './coordinates.controller';
import { Coordinates, CoordinatesSchema } from './schemas/coordinates.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coordinates.name, schema: CoordinatesSchema },
    ]),
  ],
  controllers: [CoordinatesController],
  providers: [CoordinatesService],
  exports: [CoordinatesService],
})
export class CoordinatesModule {}
