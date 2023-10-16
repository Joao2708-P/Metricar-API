import prisma from "../../Database/prismaClient";
import { Request, Response } from 'express';

export default async function GetUniqueCarController(req: Request, res: Response)
{
    try 
    {
        const { id } = req.params;

        const getUnique = await prisma.car.findUnique({
            where: {    
                id: String(id)
            }
        });

        if (!getUnique) 
        {
            return res.status(404).json({ error: "Carro não encontrado." });
        }

        return res.status(200).json(getUnique);
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}
