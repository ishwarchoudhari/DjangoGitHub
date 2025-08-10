import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listProducts(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        artistId: string | null;
        description: string | null;
        priceInINR: number;
        active: boolean;
        title: string;
        stockQty: number;
        imageUrl: string | null;
    }[]>;
    createProduct(input: {
        artistId?: string;
        title: string;
        description?: string;
        priceInINR: number;
        stockQty?: number;
        imageUrl?: string;
    }): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        artistId: string | null;
        description: string | null;
        priceInINR: number;
        active: boolean;
        title: string;
        stockQty: number;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
