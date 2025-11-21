import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aroma, AromaDocument } from './schemas/aroma.schema';
import { CreateAromaDto } from './dto/create-aroma.dto';
import { UpdateAromaDto } from './dto/update-aroma.dto';

@Injectable()
export class AromasService {
  constructor(
    @InjectModel(Aroma.name) private aromaModel: Model<AromaDocument>,
  ) {}

  async create(createAromaDto: CreateAromaDto): Promise<Aroma> {
    const createdAroma = new this.aromaModel(createAromaDto);
    return createdAroma.save();
  }

  async findAll(): Promise<Aroma[]> {
    return this.aromaModel.find().sort({ name: 1 }).exec();
  }

  async findActive(): Promise<Aroma[]> {
    return this.aromaModel.find({ active: true }).sort({ name: 1 }).exec();
  }

  async findOne(id: string): Promise<Aroma> {
    const aroma = await this.aromaModel.findById(id).exec();
    if (!aroma) {
      throw new NotFoundException(`Aroma with ID ${id} not found`);
    }
    return aroma;
  }

  async update(id: string, updateAromaDto: UpdateAromaDto): Promise<Aroma> {
    const updatedAroma = await this.aromaModel
      .findByIdAndUpdate(id, updateAromaDto, { new: true })
      .exec();
    if (!updatedAroma) {
      throw new NotFoundException(`Aroma with ID ${id} not found`);
    }
    return updatedAroma;
  }

  async remove(id: string): Promise<void> {
    const result = await this.aromaModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Aroma with ID ${id} not found`);
    }
  }
}
