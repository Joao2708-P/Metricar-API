import prisma from "../Database/prismaClient";
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

class CarService {
    static async createCar(carData: any) {
        const { name, imagem, preco, quilometragem, ano, condicao, 
            exterior_color, interior_color, disponibilidade, tipo_do_carro_id } = createCarSchema.parse(carData);

        const data = {
            name,
            imagem,
            preco,
            quilometragem,
            ano,
            condicao,
            exterior_color,
            interior_color,
            disponibilidade,
            tipo_do_carro_id
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
