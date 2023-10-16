import { Request, Response } from 'express';
import prisma from '../../Database/prismaClient';

export default async function GetUserController(req: Request, res: Response) {
    try 
    {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
}
