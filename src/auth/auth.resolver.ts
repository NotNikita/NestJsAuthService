import { Args, Mutation, registerEnumType, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TestRole } from '@prisma/client';
import { AccessToken } from './models/token.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Mutation(() => String)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role', { type: () => TestRole, defaultValue: TestRole.USER })
    role: TestRole,
  ) {
    const newUser = await this.authService.register(email, password, role);
    return `${role} with email ${newUser.email} has been created`;
  }
}
