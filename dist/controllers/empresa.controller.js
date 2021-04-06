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
exports.deleteEmpresa = exports.updateEmpresa = exports.addEmpresa = exports.getEmpresaById = exports.getAllEmpresas = void 0;
const typeorm_1 = require("typeorm");
const empresa_1 = require("../entities/empresa");
const getAllEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empresas = yield typeorm_1.getRepository(empresa_1.Empresa).find();
    return res.json(empresas);
});
exports.getAllEmpresas = getAllEmpresas;
const getEmpresaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let codigo = req.params.codigo;
    if (codigo) {
        try {
            const empresa = yield typeorm_1.getRepository(empresa_1.Empresa).findOne(codigo);
            return res.json(empresa);
        }
        catch (error) {
            return res.json(error);
        }
    }
    else {
        return res.json({ error: 'Codigo no encontrado' });
    }
});
exports.getEmpresaById = getEmpresaById;
const addEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newEmpewsa = typeorm_1.getRepository(empresa_1.Empresa).create(req.body);
    if (newEmpewsa) {
        try {
            const result = yield typeorm_1.getRepository(empresa_1.Empresa).save(newEmpewsa);
            return res.json(result);
        }
        catch (error) {
            return res.json(error);
        }
    }
    else {
        return res.json({ error: 'Error en inserción de datos' });
    }
});
exports.addEmpresa = addEmpresa;
const updateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.json({ error: 'Codigo no encontrado' });
    }
});
exports.updateEmpresa = updateEmpresa;
const deleteEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.json({ error: 'Codigo no entonctrado' });
    }
});
exports.deleteEmpresa = deleteEmpresa;
