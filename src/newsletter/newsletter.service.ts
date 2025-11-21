import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Newsletter, NewsletterDocument } from './schemas/newsletter.schema';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(Newsletter.name)
    private newsletterModel: Model<NewsletterDocument>,
  ) {}

  async create(createNewsletterDto: CreateNewsletterDto): Promise<Newsletter> {
    const existing = await this.newsletterModel
      .findOne({ email: createNewsletterDto.email })
      .exec();
    if (existing) {
      // Update existing subscription
      existing.subscribed = true;
      return existing.save();
    }
    const createdNewsletter = new this.newsletterModel(createNewsletterDto);
    return createdNewsletter.save();
  }

  async findAll(): Promise<Newsletter[]> {
    return this.newsletterModel.find().sort({ createdAt: -1 }).exec();
  }

  async findSubscribed(): Promise<Newsletter[]> {
    return this.newsletterModel
      .find({ subscribed: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Newsletter> {
    const newsletter = await this.newsletterModel.findById(id).exec();
    if (!newsletter) {
      throw new NotFoundException(
        `Newsletter subscriber with ID ${id} not found`,
      );
    }
    return newsletter;
  }

  async update(
    id: string,
    updateNewsletterDto: UpdateNewsletterDto,
  ): Promise<Newsletter> {
    const updated = await this.newsletterModel
      .findByIdAndUpdate(id, updateNewsletterDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(
        `Newsletter subscriber with ID ${id} not found`,
      );
    }
    return updated;
  }

  async unsubscribe(id: string): Promise<Newsletter> {
    return this.update(id, { subscribed: false });
  }

  async remove(id: string): Promise<void> {
    const result = await this.newsletterModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Newsletter subscriber with ID ${id} not found`,
      );
    }
  }
}
