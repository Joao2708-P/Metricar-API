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

// src/Controllers/Reserva.Controller.ts
var Reserva_Controller_exports = {};
__export(Reserva_Controller_exports, {
  default: () => Reserva_Controller_default
});
module.exports = __toCommonJS(Reserva_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/Reserva.Service.ts
var import_zod = require("zod");
var reserveSchema = import_zod.z.object({
  data_da_reserva: import_zod.z.date(),
  data_da_devolucao: import_zod.z.date(),
  id_user: import_zod.z.string(),
  id_car: import_zod.z.string(),
  preco_total: import_zod.z.number().min(0),
  id_credit_card: import_zod.z.string()
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
