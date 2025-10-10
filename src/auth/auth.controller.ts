import { Controller, Post, Body, UseGuards, Request, Req, Res } from '@nestjs/common';
import type { Response as ExpressResponse, Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const { access_token, refresh_token, user } = await this.authService.login(loginDto);
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Set access token cookie (short-lived, 15 minutes)
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });
    
    // Set refresh token cookie (long-lived, 7 days)
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
    
    // Also return tokens in response for backwards compatibility
    return {
      access_token,
      user,
    };
  }

  @Post('refresh')
  async refresh(
    @Req() request: ExpressRequest,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const refreshToken = request.cookies?.refresh_token;
    
    if (!refreshToken) {
      response.status(401);
      return { message: 'Refresh token not found' };
    }

    const { access_token } = await this.authService.refreshToken(refreshToken);
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Set new access token cookie
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });
    
    return { access_token };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: ExpressResponse) {
    // Clear both cookies
    response.clearCookie('access_token', { path: '/' });
    response.clearCookie('refresh_token', { path: '/' });
    
    return { message: 'Logged out successfully' };
  }

  @Post('validate')
  @UseGuards(JwtAuthGuard)
  async validate(@Request() req) {
    return this.authService.validateUser(req.user.userId);
  }
}