import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor.' });
};

export default errorHandlerMiddleware;
