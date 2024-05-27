import express from 'express';
const router = express.Router();

//User Controller
import CreateUserController  from '../Controllers/User/CreateUser.Controller';
import GetUserController from '../Controllers/User/GetUser.Controller';
import GetUniqueUserController from '../Controllers/User/GetUniqueUser.Controller';
import DeleteUserController from '../Controllers/User/DeleteUser.Controller';
import UpdateUserController from '../Controllers/User/UpdateUser.Controller';
//-----------------------------------------------------------------------------

//Cars Controller
import CreateCarsController from '../Controllers/Cars/CreateCars.Controller';
import GetCarController from '../Controllers/Cars/GetCars.Controller';
import GetUniqueCarController from '../Controllers/Cars/GetUniqueCar.Controller';
import DeleteCarController from '../Controllers/Cars/DeleteCars.Controller';
import UpdateCarsController from '../Controllers/Cars/UpdateCars.Controller';
//-----------------------------------------------------------------------------

//Reserva Controller
import CreateReservaController from '../Controllers/Reserva/CreateReserva.Controller';
import GetReservaController from '../Controllers/Reserva/GetReserva.Controller';
import DeleteReservaController from '../Controllers/Reserva/DeleteReserva.Controller';
import UpdateReservaController from '../Controllers/Reserva/UpdateReserva.Controller';
//-----------------------------------------------------------------------------

//Card_credit Controller
import CreateCar_CreditController from '../Controllers/Card_credit/CreateCard_Credit.Controller';
import GetUniqueCard_CreditController from '../Controllers/Card_credit/GetUniqueCard_Credit.Controller';
import UpdateCard_CreditController from '../Controllers/Card_credit/UpdateCard_Credit.Controller';
//------------------------------------------------------------------------------

router.get('/', async (req, res) => {
    res.send('Hello World!');
});
 
//Rotas de Usuário
router.post('/create-user', CreateUserController);

router.get('/get-All-User', GetUserController);

router.get('/get-user', GetUniqueUserController);

router.delete('/delete-user', DeleteUserController);

router.put('/update-user/:id', UpdateUserController);
//---------------------------------------------------------------

//Rotas dos Carros
router.post("/create-car", CreateCarsController);

router.get("/get-All-cars", GetCarController);

router.get("/get-Unique-car", GetUniqueCarController);

router.delete("/delete-car", DeleteCarController);

router.put("/update-car",  UpdateCarsController);
//---------------------------------------------------------------

//Rotas da Reserva
router.post("/create-reserva", CreateReservaController);

router.get("/get-reserva", GetReservaController);

router.delete("/delete-reserva", DeleteReservaController);

router.put("/update-reserva", UpdateReservaController);
//---------------------------------------------------------------

//Rotas Card_Credit
router.post("/create-card_credit", CreateCar_CreditController);

router.get("/get_card_credit", GetUniqueCard_CreditController);

router.put("/update_card_credit", UpdateCard_CreditController);
//---------------------------------------------------------------

export default router;