"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_controller_1 = __importDefault(require("../controllers/Auth.controller"));
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', Auth_controller_1.default.login);
        /*this.router.get('/:username', usuarioController.getUsuarioById);
        this.router.post('/', usuarioController.addUsuario);
        this.router.put('/:username', usuarioController.updateUsuario);
        this.router.delete('/:username', usuarioController.deleteUsuario);*/
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
