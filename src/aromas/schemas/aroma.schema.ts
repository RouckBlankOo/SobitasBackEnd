import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AromaDocument = Aroma & Document;

@Schema({ timestamps: true })
export class Aroma {
  @Prop({ required: true })
  name: string;

  @Prop()
  name_fr?: string;

  @Prop()
  name_ar?: string;

  @Prop()
  description?: string;

  @Prop({ default: true })
  active: boolean;
}

export const AromaSchema = SchemaFactory.createForClass(Aroma);

AromaSchema.index({ name: 1 });
