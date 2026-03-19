import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
import { Slide, SlideDocument } from './schemas/slide.schema';

@Injectable()
export class SlidesService {
    constructor(@InjectModel(Slide.name) private slideModel: Model<SlideDocument>) { }

    async create(createSlideDto: CreateSlideDto): Promise<Slide> {
        const createdSlide = new this.slideModel(createSlideDto);
        return createdSlide.save();
    }

    async findAll(): Promise<Slide[]> {
        return this.slideModel.find().sort({ order: 1 }).exec();
    }

    async findOne(id: string): Promise<Slide> {
        const slide = await this.slideModel.findById(id).exec();
        if (!slide) {
            throw new NotFoundException(`Slide with ID ${id} not found`);
        }
        return slide;
    }

    async update(id: string, updateSlideDto: UpdateSlideDto): Promise<Slide> {
        const updatedSlide = await this.slideModel.findByIdAndUpdate(id, updateSlideDto, { new: true }).exec();
        if (!updatedSlide) {
            throw new NotFoundException(`Slide with ID ${id} not found`);
        }
        return updatedSlide;
    }

    async remove(id: string): Promise<Slide> {
        const deletedSlide = await this.slideModel.findByIdAndDelete(id).exec();
        if (!deletedSlide) {
            throw new NotFoundException(`Slide with ID ${id} not found`);
        }
        return deletedSlide;
    }
}
