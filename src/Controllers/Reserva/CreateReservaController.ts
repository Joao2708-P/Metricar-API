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

export default async function CreateReservaController(req: Request, res: Response)
{
    try
    { 
        const {data_da_reserva, data_da_devolucao, 
              id_user, id_car, preco_total, id_credit_card} = reserveSchema.parse(req.body); 

        const existingReservas = await prisma.reserva.findMany({
            where: {
                data_da_reserva: data_da_reserva
            }
        });

        if (existingReservas &&  existingReservas.length > 0) {
            // Já existe uma ou mais reservas para a mesma data de reserva
            return res.status(400).json({ erro: "Já existe uma reserva para esta data de reserva." });
        }

        const data = {
            data_da_reserva: data_da_reserva,
            data_da_devolucao: data_da_devolucao,
            id_user: id_user,
            id_car: id_car,
            preco_total: preco_total,
            id_credit_card: id_credit_card
        }

        const createReserva = await prisma.reserva.create({
            data: data as unknown as Prisma.ReservaCreateInput
        });

        return res.status(200).json(createReserva);
        
    }
    catch(erro)
    {
        console.log(erro);
        return res.status(500).json({erro: "Erro interno no servidor."});
    }
}