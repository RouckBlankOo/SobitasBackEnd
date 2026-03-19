import { IsOptional, IsString, IsEmail } from 'class-validator';
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  username?: string; // maps to firstName + lastName (handled in service)
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  @IsString()
  address?: string;
  @IsOptional()
  @IsString()
  city?: string;
}
