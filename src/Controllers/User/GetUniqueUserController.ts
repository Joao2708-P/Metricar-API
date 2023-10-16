import prisma from "../../Database/prismaClient";
import { z } from "zod";
import { Request, Response } from 'express';

const findUniqueSchema = z.object({
    email: z.string().email({message: "Email inválido"})
});

export default async function getUniqueUserController(req: Request, res: Response)
{
    try 
    {
        const { email } = findUniqueSchema.parse(req.body);

        const getUnique = await prisma.user.findUnique({
            where: {    
                email: String(email)
            }
        });

        if (!getUnique) 
        {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.status(200).json(getUnique);
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}
