import { IsString, IsOptional, IsBoolean, IsArray, IsObject } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  title_fr: string;

  @IsString()
  @IsOptional()
  title_ar?: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsObject()
  @IsOptional()
  image?: {
    url: string;
    alt?: string;
  };

  @IsString()
  @IsOptional()
  author?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}

