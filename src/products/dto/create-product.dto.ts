import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsBoolean,
  IsArray,
  IsUrl,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  designation: string;

  @IsOptional()
  @IsString()
  designation_fr?: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  oldPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  discountedPrice?: number;

  @IsOptional()
  @IsString()
  currency?: string = 'TND';

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  smallDescription?: string;

  @IsOptional()
  @IsString()
  meta_description_fr?: string;

  @IsOptional()
  mainImage?: {
    url: string;
    alt?: string;
  };

  @IsOptional()
  @IsArray()
  images?: Array<{
    url: string;
    alt?: string;
  }>;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  inStock?: boolean = true;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantity?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number = 0;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aroma_ids?: string[];

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subCategory?: string[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isFlashSale?: boolean = false;

  @IsOptional()
  venteflashDate?: Date;

  @IsOptional()
  @IsArray()
  reviews?: Array<{
    rating: number;
    user_id: string;
    comment: string;
    date: Date;
  }>;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  aggregateRating?: number = 0;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  status?: boolean = true;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean = true;

  @IsOptional()
  @IsString()
  rupture?: string = '';

  @IsOptional()
  @IsString()
  zone1?: string;

  @IsOptional()
  @IsString()
  zone2?: string;

  @IsOptional()
  @IsString()
  zone3?: string;

  @IsOptional()
  @IsString()
  zone4?: string;

  @IsOptional()
  @IsString()
  content_seo?: string;

  @IsOptional()
  @IsString()
  meta?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
