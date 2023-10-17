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

// src/Controllers/User/UpdateUser.Controller.ts
var UpdateUser_Controller_exports = {};
__export(UpdateUser_Controller_exports, {
  default: () => UpdateUserController
});
module.exports = __toCommonJS(UpdateUser_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/User/UpdateUser.Controller.ts
var import_zod = require("zod");
var import_bcrypt = __toESM(require("bcrypt"));
var userSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." }),
  card_credit: import_zod.z.string().max(19)
});
async function UpdateUserController(req, res) {
  try {
    const { name, email, password, card_credit } = userSchema.parse(req.body);
    const { id } = req.params;
    const existingUser = prismaClient_default.user.findUnique({
      where: {
        email
      }
    });
    if (!existingUser)
      return res.status(404).json({ erro: "Usu\xE1rio n\xE3o encontrado" });
    const passwordHash = import_bcrypt.default.hash(password, 10);
    const data = {
      name,
      email,
      password: passwordHash,
      card_credit
    };
    const updateUser = await prismaClient_default.user.update({
      where: {
        id
      },
      data
    });
    return res.status(200).json(updateUser);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
}
