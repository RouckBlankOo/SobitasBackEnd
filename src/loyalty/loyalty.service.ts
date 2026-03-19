import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loyalty, LoyaltyDocument, LoyaltyTier, PointsActivityType } from './schemas/loyalty.schema';
import { CreateLoyaltyDto, EarnPointsDto, RedeemPointsDto, UpdateSocialDto } from './dto/loyalty.dto';
import { nanoid } from 'nanoid';

// Points configuration
const POINTS_CONFIG = {
    ACCOUNT_CREATED: 500,
    POINTS_PER_DT: 5,
    REVIEW: 100,
    NEWSLETTER: 150,
    INSTAGRAM: 150,
    TIKTOK: 100,
    REFERRAL_BONUS: 1000,
    VIP_THRESHOLD: 250, // Total spent in DT to become VIP
    REDEMPTION_RATE: 100, // 100 points = 1 DT
};

@Injectable()
export class LoyaltyService {
    constructor(
        @InjectModel(Loyalty.name) private loyaltyModel: Model<LoyaltyDocument>,
    ) { }

    async createOrGet(email: string): Promise<LoyaltyDocument> {
        let loyalty = await this.loyaltyModel.findOne({ userEmail: email }).exec();

        if (!loyalty) {
            const referralCode = nanoid(10).toUpperCase();
            loyalty = await this.loyaltyModel.create({
                userEmail: email,
                referralCode,
                totalPoints: POINTS_CONFIG.ACCOUNT_CREATED,
                activities: [{
                    type: PointsActivityType.ACCOUNT_CREATED,
                    points: POINTS_CONFIG.ACCOUNT_CREATED,
                    description: 'Bienvenue! Points de création de compte',
                    createdAt: new Date(),
                }],
            });
        }

        return loyalty;
    }

    async getByEmail(email: string): Promise<LoyaltyDocument> {
        const loyalty = await this.loyaltyModel.findOne({ userEmail: email }).exec();
        if (!loyalty) {
            throw new NotFoundException(`Loyalty profile not found for ${email}`);
        }
        return loyalty;
    }

    async getByReferralCode(code: string): Promise<LoyaltyDocument | null> {
        return this.loyaltyModel.findOne({ referralCode: code }).exec();
    }

    async earnPoints(dto: EarnPointsDto): Promise<LoyaltyDocument> {
        const loyalty = await this.createOrGet(dto.userEmail);
        let pointsToAdd = 0;
        let description = '';

        switch (dto.activityType) {
            case PointsActivityType.PURCHASE:
                if (!dto.orderAmount) throw new BadRequestException('Order amount required for purchase points');
                pointsToAdd = Math.floor(dto.orderAmount * POINTS_CONFIG.POINTS_PER_DT);
                description = `Achat de ${dto.orderAmount} DT`;
                loyalty.totalSpent += dto.orderAmount;
                // Check for VIP upgrade
                if (loyalty.totalSpent >= POINTS_CONFIG.VIP_THRESHOLD && loyalty.tier !== LoyaltyTier.VIP) {
                    loyalty.tier = LoyaltyTier.VIP;
                }
                break;
            case PointsActivityType.REVIEW:
                pointsToAdd = POINTS_CONFIG.REVIEW;
                description = 'Avis sur un produit';
                break;
            case PointsActivityType.NEWSLETTER:
                if (loyalty.newsletterSubscribed) return loyalty;
                pointsToAdd = POINTS_CONFIG.NEWSLETTER;
                description = 'Inscription à la newsletter';
                loyalty.newsletterSubscribed = true;
                break;
            case PointsActivityType.INSTAGRAM_FOLLOW:
                if (loyalty.instagramFollowed) return loyalty;
                pointsToAdd = POINTS_CONFIG.INSTAGRAM;
                description = 'Suivi sur Instagram';
                loyalty.instagramFollowed = true;
                break;
            case PointsActivityType.TIKTOK_FOLLOW:
                if (loyalty.tiktokFollowed) return loyalty;
                pointsToAdd = POINTS_CONFIG.TIKTOK;
                description = 'Suivi sur TikTok';
                loyalty.tiktokFollowed = true;
                break;
            case PointsActivityType.REFERRAL_BONUS:
                pointsToAdd = POINTS_CONFIG.REFERRAL_BONUS;
                description = 'Bonus de parrainage';
                loyalty.referralCount += 1;
                break;
            default:
                throw new BadRequestException(`Unknown activity type: ${dto.activityType}`);
        }

        if (pointsToAdd > 0) {
            loyalty.totalPoints += pointsToAdd;
            loyalty.activities.push({
                type: dto.activityType,
                points: pointsToAdd,
                description,
                orderId: dto.orderId as any,
                createdAt: new Date(),
            });
        }

        return loyalty.save();
    }

    async redeemPoints(dto: RedeemPointsDto): Promise<{ discountDT: number; remainingPoints: number }> {
        const loyalty = await this.getByEmail(dto.userEmail);

        if (dto.points > loyalty.totalPoints) {
            throw new BadRequestException('Insufficient points');
        }

        const discountDT = Math.floor(dto.points / POINTS_CONFIG.REDEMPTION_RATE);
        const pointsUsed = discountDT * POINTS_CONFIG.REDEMPTION_RATE;

        loyalty.totalPoints -= pointsUsed;
        loyalty.activities.push({
            type: PointsActivityType.POINTS_REDEEMED,
            points: -pointsUsed,
            description: `Échange de ${pointsUsed} points pour ${discountDT} DT de réduction`,
            createdAt: new Date(),
        });

        await loyalty.save();

        return {
            discountDT,
            remainingPoints: loyalty.totalPoints,
        };
    }

    async applyReferral(newUserEmail: string, referralCode: string): Promise<void> {
        const referrer = await this.getByReferralCode(referralCode);
        if (!referrer) return;

        // Award referral bonus to referrer
        await this.earnPoints({
            userEmail: referrer.userEmail,
            activityType: PointsActivityType.REFERRAL_BONUS,
        });

        // Mark new user as referred
        const newUser = await this.createOrGet(newUserEmail);
        newUser.referredBy = referrer._id as any;
        await newUser.save();
    }

    async updateSocialActions(dto: UpdateSocialDto): Promise<LoyaltyDocument> {
        if (dto.newsletterSubscribed) {
            await this.earnPoints({ userEmail: dto.userEmail, activityType: PointsActivityType.NEWSLETTER });
        }
        if (dto.instagramFollowed) {
            await this.earnPoints({ userEmail: dto.userEmail, activityType: PointsActivityType.INSTAGRAM_FOLLOW });
        }
        if (dto.tiktokFollowed) {
            await this.earnPoints({ userEmail: dto.userEmail, activityType: PointsActivityType.TIKTOK_FOLLOW });
        }
        return this.getByEmail(dto.userEmail);
    }

    getPointsConfig() {
        return POINTS_CONFIG;
    }
}
