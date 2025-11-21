import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateNewsletterDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  subscribed?: boolean;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
