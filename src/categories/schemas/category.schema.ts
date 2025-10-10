import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
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
  image?: {
    url: string;
    alt?: string;
  };

  @Prop({ type: Object })
  icon?: {
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
  meta_keywords?: string;

  @Prop({ default: false })
  featured: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Index for faster queries
CategorySchema.index({ slug: 1 });
CategorySchema.index({ active: 1, order: 1 });

