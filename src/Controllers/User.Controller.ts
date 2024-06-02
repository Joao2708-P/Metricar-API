import { Request, Response } from 'express';
import UserService from '../Service/CreateUser.Service';

export default class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const createdUser = await UserService.createUser(userData);
            return res.status(201).json(createdUser);
        } catch (error) {
            console.error(error);
            if (error === "Email de usuário já cadastrado.") {
                return res.status(409).json({ error: error });
            }
            return res.status(400).json({ error: "Erro ao cadastrar o usuário" });
        }
    }

    static async getUser(req: Request, res: Response) {
        try{

            const user = await UserService.getUser();
            return res.status(200).json(user);
        }
        catch(error) {
            return res.status(400).json({ error: "Erro ao cadastrar ao buscar usuários" });
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedUser = await UserService.updateUser(id, updateData);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Erro ao atualizar o usuário" });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const message = await UserService.deleteUser(id);
            return res.status(200).json(message);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Erro ao deletar o usuário" });
        }
    }
}
