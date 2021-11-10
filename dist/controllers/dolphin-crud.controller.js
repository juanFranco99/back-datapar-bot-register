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
const entidad_1 = require("../entities/entidad");
const codeError_1 = require("../enums/codeError");
class DolphinCrudController {
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
            const codigoDolpin = req.body.codigo_dolphin;
            const telefono = req.body.telefono;
            const empresa = req.body.empresa;
            const entidad = yield typeorm_1.getRepository(entidad_1.Entidad)
                .createQueryBuilder("entidad")
                .where("entidad.id = :codigoDolpin and entidad.telefono = :telefono and entidad.empresa_id = :empresa ", { codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa })
                .getOne();
            const emp = yield typeorm_1.getRepository(empresa_1.Empresa)
                .createQueryBuilder("empresa")
                .where("empresa.id = :empresa", { empresa: empresa })
                .getOne();
            if (entidad) {
                return res.status(200).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.ENTIDAD_YA_REGISTRADA));
            }
            else if (!emp) {
                return res.status(404).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.EMPRESA_NO_REGISTRADA));
            }
            else if (!(emp === null || emp === void 0 ? void 0 : emp.habilitado)) {
                console.log(emp);
                return res.status(404).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.EMPRESA_INHABILIDATA));
            }
            else {
                let newEntidad = typeorm_1.getRepository(entidad_1.Entidad).create(req.body);
                if (newEntidad) {
                    try {
                        yield typeorm_1.getRepository(entidad_1.Entidad).save(newEntidad);
                        return res.status(200).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.SUCESSO));
                    }
                    catch (error) {
                        return res.status(500).json({ status: 'error', message: 'Error al registrar el telefono', error: error });
                    }
                }
                else {
                    return res.status(500).json({ status: 'error', message: 'Error al registrar el telefono' });
                }
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
            const emp = yield typeorm_1.getRepository(empresa_1.Empresa)
                .createQueryBuilder("empresa")
                .where("empresa.id = :empresa", { empresa: empresa })
                .getOne();
            if (!emp) {
                return res.status(404).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.EMPRESA_NO_REGISTRADA));
            }
            else if (!(emp === null || emp === void 0 ? void 0 : emp.habilitado)) {
                return res.status(404).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.EMPRESA_INHABILIDATA));
            }
            else if (entidad) {
                try {
                    typeorm_1.getRepository(entidad_1.Entidad).merge(entidad, req.body);
                    yield typeorm_1.getRepository(entidad_1.Entidad).save(entidad);
                    return res.status(200).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.ENTIDAD_ACTUALIZADA));
                }
                catch (error) {
                    return res.status(500).json({ status: 'error', message: 'Error al registrar el telefono' });
                }
            }
            else {
                return res.status(404).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.ENTIDAD_NO_ENCONTRADA));
            }
        });
    }
    deleteEntidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = req.headers;
            const codigoDolpin = header.codigo_dolphin;
            const telefono = header.telefono;
            const empresa = header.empresa;
            try {
                const entidad = yield typeorm_1.getRepository(entidad_1.Entidad)
                    .createQueryBuilder("entidad")
                    .where("entidad.id = :codigoDolpin and entidad.telefono = :telefono and entidad.empresa_id = :empresa ", { codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa })
                    .getOne();
                if (entidad) {
                    yield typeorm_1.getConnection()
                        .createQueryBuilder()
                        .delete()
                        .from(entidad_1.Entidad)
                        .where("id = :codigoDolpin and telefono = :telefono and empresa_id = :empresa ", { codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa })
                        .execute();
                    return res.status(200).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.ENTIDAD_ELIMINADA));
                }
                else {
                    return res.status(404).json(codeError_1.getCodeErrorDescription(codeError_1.CodeError.ENTIDAD_NO_ENCONTRADA));
                }
            }
            catch (error) {
                return res.status(500).json({ status: 'error', message: 'Error al eliminar el telefono', error: error });
            }
        });
    }
}
const dolphinCrudController = new DolphinCrudController();
exports.default = dolphinCrudController;
