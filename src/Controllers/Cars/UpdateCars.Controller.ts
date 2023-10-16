import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";
import { z } from "zod";

const updateCarSchema = z.object({
    name: z.string().optional(),
    imagem: z.string().optional(),
    preco: z.number().min(0).optional(),
    quilometragem: z.number().min(0).optional(),
    ano: z.number().optional(),
    condicao: z.string().optional(),
    exterior_color: z.string().optional(),
    interior_color: z.string().optional(),
    disponibilidade: z.boolean().optional(),
    tipo_do_carro_id: z.string().optional(),
});

export default async function (req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updates = updateCarSchema.parse(req.body);

        const existingCar = await prisma.car.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingCar) {
            return res.status(404).json("Carro não encontrado.");
        }

        const updatedCar = await prisma.car.update({
            where: {
                id: id,
            },
            data: updates,
        });

        return res.status(200).json(updatedCar);
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
}
