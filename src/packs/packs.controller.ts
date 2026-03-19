import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PacksService } from './packs.service';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

const imageUploadInterceptor = FilesInterceptor('images', 10, {
  storage: diskStorage({
    destination: './uploads/packs',
    filename: (_req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `pack-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (_req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

@ApiTags('packs')
@Controller('packs')
export class PacksController {
  constructor(private readonly packsService: PacksService) {}

  // ============ PUBLIC ENDPOINTS ============

  @Get('featured')
  @ApiOperation({ summary: 'Get featured packs for e-commerce' })
  async getFeatured(@Query('limit') limit?: number) {
    return this.packsService.getFeatured(limit || 6);
  }

  @Get('published')
  @ApiOperation({ summary: 'Get all published packs' })
  async getPublished() {
    return this.packsService.getPublished();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get pack by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.packsService.findBySlug(slug);
  }

  @Get('public/:id')
  @ApiOperation({ summary: 'Get pack by ID (public)' })
  async findOnePublic(@Param('id') id: string) {
    return this.packsService.findOne(id);
  }

  // ============ ADMIN ENDPOINTS ============

  @Get('admin/raw')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all packs for admin dashboard' })
  async findAll() {
    return this.packsService.findAll();
  }

  @Get('admin/get/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get pack by ID (admin)' })
  async findOne(@Param('id') id: string) {
    return this.packsService.findOne(id);
  }

  @Post('admin/new-with-file')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create pack with file upload' })
  @UseInterceptors(imageUploadInterceptor)
  async createWithFile(
    @Body() createPackDto: CreatePackDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      createPackDto.mainImage = {
        url: `/uploads/packs/${files[0].filename}`,
        alt: files[0].originalname,
      };
      createPackDto.cover = `/uploads/packs/${files[0].filename}`;
      createPackDto.images = files.map((f) => ({
        url: `/uploads/packs/${f.filename}`,
        alt: f.originalname,
      }));
    }
    return this.packsService.create(createPackDto);
  }

  @Put('admin/update-with-file/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update pack with file upload' })
  @UseInterceptors(imageUploadInterceptor)
  async updateWithFile(
    @Param('id') id: string,
    @Body() updatePackDto: UpdatePackDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      updatePackDto.mainImage = {
        url: `/uploads/packs/${files[0].filename}`,
        alt: files[0].originalname,
      };
      updatePackDto.cover = `/uploads/packs/${files[0].filename}`;
      updatePackDto.images = files.map((f) => ({
        url: `/uploads/packs/${f.filename}`,
        alt: f.originalname,
      }));
    }
    return this.packsService.update(id, updatePackDto);
  }

  @Delete('admin/delete/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete pack' })
  async remove(@Param('id') id: string) {
    return this.packsService.remove(id);
  }

  @Post('admin/bulk-delete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Bulk delete packs' })
  async bulkDelete(@Body('ids') ids: string[]) {
    return this.packsService.bulkDelete(ids);
  }

  @Get('admin/count')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get total pack count' })
  async count() {
    return { count: await this.packsService.count() };
  }

  @Post('admin/assign-brands')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Auto-assign brands to packs that have no brand_id' })
  async assignBrands() {
    return this.packsService.autoAssignBrands();
  }
}
