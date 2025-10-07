import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({
    type: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: {
        governorate: String,
        delegation: String,
        locality: String,
        postalCode: String,
        street: String,
      },
    },
    required: true,
  })
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      governorate: string;
      delegation: string;
      locality: string;
      postalCode: string;
      street: string;
    };
  };

  @Prop([{
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: String,
  }])
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
  }>;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 0 })
  shippingCost: number;

  @Prop({ default: 0 })
  taxAmount: number;

  @Prop({ default: 'TND' })
  currency: string;

  @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop()
  notes?: string;

  @Prop()
  trackingNumber?: string;

  @Prop()
  estimatedDelivery?: Date;

  @Prop({ default: Date.now })
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Add indexes
OrderSchema.index({ customerEmail: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ orderDate: -1 });