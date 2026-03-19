import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoyaltyService } from './loyalty.service';
import { EarnPointsDto, RedeemPointsDto, UpdateSocialDto } from './dto/loyalty.dto';

@ApiTags('loyalty')
@Controller('loyalty')
export class LoyaltyController {
    constructor(private readonly loyaltyService: LoyaltyService) { }

    @Get('profile')
    @ApiOperation({ summary: 'Get loyalty profile by email' })
    async getProfile(@Query('email') email: string) {
        return this.loyaltyService.createOrGet(email);
    }

    @Get('config')
    @ApiOperation({ summary: 'Get points configuration' })
    getConfig() {
        return this.loyaltyService.getPointsConfig();
    }

    @Post('earn')
    @ApiOperation({ summary: 'Earn points for an activity' })
    async earnPoints(@Body() dto: EarnPointsDto) {
        return this.loyaltyService.earnPoints(dto);
    }

    @Post('redeem')
    @ApiOperation({ summary: 'Redeem points for discount' })
    async redeemPoints(@Body() dto: RedeemPointsDto) {
        return this.loyaltyService.redeemPoints(dto);
    }

    @Post('social')
    @ApiOperation({ summary: 'Update social actions (newsletter, Instagram, TikTok)' })
    async updateSocialActions(@Body() dto: UpdateSocialDto) {
        return this.loyaltyService.updateSocialActions(dto);
    }

    @Post('referral/apply')
    @ApiOperation({ summary: 'Apply referral code for new user' })
    async applyReferral(
        @Body('email') email: string,
        @Body('referralCode') referralCode: string,
    ) {
        await this.loyaltyService.applyReferral(email, referralCode);
        return { success: true, message: 'Referral applied successfully' };
    }

    @Get('referral/:code')
    @ApiOperation({ summary: 'Validate referral code' })
    async validateReferralCode(@Param('code') code: string) {
        const referrer = await this.loyaltyService.getByReferralCode(code);
        if (referrer) {
            return { valid: true, discount: 10 }; // 10% discount for referred users
        }
        return { valid: false };
    }
}
