import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    list(): import("@prisma/client").Prisma.PrismaPromise<{
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
    create(body: {
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
