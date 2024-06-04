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

// src/Controllers/User.Controller.ts
var User_Controller_exports = {};
__export(User_Controller_exports, {
  default: () => UserController
});
module.exports = __toCommonJS(User_Controller_exports);

// src/Service/CreateUser.Service.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Service/CreateUser.Service.ts
var userSchema = import_zod.z.object({
  name: import_zod.z.string(),
  email: import_zod.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." }),
  card_credit: import_zod.z.string().max(19)
});
var UserService = class {
  static async createUser(userData) {
    const { name, email, password, card_credit } = userSchema.parse(userData);
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
      password: passwordHash,
      card_credit
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
var CreateUser_Service_default = UserService;

// src/Controllers/User.Controller.ts
var UserController = class {
  static async createUser(req, res) {
    try {
      const userData = req.body;
      const createdUser = await CreateUser_Service_default.createUser(userData);
      return res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      if (error === "Email de usu\xE1rio j\xE1 cadastrado.") {
        return res.status(409).json({ error });
      }
      return res.status(400).json({ error: "Erro ao cadastrar o usu\xE1rio" });
    }
  }
  static async getUser(req, res) {
    try {
      const user = await CreateUser_Service_default.getUser();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao cadastrar ao buscar usu\xE1rios" });
    }
  }
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await CreateUser_Service_default.getUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado." });
    }
  }
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUser = await CreateUser_Service_default.updateUser(id, updateData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao atualizar o usu\xE1rio" });
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const message = await CreateUser_Service_default.deleteUser(id);
      return res.status(200).json(message);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao deletar o usu\xE1rio" });
    }
  }
};
