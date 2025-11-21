import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reviews or filter by query' })
  async findAll(@Query('publishedOnly') publishedOnly?: string) {
    if (publishedOnly === 'true') {
      return this.reviewsService.findApproved();
    }
    return this.reviewsService.findAll();
  }

  @Get('testimonials')
  @ApiOperation({ summary: 'Get approved testimonials' })
  async findTestimonials() {
    return this.reviewsService.findTestimonials();
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get reviews by product ID' })
  async findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new review' })
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Approve review (Admin only)' })
  async approve(@Param('id') id: string) {
    return this.reviewsService.approve(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update review (Admin only)' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete review (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.reviewsService.remove(id);
    return { message: 'Review deleted successfully' };
  }
}
