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
}
