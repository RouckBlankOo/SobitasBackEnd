import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  designation: string;

  @Prop()
  designation_fr?: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  discountedPrice?: number;

  @Prop({ default: 'TND' })
  currency: string;

  @Prop()
  description?: string;

  @Prop()
  smallDescription?: string;

  @Prop()
  meta_description_fr?: string;

  @Prop()
  mainImage?: {
    url: string;
    alt?: string;
  };

  @Prop([{
    url: String,
    alt: String,
  }])
  images?: Array<{
    url: string;
    alt?: string;
  }>;

  @Prop({ default: true })
  inStock: boolean;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop([String])
  features?: string[];

  @Prop([String])
  aroma_ids?: string[];

  @Prop()
  brand?: string;

  @Prop()
  category?: string;

  @Prop([String])
  subCategory?: string[];

  @Prop({ default: false })
  isFlashSale: boolean;

  @Prop()
  venteflashDate?: Date;

  @Prop([{
    rating: Number,
    user_id: String,
    comment: String,
    date: { type: Date, default: Date.now },
  }])
  reviews?: Array<{
    rating: number;
    user_id: string;
    comment: string;
    date: Date;
  }>;

  @Prop({ default: 0 })
  aggregateRating?: number;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: '' })
  rupture: string;

  @Prop()
  zone1?: string;

  @Prop()
  zone2?: string;

  @Prop()
  zone3?: string;

  @Prop()
  zone4?: string;

  @Prop()
  content_seo?: string;

  @Prop()
  meta?: string;

  @Prop()
  type?: string;

  @Prop()
  sku?: string;

  // Legacy name field for backward compatibility
  @Prop()
  name?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Add indexes for better performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ title: 'text', description: 'text' });