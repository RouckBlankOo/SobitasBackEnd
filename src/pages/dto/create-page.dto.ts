import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePageDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsString()
  @IsOptional()
  meta_keywords?: string;
}

