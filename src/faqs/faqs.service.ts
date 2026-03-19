import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQ } from './schemas/faq.schema';
import { CreateFaqDto, UpdateFaqDto } from './dto/faqs.dto';

@Injectable()
export class FaqsService {
    constructor(@InjectModel(FAQ.name) private faqModel: Model<FAQ>) { }

    async findAll(): Promise<FAQ[]> {
        return this.faqModel.find().exec();
    }

    async findOne(id: string): Promise<FAQ> {
        const faq = await this.faqModel.findById(id).exec();
        if (!faq) {
            throw new NotFoundException(`FAQ with ID ${id} not found`);
        }
        return faq;
    }

    async create(createFaqDto: CreateFaqDto): Promise<FAQ> {
        const newFaq = new this.faqModel(createFaqDto);
        return newFaq.save();
    }

    async update(id: string, updateFaqDto: UpdateFaqDto): Promise<FAQ> {
        const updatedFaq = await this.faqModel
            .findByIdAndUpdate(id, updateFaqDto, { new: true })
            .exec();
        if (!updatedFaq) {
            throw new NotFoundException(`FAQ with ID ${id} not found`);
        }
        return updatedFaq;
    }

    async remove(id: string): Promise<void> {
        const result = await this.faqModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`FAQ with ID ${id} not found`);
        }
    }
}
