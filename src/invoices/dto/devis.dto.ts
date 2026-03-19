import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DevisStatus } from '../schemas/devis.schema';

class DevisItemDto {
  @ApiProperty()
  @IsString()
  produit_id: string;

  @ApiProperty()
  @IsString()
  produit_nom: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  produit_reference?: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  prix_unitaire: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  tva_taux?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  remise?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateDevisDto {
  @ApiProperty()
  @IsString()
  numero: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiProperty()
  @IsString()
  nom: string;

  @ApiProperty()
  @IsString()
  prenom: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  adresse1?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  adresse2?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ville?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  code_postale?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  pays?: string;

  @ApiProperty()
  @IsNumber()
  prix_ht: number;

  @ApiProperty()
  @IsNumber()
  prix_ttc: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  tva?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  remise?: number;

  @ApiPropertyOptional({ enum: DevisStatus })
  @IsEnum(DevisStatus)
  @IsOptional()
  etat?: DevisStatus;

  @ApiProperty()
  @IsDateString()
  date_emission: string;

  @ApiProperty()
  @IsDateString()
  date_validite: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  conditions?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  created_by?: string;

  @ApiProperty({ type: [DevisItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DevisItemDto)
  items: DevisItemDto[];
}

export class UpdateDevisDto extends PartialType(CreateDevisDto) {}
