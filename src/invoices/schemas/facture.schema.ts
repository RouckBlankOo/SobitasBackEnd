import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FactureDocument = Facture & Document;

export enum FactureStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue',
}

export enum FactureType {
  FACTURE = 'facture',
  FACTURE_CLIENT = 'facture_client',
  FACTURE_BOUTIQUE = 'facture_boutique',
  FACTURE_TVA = 'facture_tva',
  BON_COMMANDE = 'bon_commande',
  BON_LIVRAISON = 'bon_livraison',
  DEVIS = 'devis',
}

@Schema({ timestamps: true, collection: 'factures' })
export class Facture {
  @Prop({ required: true, unique: true })
  numero: string;

  @Prop({ enum: FactureType, default: FactureType.FACTURE })
  type: FactureType;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id?: Types.ObjectId;

  // Client Information
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  adresse1?: string;

  @Prop()
  adresse2?: string;

  @Prop()
  ville?: string;

  @Prop()
  code_postale?: string;

  @Prop()
  pays?: string;

  @Prop()
  region?: string;

  @Prop()
  gouvernorat?: string;

  @Prop()
  billing_localite?: string;

  @Prop()
  client_nif?: string;

  // Pricing
  @Prop({ required: true, type: Number })
  prix_ht: number;

  @Prop({ required: true, type: Number })
  prix_ttc: number;

  @Prop({ type: Number, default: 0 })
  tva: number;

  @Prop({ type: Number, default: 0.6 })
  timbre: number;

  @Prop({ type: Number, default: 0 })
  remise: number;

  @Prop({ type: Number, default: 0 })
  frais_livraison: number;

  // Status
  @Prop({ enum: FactureStatus, default: FactureStatus.PENDING })
  etat: FactureStatus;

  // Delivery Information
  @Prop()
  livraison?: string;

  @Prop()
  livraison_nom?: string;

  @Prop()
  livraison_prenom?: string;

  @Prop()
  livraison_adresse1?: string;

  @Prop()
  livraison_adresse2?: string;

  @Prop()
  livraison_email?: string;

  @Prop()
  livraison_phone?: string;

  @Prop()
  livraison_pays?: string;

  @Prop()
  livraison_region?: string;

  @Prop()
  livraison_ville?: string;

  @Prop()
  livraison_code_postale?: string;

  @Prop()
  livraison_no?: string;

  // Additional Information
  @Prop()
  note?: string;

  @Prop()
  historique?: string;

  @Prop()
  paymentMethod?: string;

  @Prop()
  conditions_paiement?: string;

  @Prop()
  penalites_retard?: string;

  // Audit Fields
  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;

  // Items will be stored in a separate collection (DetailsFacture)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'DetailsFacture' }] })
  details?: Types.ObjectId[];
}

export const FactureSchema = SchemaFactory.createForClass(Facture);

// Indexes
FactureSchema.index({ numero: 1 }, { unique: true });
FactureSchema.index({ email: 1 });
FactureSchema.index({ etat: 1 });
FactureSchema.index({ type: 1 });
FactureSchema.index({ createdAt: -1 });
