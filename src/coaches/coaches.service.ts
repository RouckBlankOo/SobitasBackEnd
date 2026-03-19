import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole, AthleteApplicationStatus } from '../users/schemas/user.schema';
import { Order, OrderDocument } from '../orders/schemas/order.schema';

@Injectable()
export class CoachesService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) { }

    async findByPromoCode(code: string): Promise<UserDocument> {
        const coach = await this.userModel.findOne({
            coachPromoCode: code.toUpperCase(),
            role: UserRole.COACH,
            isActive: true
        });

        if (!coach) {
            throw new NotFoundException('Promo code not found or invalid');
        }

        return coach;
    }

    async validatePromoCode(code: string) {
        const coach = await this.findByPromoCode(code);
        return {
            valid: true,
            coachName: `${coach.firstName} ${coach.lastName}`,
            discountPercentage: 10,
        };
    }

    async generatePromoCode(userId: string): Promise<string> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Generate a code based on last name + random suffix if needed
        let promoCode = `${user.lastName.toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;

        // Check if code exists, if so, regenerate
        let existing = await this.userModel.findOne({ coachPromoCode: promoCode });
        while (existing) {
            promoCode = `${user.lastName.toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;
            existing = await this.userModel.findOne({ coachPromoCode: promoCode });
        }

        user.coachPromoCode = promoCode;
        user.role = UserRole.COACH;
        user.coachTier = 'AFFILIATE'; // Default tier
        await user.save();

        return promoCode;
    }

    async trackClick(coachId: string) {
        await this.userModel.findByIdAndUpdate(coachId, { $inc: { totalClicks: 1 } });
    }

    async updateTier(coachId: string, tier: string) {
        const validTiers = ['AFFILIATE', 'ATHLETE', 'PRO'];
        if (!validTiers.includes(tier)) {
            throw new BadRequestException('Invalid tier');
        }
        await this.userModel.findByIdAndUpdate(coachId, { coachTier: tier });
    }

    getCommissionRate(tier: string = 'AFFILIATE'): number {
        switch (tier) {
            case 'PRO': return 0.20; // 20%
            case 'ATHLETE': return 0.15; // 15%
            case 'AFFILIATE':
            default: return 0.10; // 10%
        }
    }

    async getCoachStats(coachId: string) {
        const coach = await this.userModel.findById(coachId);
        if (!coach) throw new NotFoundException('Coach not found');

        const orders = await this.orderModel.find({ coachId });
        const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalCommission = orders.reduce((sum, order) => sum + (order.coachCommissionAmount || 0), 0);

        const clicks = coach.totalClicks || 0;
        const conversionRate = clicks > 0 ? (orders.length / clicks) * 100 : 0;

        return {
            tier: coach.coachTier,
            orderCount: orders.length,
            totalSales,
            totalCommission,
            clicks,
            conversionRate: conversionRate.toFixed(2) + '%',
            monthlySalary: coach.monthlySalary || 0,
            monthlyAllowance: coach.monthlyAllowance || 0,
        };
    }

    async getAllCoaches() {
        return this.userModel.find({ role: UserRole.COACH });
    }

    async submitApplication(userId: string, applicationData: { bio: string; socialLinks: any }) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.athleteApplicationStatus === AthleteApplicationStatus.PENDING) {
            throw new BadRequestException('You already have a pending application');
        }

        if (user.role === UserRole.COACH) {
            throw new BadRequestException('You are already a coach/athlete');
        }

        user.athleteApplicationStatus = AthleteApplicationStatus.PENDING;
        user.bio = applicationData.bio;
        user.socialLinks = applicationData.socialLinks;
        await user.save();

        return { message: 'Application submitted successfully', status: 'pending' };
    }

    async requestPayout(coachId: string, amount: number) {
        const coach = await this.userModel.findById(coachId);
        if (!coach || coach.role !== UserRole.COACH) {
            throw new NotFoundException('Coach not found');
        }

        const pending = coach.pendingCommissions || 0;
        if (amount > pending) {
            throw new BadRequestException('Insufficient pending commissions');
        }

        const payoutRequest = {
            amount,
            status: 'pending' as const,
            requestedAt: new Date(),
        };

        coach.payoutRequests = coach.payoutRequests || [];
        coach.payoutRequests.push(payoutRequest);
        coach.pendingCommissions = pending - amount;
        await coach.save();

        return { message: 'Payout request submitted', request: payoutRequest };
    }

    async getPersonalStats(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.role !== UserRole.COACH) {
            return {
                isCoach: false,
                applicationStatus: user.athleteApplicationStatus || AthleteApplicationStatus.NONE,
            };
        }

        const orders = await this.orderModel.find({ coachId: userId });
        const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalCommission = orders.reduce((sum, order) => sum + (order.coachCommissionAmount || 0), 0);
        const clicks = user.totalClicks || 0;
        const conversionRate = clicks > 0 ? (orders.length / clicks) * 100 : 0;

        return {
            isCoach: true,
            tier: user.coachTier,
            promoCode: user.coachPromoCode,
            orderCount: orders.length,
            totalSales,
            totalCommission,
            pendingCommissions: user.pendingCommissions || 0,
            clicks,
            conversionRate: conversionRate.toFixed(2) + '%',
            payoutRequests: user.payoutRequests || [],
            bio: user.bio,
            socialLinks: user.socialLinks,
        };
    }
    async getPendingApplications() {
        return this.userModel.find({ athleteApplicationStatus: AthleteApplicationStatus.PENDING });
    }

    async processApplication(userId: string, status: 'approved' | 'rejected') {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (status === 'approved') {
            await this.generatePromoCode(userId); // Promotes to coach and saves
            // Explicitly update status after promotion to ensure it persists
            await this.userModel.findByIdAndUpdate(userId, { athleteApplicationStatus: AthleteApplicationStatus.APPROVED });
        } else {
            user.athleteApplicationStatus = AthleteApplicationStatus.REJECTED;
            await user.save();
        }
        return { message: `Application ${status}` };
    }
}
