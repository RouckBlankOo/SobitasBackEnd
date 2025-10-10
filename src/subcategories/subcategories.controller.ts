import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('subcategories')
@Controller('admin/subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get('get/all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all subcategories (Admin only)' })
  async findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get('get/by-category/:categoryId')
  @ApiOperation({ summary: 'Get subcategories by category' })
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.subcategoriesService.findByCategory(categoryId);
  }

  @Get('get/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get subcategory by ID (Admin only)' })
  async findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  @Post('new')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new subcategory (Admin only)' })
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update subcategory (Admin only)' })
  async update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, updateSubcategoryDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete subcategory (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.subcategoriesService.remove(id);
    return { message: 'Subcategory deleted successfully' };
  }
}

