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

// src/Controllers/Card_Credit.Controller.ts
var Card_Credit_Controller_exports = {};
__export(Card_Credit_Controller_exports, {
  default: () => Card_Credit_Controller_default
});
module.exports = __toCommonJS(Card_Credit_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/Card_credit.service.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_crypto_js = __toESM(require("crypto-js"));
var import_zod = require("zod");
var card_creditSchema = import_zod.z.object({
  cardNumber: import_zod.z.string({}).max(19, { message: "Numero de Cart\xE3o Inv\xE1lido" }),
  expiration: import_zod.z.string(),
  cvv: import_zod.z.string().regex(/^\d{3,4}$/, { message: "CVV Inv\xE1lido" }),
  password: import_zod.z.string().min(8, { message: "Precisa de no m\xEDnimo 8 caracteres." }),
  user_id: import_zod.z.string(),
  balance: import_zod.z.number()
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
    const passwordHash = await import_bcrypt.default.hash(password, 10);
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
      updateData.password = await import_bcrypt.default.hash(updateData.password, 10);
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
