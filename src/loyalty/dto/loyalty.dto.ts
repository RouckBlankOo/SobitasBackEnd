import { IsEmail, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { PointsActivityType } from '../schemas/loyalty.schema';

export class CreateLoyaltyDto {
    @IsEmail()
    userEmail: string;
}

export class EarnPointsDto {
    @IsEmail()
    userEmail: string;

    @IsEnum(PointsActivityType)
    activityType: PointsActivityType;

    @IsOptional()
    orderId?: string;

    @IsOptional()
    orderAmount?: number;
}

export class RedeemPointsDto {
    @IsEmail()
    userEmail: string;

    points: number;
}

export class UpdateSocialDto {
    @IsEmail()
    userEmail: string;

    @IsOptional()
    @IsBoolean()
    newsletterSubscribed?: boolean;

    @IsOptional()
    @IsBoolean()
    instagramFollowed?: boolean;

    @IsOptional()
    @IsBoolean()
    tiktokFollowed?: boolean;
}
