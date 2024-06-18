import express from 'express';
import storage from '../multer/multer.conf';
const router = express.Router();

const upload = multer({storage: storage("car-image")});
//User Controller
import UserController from '../Controllers/User.Controller';
//-----------------------------------------------------------------------------

//Cars Controller
import CarController from '../Controllers/Cars.Controller';
//-----------------------------------------------------------------------------

//Reserva Controller
import ReservaController from '../Controllers/Reserva.Controller'
//-----------------------------------------------------------------------------

//Card_credit Controller
import CardCreditController from '../Controllers/Card_Credit.Controller';
//------------------------------------------------------------------------------

//Auth Controller
import AuthController from '../Controllers/Auth/Auth.Controller';
import authMiddleware from '../Service/Auth/authMiddleware';
import multer from 'multer';
//------------------------------------------------------------------------------

router.get('/', async (req, res) => {
    res.send('Hello World!');
});
 
//Rotas de Usuário
router.post('/create-user', UserController.createUser);

router.get('/get-All-User', UserController.getUser);

router.get('/get-user/:id', UserController.getUserById);

router.delete('/delete-user/:id', UserController.deleteUser);

router.put('/update-user/:id', UserController.updateUser);
//---------------------------------------------------------------

//Rotas dos Carros
router.post("/create-car",  upload.single('imagem'),  CarController.createCar);

router.get("/get-All-cars", CarController.getCar);

router.get("/get-Unique-car/:id", CarController.getByIdCar);

router.delete("/delete-car/:id", CarController.deleteCar);

router.put("/update-car/:id", CarController.updateCar);
//---------------------------------------------------------------

//Rotas da Reserva
router.post("/create-reserva", ReservaController.createReserva);

router.get("/get-reserva", ReservaController.getAllReservas);

router.get("/get-reserva/:id", ReservaController.getUniqueReserva);

router.delete("/delete-reserva/:id", ReservaController.deleteReserva);

router.put("/update-reserva/:id", ReservaController.updateReserva);
//---------------------------------------------------------------

//Rotas Card_Credit
router.post("/create-card_credit", CardCreditController.createCardCredit);
 
router.get("/get_card_credit", CardCreditController.getAllCards);

router.delete("/delete-card-credit/:id", CardCreditController.deleteCard);

router.get("get-unique-card/:id", CardCreditController.getUniqueCard)

router.put("/update_card_credit/:id", CardCreditController.updateCard);
//---------------------------------------------------------------

//Rota de Login
router.post("/log-user", AuthController.login)
//-----------------------------------------------

export default router;