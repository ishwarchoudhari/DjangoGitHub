import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  listArtists() {
    return this.prisma.artistProfile.findMany({
      include: {
        services: true,
        products: true,
        reviews: true,
        media: true,
      },
      orderBy: { displayName: 'asc' },
    });
  }

  createArtist(input: { userId: string; displayName: string; bio?: string }) {
    return this.prisma.artistProfile.create({ data: { userId: input.userId, displayName: input.displayName, bio: input.bio } });
  }
}