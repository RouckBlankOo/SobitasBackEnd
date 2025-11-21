import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  async getOverview() {
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      averageOrderValue: 0,
    };
  }

  async getSalesData(startDate: Date, endDate: Date) {
    return {
      sales: [],
      revenue: 0,
    };
  }
}
