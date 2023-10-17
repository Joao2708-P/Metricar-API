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

// src/Controllers/Cars/GetUniqueCar.Controller.ts
var GetUniqueCar_Controller_exports = {};
__export(GetUniqueCar_Controller_exports, {
  default: () => GetUniqueCarController
});
module.exports = __toCommonJS(GetUniqueCar_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/Cars/GetUniqueCar.Controller.ts
async function GetUniqueCarController(req, res) {
  try {
    const { id } = req.params;
    const getUnique = await prismaClient_default.car.findUnique({
      where: {
        id: String(id)
      }
    });
    if (!getUnique) {
      return res.status(404).json({ error: "Carro n\xE3o encontrado." });
    }
    return res.status(200).json(getUnique);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}
