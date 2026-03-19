import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DevisDocument = Devis & Document;

export enum DevisStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

@Schema({ timestamps: true, collection: 'devis' })
export class Devis {
  @Prop({ required: true, unique: true })
  numero: string;

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
  @Prop({ enum: DevisStatus, default: DevisStatus.DRAFT })
  etat: DevisStatus;

  // Dates
  @Prop({ required: true })
  date_emission: Date;

  @Prop({ required: true })
  date_validite: Date;

  @Prop()
  note?: string;

  @Prop()
  conditions?: string;

  // Reference to converted Facture
  @Prop({ type: Types.ObjectId, ref: 'Facture' })
  facture_id?: Types.ObjectId;

  // Audit Fields
  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DetailsDevis' }] })
  details?: Types.ObjectId[];
}

export const DevisSchema = SchemaFactory.createForClass(Devis);

// Indexes
DevisSchema.index({ numero: 1 }, { unique: true });
DevisSchema.index({ etat: 1 });
DevisSchema.index({ date_validite: 1 });
DevisSchema.index({ createdAt: -1 });
