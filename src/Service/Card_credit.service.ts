import prisma from "../Database/prismaClient";
import bcrypt from "bcrypt";
import { z } from "zod";

const card_creditSchema = z.object({
    cardNumber: z.string({}).max(19, {message: "Numero de Cartão Inválido"}),
    expiration: z.string(),
    cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV Inválido" }),
    password: z.string().min(8, {message: "Precisa de no mínimo 8 caracteres."}),
    user_id: z.string(), 
    saldo: z.number()
});

class CardCredit{
    static async createCardCredit(CardCredit: any) {

        const {cardNumber, expiration, cvv, password, user_id, saldo} = card_creditSchema.parse(CardCredit);

        const existingCard = await prisma.creditCard.findUnique({
            where: {
                cardNumber: cardNumber
            }
        });

        if (existingCard)
              throw new Error("Cartão já cadastrado.");;

        const passwordHash = await bcrypt.hash(password, 10);

        const data = {
            cardNumber,
            expiration: new Date(expiration).toISOString(), 
            cvv,
            password: passwordHash,
            user_id,
            saldo
        };

        const card = prisma.creditCard.create({
            data
        });

        return card
    }

    static async getAllCards() {
        const cards = await prisma.creditCard.findMany();
        return cards;
    }

    static async getUniqueCard(cardNumber: string) {
        const card = await prisma.creditCard.findUnique({
            where: { cardNumber: cardNumber }
        });

        if (!card) {
            throw new Error("Cartão não encontrado.");
        }

        return card;
    }

    static async deleteCard(cardNumber: string) {
        const existingCardCredit = await prisma.creditCard.findUnique({
            where: { cardNumber: cardNumber }
        });

        if (!existingCardCredit) {
            throw new Error("Cartão não encontrado.");
        }

        await prisma.creditCard.delete({
            where: { cardNumber: cardNumber }
        });

        return { message: "Cartão deletado com sucesso." };
    }

    static async updateCard(cardNumber: string, updateData: any) {
        const existingCardCredit = await prisma.creditCard.findUnique({
            where: { cardNumber: cardNumber }
        });

        if (!existingCardCredit) {
            throw new Error("Cartão não encontrado.");
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedCard = await prisma.creditCard.update({
            where: { cardNumber: cardNumber },
            data: updateData
        });

        return updatedCard;
    }
}

export default CardCredit