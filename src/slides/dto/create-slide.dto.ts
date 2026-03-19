import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSlideDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    link: string;

    @IsNumber()
    @IsOptional()
    order: number;

    @IsBoolean()
    @IsOptional()
    active: boolean;
}
