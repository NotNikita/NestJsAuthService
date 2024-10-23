import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      authSchemaFile: 'schema.gql',
    }),
    PrismaModule,
    // AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
