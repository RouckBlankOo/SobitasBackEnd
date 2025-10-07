import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  const logger = new Logger('Bootstrap');
  
  // CORS configuration for multiple frontends
  app.enableCors({
    origin: [
      process.env.ADMIN_FRONTEND_URL || 'http://localhost:3000',
      process.env.ECOMMERCE_FRONTEND_URL || 'http://localhost:3001',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // API prefix
  app.setGlobalPrefix('api', {
    exclude: ['/health', '/metrics'],
  });
  
  // Graceful shutdown
  process.on('SIGTERM', () => {
    logger.log('SIGTERM received, shutting down gracefully');
    app.close();
  });
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 API endpoints: http://localhost:${port}/api`);
  logger.log(`🏥 Health check: http://localhost:${port}/health`);
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1);
});