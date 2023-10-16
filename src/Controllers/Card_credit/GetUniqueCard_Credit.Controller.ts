import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";

export default async function GetUniqueCard_CreditController(req: Request, res: Response)
{
    try
    {
        const {id} = req.params;

        const getUniqueCard_credit = await prisma.creditCard.findUnique({
            where: {
                id: String(id)
            }
        });

        return res.status(200).json(getUniqueCard_credit);
    }
    catch(erro)
    {
        console.log(erro);
        return res.status(500).json({erro: "Erro interno do servidor."});
    }
}