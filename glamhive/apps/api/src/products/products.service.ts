import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  listProducts() {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  createProduct(input: {
    artistId?: string;
    title: string;
    description?: string;
    priceInINR: number;
    stockQty?: number;
    imageUrl?: string;
  }) {
    return this.prisma.product.create({
      data: {
        artistId: input.artistId,
        title: input.title,
        description: input.description,
        priceInINR: input.priceInINR,
        stockQty: input.stockQty ?? 0,
        imageUrl: input.imageUrl,
      },
    });
  }
}