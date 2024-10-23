import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { TestRole, TestUser } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Check if the user exists and if the password matches.
   * @param email
   * @param password
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isUserConfirmed = await bcrypt.compare(password, user.password);

    if (user && isUserConfirmed) {
      // excluding passowrd from the user object
      const { password, ...result } = user;
      return result;
    }
    // invalid creds
    return null;
  }

  /**
   * Generate and return a JWT for authenticated users.
   * @param user: TestUser
   */
  async login(user: TestUser) {
    // create JWT
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Create a new user with a hashed password.
   */
  async register(email: string, password: string, role: TestRole) {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser(email, hashedPassword, role);
  }
}
