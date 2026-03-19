import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CoachesService } from '../coaches/coaches.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly coachesService: CoachesService,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderData: any = { ...createOrderDto };

    // Generate a unique tracking number
    const trackingNumber = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    orderData.trackingNumber = trackingNumber;

    if (createOrderDto.appliedPromoCode) {
      try {
        const coach = await this.coachesService.findByPromoCode(createOrderDto.appliedPromoCode);

        // Calculate subtotal from items before discount
        const subtotal = createOrderDto.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // 10% discount for customer (standard Gymshark/Sobitas structure)
        const discountAmount = subtotal * 0.1;
        orderData.discountAmount = discountAmount;
        orderData.totalAmount = (subtotal - discountAmount) + (createOrderDto.shippingCost || 0);

        // Commission based on coach tier (Standard: 10%, Athlete: 15%, Pro: 20%)
        const rate = this.coachesService.getCommissionRate((coach as any).coachTier);
        const commissionAmount = subtotal * rate;

        orderData.coachId = (coach as any)._id.toString();
        orderData.coachCommissionAmount = commissionAmount;
        orderData.referralSource = createOrderDto.referralSource || 'code';

      } catch (error) {
        // If promo code is invalid, continue without discount
        console.error('Invalid promo code provided:', createOrderDto.appliedPromoCode);
      }
    }

    // Handle link-based referral (no promo code) if not already handled by code
    if (!orderData.coachId && createOrderDto.coachId) {
      try {
        const coach = await this.coachesService.getAllCoaches().then(coaches =>
          coaches.find(c => (c as any)._id.toString() === createOrderDto.coachId)
        );

        if (coach) {
          const subtotal = createOrderDto.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const rate = this.coachesService.getCommissionRate((coach as any).coachTier);

          orderData.coachId = createOrderDto.coachId;
          orderData.coachCommissionAmount = subtotal * rate;
          orderData.referralSource = 'link';
        }
      } catch (error) {
        console.error('Failed to process link-based referral:', error);
      }
    }

    const createdOrder = new this.orderModel(orderData);
    return await createdOrder.save();
  }

  async findAll(filters: any = {}): Promise<{
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
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
          pending: {
            $sum: { $cond: [{ $eq: ['$status', OrderStatus.PENDING] }, 1, 0] },
          },
          confirmed: {
            $sum: {
              $cond: [{ $eq: ['$status', OrderStatus.CONFIRMED] }, 1, 0],
            },
          },
          shipped: {
            $sum: { $cond: [{ $eq: ['$status', OrderStatus.SHIPPED] }, 1, 0] },
          },
          delivered: {
            $sum: {
              $cond: [{ $eq: ['$status', OrderStatus.DELIVERED] }, 1, 0],
            },
          },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ['$status', OrderStatus.CANCELLED] }, 1, 0],
            },
          },
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
    ]);

    return (
      stats || {
        total: 0,
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        totalRevenue: 0,
      }
    );
  }

  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }

  async trackOrder(id: string, email: string): Promise<Order> {
    // Try to find by _id first, then by trackingNumber if id doesn't look like an ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    const query: any = { customerEmail: email };
    if (isObjectId) {
      query.$or = [{ _id: id }, { trackingNumber: id }];
    } else {
      query.trackingNumber = id;
    }

    const order = await this.orderModel.findOne(query).exec();

    if (!order) {
      throw new NotFoundException(`Commande introuvable avec l'ID/Suivi "${id}" et l'email "${email}"`);
    }

    return order;
  }
}
