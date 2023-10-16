import { Request, Response } from 'express';
import prisma from '../../Database/prismaClient';

export default async function GetCarController(req: Request, res: Response) {
    try 
    {
        const cars = await prisma.car.findMany();
        return res.status(200).json(cars);
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar carro." });
    }
}
