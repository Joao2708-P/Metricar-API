import { Request, Response } from 'express';
import prisma from '../../Database/prismaClient';
import { z } from 'zod';

const deleteSchema = z.object({
    email: z.string().email({message: 'Email Inválido.'})
});

export default async function DeleteUserController(req: Request, res: Response)
{
    try
    {
        const {email} = deleteSchema.parse(req.body);

        const existsUser = prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!existsUser)
            return res.status(404).json({erro: 'Usuário não encontrado.'});

        const deleteUser = await prisma.user.delete({
            where: {
                email: email
            }
        });

        return res.status(200).json(deleteUser);
    }
    catch(erro)
    {
        console.log(erro);
        return res.status(500).json({erro: 'Erro interno no servidor.'});
    }
}