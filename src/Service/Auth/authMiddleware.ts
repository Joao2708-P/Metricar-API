import { Request, Response, NextFunction } from 'express';
import AuthService from './Auth.Service';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = AuthService.verifyToken(token);
        (req as any).user = decoded;  // Anexa as informações do usuário ao objeto de requisição
        next();  // Permite que a solicitação prossiga
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

export default authMiddleware;
