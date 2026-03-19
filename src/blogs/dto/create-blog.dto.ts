import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';

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
  @Transform(
    ({ value }) =>
      value === 'true' || value === true || value === '1' || value === 1,
  )
  published?: boolean;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Split if it's a comma-separated string, or return as single element array
      return value.includes(',') ? value.split(',').map(v => v.trim()) : [value];
    }
    if (Array.isArray(value)) {
      return value;
    }
    return value;
  })
  tags?: string[];

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  reading_time?: string;
}
