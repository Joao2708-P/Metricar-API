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

// src/Controllers/Card_credit/CreateCard_Credit.Controller.ts
var CreateCard_Credit_Controller_exports = {};
__export(CreateCard_Credit_Controller_exports, {
  default: () => CreateCar_CreditController
});
module.exports = __toCommonJS(CreateCard_Credit_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/Card_credit/CreateCard_Credit.Controller.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");
var card_creditSchema = import_zod.z.object({
  cadNumber: import_zod.z.string({}).max(19, { message: "Numero de Cart\xE3o Inv\xE1lido" }),
  expiration: import_zod.z.date(),
  cvv: import_zod.z.string(),
  password: import_zod.z.string().min(8, { message: "Precisa de no m\xEDnimo 8 caracteres." }),
  user_id: import_zod.z.string(),
  saldo: import_zod.z.number()
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
    const passwordHash = await import_bcrypt.default.hash(password, 10);
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
