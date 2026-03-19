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
import { BonLivraisonStatus } from '../schemas/bon-livraison.schema';

class DocumentItemDto {
  @ApiProperty()
  @IsString()
  produit_id: string;

  @ApiProperty()
  @IsString()
  produit_nom: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  prix_unitaire: number;
}

export class CreateBonLivraisonDto {
  @ApiProperty()
  @IsString()
  numero: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bon_commande_id?: string;

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
  livraison_nom?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_prenom?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_adresse1?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_adresse2?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_ville?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_code_postale?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_phone?: string;

  @ApiPropertyOptional({ enum: BonLivraisonStatus })
  @IsEnum(BonLivraisonStatus)
  @IsOptional()
  etat?: BonLivraisonStatus;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  date_livraison?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  date_livraison_effective?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  transporteur?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tracking_number?: string;

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

export class UpdateBonLivraisonDto extends PartialType(CreateBonLivraisonDto) {}
