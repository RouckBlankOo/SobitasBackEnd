import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Get('subscribers')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all newsletter subscribers (Admin only)' })
  async findAll() {
    return this.newsletterService.findSubscribed();
  }

  @Post()
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  async subscribe(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @Delete('subscribers/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete newsletter subscriber (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.newsletterService.remove(id);
    return { message: 'Newsletter subscriber deleted successfully' };
  }

  @Post('send-campaign')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Send newsletter campaign (Admin only)' })
  async sendCampaign(@Body() campaignData: any) {
    // Implement email sending logic here
    return { message: 'Campaign sent successfully', data: campaignData };
  }
}
