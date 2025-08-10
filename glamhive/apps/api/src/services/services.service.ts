import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  listServices() {
    return this.prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createService(input: {
    artistId: string;
    name: string;
    description?: string;
    priceInINR: number;
    durationMin: number;
  }) {
    return this.prisma.service.create({
      data: {
        artistId: input.artistId,
        name: input.name,
        description: input.description,
        priceInINR: input.priceInINR,
        durationMin: input.durationMin,
      },
    });
  }
}