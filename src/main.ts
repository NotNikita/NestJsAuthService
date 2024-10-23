import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Prisma GraphQL API')
    .setDescription(
      'This is a simple API built with NestJS, Prisma, and GraphQL',
    );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
