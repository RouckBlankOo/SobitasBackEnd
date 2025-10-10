import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateAromaDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  name_fr?: string;

  @IsString()
  @IsOptional()
  name_ar?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsArray()
  @IsOptional()
  products?: string[];
}

