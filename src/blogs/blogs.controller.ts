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
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('get/all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all blogs (Admin only)' })
  async findAll() {
    return this.blogsService.findAll();
  }

  @Get('get-all-landing-page')
  @ApiOperation({ summary: 'Get all published blogs for landing page' })
  async findPublished() {
    return this.blogsService.findPublished();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get blog by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.blogsService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get blog by ID' })
  async findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Post('admin/new-with-file')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new blog with file upload (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  async createWithFile(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      createBlogDto.image = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname
      };
    }
    return this.blogsService.create(createBlogDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new blog (Admin only)' })
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Put('admin/update-with-file/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update blog with file upload (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  async updateWithFile(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      updateBlogDto.image = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname
      };
    }
    return this.blogsService.update(id, updateBlogDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update blog (Admin only)' })
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete blog (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.blogsService.remove(id);
    return { message: 'Blog deleted successfully' };
  }
}

