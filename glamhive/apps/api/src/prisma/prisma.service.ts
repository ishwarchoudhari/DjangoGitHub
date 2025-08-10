import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Optional shutdown hook can be reintroduced if needed
  async enableShutdownHooks(_app: INestApplication) {
    // No-op for now
  }
}