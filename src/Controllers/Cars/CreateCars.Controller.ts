import { Request, Response } from "express";
import prisma from "../../Database/prismaClient";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const createCarSchema = z.object({
    name: z.string(),
    imagem: z.string(),
    preco: z.number().min(0),
    quilometragem: z.number().min(0),
    ano: z.number(),
    condicao: z.string(),
    exterior_color: z.string(),
    interior_color: z.string(),
    disponibilidade: z.boolean(), 
    tipo_do_carro_id: z.string(),
});

export default async function(req: Request, res: Response)
{
    try
    {
        const {name, imagem, preco, quilometragem, ano, condicao, exterior_color, 
            interior_color, disponibilidade, tipo_do_carro_id} = createCarSchema.parse(req.body);

        const {id} = req.params;

        const existingCar = await prisma.car.findUnique({
            where: {
                id: id
            }
        });

        if(existingCar)
            return res.status(404).json("Carro existente.");

        const data = {
            name: name,
            imagem: imagem,
            preco: preco,
            quilometragem: quilometragem,
            ano: ano,
            condicao: condicao,
            exterior_color: exterior_color,
            interior_color: interior_color,
            disponibilidade: disponibilidade, 
            tipo_do_carro_id: tipo_do_carro_id
        }

        const createCar = await prisma.car.create({
            data: data as Prisma.CarCreateInput
        });

        return res.status(200).json(createCar);
    }
    catch(erro)
    {
        console.log(erro);
        return res.status(500).json({erro: "Erro interno do servidor."});
    }
}