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
import { BonCommandeStatus } from '../schemas/bon-commande.schema';

class DocumentItemDto {
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

export class CreateBonCommandeDto {
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  region?: string;

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

  @ApiPropertyOptional({ enum: BonCommandeStatus })
  @IsEnum(BonCommandeStatus)
  @IsOptional()
  etat?: BonCommandeStatus;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  date_commande?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  date_livraison_prevue?: string;

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

  @ApiProperty({ type: [DocumentItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentItemDto)
  items: DocumentItemDto[];
}

export class UpdateBonCommandeDto extends PartialType(CreateBonCommandeDto) {}
