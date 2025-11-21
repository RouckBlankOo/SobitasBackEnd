import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServiceItem, ServiceSchema } from './schemas/service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceItem.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
