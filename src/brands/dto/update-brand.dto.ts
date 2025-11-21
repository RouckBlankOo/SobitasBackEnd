import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsObject()
  @IsOptional()
  logo?: {
    url: string;
    alt?: string;
  };
}
