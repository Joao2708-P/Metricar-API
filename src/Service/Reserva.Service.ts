import prisma from "../Database/prismaClient";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const reserveSchema = z.object({
    data_da_reserva: z.date(),
    data_da_devolucao: z.date(),
    id_user: z.string(),
    id_car: z.string(),
    preco_total: z.number().min(0),
    id_credit_card: z.string()
});

class ReservaService {
    static async createReserva(reservaData: any) {
        const { data_da_reserva, data_da_devolucao, id_user, id_car, preco_total, id_credit_card } = reserveSchema.parse(reservaData);

        const existingReservas = await prisma.reserva.findMany({
            where: {
                data_da_reserva: data_da_reserva
            }
        });

        if (existingReservas && existingReservas.length > 0) {
            throw new Error("Já existe uma reserva para esta data de reserva.");
        }

        const data = {
            data_da_reserva: data_da_reserva,
            data_da_devolucao: data_da_devolucao,
            id_user: id_user,
            id_car: id_car,
            preco_total: preco_total,
            id_credit_card: id_credit_card
        };

        const createReserva = await prisma.reserva.create({
            data: data as unknown as Prisma.ReservaCreateInput
        });

        return createReserva;
    }

    static async getAllReservas() {
        const reservas = await prisma.reserva.findMany();
        return reservas;
    }

    static async getUniqueReserva(id: string) {
        const reserva = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!reserva) {
            throw new Error("Reserva não encontrada.");
        }

        return reserva;
    }

    static async updateReserva(id: string, updateData: any) {
        const existingReserva = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!existingReserva) {
            throw new Error("Reserva não encontrada.");
        }

        const validatedUpdates = reserveSchema.partial().parse(updateData);

        const updatedReserva = await prisma.reserva.update({
            where: { id },
            data: validatedUpdates
        });

        return updatedReserva;
    }

    static async deleteReserva(id: string) {
        const existingReserva = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!existingReserva) {
            throw new Error("Reserva não encontrada.");
        }

        await prisma.reserva.delete({
            where: { id }
        });

        return { message: "Reserva deletada com sucesso." };
    }
}

export default ReservaService;
