import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AromasService } from './aromas.service';
import { CreateAromaDto } from './dto/create-aroma.dto';
import { UpdateAromaDto } from './dto/update-aroma.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('aromas')
@Controller('aromas')
export class AromasController {
  constructor(private readonly aromasService: AromasService) {}

  @Get()
  @ApiOperation({ summary: 'Get all aromas' })
  async findAll() {
    return this.aromasService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active aromas only' })
  async findActive() {
    return this.aromasService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get aroma by ID' })
  async findOne(@Param('id') id: string) {
    return this.aromasService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create new aroma (Admin only)' })
  async create(@Body() createAromaDto: CreateAromaDto) {
    return this.aromasService.create(createAromaDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update aroma (Admin only)' })
  async update(
    @Param('id') id: string,
    @Body() updateAromaDto: UpdateAromaDto,
  ) {
    return this.aromasService.update(id, updateAromaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete aroma (Admin only)' })
  async remove(@Param('id') id: string) {
    await this.aromasService.remove(id);
    return { message: 'Aroma deleted successfully' };
  }
}
