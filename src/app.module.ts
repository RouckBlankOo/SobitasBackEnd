import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Core Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { StatisticsModule } from './statistics/statistics.module';
import { CommunicationModule } from './communication/communication.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    
    // Database
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/sobitas-db'),
    
    // Rate limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        }
      ]
    }),
    
    // JWT Global config
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'sobitas-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    
    // Static file serving
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    
    // Core modules
    AuthModule,
    UsersModule,
    ProductsModule,
    AdminModule,
    StatisticsModule,
    CommunicationModule,
    ServicesModule,
    OrdersModule,
  ],
})
export class AppModule {}