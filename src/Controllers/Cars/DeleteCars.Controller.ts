import prisma from "../../Database/prismaClient";
import { Request, Response } from 'express';

export default async function DeleteCarController(req: Request, res: Response)
{
    try 
    {
        const { id } = req.params;

        const deleteCar = await prisma.car.delete({
            where: {    
                id: String(id)
            }
        });

        if (!deleteCar) 
        {
            return res.status(404).json({ error: "Carro não encontrado." });
        }

        return res.status(200).json(deleteCar);
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}
