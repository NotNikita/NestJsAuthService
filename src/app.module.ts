import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    // GraphQL module setup with automatic schema generation
    GraphQLModule.forRoot({
      driver: ApolloDriver, // Required param for GraphQLModule
      autoSchemaFile: 'schema.gql', // Automatically generate a schema.gql file based on resolvers
      context: ({ req }) => ({ req }), // Pass the request to the context to access headers for authentication
      introspection: true, // Enable introspection for Apollo Explorer
      playground: true, // Disable GraphQL Playground if only using Apollo Explorer
    }),
    PrismaModule, // Prisma integration for database access
    AuthModule, // Import AuthModule to manage authentication
    UsersModule, // Import UsersModule for user management
  ],
  controllers: [AppController], // Optional AppController, for additional REST endpoints if needed
  providers: [AppService], // Optional AppService, for any additional services
})
export class AppModule {}
