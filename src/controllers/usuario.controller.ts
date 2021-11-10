import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Usuario } from "../entities/usuario";

const SECRET_KEY = 'SUPERCLAVEBOTDATAPAR';

class UsuarioController {



    async getAllUsuarios(req: Request, res: Response) {
        const usuarios = await getRepository(Usuario).find();
        return res.json(usuarios)
    }

    async getUsuarioById(req: Request, res: Response) {
        let username = req.params.username;
        if (username) {
            try {
                const usuario = await getRepository(Usuario).findOne(username);
               
                if(usuario){
                    return res.json(usuario);
                }else{
                    return res.status(404).json({});
                }
            } catch (err) {
                return res.status(404).json(err);
            }
        } else {
            return res.status(500).json({ error: 'Usuario no encontrado' });
        }
    }

    async addUsuario(req: Request, res: Response) {

        let usuarioData = req.body;
        const saltRounds = 2;
        const salt = await genSaltSync(saltRounds);
        const expireIn = 24 * 60 * 60;

        usuarioData.password = await hashSync(req.body.password, salt);

        try {
            const usuario = await getRepository(Usuario).save(usuarioData);

            const accesTocken = sign(
                { username: usuario.username },
                SECRET_KEY,
                { expiresIn: expireIn }
            );

            return res.status(200).json({ usuario: usuario, token: accesTocken });
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async updateUsuario(req: Request, res: Response) {
        let username = req.params.username;
        let newData = req.body;
        const usuario = await getRepository(Usuario).findOne(username);
        if (usuario) {
            try {
                getRepository(Usuario).merge(usuario, newData);
                const result = await getRepository(Usuario).save(usuario);
                return res.json(result);
            } catch (error) {
                return res.json(error);
            }

        } else {
            return res.json({ error: 'Usuario no encontrada' });
        }
    }

    async updatePerfil(req: Request, res: Response) {
        let username = req.params.username;
        let newUser = req.body;
        const usuario = await getRepository(Usuario).findOne(username);
        if (usuario) {
            try {

                let password = req.body.password;
                if(password){
                    
                    const saltRounds = 2;
                    const salt = await genSaltSync(saltRounds);    
                    newUser.password = await hashSync(req.body.password, salt);
                }

                getRepository(Usuario).merge(usuario, newUser);
                const result = await getRepository(Usuario).save(usuario);
                return res.json(result);
            } catch (error) {
                return res.json(error);
            }

        } else {
            return res.json({ error: 'Usuario no encontrada' });
        }
    }

    async deleteUsuario(req: Request, res: Response) {
        const username = req.params.username;
        if (username) {
            try {
                await getRepository(Usuario).delete(username);
                return res.json({ info: 'Empresa eliminada' });
            } catch (error) {
                return res.status(500).json({ error: error });
            }
        } else {
            return res.json({ error: 'Codigo no encontrado' });
        }
    }

}

const usuarioController = new UsuarioController();
export default usuarioController;