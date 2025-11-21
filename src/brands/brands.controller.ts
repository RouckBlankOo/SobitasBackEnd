import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  async findAll() {
    return this.brandsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active brands only' })
  async findActive() {
    return this.brandsService.findActive();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get brand by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.brandsService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand by ID' })
  async findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post('admin/new-with-file')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new brand with file upload (Admin only)' })
  @UseInterceptors(FileInterceptor('logo'))
  async createWithFile(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createBrandDto.logo = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      };
    }
    return this.brandsService.create(createBrandDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new brand (Admin only)' })
  async create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Put('admin/update-with-file/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update brand with file upload (Admin only)' })
  @UseInterceptors(FileInterceptor('logo'))
  async updateWithFile(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateBrandDto.logo = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      };
    }
    return this.brandsService.update(id, updateBrandDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update brand (Admin only)' })
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete brand (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.brandsService.remove(id);
    return { message: 'Brand deleted successfully' };
  }
}
