import { Request, Response } from 'express';
import AuthService from '../../Service/Auth/Auth.Service';

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await AuthService.authenticate(email, password);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(401).json({ error: error });
        }
    }
}

export default AuthController;
