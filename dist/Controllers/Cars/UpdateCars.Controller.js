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

// src/Controllers/Cars/UpdateCars.Controller.ts
var UpdateCars_Controller_exports = {};
__export(UpdateCars_Controller_exports, {
  default: () => UpdateCars_Controller_default
});
module.exports = __toCommonJS(UpdateCars_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/Cars/UpdateCars.Controller.ts
var import_zod = require("zod");
var updateCarSchema = import_zod.z.object({
  name: import_zod.z.string().optional(),
  imagem: import_zod.z.string().optional(),
  preco: import_zod.z.number().min(0).optional(),
  quilometragem: import_zod.z.number().min(0).optional(),
  ano: import_zod.z.number().optional(),
  condicao: import_zod.z.string().optional(),
  exterior_color: import_zod.z.string().optional(),
  interior_color: import_zod.z.string().optional(),
  disponibilidade: import_zod.z.boolean().optional(),
  tipo_do_carro_id: import_zod.z.string().optional()
});
async function UpdateCars_Controller_default(req, res) {
  try {
    const { id } = req.params;
    const updates = updateCarSchema.parse(req.body);
    const existingCar = await prismaClient_default.car.findUnique({
      where: {
        id
      }
    });
    if (!existingCar) {
      return res.status(404).json("Carro n\xE3o encontrado.");
    }
    const updatedCar = await prismaClient_default.car.update({
      where: {
        id
      },
      data: updates
    });
    return res.status(200).json(updatedCar);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
}
