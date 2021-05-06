import { compareSync } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Usuario } from "../entities/usuario";

const SECRET_KEY = 'secretkey123456';

class AuthController {

    async login(req: Request, res: Response) {
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
    }

}

const authController = new AuthController();
export default authController;
