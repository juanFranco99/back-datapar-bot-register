"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entidad_controller_1 = __importDefault(require("../controllers/entidad.controller"));
class EntidadRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', entidad_controller_1.default.getAllEntidades);
        this.router.get('/:codigo', entidad_controller_1.default.getEntidadById);
        this.router.post('/', entidad_controller_1.default.addEntidad);
        this.router.put('/:codigo', entidad_controller_1.default.updateEntidad);
        this.router.delete('/:codigo', entidad_controller_1.default.deleteEntidad);
    }
}
const entidadRoute = new EntidadRoute();
exports.default = entidadRoute.router;
