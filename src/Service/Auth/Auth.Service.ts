import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class AuthService {
    private secretKey: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_TOKEN || 'defaultSecretKey';
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }

    generateToken(user: User): string {
        const payload = { id: user.id, name: user.name, email: user.email, card_credit: user.card_credit };
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
        return token;
    }

    verifyToken(token: string): string | object {
        return jwt.verify(token, this.secretKey);
    }

    async authenticate(email: string, password: string): Promise<string | null> {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isPasswordValid = await this.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Senha inválida');
        }

        return this.generateToken(user);
    }
}

export default new AuthService();