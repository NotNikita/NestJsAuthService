import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TestRole, TestUser } from '@prisma/client';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PASSWORD_HASH_LENGTH } from 'src/constants';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  // only current user admin should be able to create a new user
  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createUser(@Args('email') email: string) {
    const password = randomBytes(15).toString('hex');
    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_LENGTH);
    const newUser = await this.usersService.createUser(
      email,
      hashedPassword,
      TestRole.USER,
    );
    // todo send email with password, instead of string return
    return `User with email ${newUser.email} has been created. His temp password is ${password}`;
  }

  @Query(() => [User])
  async findUsersByRole(
    @Args('role', { type: () => TestRole }) role: TestRole,
  ): Promise<TestUser[]> {
    return await this.usersService.findUsersByRole(role);
  }

  @Query(() => User, { nullable: true })
  async findOneByEmail(@Args('email') email: string): Promise<TestUser | null> {
    return await this.usersService.findOneByEmail(email);
  }
}
