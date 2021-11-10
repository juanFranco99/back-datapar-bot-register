"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioDolphin_controller_1 = __importDefault(require("../controllers/usuarioDolphin.controller"));
class UsuarioDolphinRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuarioDolphin_controller_1.default.getAllUsuarios);
        /*this.router.get('/:username', usuarioController.getUsuarioById);
        this.router.post('/', usuarioController.addUsuario);
        this.router.put('/:username', usuarioController.updateUsuario);
        this.router.put('/perfil/:username', usuarioController.updatePerfil);
        this.router.delete('/:username', usuarioController.deleteUsuario);*/
    }
}
const usuarioDolphinRoutes = new UsuarioDolphinRoutes();
exports.default = usuarioDolphinRoutes.router;
