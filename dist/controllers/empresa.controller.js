"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const empresa_1 = require("../entities/empresa");
class EmpresaController {
    getAllEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresas = yield typeorm_1.getRepository(empresa_1.Empresa).find();
            return res.json(empresas);
        });
    }
    getEmpresaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let codigo = req.params.codigo;
            if (codigo) {
                try {
                    const empresa = yield typeorm_1.getRepository(empresa_1.Empresa).findOne(codigo);
                }
                catch (err) {
                    return res.json(err);
                }
            }
            else {
                return res.json({ error: 'Código no encontrado' });
            }
        });
    }
    addEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let empresaData = req.body;
            let newEmpresa = typeorm_1.getRepository(empresa_1.Empresa).create(empresaData);
            if (newEmpresa) {
                try {
                    const result = yield typeorm_1.getRepository(empresa_1.Empresa).save(newEmpresa);
                    return res.json(result);
                }
                catch (err) {
                    return res.json(err);
                }
            }
            else {
                return res.json({ error: 'Error al registrar empresa' });
            }
        });
    }
    updateEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let codigo = req.params.codigo;
            const empresa = yield typeorm_1.getRepository(empresa_1.Empresa).findOne(codigo);
            if (empresa) {
                try {
                    typeorm_1.getRepository(empresa_1.Empresa).merge(empresa, req.body);
                    const result = yield typeorm_1.getRepository(empresa_1.Empresa).save(empresa);
                    return res.json(result);
                }
                catch (error) {
                    return res.json(error);
                }
            }
            else {
                return res.json({ error: 'Empresa no encontrada' });
            }
        });
    }
    deleteEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = req.params.codigo;
            if (codigo) {
                try {
                    yield typeorm_1.getRepository(empresa_1.Empresa).delete(codigo);
                    return res.json({ info: 'Empresa eliminada' });
                }
                catch (error) {
                    return res.json(error);
                }
            }
            else {
                return res.json({ error: 'Codigo no encontrado' });
            }
        });
    }
}
const empresaController = new EmpresaController();
exports.default = empresaController;
