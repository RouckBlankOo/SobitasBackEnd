import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubcategoryDocument = Subcategory & Document;

@Schema({ timestamps: true })
export class Subcategory {
  @Prop({ required: true })
  designation: string;

  @Prop()
  designation_fr?: string;

  @Prop()
  designation_ar?: string;

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop()
  description?: string;

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
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);

// Index for faster queries (slug index already created by unique: true)
SubcategorySchema.index({ categoryId: 1, active: 1 });

