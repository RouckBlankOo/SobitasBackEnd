import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().sort({ createdAt: -1 }).exec();
  }

  async findPublished(): Promise<Blog[]> {
    return this.blogModel
      .find({ published: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogModel.findOne({ slug }).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with slug ${slug} not found`);
    }
    // Increment views
    await this.blogModel.updateOne({ _id: blog._id }, { $inc: { views: 1 } });
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }
}
