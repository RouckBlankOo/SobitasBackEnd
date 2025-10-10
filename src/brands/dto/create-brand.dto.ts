import { IsString, IsOptional, IsBoolean, IsNumber, IsObject } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  designation_fr: string;

  @IsString()
  @IsOptional()
  designation_ar?: string;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  logo?: {
    url: string;
    alt?: string;
  };

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
  website_url?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

