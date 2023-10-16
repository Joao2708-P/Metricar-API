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

// src/routes/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"));

// src/Controllers/User/CreateUserController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_zod = require("zod");

// src/Database/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/Controllers/User/CreateUserController.ts
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

// src/Controllers/User/GetUserController.ts
async function GetUserController(req, res) {
  try {
    const users = await prismaClient_default.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar usu\xE1rios." });
  }
}

// src/Controllers/User/GetUniqueUserController.ts
var import_zod2 = require("zod");
var findUniqueSchema = import_zod2.z.object({
  email: import_zod2.z.string().email({ message: "Email inv\xE1lido" })
});
async function getUniqueUserController(req, res) {
  try {
    const { email } = findUniqueSchema.parse(req.body);
    const getUnique = await prismaClient_default.user.findUnique({
      where: {
        email: String(email)
      }
    });
    if (!getUnique) {
      return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado." });
    }
    return res.status(200).json(getUnique);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

// src/Controllers/User/DeleteUserController.ts
var import_zod3 = require("zod");
var deleteSchema = import_zod3.z.object({
  email: import_zod3.z.string().email({ message: "Email Inv\xE1lido." })
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
    const deleteUser = prismaClient_default.user.delete({
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

// src/Controllers/User/UpdateUserController.ts
var import_zod4 = require("zod");
var import_bcrypt2 = __toESM(require("bcrypt"));
var userSchema2 = import_zod4.z.object({
  name: import_zod4.z.string(),
  email: import_zod4.z.string().email({ message: "Email inv\xE1lido!" }),
  password: import_zod4.z.string().min(8, { message: "Senha precisa conter no m\xEDnimo 8 caracteres." }),
  card_credit: import_zod4.z.string().max(19)
});
async function UpdateUserController(req, res) {
  try {
    const { name, email, password, card_credit } = userSchema2.parse(req.body);
    const { id } = req.params;
    const existingUser = prismaClient_default.user.findUnique({
      where: {
        email
      }
    });
    if (!existingUser)
      return res.status(404).json({ erro: "Usu\xE1rio n\xE3o encontrado" });
    const passwordHash = import_bcrypt2.default.hash(password, 10);
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

// src/routes/routes.ts
var router = import_express.default.Router();
router.get("/", async (req, res) => {
  res.send("Hello World!");
});
router.post("/create-user", CreateUserController);
router.get("/get-All-User", GetUserController);
router.get("/get-user", getUniqueUserController);
router.delete("/delete-user", DeleteUserController);
router.put("/update-user", UpdateUserController);
var routes_default = router;
