import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('communication')
@UseGuards(JwtAuthGuard, AdminGuard)
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Post('email')
  async sendEmail(
    @Body() body: { to: string | string[]; subject: string; content: string },
  ) {
    return this.communicationService.sendEmail(
      body.to,
      body.subject,
      body.content,
    );
  }

  @Post('sms')
  async sendSMS(@Body() body: { phone: string | string[]; message: string }) {
    return this.communicationService.sendSMS(body.phone, body.message);
  }
}
