"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuario_controller_1.default.getAllUsuarios);
        this.router.get('/:username', usuario_controller_1.default.getUsuarioById);
        this.router.post('/', usuario_controller_1.default.addUsuario);
        this.router.put('/:username', usuario_controller_1.default.updateUsuario);
        this.router.delete('/:username', usuario_controller_1.default.deleteUsuario);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
