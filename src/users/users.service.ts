import { Injectable } from '@nestjs/common';
import { TestRole, TestUser } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    email: string,
    password: string,
    role: TestRole,
  ): Promise<TestUser> {
    return this.prisma.testUser.create({
      data: {
        email,
        password,
        role,
      },
    });
  }

  async findOneByEmail(email: string): Promise<TestUser | null> {
    return this.prisma.testUser.findUnique({
      where: { email },
    });
  }

  async findUsersByRole(role: TestRole): Promise<TestUser[]> {
    return this.prisma.testUser.findMany({
      where: { role },
    });
  }
}
