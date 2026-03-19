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
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import {
  DetailsTicket,
  DetailsTicketDocument,
} from './schemas/details-ticket.schema';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(DetailsTicket.name)
    private detailsTicketModel: Model<DetailsTicketDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const existing = await this.ticketModel.findOne({
      numero: createTicketDto.numero,
    });
    if (existing) {
      throw new ConflictException(
        `Ticket with numero "${createTicketDto.numero}" already exists`,
      );
    }

    const { items, ...ticketData } = createTicketDto;
    const createdTicket = new this.ticketModel(ticketData);
    const savedTicket = await createdTicket.save();

    if (items && items.length > 0) {
      const detailsToCreate = items.map((item) => ({
        ticket_id: savedTicket._id,
        produit_id: new Types.ObjectId(item.produit_id),
        produit_nom: item.produit_nom,
        produit_reference: item.produit_reference,
        quantity: item.quantity,
        prix_unitaire: item.prix_unitaire,
        remise: item.remise || 0,
        total: item.prix_unitaire * item.quantity - (item.remise || 0),
        description: item.description,
      }));

      const createdDetails =
        await this.detailsTicketModel.insertMany(detailsToCreate);
      savedTicket.details = createdDetails.map(
        (d) => d._id,
      ) as Types.ObjectId[];
      await savedTicket.save();
    }

    return this.findOne(String(savedTicket._id));
  }

  async findAll(filters: any = {}): Promise<any> {
    const { page = 1, limit = 10, etat } = filters;
    const query: any = {};
    if (etat) query.etat = etat;

    const skip = (page - 1) * limit;
    const total = await this.ticketModel.countDocuments(query);
    const tickets = await this.ticketModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      tickets,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ticket ID format`);
    }

    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }

    const details = await this.detailsTicketModel
      .find({ ticket_id: ticket._id })
      .exec();
    return { ...ticket.toObject(), items: details };
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ticket ID format`);
    }

    const { items, ...ticketData } = updateTicketDto;
    const updatedTicket = await this.ticketModel
      .findByIdAndUpdate(id, ticketData, { new: true })
      .exec();

    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }

    if (items) {
      await this.detailsTicketModel.deleteMany({ ticket_id: id });

      if (items.length > 0) {
        const detailsToCreate = items.map((item) => ({
          ticket_id: new Types.ObjectId(id),
          produit_id: new Types.ObjectId(item.produit_id),
          produit_nom: item.produit_nom,
          produit_reference: item.produit_reference,
          quantity: item.quantity,
          prix_unitaire: item.prix_unitaire,
          remise: item.remise || 0,
          total: item.prix_unitaire * item.quantity - (item.remise || 0),
          description: item.description,
        }));

        const createdDetails =
          await this.detailsTicketModel.insertMany(detailsToCreate);
        updatedTicket.details = createdDetails.map(
          (d) => d._id,
        ) as Types.ObjectId[];
        await updatedTicket.save();
      }
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ticket ID format`);
    }

    await this.detailsTicketModel.deleteMany({ ticket_id: id });
    const result = await this.ticketModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }
  }

  async generateNumero(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `TIC-${year}-`;

    const lastTicket = await this.ticketModel
      .findOne({ numero: { $regex: `^${prefix}` } })
      .sort({ numero: -1 })
      .exec();

    if (!lastTicket) {
      return `${prefix}0001`;
    }

    const lastNumber = parseInt(lastTicket.numero.split('-').pop() || '0');
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');

    return `${prefix}${nextNumber}`;
  }
}
