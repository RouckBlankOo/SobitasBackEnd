import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FactureType, FactureStatus } from '../schemas/facture.schema';

class FactureItemDto {
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

export class CreateFactureDto {
  @ApiProperty()
  @IsString()
  numero: string;

  @ApiPropertyOptional({ enum: FactureType })
  @IsEnum(FactureType)
  @IsOptional()
  type?: FactureType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  user_id?: string;

  // Client Information
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gouvernorat?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  billing_localite?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  client_nif?: string;

  // Pricing
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
  timbre?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  remise?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  frais_livraison?: number;

  // Status
  @ApiPropertyOptional({ enum: FactureStatus })
  @IsEnum(FactureStatus)
  @IsOptional()
  etat?: FactureStatus;

  // Delivery Information
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison?: string;

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
  livraison_email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_pays?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  livraison_region?: string;

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
  livraison_no?: string;

  // Additional Information
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  historique?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  conditions_paiement?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  penalites_retard?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  created_by?: string;

  // Items
  @ApiProperty({ type: [FactureItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FactureItemDto)
  items: FactureItemDto[];
}
