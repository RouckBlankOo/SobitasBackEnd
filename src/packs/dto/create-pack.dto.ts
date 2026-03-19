import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePackDto {
  @ApiPropertyOptional()
  @IsString()
  designation_fr: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiPropertyOptional()
  @IsOptional()
  mainImage?: { url: string; alt?: string };

  @ApiPropertyOptional()
  @IsOptional()
  images?: Array<{ url: string; alt?: string }>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prix?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  promo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  qte?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  publier?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description_fr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  meta_description_fr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pack?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  new_product?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  best_seller?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rupture?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sous_categorie_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nutrition_values?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  questions?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zone1?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zone2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zone3?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zone4?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  meta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content_seo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  displayOrder?: number;
}
