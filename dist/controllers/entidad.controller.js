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
                    let entidad = yield typeorm_1.getRepository(entidad_1.Entidad).findOne(codigo);
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
            const codigoDolpin = req.body.codigo_dolphin;
            const telefonoAntiguo = req.body.telefono_antiguo;
            const empresa = req.body.empresa;
            const entidad = yield typeorm_1.getRepository(entidad_1.Entidad)
                .createQueryBuilder("entidad")
                .where("entidad.id = :codigoDolpin and entidad.telefono = :telefono and entidad.empresa_id = :empresa ", { codigoDolpin: codigoDolpin, telefono: telefonoAntiguo, empresa: empresa })
                .getOne();
            if (entidad) {
                try {
                    typeorm_1.getRepository(entidad_1.Entidad).merge(entidad, req.body);
                    const result = yield typeorm_1.getRepository(entidad_1.Entidad).save(entidad);
                    return res.status(200).json(result);
                }
                catch (error) {
                    return res.status(500).json(error);
                }
            }
            else {
                return res.status(404).json({ error: 'Codigo no encontrado' });
            }
        });
    }
    deleteEntidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigoDolpin = req.body.codigo_dolphin;
            const telefono = req.body.telefono;
            const empresa = req.body.empresa;
            try {
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(entidad_1.Entidad)
                    .where("id = :codigoDolpin and telefono = :telefono and empresa_id = :empresa ", { codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa })
                    .execute();
                return res.status(200).json({ info: 'Eliminado con exito' });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
const entidadController = new EntidadController();
exports.default = entidadController;
