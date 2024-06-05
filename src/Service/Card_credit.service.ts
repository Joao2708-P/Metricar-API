import prisma from "../Database/prismaClient";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { z } from "zod";

const card_creditSchema = z.object({
    cardNumber: z.string({}).max(19, {message: "Numero de Cartão Inválido"}),
    expiration: z.string(),
    cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV Inválido" }),
    password: z.string().min(8, {message: "Precisa de no mínimo 8 caracteres."}),
    user_id: z.string(), 
    balance: z.number()
});

const SECRET_KEY = process.env.JWT_SECRETE_CARDCREDIT || "iefj0efjaiponsçldkjadlks";

class CardCredit{

    static encrypt(KEY: string): string {
        return CryptoJS.AES.encrypt(KEY, SECRET_KEY).toString();
    }

    static decrypt(KEY: string): string {
        const bytes = CryptoJS.AES.decrypt(KEY, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    static async createCardCredit(CardCredit: any) {

        const {cardNumber, expiration, cvv, password, user_id, balance} = card_creditSchema.parse(CardCredit);

        const existingCard = await prisma.creditCard.findUnique({
            where: {
                cardNumber: this.encrypt(cardNumber)
            }
        });

        if (existingCard)
              throw new Error("Cartão já cadastrado.");;

        const passwordHash = await bcrypt.hash(password, 10);
        const encrypt_cardNumber = this.encrypt(cardNumber);
        const encryot_cvv = this.encrypt(cvv);

        const data = {
            cardNumber: encrypt_cardNumber,
            expiration: new Date(expiration).toISOString(), 
            cvv: encryot_cvv,
            password: passwordHash,
            user_id,
            balance
        };

        const card = await prisma.creditCard.create({
            data
        });

        return card
    }

    static async getAllCards() {
        const cards = await prisma.creditCard.findMany();
        return cards.map(card => ({
            ...card,
            cardNumber: this.decrypt(card.cardNumber),
            cvv: this.decrypt(card.cvv),
        }));
    }

    static async getUniqueCard(cardNumber: string) {
        const encryptedCardNumber = this.encrypt(cardNumber);
        const card = await prisma.creditCard.findUnique({
            where: { cardNumber: encryptedCardNumber }
        });

        if (!card) {
            throw new Error("Cartão não encontrado.");
        }

        return {
            ...card,
            cardNumber: this.decrypt(card.cardNumber),
            cvv: this.decrypt(card.cvv)
        };
    }

    static async deleteCard(cardNumber: string) {
        const encryptedCardNumber = this.encrypt(cardNumber);
        const existingCardCredit = await prisma.creditCard.findUnique({
            where: { cardNumber: encryptedCardNumber }
        });

        if (!existingCardCredit) {
            throw new Error("Cartão não encontrado.");
        }

        await prisma.creditCard.delete({
            where: { cardNumber: encryptedCardNumber }
        });

        return { message: "Cartão deletado com sucesso." };
    }


    static async updateCard(cardNumber: string, updateData: any) {
        const encryptedCardNumber = this.encrypt(cardNumber);
        const existingCardCredit = await prisma.creditCard.findUnique({
            where: { cardNumber: encryptedCardNumber }
        });

        if (!existingCardCredit) {
            throw new Error("Cartão não encontrado.");
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        if (updateData.cardNumber) {
            updateData.cardNumber = this.encrypt(updateData.cardNumber);
        }

        if (updateData.cvv) {
            updateData.cvv = this.encrypt(updateData.cvv);
        }

        const updatedCard = await prisma.creditCard.update({
            where: { cardNumber: encryptedCardNumber },
            data: updateData
        });

        return updatedCard;
    }
}

export default CardCredit