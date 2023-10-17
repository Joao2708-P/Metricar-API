"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Controllers/Card_credit/GetUniqueCard_Credit.Controller.ts
var GetUniqueCard_Credit_Controller_exports = {};
__export(GetUniqueCard_Credit_Controller_exports, {
  default: () => GetUniqueCard_CreditController
});
module.exports = __toCommonJS(GetUniqueCard_Credit_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

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
