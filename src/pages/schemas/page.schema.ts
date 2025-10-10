import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true })
  title: string;

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  published: boolean;

  @Prop()
  meta_description?: string;

  @Prop()
  meta_keywords?: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);

PageSchema.index({ slug: 1 });

