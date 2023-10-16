import express from 'express';
const router = express.Router();

//User Controller
import  CreateUserController  from '../Controllers/User/CreateUserController';
import  GetUserController from '../Controllers/User/GetUserController';
import GetUniqueUserController from '../Controllers/User/GetUniqueUserController';
import DeleteUserController from '../Controllers/User/DeleteUserController';
import UpdateUserController from '../Controllers/User/UpdateUserController';
//-----------------------------------------------------------------------------

router.get('/', async (req, res) => {
    res.send('Hello World!');
});

//Rotas de Usuário
router.post('/create-user', CreateUserController);

router.get('/get-All-User', GetUserController);

router.get('/get-user', GetUniqueUserController);

router.delete('/delete-user', DeleteUserController);

router.put('/update-user', UpdateUserController);
//---------------------------------------------------------------



export default router;