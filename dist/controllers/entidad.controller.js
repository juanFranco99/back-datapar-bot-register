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
const entidad_1 = require("../entities/entidad");
class EntidadController {
    getAllEntidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const entidades = yield typeorm_1.getRepository(entidad_1.Entidad).find();
            return res.json(entidades);
        });
    }
    getEntidadById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let codigo = req.params.codigo;
            if (codigo) {
                try {
                    const entidad = yield typeorm_1.getRepository(entidad_1.Entidad).findOne(codigo);
                    return res.json(entidad);
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
    addEntidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newEntidad = typeorm_1.getRepository(entidad_1.Entidad).create(req.body);
            if (newEntidad) {
                try {
                    const result = yield typeorm_1.getRepository(entidad_1.Entidad).save(newEntidad);
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
    }
    updateEntidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let codigo = req.params.codigo;
            const entidad = yield typeorm_1.getRepository(entidad_1.Entidad).findOne(codigo);
            if (entidad) {
                try {
                    typeorm_1.getRepository(entidad_1.Entidad).merge(entidad, req.body);
                    const result = yield typeorm_1.getRepository(entidad_1.Entidad).save(entidad);
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
    }
    deleteEntidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = req.params.codigo;
            if (codigo) {
                try {
                    yield typeorm_1.getRepository(entidad_1.Entidad).delete(codigo);
                    return res.json({ info: 'Entidad eliminada' });
                }
                catch (error) {
                    return res.json(error);
                }
            }
            else {
                return res.json({ error: 'Codigo no entonctrado' });
            }
        });
    }
}
const entidadController = new EntidadController();
exports.default = entidadController;
