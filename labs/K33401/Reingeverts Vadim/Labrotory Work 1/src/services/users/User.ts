import { PrismaClient, User, Prisma } from "@prisma/client";

class UserService {
    private db = new PrismaClient();

    exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
        const omitedUser = { ...user };
        for (let key of keys) {
            delete omitedUser[key];
        }
        return omitedUser;
    }

    excludeMany<User, Key extends keyof User>(users: User[], keys: Key[]): Omit<User, Key>[] {
        const omitedUsers = users.map((user) => this.exclude(user, keys));
        return omitedUsers;
    }

    async getAll(): Promise<User[]> {
        return this.db.user.findMany();
    }

    async getById(id: number): Promise<User | null> {
        return this.db.user.findUnique({
            where: {
                id,
            },
        });
    }

    async create(userData: Prisma.UserUncheckedCreateInput): Promise<User> {
        return this.db.user.create({
            data: userData,
        });
    }

    async update(id: number, userData: Prisma.UserUncheckedUpdateInput): Promise<User> {
        return this.db.user.update({
            where: {
                id,
            },
            data: userData,
        });
    }

    async delete(id: number): Promise<User> {
        return this.db.user.delete({
            where: {
                id,
            },
        });
    }

    // async checkPassword(email: string, password: string): Promise<any> {}
}

export default UserService;
