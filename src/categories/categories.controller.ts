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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Public endpoints
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active categories only' })
  async findActive() {
    return this.categoriesService.findActive();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get category by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  // Admin endpoints
  @Post('admin/new-with-file')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create new category with file upload (Admin only)',
  })
  @UseInterceptors(FileInterceptor('image'))
  async createWithFile(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createCategoryDto.image = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      };
    }
    return this.categoriesService.create(createCategoryDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new category (Admin only)' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put('admin/update-with-file/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update category with file upload (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  async updateWithFile(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateCategoryDto.image = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname,
      };
    }
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update category (Admin only)' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete category (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
    return { message: 'Category deleted successfully' };
  }
}
