import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: [
      process.env.ADMIN_FRONTEND_URL || 'http://localhost:3001',
      process.env.ECOMMERCE_FRONTEND_URL || 'http://localhost:3002',
      'http://localhost:3001', // Dashboard Admin (Next.js)
      'http://localhost:3002', // E-commerce frontend (Next.js sobitas_next-main)
      'https://admin.protein.tn',
      'https://protein.tn',
    ],
    credentials: true,
  },
  namespace: '/',
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');
  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    this.connectedClients.set(client.id, client);
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`Total clients: ${this.connectedClients.size}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
    this.logger.log(`Total clients: ${this.connectedClients.size}`);
  }

  // Product events
  emitProductCreated(product: any) {
    this.logger.log(`Emitting product:created for ${product._id}`);
    this.server.emit('product:created', product);
  }

  emitProductUpdated(product: any) {
    this.logger.log(`Emitting product:updated for ${product._id}`);
    this.server.emit('product:updated', {
      productId: product._id,
      slug: product.slug,
      data: product,
    });
  }

  emitProductDeleted(productId: string) {
    this.logger.log(`Emitting product:deleted for ${productId}`);
    this.server.emit('product:deleted', { productId });
  }

  emitStockUpdate(productId: string, quantity: number) {
    this.logger.log(`Emitting stock:updated for ${productId}`);
    this.server.emit('stock:updated', { productId, quantity });
  }

  // Order events
  emitOrderCreated(order: any) {
    this.logger.log(`Emitting order:created for ${order._id}`);
    this.server.emit('order:created', order);
  }

  emitOrderUpdated(orderId: string, status: string, order?: any) {
    this.logger.log(`Emitting order:updated for ${orderId}`);
    this.server.emit('order:updated', { orderId, status, data: order });
  }

  emitOrderStatusChanged(
    orderId: string,
    oldStatus: string,
    newStatus: string,
  ) {
    this.logger.log(
      `Order ${orderId} status changed: ${oldStatus} -> ${newStatus}`,
    );
    this.server.emit('order:status_changed', { orderId, oldStatus, newStatus });
  }

  // General notification event
  emitNotification(type: string, message: string, data?: any) {
    this.logger.log(`Emitting notification: ${type}`);
    this.server.emit('notification', {
      type,
      message,
      data,
      timestamp: new Date(),
    });
  }

  // Subscriber management
  @SubscribeMessage('subscribe:products')
  handleSubscribeProducts(@ConnectedSocket() client: Socket) {
    void client.join('products');
    this.logger.log(`Client ${client.id} subscribed to products`);
    return { event: 'subscribed', channel: 'products' };
  }

  @SubscribeMessage('subscribe:orders')
  handleSubscribeOrders(@ConnectedSocket() client: Socket) {
    void client.join('orders');
    this.logger.log(`Client ${client.id} subscribed to orders`);
    return { event: 'subscribed', channel: 'orders' };
  }

  @SubscribeMessage('unsubscribe:products')
  handleUnsubscribeProducts(@ConnectedSocket() client: Socket) {
    void client.leave('products');
    this.logger.log(`Client ${client.id} unsubscribed from products`);
    return { event: 'unsubscribed', channel: 'products' };
  }

  @SubscribeMessage('unsubscribe:orders')
  handleUnsubscribeOrders(@ConnectedSocket() client: Socket) {
    void client.leave('orders');
    this.logger.log(`Client ${client.id} unsubscribed from orders`);
    return { event: 'unsubscribed', channel: 'orders' };
  }

  // Emit to specific rooms
  emitToRoom(room: string, event: string, data: any) {
    this.server.to(room).emit(event, data);
  }

  // Get connection stats
  getConnectionStats() {
    return {
      totalConnections: this.connectedClients.size,
      clients: Array.from(this.connectedClients.keys()),
    };
  }
}
