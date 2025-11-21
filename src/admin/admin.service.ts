import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  async getStats() {
    return {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      revenue: 0,
    };
  }
}
