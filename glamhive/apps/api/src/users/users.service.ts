import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  listUsers() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createUser(input: { fullName: string; email?: string; phone?: string }) {
    return this.prisma.user.create({ data: { fullName: input.fullName, email: input.email, phone: input.phone } });
  }
}