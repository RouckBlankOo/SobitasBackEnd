import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  title_fr: string;

  @Prop()
  title_ar?: string;

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  excerpt?: string;

  @Prop({ type: Object })
  image?: {
    url: string;
    alt?: string;
  };

  @Prop()
  author?: string;

  @Prop({ default: false })
  published: boolean;

  @Prop()
  meta_description?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  views: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.index({ slug: 1 });
BlogSchema.index({ published: 1, createdAt: -1 });

