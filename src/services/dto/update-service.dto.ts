import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsObject()
  @IsOptional()
  image?: {
    url: string;
    alt?: string;
  };
}
