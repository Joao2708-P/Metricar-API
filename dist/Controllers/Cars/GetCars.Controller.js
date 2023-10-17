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

// src/Controllers/Cars/GetCars.Controller.ts
var GetCars_Controller_exports = {};
__export(GetCars_Controller_exports, {
  default: () => GetCarController
});
module.exports = __toCommonJS(GetCars_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/Cars/GetCars.Controller.ts
async function GetCarController(req, res) {
  try {
    const cars = await prismaClient_default.car.findMany();
    return res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar carro." });
  }
}
