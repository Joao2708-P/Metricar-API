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

// src/Controllers/Reserva/DeleteReserva.Controller.ts
var DeleteReserva_Controller_exports = {};
__export(DeleteReserva_Controller_exports, {
  default: () => DeleteReservaController
});
module.exports = __toCommonJS(DeleteReserva_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/Reserva/DeleteReserva.Controller.ts
var import_zod = require("zod");
var deleteSchema = import_zod.z.object({
  id: import_zod.z.string()
});
async function DeleteReservaController(req, res) {
  try {
    const { id } = deleteSchema.parse(req.body);
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
