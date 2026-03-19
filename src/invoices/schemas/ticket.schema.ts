import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TicketDocument = Ticket & Document;

export enum TicketStatus {
  DRAFT = 'draft',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true, collection: 'tickets' })
export class Ticket {
  @Prop({ required: true, unique: true })
  numero: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  client_id?: Types.ObjectId;

  // Client Information (can be anonymous)
  @Prop()
  nom?: string;

  @Prop()
  prenom?: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

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
  @Prop({ enum: TicketStatus, default: TicketStatus.PAID })
  etat: TicketStatus;

  // Payment
  @Prop()
  paymentMethod?: string;

  @Prop()
  note?: string;

  // Audit Fields
  @Prop()
  created_by?: string;

  @Prop()
  updated_by?: string;

  // Items will be stored in a separate collection (DetailsTicket)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'DetailsTicket' }] })
  details?: Types.ObjectId[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

// Indexes
TicketSchema.index({ numero: 1 }, { unique: true });
TicketSchema.index({ etat: 1 });
TicketSchema.index({ createdAt: -1 });
