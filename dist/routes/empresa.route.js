"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_controller_1 = __importDefault(require("../controllers/empresa.controller"));
class EmpRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', empresa_controller_1.default.getAllEmpresas);
        this.router.get('/:codigo', empresa_controller_1.default.getEmpresaById);
        this.router.post('/', empresa_controller_1.default.addEmpresa);
        this.router.put('/:codigo', empresa_controller_1.default.updateEmpresa);
        this.router.delete('/:codigo', empresa_controller_1.default.deleteEmpresa);
    }
}
const empRoutes = new EmpRoutes();
exports.default = empRoutes.router;
