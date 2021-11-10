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
const SECRET_KEY = 'secretkey123456';
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            let username = req.body.username;
            if (username) {
                try {
                    const usuario = yield typeorm_1.getRepository(usuario_1.Usuario).findOne(username);
                    const resultPassword = bcryptjs_1.compareSync(password, usuario === null || usuario === void 0 ? void 0 : usuario.password);
                    if (resultPassword) {
                        const expireIn = 24 * 60 * 60;
                        const accesTocken = jsonwebtoken_1.sign({ username: usuario === null || usuario === void 0 ? void 0 : usuario.username }, SECRET_KEY, { expiresIn: expireIn });
                        return res.json({ token: accesTocken, usuario: usuario });
                    }
                    else {
                        return res.status(500).json({ error: 'Usuario o contraseña invaldidos' });
                    }
                }
                catch (err) {
                    return res.status(500).json(err);
                }
            }
            else {
                return res.json({ error: 'usuario no encontrado' });
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
