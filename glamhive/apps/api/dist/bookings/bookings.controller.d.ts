import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    list(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            googleId: string | null;
            passwordHash: string | null;
            fullName: string;
            dateOfBirth: Date | null;
            location: string | null;
            instagramLink: string | null;
            avatarUrl: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            isVerified: boolean;
        };
        service: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            artistId: string;
            description: string | null;
            priceInINR: number;
            durationMin: number;
            active: boolean;
        };
        artist: {
            id: string;
            userId: string;
            displayName: string;
            bio: string | null;
            verificationTick: boolean;
            status: import("@prisma/client").$Enums.ArtistStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        artistId: string;
        serviceId: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    })[]>;
    create(body: {
        userId: string;
        artistId: string;
        serviceId: string;
        startTime: string;
        endTime: string;
        notes?: string;
    }): import("@prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        artistId: string;
        serviceId: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
