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
  ConflictException,
  BadRequestException,
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
  constructor(private readonly blogsService: BlogsService) { }

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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: require('multer').diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = require('path').extname(file.originalname);
          callback(null, `blog-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async createWithFile(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      console.log('File received:', file); // Debug log
      if (file) {
        createBlogDto.image = {
          url: `/uploads/${file.filename}`,
          alt: file.originalname,
        };
      }
      return await this.blogsService.create(createBlogDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('A blog with this slug already exists');
      }
      throw error;
    }
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: require('multer').diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = require('path').extname(file.originalname);
          callback(null, `blog-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async updateWithFile(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      console.log('File received for update:', file); // Debug log
      if (file) {
        updateBlogDto.image = {
          url: `/uploads/${file.filename}`,
          alt: file.originalname,
        };
      }
      return await this.blogsService.update(id, updateBlogDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('A blog with this slug already exists');
      }
      throw error;
    }
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
