import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoordinatesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  designation_fr?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  abbreviation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  matricule?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rib?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  adresse_fr?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone_1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone_2?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  site_web?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  facebook_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  youtube_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  favicon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo_facture?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo_footer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  short_description_fr?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description_fr?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  timbre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tva?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  short_description_ticket?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  footer_ticket?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  registre_commerce?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  twitter_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  instagram_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  linkedin_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  a_propos?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  frais_livraison?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  social_media_text_fr?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  newsletter_text_fr?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  store_text_fr?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  appstore_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  playstore_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gelocalisation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  copyright?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  whatsapp_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tiktok_link?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title_faq?: string;
}
