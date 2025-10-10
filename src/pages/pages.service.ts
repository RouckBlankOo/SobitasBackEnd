import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<PageDocument>,
  ) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const createdPage = new this.pageModel(createPageDto);
    return createdPage.save();
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find().sort({ title: 1 }).exec();
  }

  async findPublished(): Promise<Page[]> {
    return this.pageModel.find({ published: true }).exec();
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.pageModel.findById(id).exec();
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageModel.findOne({ slug }).exec();
    if (!page) {
      throw new NotFoundException(`Page with slug ${slug} not found`);
    }
    return page;
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const updated = await this.pageModel
      .findByIdAndUpdate(id, updatePageDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.pageModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
  }
}

