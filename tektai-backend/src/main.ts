import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );
  app.enableCors({
    origin: '*', // Specify the allowed origin
    methods: ['GET', 'POST','DELETE','PUT'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Specify if credentials (e.g., cookies) should be allowed to be sent
  });


  const config = new DocumentBuilder()
      .setTitle('Tektai API')
      .setVersion('1.0')
      .addServer('http://localhost:3000')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  app.setGlobalPrefix(await app.getUrl());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

}
bootstrap();