import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DetailsFactureDocument = DetailsFacture & Document;

@Schema({ timestamps: true, collection: 'details_factures' })
export class DetailsFacture {
  @Prop({ type: Types.ObjectId, ref: 'Facture', required: true })
  facture_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  produit_id: Types.ObjectId;

  @Prop({ required: true })
  produit_nom: string;

  @Prop()
  produit_reference?: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  prix_unitaire: number;

  @Prop({ type: Number, default: 19 })
  tva_taux: number;

  @Prop({ type: Number })
  tva_montant?: number;

  @Prop({ type: Number })
  remise?: number;

  @Prop({ type: Number, required: true })
  total_ht: number;

  @Prop({ type: Number, required: true })
  total_ttc: number;

  @Prop()
  description?: string;
}

export const DetailsFactureSchema =
  SchemaFactory.createForClass(DetailsFacture);

// Indexes
DetailsFactureSchema.index({ facture_id: 1 });
DetailsFactureSchema.index({ produit_id: 1 });
