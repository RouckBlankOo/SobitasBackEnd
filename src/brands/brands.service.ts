import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  async findAll(): Promise<Brand[]> {
    return this.brandModel.find().sort({ order: 1, designation_fr: 1 }).exec();
  }

  async findActive(): Promise<Brand[]> {
    return this.brandModel.find({ active: true }).sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async findBySlug(slug: string): Promise<Brand> {
    const brand = await this.brandModel.findOne({ slug }).exec();
    if (!brand) {
      throw new NotFoundException(`Brand with slug ${slug} not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, updateBrandDto, { new: true })
      .exec();
    if (!updatedBrand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return updatedBrand;
  }

  async remove(id: string): Promise<void> {
    const result = await this.brandModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }
}
