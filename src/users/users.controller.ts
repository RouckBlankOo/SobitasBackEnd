import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create user (Admin only)' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  findAll() {
    return this.usersService.findAll();
  }

  // Wishlist endpoints
  @Get('wishlist')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user wishlist' })
  getWishlist(@Request() req) {
    return this.usersService.getWishlist(req.user.userId);
  }

  @Post('wishlist/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Add product to wishlist' })
  addToWishlist(@Request() req, @Param('productId') productId: string) {
    return this.usersService.addToWishlist(req.user.userId, productId);
  }

  @Delete('wishlist/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Remove product from wishlist' })
  removeFromWishlist(@Request() req, @Param('productId') productId: string) {
    return this.usersService.removeFromWishlist(req.user.userId, productId);
  }

  @Delete('wishlist')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Clear entire wishlist' })
  clearWishlist(@Request() req) {
    return this.usersService.clearWishlist(req.user.userId);
  }

  @Get('wishlist/check/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Check if product is in wishlist' })
  async isInWishlist(@Request() req, @Param('productId') productId: string) {
    const isInWishlist = await this.usersService.isInWishlist(
      req.user.userId,
      productId,
    );
    return { isInWishlist };
  }
}
