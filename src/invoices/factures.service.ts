/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Facture, FactureDocument } from './schemas/facture.schema';
import {
  DetailsFacture,
  DetailsFactureDocument,
} from './schemas/details-facture.schema';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';

@Injectable()
export class FacturesService {
  constructor(
    @InjectModel(Facture.name) private factureModel: Model<FactureDocument>,
    @InjectModel(DetailsFacture.name)
    private detailsFactureModel: Model<DetailsFactureDocument>,
  ) {}

  async create(createFactureDto: CreateFactureDto): Promise<Facture> {
    // Check if numero already exists
    const existing = await this.factureModel.findOne({
      numero: createFactureDto.numero,
    });
    if (existing) {
      throw new ConflictException(
        `Facture with numero "${createFactureDto.numero}" already exists`,
      );
    }

    const { items, ...factureData } = createFactureDto;

    // Create facture
    const createdFacture = new this.factureModel(factureData);
    const savedFacture = await createdFacture.save();

    // Create details
    if (items && items.length > 0) {
      const detailsToCreate = items.map((item) => ({
        facture_id: savedFacture._id,
        produit_id: new Types.ObjectId(item.produit_id),
        produit_nom: item.produit_nom,
        produit_reference: item.produit_reference,
        quantity: item.quantity,
        prix_unitaire: item.prix_unitaire,
        tva_taux: item.tva_taux || 19,
        tva_montant:
          (item.prix_unitaire * item.quantity * (item.tva_taux || 19)) / 100,
        remise: item.remise || 0,
        total_ht: item.prix_unitaire * item.quantity - (item.remise || 0),
        total_ttc:
          (item.prix_unitaire * item.quantity - (item.remise || 0)) *
          (1 + (item.tva_taux || 19) / 100),
        description: item.description,
      }));

      const createdDetails =
        await this.detailsFactureModel.insertMany(detailsToCreate);
      savedFacture.details = createdDetails.map(
        (d) => d._id,
      ) as Types.ObjectId[];
      await savedFacture.save();
    }

    return this.findOne(String(savedFacture._id));
  }

  async findAll(filters: any = {}): Promise<{
    factures: Facture[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, etat, type, email, numero } = filters;

    const query: any = {};

    if (etat) {
      query.etat = etat;
    }

    if (type) {
      query.type = type;
    }

    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    if (numero) {
      query.numero = { $regex: numero, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const total = await this.factureModel.countDocuments(query);
    const factures = await this.factureModel
      .find(query)
      .populate('details')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      factures,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid facture ID format`);
    }

    const facture = await this.factureModel
      .findById(id)
      .populate('details')
      .exec();

    if (!facture) {
      throw new NotFoundException(`Facture with ID "${id}" not found`);
    }

    // Populate full details
    const details = await this.detailsFactureModel
      .find({ facture_id: facture._id })
      .exec();

    return { ...facture.toObject(), items: details };
  }

  async update(
    id: string,
    updateFactureDto: UpdateFactureDto,
  ): Promise<Facture> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid facture ID format`);
    }

    const { items, ...factureData } = updateFactureDto;

    const updatedFacture = await this.factureModel
      .findByIdAndUpdate(id, factureData, { new: true })
      .exec();

    if (!updatedFacture) {
      throw new NotFoundException(`Facture with ID "${id}" not found`);
    }

    // Update details if provided
    if (items) {
      // Delete existing details
      await this.detailsFactureModel.deleteMany({ facture_id: id });

      // Create new details
      if (items.length > 0) {
        const detailsToCreate = items.map((item) => ({
          facture_id: new Types.ObjectId(id),
          produit_id: new Types.ObjectId(item.produit_id),
          produit_nom: item.produit_nom,
          produit_reference: item.produit_reference,
          quantity: item.quantity,
          prix_unitaire: item.prix_unitaire,
          tva_taux: item.tva_taux || 19,
          tva_montant:
            (item.prix_unitaire * item.quantity * (item.tva_taux || 19)) / 100,
          remise: item.remise || 0,
          total_ht: item.prix_unitaire * item.quantity - (item.remise || 0),
          total_ttc:
            (item.prix_unitaire * item.quantity - (item.remise || 0)) *
            (1 + (item.tva_taux || 19) / 100),
          description: item.description,
        }));

        const createdDetails =
          await this.detailsFactureModel.insertMany(detailsToCreate);
        updatedFacture.details = createdDetails.map(
          (d) => d._id,
        ) as Types.ObjectId[];
        await updatedFacture.save();
      }
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid facture ID format`);
    }

    // Delete details first
    await this.detailsFactureModel.deleteMany({ facture_id: id });

    const result = await this.factureModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Facture with ID "${id}" not found`);
    }
  }

  async generateNumero(type: string = 'FAC'): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `${type}-${year}-`;

    const lastFacture = await this.factureModel
      .findOne({ numero: { $regex: `^${prefix}` } })
      .sort({ numero: -1 })
      .exec();

    if (!lastFacture) {
      return `${prefix}0001`;
    }

    const lastNumber = parseInt(lastFacture.numero.split('-').pop() || '0');
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');

    return `${prefix}${nextNumber}`;
  }
}
