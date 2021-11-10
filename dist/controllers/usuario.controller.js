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
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const usuario_1 = require("../entities/usuario");
const SECRET_KEY = 'SUPERCLAVEBOTDATAPAR';
class UsuarioController {
    getAllUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield typeorm_1.getRepository(usuario_1.Usuario).find();
            return res.json(usuarios);
        });
    }
    getUsuarioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            if (username) {
                try {
                    const usuario = yield typeorm_1.getRepository(usuario_1.Usuario).findOne(username);
                    if (usuario) {
                        return res.json(usuario);
                    }
                    else {
                        return res.status(404).json({});
                    }
                }
                catch (err) {
                    return res.status(404).json(err);
                }
            }
            else {
                return res.status(500).json({ error: 'Usuario no encontrado' });
            }
        });
    }
    addUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioData = req.body;
            const saltRounds = 2;
            const salt = yield bcryptjs_1.genSaltSync(saltRounds);
            const expireIn = 24 * 60 * 60;
            usuarioData.password = yield bcryptjs_1.hashSync(req.body.password, salt);
            try {
                const usuario = yield typeorm_1.getRepository(usuario_1.Usuario).save(usuarioData);
                const accesTocken = jsonwebtoken_1.sign({ username: usuario.username }, SECRET_KEY, { expiresIn: expireIn });
                return res.status(200).json({ usuario: usuario, token: accesTocken });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            let newData = req.body;
            const usuario = yield typeorm_1.getRepository(usuario_1.Usuario).findOne(username);
            if (usuario) {
                try {
                    typeorm_1.getRepository(usuario_1.Usuario).merge(usuario, newData);
                    const result = yield typeorm_1.getRepository(usuario_1.Usuario).save(usuario);
                    return res.json(result);
                }
                catch (error) {
                    return res.json(error);
                }
            }
            else {
                return res.json({ error: 'Usuario no encontrada' });
            }
        });
    }
    updatePerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = req.params.username;
            let newUser = req.body;
            const usuario = yield typeorm_1.getRepository(usuario_1.Usuario).findOne(username);
            if (usuario) {
                try {
                    let password = req.body.password;
                    if (password) {
                        const saltRounds = 2;
                        const salt = yield bcryptjs_1.genSaltSync(saltRounds);
                        newUser.password = yield bcryptjs_1.hashSync(req.body.password, salt);
                    }
                    typeorm_1.getRepository(usuario_1.Usuario).merge(usuario, newUser);
                    const result = yield typeorm_1.getRepository(usuario_1.Usuario).save(usuario);
                    return res.json(result);
                }
                catch (error) {
                    return res.json(error);
                }
            }
            else {
                return res.json({ error: 'Usuario no encontrada' });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.params.username;
            if (username) {
                try {
                    yield typeorm_1.getRepository(usuario_1.Usuario).delete(username);
                    return res.json({ info: 'Empresa eliminada' });
                }
                catch (error) {
                    return res.status(500).json({ error: error });
                }
            }
            else {
                return res.json({ error: 'Codigo no encontrado' });
            }
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
