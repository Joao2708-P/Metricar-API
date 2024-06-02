import { Request, Response } from "express";
import ReservaService from "../Service/Reserva.Service";

class ReservaController {
    static async createReserva(req: Request, res: Response) {
        try {
            const reservaData = req.body;
            const newReserva = await ReservaService.createReserva(reservaData);
            return res.status(201).json(newReserva);
        } catch (error) {
            if (error === "Já existe uma reserva para esta data de reserva.") {
                return res.status(400).json({ erro: error });
            }
            console.error(error);
            return res.status(500).json({ erro: "Erro interno no servidor." });
        }
    }

    static async getAllReservas(req: Request, res: Response) {
        try {
            const reservas = await ReservaService.getAllReservas();
            return res.status(200).json(reservas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno no servidor." });
        }
    }

    static async getUniqueReserva(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const reserva = await ReservaService.getUniqueReserva(id);
            return res.status(200).json(reserva);
        } catch (error) {
            if (error === "Reserva não encontrada.") {
                return res.status(404).json({ erro: error });
            }
            console.error(error);
            return res.status(500).json({ erro: "Erro interno no servidor." });
        }
    }

    static async updateReserva(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedReserva = await ReservaService.updateReserva(id, updateData);
            return res.status(200).json(updatedReserva);
        } catch (error) {
            if (error === "Reserva não encontrada.") {
                return res.status(404).json({ erro: error });
            }
            console.error(error);
            return res.status(500).json({ erro: "Erro interno no servidor." });
        }
    }

    static async deleteReserva(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await ReservaService.deleteReserva(id);
            return res.status(200).json(response);
        } catch (error) {
            if (error === "Reserva não encontrada.") {
                return res.status(404).json({ erro: error });
            }
            console.error(error);
            return res.status(500).json({ erro: "Erro interno no servidor." });
        }
    }
}

export default ReservaController;
