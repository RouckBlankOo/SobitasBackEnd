import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true })
  designation_fr: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
