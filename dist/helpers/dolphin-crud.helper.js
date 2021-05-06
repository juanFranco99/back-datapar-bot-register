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
class DolphinCrudHelper {
    /*---VERFIFICA SI YA EXISTE UNA ENTIDAD CON LOS MISMO DATOS--*/
    verficaEntidad(codigoEmpresa, codigoDolphin, telefono) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(codigoDolphin);
            console.log(codigoEmpresa);
            console.log(telefono);
            const entidad = yield typeorm_1.getRepository(entidad_1.Entidad)
                .createQueryBuilder("entidad")
                .where("entidad.empresa.codigo = :codigo_empresa")
                .andWhere("entidad.telefono = :telefono")
                .andWhere("entidad.codigo_dolphin = :codigo_dolphin")
                .setParameters({ codigo_empresa: codigoEmpresa, telefono: telefono, codigo_dolphin: codigoDolphin })
                .getSql();
            if (entidad) {
                console.log(entidad);
                return true;
            }
            else {
                return false;
            }
        });
    }
}
const dolphinHelper = new DolphinCrudHelper();
exports.default = dolphinHelper;
