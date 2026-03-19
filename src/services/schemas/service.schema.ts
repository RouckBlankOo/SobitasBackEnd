import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    icon: string;

    @Prop()
    image: string;

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    active: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
