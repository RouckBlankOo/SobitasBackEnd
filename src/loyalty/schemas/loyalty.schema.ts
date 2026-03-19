import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LoyaltyDocument = Loyalty & Document;

export enum LoyaltyTier {
    MEMBER = 'member',
    VIP = 'vip',
}

export enum PointsActivityType {
    ACCOUNT_CREATED = 'account_created',
    PURCHASE = 'purchase',
    REVIEW = 'review',
    NEWSLETTER = 'newsletter',
    INSTAGRAM_FOLLOW = 'instagram_follow',
    TIKTOK_FOLLOW = 'tiktok_follow',
    REFERRAL_BONUS = 'referral_bonus',
    POINTS_REDEEMED = 'points_redeemed',
}

@Schema({ timestamps: true })
export class PointsActivity {
    @Prop({ required: true, enum: PointsActivityType })
    type: PointsActivityType;

    @Prop({ required: true })
    points: number;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Order' })
    orderId?: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const PointsActivitySchema = SchemaFactory.createForClass(PointsActivity);

@Schema({ timestamps: true })
export class Loyalty {
    @Prop({ required: true, unique: true })
    userEmail: string;

    @Prop({ default: 0 })
    totalPoints: number;

    @Prop({ default: 0 })
    pendingPoints: number;

    @Prop({ default: 0 })
    totalSpent: number;

    @Prop({ enum: LoyaltyTier, default: LoyaltyTier.MEMBER })
    tier: LoyaltyTier;

    @Prop({ type: [PointsActivitySchema], default: [] })
    activities: PointsActivity[];

    @Prop()
    referralCode: string;

    @Prop({ type: Types.ObjectId, ref: 'Loyalty' })
    referredBy?: Types.ObjectId;

    @Prop({ default: 0 })
    referralCount: number;

    @Prop({ default: false })
    newsletterSubscribed: boolean;

    @Prop({ default: false })
    instagramFollowed: boolean;

    @Prop({ default: false })
    tiktokFollowed: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const LoyaltySchema = SchemaFactory.createForClass(Loyalty);
