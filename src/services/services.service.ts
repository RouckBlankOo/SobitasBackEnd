import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceItem, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(ServiceItem.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServiceItem> {
    const createdService = new this.serviceModel(createServiceDto);
    return await createdService.save();
  }

  async findAll(): Promise<ServiceItem[]> {
    return this.serviceModel
      .find()
      .sort({ order: 1, createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<ServiceItem> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID "${id}" not found`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceItem> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
    
    if (!updatedService) {
      throw new NotFoundException(`Service with ID "${id}" not found`);
    }
    
    return updatedService;
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Service with ID "${id}" not found`);
    }
  }

  async toggleStatus(id: string): Promise<ServiceItem> {
    const service = await this.findOne(id);
    return this.update(id, { status: !service.status });
  }

  async getActiveServices(): Promise<ServiceItem[]> {
    return this.serviceModel
      .find({ status: true })
      .sort({ order: 1, createdAt: -1 })
      .exec();
  }

  async removeMultiple(ids: string[]): Promise<{ deletedCount: number }> {
    const result = await this.serviceModel.deleteMany({ _id: { $in: ids } }).exec();
    return { deletedCount: result.deletedCount };
  }
}