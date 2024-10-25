import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { TestRole } from '@prisma/client';

// Register the TestRole enum with the GraphQL schema
registerEnumType(TestRole, {
  name: 'Role', // This name will be used in the GraphQL schema
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field(() => String)
  role: TestRole;
}
