import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(userId, { lastLoginAt: new Date() })
      .exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  // Wishlist methods
  async getWishlist(userId: string): Promise<any> {
    const user = await this.userModel
      .findById(userId)
      .populate('wishlist')
      .exec();
    
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    
    return user.wishlist || [];
  }

  async addToWishlist(userId: string, productId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Check if product already in wishlist
    if (user.wishlist && user.wishlist.some(id => id.toString() === productId)) {
      return { message: 'Product already in wishlist', wishlist: user.wishlist };
    }

    // Add product to wishlist
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { wishlist: productId } },
        { new: true }
      )
      .populate('wishlist')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    return { 
      message: 'Product added to wishlist', 
      wishlist: updatedUser.wishlist 
    };
  }

  async removeFromWishlist(userId: string, productId: string): Promise<any> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { wishlist: productId } },
        { new: true }
      )
      .populate('wishlist')
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    return { 
      message: 'Product removed from wishlist', 
      wishlist: updatedUser.wishlist || [] 
    };
  }

  async clearWishlist(userId: string): Promise<any> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: { wishlist: [] } },
        { new: true }
      )
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    return { message: 'Wishlist cleared', wishlist: [] };
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    
    if (!user || !user.wishlist) {
      return false;
    }

    return user.wishlist.some(id => id.toString() === productId);
  }
}

