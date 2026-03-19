import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnnonceDocument = Annonce & Document;

@Schema({ timestamps: true })
export class Annonce {
    @Prop({ required: true })
    title: string;

    @Prop()
    content: string;

    @Prop()
    image: string;

    @Prop()
    video: string;

    @Prop()
    link: string;

    @Prop({ enum: ['image', 'video', 'text'], default: 'image' })
    type: string;

    @Prop({ default: true })
    active: boolean;

    @Prop()
    start_date: Date;

    @Prop()
    end_date: Date;
}

export const AnnonceSchema = SchemaFactory.createForClass(Annonce);
