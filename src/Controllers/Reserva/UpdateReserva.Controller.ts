import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const reserveSchema = z.object({
    data_da_reserva: z.date(),
    data_da_devolucao: z.date(),
    id_user: z.string(),
    id_car: z.string(),
    preco_total: z.number().min(0),
    id_credit_card: z.string()
});


export default async function UpdateReservaController(req: Request, res: Response) 
{
    try 
    {
        const {data_da_reserva, data_da_devolucao, 
            id_user, id_car, preco_total, id_credit_card} = reserveSchema.parse(req.body);
        const { id } = req.params

        const existingReserva = prisma.reserva.findUnique({
            where: {
                id: id
            }
        });

        if(!existingReserva)
            return res.status(404).json({erro: "Reserva não encontrada"});

        const data = {
            data_da_reserva: data_da_reserva,
            data_da_devolucao: data_da_devolucao,
            id_user: id_user,
            id_car: id_car,
            preco_total: preco_total,
            id_credit_card: id_credit_card
        }

        const updateUser = await prisma.reserva.update({
            where: {
                id: id
            },
            data: data as Prisma.ReservaUpdateInput
        });

        return res.status(200).json(updateUser);
    }
    catch(erro) 
    {
        console.log(erro);
        return res.status(500).json({erro: "Erro interno do servidor"});
    }   
}