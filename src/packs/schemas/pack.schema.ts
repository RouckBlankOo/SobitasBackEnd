import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackDocument = Pack & Document;

@Schema({ timestamps: true, collection: 'packs' })
export class Pack {
  @Prop({ required: true })
  designation_fr: string;

  @Prop()
  designation?: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  cover?: string;

  @Prop({ type: Object })
  mainImage?: {
    url: string;
    alt?: string;
  };

  @Prop({ type: [Object] })
  images?: Array<{
    url: string;
    alt?: string;
  }>;

  @Prop({ default: '0' })
  prix: string;

  @Prop({ default: '' })
  promo: string;

  @Prop({ default: '0' })
  qte: string;

  @Prop({ default: '1' })
  publier: string;

  @Prop({ default: '' })
  description_fr: string;

  @Prop({ default: '' })
  meta_description_fr: string;

  @Prop({ default: '1' })
  pack: string;

  @Prop({ default: '0' })
  new_product: string;

  @Prop({ default: '0' })
  best_seller: string;

  @Prop({ default: '' })
  rupture: string;

  @Prop()
  brand_id?: string;

  @Prop()
  sous_categorie_id?: string;

  @Prop()
  gallery?: string;

  @Prop()
  note?: string;

  @Prop()
  alt_cover?: string;

  @Prop()
  description_cover?: string;

  @Prop()
  meta?: string;

  @Prop()
  content_seo?: string;

  @Prop()
  review?: string;

  @Prop()
  aggregateRating?: string;

  @Prop()
  nutrition_values?: string;

  @Prop()
  questions?: string;

  @Prop()
  zone1?: string;

  @Prop()
  zone2?: string;

  @Prop()
  zone3?: string;

  @Prop()
  zone4?: string;

  @Prop()
  displayOrder?: number;

  @Prop()
  code_product?: string;

  @Prop()
  promo_expiration_date?: string;
}

export const PackSchema = SchemaFactory.createForClass(Pack);

PackSchema.index({ slug: 1 });
PackSchema.index({ publier: 1 });
PackSchema.index({ designation_fr: 'text', description_fr: 'text' });
