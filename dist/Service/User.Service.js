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

// src/Service/User.Service.ts
var User_Service_exports = {};
__export(User_Service_exports, {
  default: () => User_Service_default
});
module.exports = __toCommonJS(User_Service_exports);
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/User.Service.ts
var userSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." })
});
var UserService = class {
  static async createUser(userData) {
    const { name, email, password } = userSchema.parse(userData);
    const existingUser = await prismaClient_default.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw new Error("Email de usu\xE1rio j\xE1 cadastrado.");
    }
    const passwordHash = await import_bcrypt.default.hash(password, 10);
    const data = {
      name,
      email,
      password: passwordHash
    };
    const createdUser = await prismaClient_default.user.create({
      data
    });
    return createdUser;
  }
  static async getUser() {
    const user = await prismaClient_default.user.findMany();
    return user;
  }
  static async getUserById(userId) {
    const user = await prismaClient_default.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      throw new Error("Usu\xE1rio n\xE3o encontrado.");
    }
    return user;
  }
  static async updateUser(userId, updateData) {
    const existingUser = await prismaClient_default.user.findUnique({
      where: { id: userId }
    });
    if (!existingUser) {
      throw new Error("Usu\xE1rio n\xE3o encontrado.");
    }
    if (updateData.password) {
      updateData.password = await import_bcrypt.default.hash(updateData.password, 10);
    }
    const updatedUser = await prismaClient_default.user.update({
      where: { id: userId },
      data: updateData
    });
    return updatedUser;
  }
  static async deleteUser(userId) {
    const existingUser = await prismaClient_default.user.findUnique({
      where: { id: userId }
    });
    if (!existingUser) {
      throw new Error("Usu\xE1rio n\xE3o encontrado.");
    }
    await prismaClient_default.user.delete({
      where: { id: userId }
    });
    return { message: "Usu\xE1rio deletado com sucesso." };
  }
};
var User_Service_default = UserService;
