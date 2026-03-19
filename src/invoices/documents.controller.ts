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
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import {
  CreateBonCommandeDto,
  UpdateBonCommandeDto,
} from './dto/bon-commande.dto';
import {
  CreateBonLivraisonDto,
  UpdateBonLivraisonDto,
} from './dto/bon-livraison.dto';
import { CreateDevisDto, UpdateDevisDto } from './dto/devis.dto';

// These services will be created next
// import { BonsCommandeService } from './bons-commande.service';
// import { BonsLivraisonService } from './bons-livraison.service';
// import { DevisService } from './devis.service';

@ApiTags('bons-commande')
@Controller('bons-commande')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth('access-token')
export class BonsCommandeController {
  // constructor(private readonly bonsCommandeService: BonsCommandeService) {}

  @Post()
  @ApiOperation({ summary: 'Create new bon de commande' })
  create(@Body() _createDto: CreateBonCommandeDto) {
    return { message: 'Bon de commande controller - to be implemented' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all bons de commande' })
  findAll(
    @Query('page') _page?: number,
    @Query('limit') _limit?: number,
    @Query('etat') _etat?: string,
  ) {
    return { message: 'List bons de commande - to be implemented' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bon de commande by ID' })
  findOne(@Param('id') _id: string) {
    return { message: 'Get bon de commande - to be implemented' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bon de commande' })
  update(@Param('id') _id: string, @Body() _updateDto: UpdateBonCommandeDto) {
    return { message: 'Update bon de commande - to be implemented' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete bon de commande' })
  remove(@Param('id') _id: string) {
    return;
  }
}

@ApiTags('bons-livraison')
@Controller('bons-livraison')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth('access-token')
export class BonsLivraisonController {
  // constructor(private readonly bonsLivraisonService: BonsLivraisonService) {}

  @Post()
  @ApiOperation({ summary: 'Create new bon de livraison' })
  create(@Body() _createDto: CreateBonLivraisonDto) {
    return { message: 'Bon de livraison controller - to be implemented' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all bons de livraison' })
  findAll(
    @Query('page') _page?: number,
    @Query('limit') _limit?: number,
    @Query('etat') _etat?: string,
  ) {
    return { message: 'List bons de livraison - to be implemented' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bon de livraison by ID' })
  findOne(@Param('id') _id: string) {
    return { message: 'Get bon de livraison - to be implemented' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bon de livraison' })
  update(@Param('id') _id: string, @Body() _updateDto: UpdateBonLivraisonDto) {
    return { message: 'Update bon de livraison - to be implemented' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete bon de livraison' })
  remove(@Param('id') _id: string) {
    return;
  }
}

@ApiTags('devis')
@Controller('devis')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth('access-token')
export class DevisController {
  // constructor(private readonly devisService: DevisService) {}

  @Post()
  @ApiOperation({ summary: 'Create new devis' })
  create(@Body() _createDto: CreateDevisDto) {
    return { message: 'Devis controller - to be implemented' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all devis' })
  findAll(
    @Query('page') _page?: number,
    @Query('limit') _limit?: number,
    @Query('etat') _etat?: string,
  ) {
    return { message: 'List devis - to be implemented' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get devis by ID' })
  findOne(@Param('id') _id: string) {
    return { message: 'Get devis - to be implemented' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update devis' })
  update(@Param('id') _id: string, @Body() _updateDto: UpdateDevisDto) {
    return { message: 'Update devis - to be implemented' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete devis' })
  remove(@Param('id') _id: string) {
    return;
  }

  @Post(':id/convert-to-facture')
  @ApiOperation({ summary: 'Convert devis to facture' })
  convertToFacture(@Param('id') _id: string) {
    return { message: 'Convert devis to facture - to be implemented' };
  }
}
