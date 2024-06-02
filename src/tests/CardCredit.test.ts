import { expect } from 'chai';
import prisma from '../Database/prismaClient';
import CardCredit from '../Service/Card_credit.service';
import bcrypt from 'bcrypt';

// Teste para a criação e atualização de cartão de crédito
describe('CardCredit Model', () => {
    beforeEach(async () => {
        // Limpar a base de dados antes de cada teste
        await prisma.creditCard.deleteMany();
    });

    describe('createCardCredit', () => {
        it('should create a new credit card', async () => {
            const cardData = {
                cardNumber: '1234567890123456',
                expiration: '2020-01-01T00:00:00Z',
                cvv: '123',
                password: 'password123',
                user_id: 'user123',
                saldo: 100.0
            };

            const card = await CardCredit.createCardCredit(cardData);

            expect(card).to.have.property('cardNumber', cardData.cardNumber);
            const isPasswordMatch = await bcrypt.compare(cardData.password, card.password);
            expect(isPasswordMatch).to.be.true;
        });

        it('should throw an error if card already exists', async () => {
            const cardData = {
                cardNumber: '1234567890123456',
                expiration: '2025-12-31',
                cvv: '123',
                password: 'password123',
                user_id: 'user123',
                saldo: 100.0
            };

            await CardCredit.createCardCredit(cardData);

            try {
                await CardCredit.createCardCredit(cardData);
            } catch (error) {
                expect(error).to.equal('Cartão já cadastrado.');
            }
        });
    });

    describe('updateCard', () => {
        it('should update existing credit card', async () => {
            const cardData = {
                cardNumber: '1234567890123456',
                expiration: '2025-06-04',
                cvv: '123',
                password: 'password123',
                user_id: 'user123',
                saldo: 100.0
            };

            await CardCredit.createCardCredit(cardData);

            const updateData = { password: 'newpassword123' };
            const updatedCard = await CardCredit.updateCard(cardData.cardNumber, updateData);

            expect(updatedCard).to.have.property('cardNumber', cardData.cardNumber);
            const isPasswordMatch = await bcrypt.compare(updateData.password, updatedCard.password);
            expect(isPasswordMatch).to.be.true;
        });

        it('should throw an error if card is not found', async () => {
            const cardNumber = '1234567890123456';
            const updateData = { password: 'newpassword123' };

            try {
                await CardCredit.updateCard(cardNumber, updateData);
            } catch (error) {
                expect(error).to.equal('Cartão não encontrado.');
            }
        });
    });
});