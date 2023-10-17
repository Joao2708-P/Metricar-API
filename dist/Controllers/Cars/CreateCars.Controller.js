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

// src/Controllers/Cars/CreateCars.Controller.ts
var CreateCars_Controller_exports = {};
__export(CreateCars_Controller_exports, {
  default: () => CreateCars_Controller_default
});
module.exports = __toCommonJS(CreateCars_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/Cars/CreateCars.Controller.ts
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
