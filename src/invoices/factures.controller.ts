import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { FacturesService } from './factures.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { FactureStatus, FactureType } from './schemas/facture.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('factures')
@Controller('factures')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth('access-token')
export class FacturesController {
  constructor(private readonly facturesService: FacturesService) { }

  @Post()
  @ApiOperation({ summary: 'Create new facture' })
  async create(@Body() createFactureDto: CreateFactureDto) {
    return this.facturesService.create(createFactureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all factures with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'etat', required: false, enum: FactureStatus })
  @ApiQuery({ name: 'type', required: false, enum: FactureType })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'numero', required: false, type: String })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('etat') etat?: FactureStatus,
    @Query('type') type?: FactureType,
    @Query('email') email?: string,
    @Query('numero') numero?: string,
  ) {
    return this.facturesService.findAll({
      page,
      limit,
      etat,
      type,
      email,
      numero,
    });
  }

  @Get('generate-numero')
  @ApiOperation({ summary: 'Generate next facture numero' })
  @ApiQuery({ name: 'type', required: false, type: String })
  async generateNumero(@Query('type') type?: string) {
    const numero = await this.facturesService.generateNumero(type);
    return { numero };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get facture by ID' })
  async findOne(@Param('id') id: string) {
    return this.facturesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update facture' })
  async update(
    @Param('id') id: string,
    @Body() updateFactureDto: UpdateFactureDto,
  ) {
    return this.facturesService.update(id, updateFactureDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete facture' })
  async remove(@Param('id') id: string) {
    await this.facturesService.remove(id);
  }
}
