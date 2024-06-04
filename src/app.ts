import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import router from './routes/routes.service';

const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limite cada IP a 100 requisições por "window" (aqui, por 15 minutos)
});

app.use(limiter);
app.use('/api', router);

export default app;