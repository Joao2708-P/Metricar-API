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

// src/Controllers/Cars.Controller.ts
var Cars_Controller_exports = {};
__export(Cars_Controller_exports, {
  default: () => Cars_Controller_default
});
module.exports = __toCommonJS(Cars_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/Car.Service.ts
var import_zod = require("zod");
var import_buffer = require("buffer");
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_uuid = require("uuid");
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
  type_slug: import_zod.z.string(),
  promotion_slug: import_zod.z.boolean()
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
    const uploadsDir = import_path.default.join(__dirname, "uploads");
    const filePath = import_path.default.join(uploadsDir, fileName);
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
