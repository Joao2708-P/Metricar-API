import prisma from "../Database/prismaClient";
import { z } from "zod";

import { Prisma } from "@prisma/client";
import { Buffer } from "buffer";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
    type_slug: z.string(),
    promotion_slug: z.boolean()
});

class CarService {

    static async createCar(carData: any) {
        const { name, imagem, preco, quilometragem, ano, condicao, 
            exterior_color, interior_color, disponibilidade, type_slug, promotion_slug } = createCarSchema.parse(carData);

            const imageBuffer = Buffer.from(imagem, 'base64');
            const fileName = `${uuidv4()}.png`;

            const uploadsDir = path.join(__dirname, 'uploads');
            const filePath = path.join(uploadsDir, fileName);
    
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
    
            fs.writeFileSync(filePath, imageBuffer);

        const data = {
            name,
            imagem: filePath,
            preco,
            quilometragem,
            ano,
            condicao,
            exterior_color, 
            interior_color,
            disponibilidade,
            type_slug,
            promotion_slug
        };

        const createdCar = await prisma.car.create({
            data: data as Prisma.CarCreateInput
        });

        return createdCar;
    }

    static async deleteCar(carId: string) {
        
        const existingCar = await prisma.car.findUnique({
            where: { id: carId }
        }); 

        if (!existingCar) {
            throw new Error("Carro não existente.");
        }

        await prisma.car.delete({
            where: { id: carId }
        })

        return { message: "Carro deletado com sucesso." };
    }

    static async getCar() {
        const car = await prisma.car.findMany();

        return car;
    }

    static async getByIdCar(carId: string) {
        const car = await prisma.car.findUnique({
            where: { id: carId }
        });

        if (!car) {
            throw new Error("Carro não encontrado.");
        }

        return car;
    }

    static  updateCar = async (id: string, updates: any) => {
        const validatedUpdates = createCarSchema.parse(updates);
    
        const existingCar = await prisma.car.findUnique({
            where: {
                id: id,
            },
        });
    
        if (!existingCar) {
            throw new Error("Carro não encontrado.");
        }
    
        const updatedCar = await prisma.car.update({
            where: {
                id: id,
            },
            data: validatedUpdates,
        });
    
        return updatedCar;
    };
}

export default CarService;