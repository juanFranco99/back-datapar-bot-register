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
const usuarioDolphin_1 = require("../entities/usuarioDolphin");
class UsuarioDolphinController {
    getAllUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = typeorm_1.createConnection('oraconn');
            //const usuarios = await conn.getRepository(UsuarioDolphin).find();
            //return res.status(200).json(usuarios);
            const entidades = yield (yield conn).createEntityManager().getRepository(usuarioDolphin_1.UsuarioDolphin).find();
            return res.json(entidades);
        });
    }
}
const usuaDolphin = new UsuarioDolphinController();
exports.default = usuaDolphin;
