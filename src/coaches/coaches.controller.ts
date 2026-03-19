import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CoachesService } from './coaches.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming there is one

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService: CoachesService) { }

    @Get('validate/:code')
    async validateCode(@Param('code') code: string) {
        return this.coachesService.validatePromoCode(code);
    }

    @Post('assign/:userId')
    // @UseGuards(JwtAuthGuard) // Should be admin only in real scenario
    async assignCoach(@Param('userId') userId: string) {
        const promoCode = await this.coachesService.generatePromoCode(userId);
        return { promoCode };
    }

    @Get('stats/:coachId')
    async getStats(@Param('coachId') coachId: string) {
        return this.coachesService.getCoachStats(coachId);
    }

    @Get('track/:coachId')
    trackClick(@Param('coachId') coachId: string) {
        return this.coachesService.trackClick(coachId);
    }

    @Post('tier/:coachId')
    updateTier(@Param('coachId') coachId: string, @Body('tier') tier: string) {
        return this.coachesService.updateTier(coachId, tier);
    }

    @Get()
    async getAll() {
        return this.coachesService.getAllCoaches();
    }

    @Post('apply/:userId')
    async applyAsAthlete(@Param('userId') userId: string, @Body() applicationData: { bio: string; socialLinks: any }) {
        return this.coachesService.submitApplication(userId, applicationData);
    }

    @Post('payout/:coachId')
    async requestPayout(@Param('coachId') coachId: string, @Body('amount') amount: number) {
        return this.coachesService.requestPayout(coachId, amount);
    }

    @Get('personal-stats/:userId')
    async getPersonalStats(@Param('userId') userId: string) {
        return this.coachesService.getPersonalStats(userId);
    }

    @Get('applications')
    async getApplications() {
        return this.coachesService.getPendingApplications();
    }

    @Post('applications/:userId/process')
    async processApplication(@Param('userId') userId: string, @Body('status') status: 'approved' | 'rejected') {
        return this.coachesService.processApplication(userId, status);
    }
}
