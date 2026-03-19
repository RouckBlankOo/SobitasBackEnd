import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BonLivraisonDocument = BonLivraison & Document;

export enum BonLivraisonStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true, collection: 'bons_livraison' })
export class BonLivraison {
  @Prop({ required: true, unique: true })
  numero: string;

  @Prop({ type: Types.ObjectId, ref: 'BonCommande' })
  bon_commande_id?: Types.ObjectId;

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

  // Delivery Information
  @Prop()
  livraison_nom?: string;

  @Prop()
  livraison_prenom?: string;

  @Prop()
  livraison_adresse1?: string;

  @Prop()
  livraison_adresse2?: string;

  @Prop()
  livraison_ville?: string;

  @Prop()
  livraison_code_postale?: string;

  @Prop()
  livraison_phone?: string;

  // Status
  @Prop({ enum: BonLivraisonStatus, default: BonLivraisonStatus.PENDING })
  etat: BonLivraisonStatus;

  // Dates
  @Prop()
  date_livraison?: Date;

  @Prop()
  date_livraison_effective?: Date;

  @Prop()
  note?: string;

  @Prop()
  transporteur?: string;

  @Prop()
  tracking_number?: string;

  // Audit Fields
  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DetailsBonLivraison' }] })
  details?: Types.ObjectId[];
}

export const BonLivraisonSchema = SchemaFactory.createForClass(BonLivraison);

// Indexes
BonLivraisonSchema.index({ numero: 1 }, { unique: true });
BonLivraisonSchema.index({ etat: 1 });
BonLivraisonSchema.index({ createdAt: -1 });
