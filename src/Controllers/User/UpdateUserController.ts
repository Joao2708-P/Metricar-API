import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { Prisma } from "@prisma/client";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email({message: "Email inválido!"}),
    password: z.string().min(8, {message: "Senha precisa conter no mínimo 8 caracteres."}),
    card_credit: z.string().max(19),
});

export default async function UpdateUserController(req: Request, res: Response)
{
    try 
    {
        const {name, email, password, card_credit} = userSchema.parse(req.body);
        const { id } = req.params

        const existingUser = prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!existingUser)
            return res.status(404).json({erro: "Usuário não encontrado"});

        const passwordHash = bcrypt.hash(password, 10);

        const data = {
            name: name,
            email: email,
            password: passwordHash,
            card_credit: card_credit
        }

        const updateUser = await prisma.user.update({
            where: {
                id: id
            },
            data: data as Prisma.UserUpdateInput
        });

        return res.status(200).json(updateUser);
    }
    catch(erro) 
    {
        console.log(erro);
        return res.status(500).json({erro: "Erro interno do servidor"});
    }
}