import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true })
  designation_fr: string;

  @Prop()
  designation_ar?: string;

  @Prop()
  designation?: string;

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop()
  description?: string;

  @Prop({ type: Object })
  logo?: {
    url: string;
    alt?: string;
  };

  @Prop({ type: Object })
  image?: {
    url: string;
    alt?: string;
  };

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: 0 })
  order: number;

  @Prop()
  meta_description?: string;

  @Prop()
  website_url?: string;

  @Prop({ default: false })
  featured: boolean;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.index({ slug: 1 });
BrandSchema.index({ active: 1, order: 1 });

