import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from "zod";
import prisma from '../../Database/prismaClient';

const userSchema = z.object({
    name: z.string(),
    email: z.string().email({message: "Email inválido!"}),
    password: z.string().min(8, {message: "Senha precisa conter no mínimo 8 caracteres."}),
    card_credit: z.string().max(19),
});


export default async function CreateUserController(req: Request, res: Response) {
    try {
        const { name, email, password, card_credit } = userSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(409).json({ error: "Email de usuário já cadastrado." });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const data = {
            name: name,
            email: email,
            password: passwordHash,
            card_credit: card_credit,
        };

        const createdUser = await prisma.user.create({
            data: data as Prisma.UserCreateInput
        });

        return res.status(201).json(createdUser);
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Erro ao cadastrar o usuário" });
    }
}