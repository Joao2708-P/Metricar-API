import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";
import { z } from "zod";

const deleteSchema = z.object({
    id: z.string()
});

export default async function DeleteReservaController(req: Request, res: Response)
{
    try 
    {
        const {id} = deleteSchema.parse(req.body);

        const existingReservas = await prisma.reserva.findUnique({
            where: {
                id: id
            }
        });

        if(!existingReservas)
            return res.status(404).json({erro: "Reserva não existente"});
        
        const deleteReserva = await prisma.reserva.delete({
            where: {
                id: id
            }
        });
        
        return res.status(200).json(deleteReserva);
    }
    catch(erro)
    {
        console.log(erro);
        return res.status(500).json({erro: "Erro interno no servidor"});
    }
}