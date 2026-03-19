import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsObject,
  IsMongoId,
} from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  designation: string;

  @IsString()
  @IsOptional()
  designation_fr?: string;

  @IsString()
  @IsOptional()
  designation_ar?: string;

  @IsString()
  slug: string;

  @IsMongoId()
  categoryId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  description_fr?: string;

  @IsObject()
  @IsOptional()
  image?: {
    url: string;
    alt?: string;
  };

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsString()
  @IsOptional()
  alt_cover?: string;

  @IsString()
  @IsOptional()
  description_cover?: string;

  @IsString()
  @IsOptional()
  meta?: string;

  @IsString()
  @IsOptional()
  content_seo?: string;

  @IsString()
  @IsOptional()
  review?: string;

  @IsString()
  @IsOptional()
  aggregateRating?: string;

  @IsString()
  @IsOptional()
  nutrition_values?: string;

  @IsString()
  @IsOptional()
  questions?: string;

  @IsString()
  @IsOptional()
  more_details?: string;

  @IsString()
  @IsOptional()
  zone1?: string;

  @IsString()
  @IsOptional()
  zone2?: string;

  @IsString()
  @IsOptional()
  zone3?: string;
}
