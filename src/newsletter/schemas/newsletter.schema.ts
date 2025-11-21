import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsletterDocument = Newsletter & Document;

@Schema({ timestamps: true })
export class Newsletter {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: true })
  subscribed: boolean;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);

// Email index already created by unique: true
