import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategory, SubcategoryDocument } from './schemas/subcategory.schema';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategory.name) private subcategoryModel: Model<SubcategoryDocument>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const createdSubcategory = new this.subcategoryModel(createSubcategoryDto);
    return createdSubcategory.save();
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryModel.find().populate('categoryId').sort({ order: 1 }).exec();
  }

  async findByCategory(categoryId: string): Promise<Subcategory[]> {
    return this.subcategoryModel.find({ categoryId, active: true }).sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryModel.findById(id).populate('categoryId').exec();
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    return subcategory;
  }

  async findBySlug(slug: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryModel.findOne({ slug }).populate('categoryId').exec();
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with slug ${slug} not found`);
    }
    return subcategory;
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    const updatedSubcategory = await this.subcategoryModel
      .findByIdAndUpdate(id, updateSubcategoryDto, { new: true })
      .populate('categoryId')
      .exec();
    if (!updatedSubcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    return updatedSubcategory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.subcategoryModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
  }
}

