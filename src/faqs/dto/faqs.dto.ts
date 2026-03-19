import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
    @ApiProperty({ description: 'Custom numeric ID' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'The question text' })
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiProperty({ description: 'The answer text' })
    @IsString()
    @IsNotEmpty()
    answer: string;
}

export class UpdateFaqDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    question?: string;

    @IsString()
    @IsOptional()
    answer?: string;
}
