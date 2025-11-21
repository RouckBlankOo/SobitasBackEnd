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
import { EventsModule } from './events/events.module';

// Content Modules
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { AromasModule } from './aromas/aromas.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BlogsModule } from './blogs/blogs.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { PagesModule } from './pages/pages.module';
import { ContactsModule } from './contacts/contacts.module';
import { SeedModule } from './database/seeds/seed.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),

    // Database with connection logging
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri =
          process.env.MONGODB_URI || 'mongodb://localhost:27017/sobitas-db';
        console.log(
          '🔌 Connecting to MongoDB:',
          uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'),
        ); // Hide password in logs
        return {
          uri,
          retryAttempts: 3,
          retryDelay: 1000,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('✅ MongoDB connected successfully');
            });
            connection.on('error', (error) => {
              console.error('❌ MongoDB connection error:', error.message);
            });
            connection.on('disconnected', () => {
              console.log('⚠️  MongoDB disconnected');
            });
            return connection;
          },
        };
      },
    }),

    // Rate limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
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
    EventsModule,

    // Content modules
    CategoriesModule,
    BrandsModule,
    SubcategoriesModule,
    AromasModule,
    ReviewsModule,
    BlogsModule,
    NewsletterModule,
    PagesModule,
    ContactsModule,

    // Database seeding
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
