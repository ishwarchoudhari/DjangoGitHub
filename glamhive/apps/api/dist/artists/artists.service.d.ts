import { PrismaService } from '../prisma/prisma.service';
export declare class ArtistsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listArtists(): import("@prisma/client").Prisma.PrismaPromise<({
        media: {
            id: string;
            createdAt: Date;
            artistId: string;
            url: string;
            type: import("@prisma/client").$Enums.MediaType;
            caption: string | null;
        }[];
        reviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            artistId: string;
            rating: number;
            comment: string | null;
        }[];
        services: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            artistId: string;
            description: string | null;
            priceInINR: number;
            durationMin: number;
            active: boolean;
        }[];
        products: {
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
        }[];
    } & {
        id: string;
        userId: string;
        displayName: string;
        bio: string | null;
        verificationTick: boolean;
        status: import("@prisma/client").$Enums.ArtistStatus;
    })[]>;
    createArtist(input: {
        userId: string;
        displayName: string;
        bio?: string;
    }): import("@prisma/client").Prisma.Prisma__ArtistProfileClient<{
        id: string;
        userId: string;
        displayName: string;
        bio: string | null;
        verificationTick: boolean;
        status: import("@prisma/client").$Enums.ArtistStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
