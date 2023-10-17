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

// src/Controllers/User/CreateUser.Controller.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/User/CreateUser.Controller.ts
var userSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." }),
  card_credit: import_zod.z.string().max(19)
});
async function CreateUserController(req, res) {
  try {
    const { name, email, password, card_credit } = userSchema.parse(req.body);
    const existingUser = await prismaClient_default.user.findUnique({
      where: {
        email
      }
    });
    if (existingUser) {
      return res.status(409).json({ error: "Email de usu\xE1rio j\xE1 cadastrado." });
    }
    const passwordHash = await import_bcrypt.default.hash(password, 10);
    const data = {
      name,
      email,
      password: passwordHash,
      card_credit
    };
    const createdUser = await prismaClient_default.user.create({
      data
    });
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao cadastrar o usu\xE1rio" });
  }
}

// src/Controllers/User/GetUser.Controller.ts
async function GetUserController(req, res) {
  try {
    const users = await prismaClient_default.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar usu\xE1rios." });
  }
}

// src/Controllers/User/GetUniqueUser.Controller.ts
var import_zod2 = require("zod");
var findUniqueSchema = import_zod2.z.object({
  email: import_zod2.z.string().email({ message: "Email inv\xE1lido" })
});
async function getUniqueUserController(req, res) {
  try {
    const { email } = findUniqueSchema.parse(req.body);
    const getUnique = await prismaClient_default.user.findUnique({
      where: {
        email: String(email)
      }
    });
    if (!getUnique) {
      return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado." });
    }
    return res.status(200).json(getUnique);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

// src/Controllers/User/DeleteUser.Controller.ts
var import_zod3 = require("zod");
var deleteSchema = import_zod3.z.object({
  email: import_zod3.z.string().email({ message: "Email Inv\xE1lido." })
});
async function DeleteUserController(req, res) {
  try {
    const { email } = deleteSchema.parse(req.body);
    const existsUser = prismaClient_default.user.findUnique({
      where: {
        email
      }
    });
    if (!existsUser)
      return res.status(404).json({ erro: "Usu\xE1rio n\xE3o encontrado." });
    const deleteUser = await prismaClient_default.user.delete({
      where: {
        email
      }
    });
    return res.status(200).json(deleteUser);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// src/Controllers/User/UpdateUser.Controller.ts
var import_zod4 = require("zod");
var import_bcrypt2 = __toESM(require("bcrypt"));
var userSchema2 = import_zod4.z.object({
  name: import_zod4.z.string(),
  email: import_zod4.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod4.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." }),
  card_credit: import_zod4.z.string().max(19)
});
async function UpdateUserController(req, res) {
  try {
    const { name, email, password, card_credit } = userSchema2.parse(req.body);
    const { id } = req.params;
    const existingUser = prismaClient_default.user.findUnique({
      where: {
        email
      }
    });
    if (!existingUser)
      return res.status(404).json({ erro: "Usu\xE1rio n\xE3o encontrado" });
    const passwordHash = import_bcrypt2.default.hash(password, 10);
    const data = {
      name,
      email,
      password: passwordHash,
      card_credit
    };
    const updateUser = await prismaClient_default.user.update({
      where: {
        id
      },
      data
    });
    return res.status(200).json(updateUser);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

// src/Controllers/Cars/CreateCars.Controller.ts
var import_zod5 = require("zod");
var createCarSchema = import_zod5.z.object({
  name: import_zod5.z.string(),
  imagem: import_zod5.z.string(),
  preco: import_zod5.z.number().min(0),
  quilometragem: import_zod5.z.number().min(0),
  ano: import_zod5.z.number(),
  condicao: import_zod5.z.string(),
  exterior_color: import_zod5.z.string(),
  interior_color: import_zod5.z.string(),
  disponibilidade: import_zod5.z.boolean(),
  tipo_do_carro_id: import_zod5.z.string()
});
async function CreateCars_Controller_default(req, res) {
  try {
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
      tipo_do_carro_id
    } = createCarSchema.parse(req.body);
    const { id } = req.params;
    const existingCar = await prismaClient_default.car.findUnique({
      where: {
        id
      }
    });
    if (existingCar)
      return res.status(404).json("Carro existente.");
    const createCar = await prismaClient_default.car.create({
      data: {
        name,
        imagem,
        preco,
        quilometragem,
        ano,
        condicao,
        exterior_color,
        interior_color,
        disponibilidade,
        tipo_do_carro_id
      }
    });
    return res.status(200).json(createCar);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
}

// src/Controllers/Cars/GetCars.Controller.ts
async function GetCarController(req, res) {
  try {
    const cars = await prismaClient_default.car.findMany();
    return res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar carro." });
  }
}

// src/Controllers/Cars/GetUniqueCar.Controller.ts
async function GetUniqueCarController(req, res) {
  try {
    const { id } = req.params;
    const getUnique = await prismaClient_default.car.findUnique({
      where: {
        id: String(id)
      }
    });
    if (!getUnique) {
      return res.status(404).json({ error: "Carro n\xE3o encontrado." });
    }
    return res.status(200).json(getUnique);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

// src/Controllers/Cars/DeleteCars.Controller.ts
async function DeleteCarController(req, res) {
  try {
    const { id } = req.params;
    const deleteCar = await prismaClient_default.car.delete({
      where: {
        id: String(id)
      }
    });
    if (!deleteCar) {
      return res.status(404).json({ error: "Carro n\xE3o encontrado." });
    }
    return res.status(200).json(deleteCar);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

// src/Controllers/Cars/UpdateCars.Controller.ts
var import_zod6 = require("zod");
var updateCarSchema = import_zod6.z.object({
  name: import_zod6.z.string().optional(),
  imagem: import_zod6.z.string().optional(),
  preco: import_zod6.z.number().min(0).optional(),
  quilometragem: import_zod6.z.number().min(0).optional(),
  ano: import_zod6.z.number().optional(),
  condicao: import_zod6.z.string().optional(),
  exterior_color: import_zod6.z.string().optional(),
  interior_color: import_zod6.z.string().optional(),
  disponibilidade: import_zod6.z.boolean().optional(),
  tipo_do_carro_id: import_zod6.z.string().optional()
});
async function UpdateCars_Controller_default(req, res) {
  try {
    const { id } = req.params;
    const updates = updateCarSchema.parse(req.body);
    const existingCar = await prismaClient_default.car.findUnique({
      where: {
        id
      }
    });
    if (!existingCar) {
      return res.status(404).json("Carro n\xE3o encontrado.");
    }
    const updatedCar = await prismaClient_default.car.update({
      where: {
        id
      },
      data: updates
    });
    return res.status(200).json(updatedCar);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
}

// src/Controllers/Reserva/CreateReserva.Controller.ts
var import_zod7 = require("zod");
var reserveSchema = import_zod7.z.object({
  data_da_reserva: import_zod7.z.date(),
  data_da_devolucao: import_zod7.z.date(),
  id_user: import_zod7.z.string(),
  id_car: import_zod7.z.string(),
  preco_total: import_zod7.z.number().min(0),
  id_credit_card: import_zod7.z.string()
});
async function CreateReservaController(req, res) {
  try {
    const {
      data_da_reserva,
      data_da_devolucao,
      id_user,
      id_car,
      preco_total,
      id_credit_card
    } = reserveSchema.parse(req.body);
    const existingReservas = await prismaClient_default.reserva.findMany({
      where: {
        data_da_reserva
      }
    });
    if (existingReservas && existingReservas.length > 0) {
      return res.status(400).json({ erro: "J\xE1 existe uma reserva para esta data de reserva." });
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
    return res.status(200).json(createReserva);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// src/Controllers/Reserva/GetReserva.Controller.ts
async function GetReservaController(req, res) {
  try {
    const getReserva = await prismaClient_default.reserva.findMany();
    return res.status(200).json(getReserva);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

// src/Controllers/Reserva/DeleteReserva.Controller.ts
var import_zod8 = require("zod");
var deleteSchema2 = import_zod8.z.object({
  id: import_zod8.z.string()
});
async function DeleteReservaController(req, res) {
  try {
    const { id } = deleteSchema2.parse(req.body);
    const existingReservas = await prismaClient_default.reserva.findUnique({
      where: {
        id
      }
    });
    if (!existingReservas)
      return res.status(404).json({ erro: "Reserva n\xE3o existente" });
    const deleteReserva = await prismaClient_default.reserva.delete({
      where: {
        id
      }
    });
    return res.status(200).json(deleteReserva);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

// src/Controllers/Reserva/UpdateReserva.Controller.ts
var import_zod9 = require("zod");
var reserveSchema2 = import_zod9.z.object({
  data_da_reserva: import_zod9.z.date(),
  data_da_devolucao: import_zod9.z.date(),
  id_user: import_zod9.z.string(),
  id_car: import_zod9.z.string(),
  preco_total: import_zod9.z.number().min(0),
  id_credit_card: import_zod9.z.string()
});
async function UpdateReservaController(req, res) {
  try {
    const {
      data_da_reserva,
      data_da_devolucao,
      id_user,
      id_car,
      preco_total,
      id_credit_card
    } = reserveSchema2.parse(req.body);
    const { id } = req.params;
    const existingReserva = prismaClient_default.reserva.findUnique({
      where: {
        id
      }
    });
    if (!existingReserva)
      return res.status(404).json({ erro: "Reserva n\xE3o encontrada" });
    const data = {
      data_da_reserva,
      data_da_devolucao,
      id_user,
      id_car,
      preco_total,
      id_credit_card
    };
    const updateUser = await prismaClient_default.reserva.update({
      where: {
        id
      },
      data
    });
    return res.status(200).json(updateUser);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

// src/Controllers/Card_credit/CreateCard_Credit.Controller.ts
var import_bcrypt3 = __toESM(require("bcrypt"));
var import_zod10 = require("zod");
var card_creditSchema = import_zod10.z.object({
  cadNumber: import_zod10.z.string({}).max(19, { message: "Numero de Cart\xE3o Inv\xE1lido" }),
  expiration: import_zod10.z.date(),
  cvv: import_zod10.z.string(),
  password: import_zod10.z.string().min(8, { message: "Precisa de no m\xEDnimo 8 caracteres." }),
  user_id: import_zod10.z.string(),
  saldo: import_zod10.z.number()
});
async function CreateCar_CreditController(req, res) {
  try {
    const { cadNumber, expiration, cvv, password, user_id, saldo } = card_creditSchema.parse(req.body);
    const { id } = req.params;
    const existingCard = await prismaClient_default.creditCard.findUnique({
      where: {
        id: String(id)
      }
    });
    if (existingCard)
      return res.status(404).json({ erro: "Cart\xE3o j\xE1 cadastrado." });
    const passwordHash = await import_bcrypt3.default.hash(password, 10);
    const data = {
      cadNumber,
      expiration,
      cvv,
      password: passwordHash,
      // Use o hash da senha
      user_id,
      saldo
    };
    const createCard_credit = await prismaClient_default.creditCard.create({
      data
    });
    return res.status(200).json(createCard_credit);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// src/Controllers/Card_credit/GetUniqueCard_Credit.Controller.ts
async function GetUniqueCard_CreditController(req, res) {
  try {
    const { id } = req.params;
    const getUniqueCard_credit = await prismaClient_default.creditCard.findUnique({
      where: {
        id: String(id)
      }
    });
    return res.status(200).json(getUniqueCard_credit);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
}

// src/Controllers/Card_credit/UpdateCard_Credit.Controller.ts
var import_bcrypt4 = __toESM(require("bcrypt"));
var import_zod11 = require("zod");
var card_creditSchema2 = import_zod11.z.object({
  cadNumber: import_zod11.z.string({}).max(19, { message: "N\xFAmero de Cart\xE3o Inv\xE1lido" }),
  expiration: import_zod11.z.date(),
  cvv: import_zod11.z.string(),
  password: import_zod11.z.string().min(8, { message: "Precisa ter no m\xEDnimo 8 caracteres." }),
  user_id: import_zod11.z.string(),
  saldo: import_zod11.z.number()
});
async function UpdateCard_CreditController(req, res) {
  try {
    const { cadNumber, expiration, cvv, password, user_id, saldo } = card_creditSchema2.parse(req.body);
    const { id } = req.params;
    const existingCard = await prismaClient_default.creditCard.findUnique({
      where: {
        id: String(id)
      }
    });
    if (!existingCard) {
      return res.status(404).json({ erro: "Cart\xE3o n\xE3o encontrado." });
    }
    const passwordHash = await import_bcrypt4.default.hash(password, 10);
    const data = {
      cadNumber,
      expiration,
      cvv,
      password: passwordHash,
      user_id,
      saldo
    };
    const updatedCard_credit = await prismaClient_default.creditCard.update({
      where: {
        id: String(id)
      },
      data
    });
    return res.status(200).json(updatedCard_credit);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// src/routes/routes.service.ts
var router = import_express.default.Router();
router.get("/", async (req, res) => {
  res.send("Hello World!");
});
router.post("/create-user", CreateUserController);
router.get("/get-All-User", GetUserController);
router.get("/get-user", getUniqueUserController);
router.delete("/delete-user", DeleteUserController);
router.put("/update-user", UpdateUserController);
router.post("/create-car", CreateCars_Controller_default);
router.get("/get-All-cars", GetCarController);
router.get("/get-Unique-car", GetUniqueCarController);
router.delete("/delete-car", DeleteCarController);
router.put("/update-car", UpdateCars_Controller_default);
router.post("/create-reserva", CreateReservaController);
router.get("/get-reserva", GetReservaController);
router.delete("/delete-reserva", DeleteReservaController);
router.put("/update-reserva", UpdateReservaController);
router.post("/create-card_credit", CreateCar_CreditController);
router.get("/get_card_credit", GetUniqueCard_CreditController);
router.put("/update_card_credit", UpdateCard_CreditController);
var routes_service_default = router;
