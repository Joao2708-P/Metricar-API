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

// src/Service/Car.Service.ts
var Car_Service_exports = {};
__export(Car_Service_exports, {
  default: () => Car_Service_default
});
module.exports = __toCommonJS(Car_Service_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/Car.Service.ts
var import_zod = require("zod");
var createCarSchema = import_zod.z.object({
  name: import_zod.z.string(),
  imagem: import_zod.z.string(),
  preco: import_zod.z.number().min(0),
  quilometragem: import_zod.z.number().min(0),
  ano: import_zod.z.number(),
  condicao: import_zod.z.string(),
  exterior_color: import_zod.z.string(),
  interior_color: import_zod.z.string(),
  disponibilidade: import_zod.z.boolean(),
  tipo_do_carro_id: import_zod.z.string()
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
      tipo_do_carro_id
    } = createCarSchema.parse(carData);
    const data = {
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
