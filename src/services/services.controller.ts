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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Public endpoint for frontend
  @Get()
  @ApiOperation({ summary: 'Get all services' })
  async findAll() {
    return this.servicesService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active services only' })
  async getActiveServices() {
    return this.servicesService.getActiveServices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  // Admin endpoints matching your ServicesTable component expectations
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new service (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      createServiceDto.image = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname
      };
    }
    return this.servicesService.create(createServiceDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update service (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      updateServiceDto.image = {
        url: `/uploads/${file.filename}`,
        alt: file.originalname
      };
    }
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete service (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.servicesService.remove(id);
    return { message: 'Service deleted successfully' };
  }

  // Bulk delete endpoint for your ServicesTable selection feature
  @Delete('bulk/:ids')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete multiple services (Admin only)' })
  async removeMultiple(@Param('ids') ids: string) {
    const serviceIds = ids.split(',');
    const result = await this.servicesService.removeMultiple(serviceIds);
    return { 
      message: `${result.deletedCount} services deleted successfully`,
      deletedCount: result.deletedCount
    };
  }
}