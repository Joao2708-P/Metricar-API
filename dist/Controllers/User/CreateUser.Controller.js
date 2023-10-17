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

// src/Controllers/User/CreateUser.Controller.ts
var CreateUser_Controller_exports = {};
__export(CreateUser_Controller_exports, {
  default: () => CreateUserController
});
module.exports = __toCommonJS(CreateUser_Controller_exports);
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/User/CreateUser.Controller.ts
var userSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." }),
  card_credit: import_zod.z.string().max(19)
});
async function CreateUserController(req, res) {
  try {
    const { name, email, password, card_credit } = userSchema.parse(req.body);
    const existingUser = await prismaClient_default.user.findUnique({
      where: {
        email
      }
    });
    if (existingUser) {
      return res.status(409).json({ error: "Email de usu\xE1rio j\xE1 cadastrado." });
    }
    const passwordHash = await import_bcrypt.default.hash(password, 10);
    const data = {
      name,
      email,
      password: passwordHash,
      card_credit
    };
    const createdUser = await prismaClient_default.user.create({
      data
    });
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao cadastrar o usu\xE1rio" });
  }
}
