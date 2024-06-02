import { Request, Response } from "express";
import CarService from "../../Service/Car.Service";

class CarController {
    static async createCar(req: Request, res: Response) {
        try {
            const carData = req.body;
            const createdCar = await CarService.createCar(carData);
            return res.status(201).json(createdCar);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async deleteCar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await CarService.deleteCar(id);
            return res.status(200).json(response);
        } catch (error) {
            if (error === "Carro não existente.") {
                return res.status(404).json({ error: error });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async getCar(req: Request, res: Response) {
        try {
            const cars = await CarService.getCar();
            return res.status(200).json(cars);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async getByIdCar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const car = await CarService.getByIdCar(id);
            return res.status(200).json(car);
        } catch (error) {
            if (error === "Carro não encontrado.") {
                return res.status(404).json({ error: error });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async updateCar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedCar = await CarService.updateCar(id, updates);
            return res.status(200).json(updatedCar);
        } catch (error) {
            if (error === "Carro não encontrado.") {
                return res.status(404).json({ error: error });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

export default CarController;
