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

// src/Service/Card_credit.service.ts
var Card_credit_service_exports = {};
__export(Card_credit_service_exports, {
  default: () => Card_credit_service_default
});
module.exports = __toCommonJS(Card_credit_service_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/Card_credit.service.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");
var card_creditSchema = import_zod.z.object({
  cardNumber: import_zod.z.string({}).max(19, { message: "Numero de Cart\xE3o Inv\xE1lido" }),
  expiration: import_zod.z.string(),
  cvv: import_zod.z.string().regex(/^\d{3,4}$/, { message: "CVV Inv\xE1lido" }),
  password: import_zod.z.string().min(8, { message: "Precisa de no m\xEDnimo 8 caracteres." }),
  user_id: import_zod.z.string(),
  saldo: import_zod.z.number()
});
var CardCredit = class {
  static async createCardCredit(CardCredit2) {
    const { cardNumber, expiration, cvv, password, user_id, saldo } = card_creditSchema.parse(CardCredit2);
    const existingCard = await prismaClient_default.creditCard.findUnique({
      where: {
        cardNumber
      }
    });
    if (existingCard)
      throw new Error("Cart\xE3o j\xE1 cadastrado.");
    ;
    const passwordHash = await import_bcrypt.default.hash(password, 10);
    const data = {
      cardNumber,
      expiration: new Date(expiration).toISOString(),
      cvv,
      password: passwordHash,
      user_id,
      saldo
    };
    const card = prismaClient_default.creditCard.create({
      data
    });
    return card;
  }
  static async getAllCards() {
    const cards = await prismaClient_default.creditCard.findMany();
    return cards;
  }
  static async getUniqueCard(cardNumber) {
    const card = await prismaClient_default.creditCard.findUnique({
      where: { cardNumber }
    });
    if (!card) {
      throw new Error("Cart\xE3o n\xE3o encontrado.");
    }
    return card;
  }
  static async deleteCard(cardNumber) {
    const existingCardCredit = await prismaClient_default.creditCard.findUnique({
      where: { cardNumber }
    });
    if (!existingCardCredit) {
      throw new Error("Cart\xE3o n\xE3o encontrado.");
    }
    await prismaClient_default.creditCard.delete({
      where: { cardNumber }
    });
    return { message: "Cart\xE3o deletado com sucesso." };
  }
  static async updateCard(cardNumber, updateData) {
    const existingCardCredit = await prismaClient_default.creditCard.findUnique({
      where: { cardNumber }
    });
    if (!existingCardCredit) {
      throw new Error("Cart\xE3o n\xE3o encontrado.");
    }
    if (updateData.password) {
      updateData.password = await import_bcrypt.default.hash(updateData.password, 10);
    }
    const updatedCard = await prismaClient_default.creditCard.update({
      where: { cardNumber },
      data: updateData
    });
    return updatedCard;
  }
};
var Card_credit_service_default = CardCredit;
