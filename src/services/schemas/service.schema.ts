import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = ServiceItem & Document;

@Schema({ timestamps: true })
export class ServiceItem {
  @Prop({ required: true })
  designation_fr: string;

  @Prop()
  designation_en?: string;

  @Prop()
  description_fr?: string;

  @Prop()
  description_en?: string;

  @Prop()
  icon?: string;

  @Prop({ type: Object })
  image?: {
    url: string;
    alt?: string;
  };

  @Prop()
  bgColor?: string;

  @Prop({ default: true })
  status: boolean;

  @Prop()
  order?: number;

  @Prop()
  link?: string;

  @Prop()
  category?: string;
}

export const ServiceSchema = SchemaFactory.createForClass(ServiceItem);

// Add indexes
ServiceSchema.index({ designation_fr: 'text', description_fr: 'text' });
ServiceSchema.index({ status: 1 });
ServiceSchema.index({ order: 1 });
