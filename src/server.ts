import express from 'express';
import router from './routes/routes';

const app = express();
app.use(express.json());
app.use(router);

const port = 3000;
app.use('/api', router)

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});
