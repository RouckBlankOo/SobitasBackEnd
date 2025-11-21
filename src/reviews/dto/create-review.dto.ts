import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEmail,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;

  @IsString()
  @IsOptional()
  productId?: string;

  @IsBoolean()
  @IsOptional()
  approved?: boolean;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  isTestimonial?: boolean;
}
