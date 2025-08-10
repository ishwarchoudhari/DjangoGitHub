import { PrismaService } from '../prisma/prisma.service';
export declare class ServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listServices(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        artistId: string;
        description: string | null;
        priceInINR: number;
        durationMin: number;
        active: boolean;
    }[]>;
    createService(input: {
        artistId: string;
        name: string;
        description?: string;
        priceInINR: number;
        durationMin: number;
    }): import("@prisma/client").Prisma.Prisma__ServiceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        artistId: string;
        description: string | null;
        priceInINR: number;
        durationMin: number;
        active: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
