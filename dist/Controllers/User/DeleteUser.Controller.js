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

// src/Controllers/User/DeleteUser.Controller.ts
var DeleteUser_Controller_exports = {};
__export(DeleteUser_Controller_exports, {
  default: () => DeleteUserController
});
module.exports = __toCommonJS(DeleteUser_Controller_exports);

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/User/DeleteUser.Controller.ts
var import_zod = require("zod");
var deleteSchema = import_zod.z.object({
  email: import_zod.z.string().email({ message: "Email Inv\xE1lido." })
});
async function DeleteUserController(req, res) {
  try {
    const { email } = deleteSchema.parse(req.body);
    const existsUser = prismaClient_default.user.findUnique({
      where: {
        email
      }
    });
    if (!existsUser)
      return res.status(404).json({ erro: "Usu\xE1rio n\xE3o encontrado." });
    const deleteUser = await prismaClient_default.user.delete({
      where: {
        email
      }
    });
    return res.status(200).json(deleteUser);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}
