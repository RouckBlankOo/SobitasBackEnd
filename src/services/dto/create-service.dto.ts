import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber, IsUrl } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  designation_fr: string;

  @IsOptional()
  @IsString()
  designation_en?: string;

  @IsOptional()
  @IsString()
  description_fr?: string;

  @IsOptional()
  @IsString()
  description_en?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  image?: {
    url: string;
    alt?: string;
  };

  @IsOptional()
  @IsString()
  bgColor?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  status?: boolean = true;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order?: number;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  category?: string;
}