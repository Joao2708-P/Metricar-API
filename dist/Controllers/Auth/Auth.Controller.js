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

// src/Controllers/Auth/Auth.Controller.ts
var Auth_Controller_exports = {};
__export(Auth_Controller_exports, {
  default: () => Auth_Controller_default
});
module.exports = __toCommonJS(Auth_Controller_exports);

// src/Service/Auth/Auth.Service.ts
var import_client = require("@prisma/client");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcrypt = __toESM(require("bcrypt"));
var prisma = new import_client.PrismaClient();
var AuthService = class {
  secretKey;
  constructor() {
    this.secretKey = process.env.JWT_SECRET_TOKEN || "defaultSecretKey";
  }
  async hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await import_bcrypt.default.hash(password, saltRounds);
    return hashedPassword;
  }
  async comparePassword(password, hashedPassword) {
    const isMatch = await import_bcrypt.default.compare(password, hashedPassword);
    return isMatch;
  }
  generateToken(user) {
    const payload = { id: user.id, name: user.name, email: user.email };
    const token = import_jsonwebtoken.default.sign(payload, this.secretKey, { expiresIn: "1h" });
    return token;
  }
  verifyToken(token) {
    return import_jsonwebtoken.default.verify(token, this.secretKey);
  }
  async authenticate(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Usu\xE1rio n\xE3o encontrado");
    }
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha inv\xE1lida");
    }
    return this.generateToken(user);
  }
};
var Auth_Service_default = new AuthService();

// src/Controllers/Auth/Auth.Controller.ts
var AuthController = class {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await Auth_Service_default.authenticate(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
};
var Auth_Controller_default = AuthController;
