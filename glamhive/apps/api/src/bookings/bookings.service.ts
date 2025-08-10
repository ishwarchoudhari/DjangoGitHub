import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  listBookings() {
    return this.prisma.booking.findMany({
      include: { user: true, artist: true, service: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  createBooking(input: {
    userId: string;
    artistId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) {
    return this.prisma.booking.create({
      data: {
        userId: input.userId,
        artistId: input.artistId,
        serviceId: input.serviceId,
        startTime: new Date(input.startTime),
        endTime: new Date(input.endTime),
        notes: input.notes,
      },
    });
  }
}