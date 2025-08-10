import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(): import("@prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    create(body: {
        fullName: string;
        email?: string;
        phone?: string;
    }): import("@prisma/client").Prisma.Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
