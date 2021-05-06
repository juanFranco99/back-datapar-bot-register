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
const SECRET_KEY = 'secretkey123456';
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*let password = req.body.password;
            let username = req.params.username;
            if (username) {
                try {
                    const usuario = await getRepository(Usuario).findOne(username);
                    
                    const resultPassword = compareSync(password, usuario?.password!);
    
                    if(resultPassword){
                        
                        const expireIn = 24 * 60 * 60;
    
                        const accesTocken = sign(
                            {user: usuario?.username },
                            SECRET_KEY,
                            {expiresIn: expireIn}
                        );
    
                        const dataUser = {
                            name: usuario?.nombre,
                            email: usuario?.email,
                            accessToken: accesTocken,
                            expiresIn: expireIn
                          }
                        return res.json(dataUser);
                    }else{
                        return res.status(500).json({error: 'Usuario o contraseña invaldidos'});
                    }
    
                } catch (err) {
                    return res.status(500).json(err);
                }
            } else {
                return res.json({ error: 'Código no encontrado' });
            }*/
        });
    }
}
const authController = new AuthController();
exports.default = authController;
