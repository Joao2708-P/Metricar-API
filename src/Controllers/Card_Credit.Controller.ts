import { Request, Response } from "express";
import CardCredit from "../Service/Card_credit.service";

class CardCreditController {
    static async createCardCredit(req: Request, res: Response) {
        try {
            const cardData = req.body;
            const newCard = await CardCredit.createCardCredit(cardData);
            return res.status(201).json(newCard);
        } catch (error) {
            if (error === "Cartão já cadastrado.") {
                return res.status(400).json({ error: error });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async getAllCards(req: Request, res: Response) {
        try {
            const cards = await CardCredit.getAllCards();
            return res.status(200).json(cards);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async getUniqueCard(req: Request, res: Response) {
        try {
            const { cardNumber } = req.params;
            const card = await CardCredit.getUniqueCard(cardNumber);
            return res.status(200).json(card);
        } catch (error) {
            if (error === "Cartão não encontrado.") {
                return res.status(404).json({ error: error });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async deleteCard(req: Request, res: Response) {
        try {
            const { cardNumber } = req.params;
            const response = await CardCredit.deleteCard(cardNumber);
            return res.status(200).json(response);
        } catch (error) {
            if (error === "Cartão não encontrado.") {
                return res.status(404).json({ error: error });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    static async updateCard(req: Request, res: Response) {
        try {
            const { cardNumber } = req.params;
            const updateData = req.body;
            const updatedCard = await CardCredit.updateCard(cardNumber, updateData);
            return res.status(200).json(updatedCard);
        } catch (error) {
            if (error === "Cartão não encontrado.") {
                return res.status(404).json({ error: error });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

export default CardCreditController;
