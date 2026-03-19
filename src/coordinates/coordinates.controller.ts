import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { CoordinatesService } from './coordinates.service';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { UpdateCoordinatesDto } from './dto/update-coordinates.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('coordinates')
@Controller('coordinates')
export class CoordinatesController {
  constructor(private readonly coordinatesService: CoordinatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new coordinates (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'logo_facture', maxCount: 1 },
        { name: 'logo_footer', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async create(
    @Body() createCoordinatesDto: CreateCoordinatesDto,
    @UploadedFiles()
    files: {
      cover?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
      logo?: Express.Multer.File[];
      logo_facture?: Express.Multer.File[];
      logo_footer?: Express.Multer.File[];
    },
  ) {
    if (files) {
      if (files.cover?.[0])
        createCoordinatesDto.cover = `/uploads/${files.cover[0].filename}`;
      if (files.favicon?.[0])
        createCoordinatesDto.favicon = `/uploads/${files.favicon[0].filename}`;
      if (files.logo?.[0])
        createCoordinatesDto.logo = `/uploads/${files.logo[0].filename}`;
      if (files.logo_facture?.[0])
        createCoordinatesDto.logo_facture = `/uploads/${files.logo_facture[0].filename}`;
      if (files.logo_footer?.[0])
        createCoordinatesDto.logo_footer = `/uploads/${files.logo_footer[0].filename}`;
    }
    return this.coordinatesService.create(createCoordinatesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all coordinates' })
  async findAll() {
    return this.coordinatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get coordinates by ID' })
  async findOne(@Param('id') id: string) {
    return this.coordinatesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update coordinates (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'logo_facture', maxCount: 1 },
        { name: 'logo_footer', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateCoordinatesDto: UpdateCoordinatesDto,
    @UploadedFiles()
    files: {
      cover?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
      logo?: Express.Multer.File[];
      logo_facture?: Express.Multer.File[];
      logo_footer?: Express.Multer.File[];
    },
  ) {
    if (files) {
      if (files.cover?.[0])
        updateCoordinatesDto.cover = `/uploads/${files.cover[0].filename}`;
      if (files.favicon?.[0])
        updateCoordinatesDto.favicon = `/uploads/${files.favicon[0].filename}`;
      if (files.logo?.[0])
        updateCoordinatesDto.logo = `/uploads/${files.logo[0].filename}`;
      if (files.logo_facture?.[0])
        updateCoordinatesDto.logo_facture = `/uploads/${files.logo_facture[0].filename}`;
      if (files.logo_footer?.[0])
        updateCoordinatesDto.logo_footer = `/uploads/${files.logo_footer[0].filename}`;
    }
    return this.coordinatesService.update(id, updateCoordinatesDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete coordinates (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.coordinatesService.remove(id);
    return { message: 'Coordinates deleted successfully' };
  }
}
