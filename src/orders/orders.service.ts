import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return await createdOrder.save();
  }

  async findAll(filters: any = {}): Promise<{
    orders: Order[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const { page = 1, limit = 10, status, customerEmail } = filters;
    
    const query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    if (customerEmail) {
      query.customerEmail = { $regex: customerEmail, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const total = await this.orderModel.countDocuments(query);
    const orders = await this.orderModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
    
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    
    return updatedOrder;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return this.update(id, { status });
  }

  async getOrderStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    const [stats] = await this.orderModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', OrderStatus.PENDING] }, 1, 0] } },
          confirmed: { $sum: { $cond: [{ $eq: ['$status', OrderStatus.CONFIRMED] }, 1, 0] } },
          shipped: { $sum: { $cond: [{ $eq: ['$status', OrderStatus.SHIPPED] }, 1, 0] } },
          delivered: { $sum: { $cond: [{ $eq: ['$status', OrderStatus.DELIVERED] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ['$status', OrderStatus.CANCELLED] }, 1, 0] } },
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
    ]);

    return stats || {
      total: 0,
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      totalRevenue: 0,
    };
  }

  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    return this.orderModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}