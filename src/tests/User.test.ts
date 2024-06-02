import { expect } from 'chai';
import prisma from '../Database/prismaClient';
import UserService from '../Service/CreateUser.Service';
import bcrypt from 'bcrypt';

// Teste para a criação de usuário
describe('UserService Model', () => {
    beforeEach(async () => {
        // Limpar a base de dados antes de cada teste
        await prisma.user.deleteMany();
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                card_credit: '1234567890123456'
            };

            const user = await UserService.createUser(userData);

            expect(user).to.have.property('name', userData.name);
            expect(user).to.have.property('email', userData.email);
            const isPasswordMatch = await bcrypt.compare(userData.password, user.password);
            expect(isPasswordMatch).to.be.true;
        });

        it('should throw an error if email already exists', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                card_credit: '1234567890123456'
            };

            await UserService.createUser(userData);

            try {
                await UserService.createUser(userData);
            } catch (error) {
                expect(error).to.equal('Email de usuário já cadastrado.');
            }
        });

        it('should throw an error for invalid email format', async () => {
            const userData = {
                name: 'John Doe',
                email: 'invalid-email',
                password: 'password123',
                card_credit: '1234567890123456'
            };

            try {
                await UserService.createUser(userData);
            } catch (error) {
                expect(error).to.include('Email inválido!');
            }
        });

        it('should throw an error for short password', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'short',
                card_credit: '1234567890123456'
            };

            try {
                await UserService.createUser(userData);
            } catch (error) {
                expect(error).to.include('Senha precisa conter no mínimo 8 caracteres.');
            }
        });
    });
});
