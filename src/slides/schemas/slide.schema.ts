import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SlideDocument = Slide & Document;

@Schema({ timestamps: true })
export class Slide {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    link: string;

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    active: boolean;
}

export const SlideSchema = SchemaFactory.createForClass(Slide);
