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
        this.router.get('/', dolphin_crud_controller_1.default.getAllEntidades); /* ----BUSCA TODAS LAS ENTIDADES DE TODAS LAS EMPRESAS */
        this.router.get('/:codigoEmpresa', dolphin_crud_controller_1.default.getAllEntidadesByEmpresa); /* ----BUSCA TODAS LAS ENTIDADES DE AL EMPRESA */
        this.router.get('/entidad/:codigo', dolphin_crud_controller_1.default.getEntidadByIdInterno); /* ----BUSCA LA ENTIDAD POR ID INTERNO */
        this.router.get('/entidad/list/:codigoDolphin', dolphin_crud_controller_1.default.getEntidadByCodigoDolphin); /* ----BUSCA TODAS LAS ENTIDADES POR CODIGO DOLPHIN*/
        this.router.post('/entidad', dolphin_crud_controller_1.default.addEntidad); /*AGREGAR NUEVA ENTIDAD */
        this.router.put('/entidad/:codigo', dolphin_crud_controller_1.default.updateEntidad); /*ACTUALIZAR ENTIDAD */
        this.router.delete('/entidad/:codigo', dolphin_crud_controller_1.default.deleteEntidad); /*ELLIMINAR ENTIDAD*/
    }
}
const dolphinCrudRoutes = new DolphinCrudRoute();
exports.default = dolphinCrudRoutes.router;
