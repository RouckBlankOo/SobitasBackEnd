import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  COACH = 'coach',
}

export enum AthleteApplicationStatus {
  NONE = 'none',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  avatar?: string;

  @Prop()
  lastLoginAt?: Date;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  wishlist?: Types.ObjectId[];

  @Prop({ unique: true, sparse: true })
  coachPromoCode?: string;

  @Prop({ default: 0 })
  totalCommissionsEarned?: number;

  @Prop({ default: 0 })
  pendingCommissions?: number;

  @Prop({ type: String, enum: ['AFFILIATE', 'ATHLETE', 'PRO'], default: 'AFFILIATE' })
  coachTier?: string;

  @Prop({ default: 0 })
  totalClicks?: number;

  @Prop({ default: 0 })
  monthlySalary?: number;

  @Prop({ default: 0 })
  monthlyAllowance?: number;

  @Prop({ type: String, enum: AthleteApplicationStatus, default: AthleteApplicationStatus.NONE })
  athleteApplicationStatus?: AthleteApplicationStatus;

  @Prop({ type: [{ amount: Number, status: String, requestedAt: Date, processedAt: Date }], default: [] })
  payoutRequests?: Array<{
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: Date;
    processedAt?: Date;
  }>;

  @Prop()
  bio?: string;

  @Prop({ type: Object })
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
