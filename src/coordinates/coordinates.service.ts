import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coordinates, CoordinatesDocument } from './schemas/coordinates.schema';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';
import { UpdateCoordinatesDto } from './dto/update-coordinates.dto';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectModel(Coordinates.name)
    private coordinatesModel: Model<CoordinatesDocument>,
  ) {}

  async create(
    createCoordinatesDto: CreateCoordinatesDto,
  ): Promise<Coordinates> {
    const createdCoordinates = new this.coordinatesModel(createCoordinatesDto);
    return createdCoordinates.save();
  }

  async findAll(): Promise<Coordinates[]> {
    return this.coordinatesModel.find().exec();
  }

  async findOne(id: string): Promise<Coordinates> {
    const coordinates = await this.coordinatesModel.findById(id).exec();
    if (!coordinates) {
      throw new NotFoundException(`Coordinates with ID ${id} not found`);
    }
    return coordinates;
  }

  async update(
    id: string,
    updateCoordinatesDto: UpdateCoordinatesDto,
  ): Promise<Coordinates> {
    const updatedCoordinates = await this.coordinatesModel
      .findByIdAndUpdate(id, updateCoordinatesDto, { new: true })
      .exec();
    if (!updatedCoordinates) {
      throw new NotFoundException(`Coordinates with ID ${id} not found`);
    }
    return updatedCoordinates;
  }

  async remove(id: string): Promise<void> {
    const result = await this.coordinatesModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Coordinates with ID ${id} not found`);
    }
  }
}
