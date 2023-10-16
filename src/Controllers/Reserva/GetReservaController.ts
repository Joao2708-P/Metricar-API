import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";

export default async function GetReservaController(req: Request, res: Response)
{
    try 
    {
        const getReserva = await prisma.reserva.findMany();
        return res.status(200).json(getReserva);
    }
    catch(erro)
    {
        console.log(erro);
        return res.status(500).json({erro: "Erro interno no servidor"});
    }
}