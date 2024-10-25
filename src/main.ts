import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('NestJS Prisma GraphQL API')
    .setDescription(
      'This is a simple API built with NestJS, Prisma, and GraphQL',
    )
    .setVersion('1.0')
    .addBearerAuth() // Enable Bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Serve the Swagger UI at /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
