import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BonCommandeDocument = BonCommande & Document;

export enum BonCommandeStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true, collection: 'bons_commande' })
export class BonCommande {
  @Prop({ required: true, unique: true })
  numero: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id?: Types.ObjectId;

  // Supplier/Client Information
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

  // Pricing
  @Prop({ required: true, type: Number })
  prix_ht: number;

  @Prop({ required: true, type: Number })
  prix_ttc: number;

  @Prop({ type: Number, default: 0 })
  tva: number;

  @Prop({ type: Number, default: 0 })
  remise: number;

  // Status
  @Prop({ enum: BonCommandeStatus, default: BonCommandeStatus.PENDING })
  etat: BonCommandeStatus;

  // Dates
  @Prop()
  date_commande?: Date;

  @Prop()
  date_livraison_prevue?: Date;

  @Prop()
  note?: string;

  @Prop()
  conditions?: string;

  // Audit Fields
  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DetailsBonCommande' }] })
  details?: Types.ObjectId[];
}

export const BonCommandeSchema = SchemaFactory.createForClass(BonCommande);

// Indexes
BonCommandeSchema.index({ numero: 1 }, { unique: true });
BonCommandeSchema.index({ etat: 1 });
BonCommandeSchema.index({ createdAt: -1 });
