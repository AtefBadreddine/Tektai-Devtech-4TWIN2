import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorMiddleware } from './error.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Specify the allowed origin
    methods: ['GET', 'POST','DELETE','PUT'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Specify if credentials (e.g., cookies) should be allowed to be sent
  });
  app.useGlobalFilters(new ErrorMiddleware());
  await app.listen(3000);
}
bootstrap();
