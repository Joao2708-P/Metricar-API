import { z } from 'zod'
import prisma from '../../Database/prismaClient';
import { randomCars } from './GetCarsPromotion';

const createSchema = z.object({
    description: z.string(),
    discount: z.number().min(0),
    start_date: z.date(),
    end_date: z.date(),
    car_id: z.string()
});

export async function createPromotion(
    description: string,
    discount: number, 
    start_date: Date,
    end_date: Date,
    car_id: string

): Promise<void> {
    
    createSchema.parse({ description, discount: discount, start_date: start_date, end_date: end_date, car_id: car_id });

    await prisma.carPromotion.create({
        data: {
            description,
            discount,
            start_date,
            end_date,
            car_id
        }
    });
};