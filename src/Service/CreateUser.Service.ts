import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from "zod";
import prisma from '../Database/prismaClient';

const userSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Email inválido!" }),
    password: z.string().min(8, { message: "Senha precisa conter no mínimo 8 caracteres." }),
    card_credit: z.string().max(19),
});

class UserService {
    static async createUser(userData: any) {
        const { name, email, password, card_credit } = userSchema.parse(userData);

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error("Email de usuário já cadastrado.");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const data = {
            name,
            email,
            password: passwordHash,
            card_credit
        };

        const createdUser = await prisma.user.create({
            data: data as Prisma.UserCreateInput
        });

        return createdUser;
    }

    static async getUser() {
        const user = await prisma.user.findMany();

        return user;
    }

    static async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        return user;
    }

    static async updateUser(userId: string, updateData: any) {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        return updatedUser;
    }

    static async deleteUser(userId: string) {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        await prisma.user.delete({
            where: { id: userId }
        });

        return { message: "Usuário deletado com sucesso." };
    }
}

export default UserService;
