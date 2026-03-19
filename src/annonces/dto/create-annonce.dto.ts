import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAnnonceDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    video: string;

    @IsString()
    @IsOptional()
    link: string;

    @IsEnum(['image', 'video', 'text'])
    @IsOptional()
    type: string;

    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsDateString()
    @IsOptional()
    start_date: string;

    @IsDateString()
    @IsOptional()
    end_date: string;
}
