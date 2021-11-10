"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dolphin_crud_controller_1 = __importDefault(require("../controllers/dolphin-crud.controller"));
class DolphinCrudRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/entidad', dolphin_crud_controller_1.default.getAllEntidades);
        this.router.get('/entidad/:codigo', dolphin_crud_controller_1.default.getEntidadById);
        this.router.post('/entidad', dolphin_crud_controller_1.default.addEntidad);
        this.router.put('/entidad', dolphin_crud_controller_1.default.updateEntidad);
        this.router.delete('/entidad', dolphin_crud_controller_1.default.deleteEntidad);
    }
}
const dolphinCrudRoutes = new DolphinCrudRoute();
exports.default = dolphinCrudRoutes.router;
