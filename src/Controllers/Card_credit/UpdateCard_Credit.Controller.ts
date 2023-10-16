import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const card_creditSchema = z.object({
    cadNumber: z.string({}).max(19, {message: "Número de Cartão Inválido"}),
    expiration: z.date(),
    cvv: z.string(),
    password: z.string().min(8, {message: "Precisa ter no mínimo 8 caracteres."}),
    user_id: z.string(), 
    saldo: z.number()
});

export default async function UpdateCard_CreditController(req: Request, res: Response) {
    try {
        const { cadNumber, expiration, cvv, password, user_id, saldo } = card_creditSchema.parse(req.body);
        const { id } = req.params;

        const existingCard = await prisma.creditCard.findUnique({
            where: {
                id: String(id)
            }
        });

        if (!existingCard) {
            return res.status(404).json({ erro: "Cartão não encontrado." });
        }

        const passwordHash = await bcrypt.hash(password, 10); 

        const data = {
            cadNumber: cadNumber,
            expiration: expiration,
            cvv: cvv,
            password: passwordHash, 
            user_id: user_id,
            saldo: saldo
        };

        const updatedCard_credit = await prisma.creditCard.update({
            where: {
                id: String(id)
            },
            data: data as Prisma.CreditCardUpdateInput
        });

        return res.status(200).json(updatedCard_credit);

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
}
