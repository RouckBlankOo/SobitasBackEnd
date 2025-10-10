import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().sort({ createdAt: -1 }).exec();
  }

  async findApproved(): Promise<Review[]> {
    return this.reviewModel.find({ approved: true }).sort({ createdAt: -1 }).exec();
  }

  async findTestimonials(): Promise<Review[]> {
    return this.reviewModel.find({ approved: true, isTestimonial: true }).sort({ createdAt: -1 }).exec();
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId, approved: true }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!updatedReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return updatedReview;
  }

  async approve(id: string): Promise<Review> {
    return this.update(id, { approved: true });
  }

  async remove(id: string): Promise<void> {
    const result = await this.reviewModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }
}

