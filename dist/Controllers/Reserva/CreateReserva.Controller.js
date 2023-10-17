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

// src/Controllers/Reserva/CreateReserva.Controller.ts
var CreateReserva_Controller_exports = {};
__export(CreateReserva_Controller_exports, {
  default: () => CreateReservaController
});
module.exports = __toCommonJS(CreateReserva_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/Reserva/CreateReserva.Controller.ts
var import_zod = require("zod");
var reserveSchema = import_zod.z.object({
  data_da_reserva: import_zod.z.date(),
  data_da_devolucao: import_zod.z.date(),
  id_user: import_zod.z.string(),
  id_car: import_zod.z.string(),
  preco_total: import_zod.z.number().min(0),
  id_credit_card: import_zod.z.string()
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
