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
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TicketStatus } from '../schemas/ticket.schema';

class TicketItemDto {
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
  remise?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  numero: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  client_id?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nom?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  prenom?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

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

  @ApiPropertyOptional({ enum: TicketStatus })
  @IsEnum(TicketStatus)
  @IsOptional()
  etat?: TicketStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  created_by?: string;

  @ApiProperty({ type: [TicketItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketItemDto)
  items: TicketItemDto[];
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
