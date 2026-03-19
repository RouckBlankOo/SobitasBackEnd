import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DetailsTicketDocument = DetailsTicket & Document;

@Schema({ timestamps: true, collection: 'details_tickets' })
export class DetailsTicket {
  @Prop({ type: Types.ObjectId, ref: 'Ticket', required: true })
  ticket_id: Types.ObjectId;

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

  @Prop({ type: Number, default: 0 })
  remise?: number;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop()
  description?: string;
}

export const DetailsTicketSchema = SchemaFactory.createForClass(DetailsTicket);

// Indexes
DetailsTicketSchema.index({ ticket_id: 1 });
DetailsTicketSchema.index({ produit_id: 1 });
