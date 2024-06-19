"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/routes.service.ts
var routes_service_exports = {};
__export(routes_service_exports, {
  default: () => routes_service_default
});
module.exports = __toCommonJS(routes_service_exports);
var import_express = __toESM(require("express"));

// src/multer/multer.conf.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var storage = (name_file) => import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, import_path.default.resolve("uploads"));
  },
  filename: (req, file, callback) => {
    const extensionArq = file.originalname.split(".")[1];
    callback(null, `${name_file}.${extensionArq}`);
  }
});
var multer_conf_default = storage;

// src/Service/User.Service.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/User.Service.ts
var userSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." })
});
var UserService = class {
  static async createUser(userData) {
    const { name, email, password } = userSchema.parse(userData);
    const existingUser = await prismaClient_default.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw new Error("Email de usu\xE1rio j\xE1 cadastrado.");
    }
    const passwordHash = await import_bcrypt.default.hash(password, 10);
    const data = {
      name,
      email,
      password: passwordHash
    };
    const createdUser = await prismaClient_default.user.create({
      data
    });
    return createdUser;
  }
  static async getUser() {
    const user = await prismaClient_default.user.findMany();
    return user;
  }
  static async getUserById(userId) {
    const user = await prismaClient_default.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      throw new Error("Usu\xE1rio n\xE3o encontrado.");
    }
    return user;
  }
  static async updateUser(userId, updateData) {
    const existingUser = await prismaClient_default.user.findUnique({
      where: { id: userId }
    });
    if (!existingUser) {
      throw new Error("Usu\xE1rio n\xE3o encontrado.");
    }
    if (updateData.password) {
      updateData.password = await import_bcrypt.default.hash(updateData.password, 10);
    }
    const updatedUser = await prismaClient_default.user.update({
      where: { id: userId },
      data: updateData
    });
    return updatedUser;
  }
  static async deleteUser(userId) {
    const existingUser = await prismaClient_default.user.findUnique({
      where: { id: userId }
    });
    if (!existingUser) {
      throw new Error("Usu\xE1rio n\xE3o encontrado.");
    }
    await prismaClient_default.user.delete({
      where: { id: userId }
    });
    return { message: "Usu\xE1rio deletado com sucesso." };
  }
};
var User_Service_default = UserService;

// src/Controllers/User.Controller.ts
var UserController = class {
  static async createUser(req, res) {
    try {
      const userData = req.body;
      const createdUser = await User_Service_default.createUser(userData);
      return res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      if (error === "Email de usu\xE1rio j\xE1 cadastrado.") {
        return res.status(409).json({ error });
      }
      return res.status(400).json({ error: "Erro ao cadastrar o usu\xE1rio" });
    }
  }
  static async getUser(req, res) {
    try {
      const user = await User_Service_default.getUser();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao cadastrar ao buscar usu\xE1rios" });
    }
  }
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User_Service_default.getUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado." });
    }
  }
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUser = await User_Service_default.updateUser(id, updateData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao atualizar o usu\xE1rio" });
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const message = await User_Service_default.deleteUser(id);
      return res.status(200).json(message);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao deletar o usu\xE1rio" });
    }
  }
};

// src/Service/Car.Service.ts
var import_zod2 = require("zod");
var import_buffer = require("buffer");
var import_fs = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_uuid = require("uuid");
var createCarSchema = import_zod2.z.object({
  name: import_zod2.z.string(),
  imagem: import_zod2.z.string(),
  preco: import_zod2.z.number().min(0),
  quilometragem: import_zod2.z.number().min(0),
  ano: import_zod2.z.number(),
  condicao: import_zod2.z.string(),
  exterior_color: import_zod2.z.string(),
  interior_color: import_zod2.z.string(),
  disponibilidade: import_zod2.z.boolean(),
  type_slug: import_zod2.z.string(),
  promotion_slug: import_zod2.z.boolean()
});
var CarService = class {
  static async createCar(carData) {
    const {
      name,
      imagem,
      preco,
      quilometragem,
      ano,
      condicao,
      exterior_color,
      interior_color,
      disponibilidade,
      type_slug,
      promotion_slug
    } = createCarSchema.parse(carData);
    const imageBuffer = import_buffer.Buffer.from(imagem, "base64");
    const fileName = `${(0, import_uuid.v4)()}.png`;
    const uploadsDir = import_path2.default.join(__dirname, "uploads");
    const filePath = import_path2.default.join(uploadsDir, fileName);
    if (!import_fs.default.existsSync(uploadsDir)) {
      import_fs.default.mkdirSync(uploadsDir, { recursive: true });
    }
    import_fs.default.writeFileSync(filePath, imageBuffer);
    const data = {
      name,
      imagem: filePath,
      preco,
      quilometragem,
      ano,
      condicao,
      exterior_color,
      interior_color,
      disponibilidade,
      type_slug,
      promotion_slug
    };
    const createdCar = await prismaClient_default.car.create({
      data
    });
    return createdCar;
  }
  static async deleteCar(carId) {
    const existingCar = await prismaClient_default.car.findUnique({
      where: { id: carId }
    });
    if (!existingCar) {
      throw new Error("Carro n\xE3o existente.");
    }
    await prismaClient_default.car.delete({
      where: { id: carId }
    });
    return { message: "Carro deletado com sucesso." };
  }
  static async getCar() {
    const car = await prismaClient_default.car.findMany();
    return car;
  }
  static async getByIdCar(carId) {
    const car = await prismaClient_default.car.findUnique({
      where: { id: carId }
    });
    if (!car) {
      throw new Error("Carro n\xE3o encontrado.");
    }
    return car;
  }
  static updateCar = async (id, updates) => {
    const validatedUpdates = createCarSchema.parse(updates);
    const existingCar = await prismaClient_default.car.findUnique({
      where: {
        id
      }
    });
    if (!existingCar) {
      throw new Error("Carro n\xE3o encontrado.");
    }
    const updatedCar = await prismaClient_default.car.update({
      where: {
        id
      },
      data: validatedUpdates
    });
    return updatedCar;
  };
};
var Car_Service_default = CarService;

// src/Controllers/Cars.Controller.ts
var CarController = class {
  static async createCar(req, res) {
    try {
      const carData = req.body;
      const createdCar = await Car_Service_default.createCar(carData);
      return res.status(201).json(createdCar);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async deleteCar(req, res) {
    try {
      const { id } = req.params;
      const response = await Car_Service_default.deleteCar(id);
      return res.status(200).json(response);
    } catch (error) {
      if (error === "Carro n\xE3o existente.") {
        return res.status(404).json({ error });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async getCar(req, res) {
    try {
      const cars = await Car_Service_default.getCar();
      return res.status(200).json(cars);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async getByIdCar(req, res) {
    try {
      const { id } = req.params;
      const car = await Car_Service_default.getByIdCar(id);
      return res.status(200).json(car);
    } catch (error) {
      if (error === "Carro n\xE3o encontrado.") {
        return res.status(404).json({ error });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async updateCar(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedCar = await Car_Service_default.updateCar(id, updates);
      return res.status(200).json(updatedCar);
    } catch (error) {
      if (error === "Carro n\xE3o encontrado.") {
        return res.status(404).json({ error });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
};
var Cars_Controller_default = CarController;

// src/Service/Reserva.Service.ts
var import_zod3 = require("zod");
var reserveSchema = import_zod3.z.object({
  data_da_reserva: import_zod3.z.date(),
  data_da_devolucao: import_zod3.z.date(),
  id_user: import_zod3.z.string(),
  id_car: import_zod3.z.string(),
  preco_total: import_zod3.z.number().min(0),
  id_credit_card: import_zod3.z.string()
});
var ReservaService = class {
  static async createReserva(reservaData) {
    const { data_da_reserva, data_da_devolucao, id_user, id_car, preco_total, id_credit_card } = reserveSchema.parse(reservaData);
    const existingReservas = await prismaClient_default.reserva.findMany({
      where: {
        data_da_reserva
      }
    });
    if (existingReservas && existingReservas.length > 0) {
      throw new Error("J\xE1 existe uma reserva para esta data de reserva.");
    }
    const data = {
      data_da_reserva,
      data_da_devolucao,
      id_user,
      id_car,
      preco_total,
      id_credit_card
    };
    const createReserva = await prismaClient_default.reserva.create({
      data
    });
    return createReserva;
  }
  static async getAllReservas() {
    const reservas = await prismaClient_default.reserva.findMany();
    return reservas;
  }
  static async getUniqueReserva(id) {
    const reserva = await prismaClient_default.reserva.findUnique({
      where: { id }
    });
    if (!reserva) {
      throw new Error("Reserva n\xE3o encontrada.");
    }
    return reserva;
  }
  static async updateReserva(id, updateData) {
    const existingReserva = await prismaClient_default.reserva.findUnique({
      where: { id }
    });
    if (!existingReserva) {
      throw new Error("Reserva n\xE3o encontrada.");
    }
    const validatedUpdates = reserveSchema.partial().parse(updateData);
    const updatedReserva = await prismaClient_default.reserva.update({
      where: { id },
      data: validatedUpdates
    });
    return updatedReserva;
  }
  static async deleteReserva(id) {
    const existingReserva = await prismaClient_default.reserva.findUnique({
      where: { id }
    });
    if (!existingReserva) {
      throw new Error("Reserva n\xE3o encontrada.");
    }
    await prismaClient_default.reserva.delete({
      where: { id }
    });
    return { message: "Reserva deletada com sucesso." };
  }
};
var Reserva_Service_default = ReservaService;

// src/Controllers/Reserva.Controller.ts
var ReservaController = class {
  static async createReserva(req, res) {
    try {
      const reservaData = req.body;
      const newReserva = await Reserva_Service_default.createReserva(reservaData);
      return res.status(201).json(newReserva);
    } catch (error) {
      if (error === "J\xE1 existe uma reserva para esta data de reserva.") {
        return res.status(400).json({ erro: error });
      }
      console.error(error);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
  static async getAllReservas(req, res) {
    try {
      const reservas = await Reserva_Service_default.getAllReservas();
      return res.status(200).json(reservas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
  static async getUniqueReserva(req, res) {
    try {
      const { id } = req.params;
      const reserva = await Reserva_Service_default.getUniqueReserva(id);
      return res.status(200).json(reserva);
    } catch (error) {
      if (error === "Reserva n\xE3o encontrada.") {
        return res.status(404).json({ erro: error });
      }
      console.error(error);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
  static async updateReserva(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedReserva = await Reserva_Service_default.updateReserva(id, updateData);
      return res.status(200).json(updatedReserva);
    } catch (error) {
      if (error === "Reserva n\xE3o encontrada.") {
        return res.status(404).json({ erro: error });
      }
      console.error(error);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
  static async deleteReserva(req, res) {
    try {
      const { id } = req.params;
      const response = await Reserva_Service_default.deleteReserva(id);
      return res.status(200).json(response);
    } catch (error) {
      if (error === "Reserva n\xE3o encontrada.") {
        return res.status(404).json({ erro: error });
      }
      console.error(error);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
};
var Reserva_Controller_default = ReservaController;

// src/Service/Card_credit.service.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_crypto_js = __toESM(require("crypto-js"));
var import_zod4 = require("zod");
var card_creditSchema = import_zod4.z.object({
  cardNumber: import_zod4.z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, { message: "N\xFAmero de cart\xE3o de cr\xE9dito inv\xE1lido. O formato deve ser XXXX-XXXX-XXXX-XXXX." }),
  expiration: import_zod4.z.date(),
  cvv: import_zod4.z.string().regex(/^\d{3,4}$/, { message: "CVV Inv\xE1lido" }),
  password: import_zod4.z.string().regex(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Senha inv\xE1lida. Deve conter pelo menos 8 caracteres, pelo menos uma letra mai\xFAscula e pelo menos um dos seguintes caracteres especiais: @$!%*?&." }),
  user_id: import_zod4.z.string(),
  balance: import_zod4.z.number()
});
var SECRET_KEY = process.env.JWT_SECRETE_CARDCREDIT || "iefj0efjaipons\xE7ldkjadlks";
var CardCredit = class {
  static encrypt(KEY) {
    return import_crypto_js.default.AES.encrypt(KEY, SECRET_KEY).toString();
  }
  static decrypt(KEY) {
    const bytes = import_crypto_js.default.AES.decrypt(KEY, SECRET_KEY);
    return bytes.toString(import_crypto_js.default.enc.Utf8);
  }
  static async createCardCredit(CardCredit2) {
    const { cardNumber, expiration, cvv, password, user_id, balance } = card_creditSchema.parse(CardCredit2);
    const existingCard = await prismaClient_default.creditCard.findUnique({
      where: {
        cardNumber: this.encrypt(cardNumber)
      }
    });
    if (existingCard)
      throw new Error("Cart\xE3o j\xE1 cadastrado.");
    ;
    const passwordHash = await import_bcrypt2.default.hash(password, 10);
    const encrypt_cardNumber = this.encrypt(cardNumber);
    const encryot_cvv = this.encrypt(cvv);
    const data = {
      cardNumber: encrypt_cardNumber,
      expiration: new Date(expiration).toISOString(),
      cvv: encryot_cvv,
      password: passwordHash,
      user_id,
      balance
    };
    const card = await prismaClient_default.creditCard.create({
      data
    });
    return card;
  }
  static async getAllCards() {
    const cards = await prismaClient_default.creditCard.findMany();
    return cards.map((card) => ({
      ...card,
      cardNumber: this.decrypt(card.cardNumber),
      cvv: this.decrypt(card.cvv)
    }));
  }
  static async getUniqueCard(cardNumber) {
    const encryptedCardNumber = this.encrypt(cardNumber);
    const card = await prismaClient_default.creditCard.findUnique({
      where: { cardNumber: encryptedCardNumber }
    });
    if (!card) {
      throw new Error("Cart\xE3o n\xE3o encontrado.");
    }
    return {
      ...card,
      cardNumber: this.decrypt(card.cardNumber),
      cvv: this.decrypt(card.cvv)
    };
  }
  static async deleteCard(cardNumber) {
    const encryptedCardNumber = this.encrypt(cardNumber);
    const existingCardCredit = await prismaClient_default.creditCard.findUnique({
      where: { cardNumber: encryptedCardNumber }
    });
    if (!existingCardCredit) {
      throw new Error("Cart\xE3o n\xE3o encontrado.");
    }
    await prismaClient_default.creditCard.delete({
      where: { cardNumber: encryptedCardNumber }
    });
    return { message: "Cart\xE3o deletado com sucesso." };
  }
  static async updateCard(cardNumber, updateData) {
    const encryptedCardNumber = this.encrypt(cardNumber);
    const existingCardCredit = await prismaClient_default.creditCard.findUnique({
      where: { cardNumber: encryptedCardNumber }
    });
    if (!existingCardCredit) {
      throw new Error("Cart\xE3o n\xE3o encontrado.");
    }
    if (updateData.password) {
      updateData.password = await import_bcrypt2.default.hash(updateData.password, 10);
    }
    if (updateData.cardNumber) {
      updateData.cardNumber = this.encrypt(updateData.cardNumber);
    }
    if (updateData.cvv) {
      updateData.cvv = this.encrypt(updateData.cvv);
    }
    const updatedCard = await prismaClient_default.creditCard.update({
      where: { cardNumber: encryptedCardNumber },
      data: updateData
    });
    return updatedCard;
  }
};
var Card_credit_service_default = CardCredit;

// src/Controllers/Card_Credit.Controller.ts
var CardCreditController = class {
  static async createCardCredit(req, res) {
    try {
      const cardData = req.body;
      const newCard = await Card_credit_service_default.createCardCredit(cardData);
      return res.status(201).json(newCard);
    } catch (error) {
      if (error === "Cart\xE3o j\xE1 cadastrado.") {
        return res.status(400).json({ error });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async getAllCards(req, res) {
    try {
      const cards = await Card_credit_service_default.getAllCards();
      return res.status(200).json(cards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async getUniqueCard(req, res) {
    try {
      const { cardNumber } = req.params;
      const card = await Card_credit_service_default.getUniqueCard(cardNumber);
      return res.status(200).json(card);
    } catch (error) {
      if (error === "Cart\xE3o n\xE3o encontrado.") {
        return res.status(404).json({ error });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async deleteCard(req, res) {
    try {
      const { cardNumber } = req.params;
      const response = await Card_credit_service_default.deleteCard(cardNumber);
      return res.status(200).json(response);
    } catch (error) {
      if (error === "Cart\xE3o n\xE3o encontrado.") {
        return res.status(404).json({ error });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  static async updateCard(req, res) {
    try {
      const { cardNumber } = req.params;
      const updateData = req.body;
      const updatedCard = await Card_credit_service_default.updateCard(cardNumber, updateData);
      return res.status(200).json(updatedCard);
    } catch (error) {
      if (error === "Cart\xE3o n\xE3o encontrado.") {
        return res.status(404).json({ error });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
};
var Card_Credit_Controller_default = CardCreditController;

// src/Service/Auth/Auth.Service.ts
var import_client2 = require("@prisma/client");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcrypt3 = __toESM(require("bcrypt"));
var prisma2 = new import_client2.PrismaClient();
var AuthService = class {
  secretKey;
  constructor() {
    this.secretKey = process.env.JWT_SECRET_TOKEN || "defaultSecretKey";
  }
  async hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await import_bcrypt3.default.hash(password, saltRounds);
    return hashedPassword;
  }
  async comparePassword(password, hashedPassword) {
    const isMatch = await import_bcrypt3.default.compare(password, hashedPassword);
    return isMatch;
  }
  generateToken(user) {
    const payload = { id: user.id, name: user.name, email: user.email };
    const token = import_jsonwebtoken.default.sign(payload, this.secretKey, { expiresIn: "1h" });
    return token;
  }
  verifyToken(token) {
    return import_jsonwebtoken.default.verify(token, this.secretKey);
  }
  async authenticate(email, password) {
    const user = await prisma2.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Usu\xE1rio n\xE3o encontrado");
    }
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha inv\xE1lida");
    }
    return this.generateToken(user);
  }
};
var Auth_Service_default = new AuthService();

// src/Controllers/Auth/Auth.Controller.ts
var AuthController = class {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await Auth_Service_default.authenticate(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
};
var Auth_Controller_default = AuthController;

// src/routes/routes.service.ts
var import_multer3 = __toESM(require("multer"));
var router = import_express.default.Router();
var upload = (0, import_multer3.default)({ storage: multer_conf_default("car-image") });
router.get("/", async (req, res) => {
  res.send("Hello World!");
});
router.post("/create-user", UserController.createUser);
router.get("/get-All-User", UserController.getUser);
router.get("/get-user/:id", UserController.getUserById);
router.delete("/delete-user/:id", UserController.deleteUser);
router.put("/update-user/:id", UserController.updateUser);
router.post("/create-car", upload.single("imagem"), Cars_Controller_default.createCar);
router.get("/get-All-cars", Cars_Controller_default.getCar);
router.get("/get-Unique-car/:id", Cars_Controller_default.getByIdCar);
router.delete("/delete-car/:id", Cars_Controller_default.deleteCar);
router.put("/update-car/:id", Cars_Controller_default.updateCar);
router.post("/create-reserva", Reserva_Controller_default.createReserva);
router.get("/get-reserva", Reserva_Controller_default.getAllReservas);
router.get("/get-reserva/:id", Reserva_Controller_default.getUniqueReserva);
router.delete("/delete-reserva/:id", Reserva_Controller_default.deleteReserva);
router.put("/update-reserva/:id", Reserva_Controller_default.updateReserva);
router.post("/create-card_credit", Card_Credit_Controller_default.createCardCredit);
router.get("/get_card_credit", Card_Credit_Controller_default.getAllCards);
router.delete("/delete-card-credit/:id", Card_Credit_Controller_default.deleteCard);
router.get("get-unique-card/:id", Card_Credit_Controller_default.getUniqueCard);
router.put("/update_card_credit/:id", Card_Credit_Controller_default.updateCard);
router.post("/log-user", Auth_Controller_default.login);
var routes_service_default = router;
