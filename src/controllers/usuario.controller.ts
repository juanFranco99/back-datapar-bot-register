import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Usuario } from "../entities/usuario";

const SECRET_KEY = 'secretkey123456';

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
                return res.json(usuario);
            } catch (err) {
                return res.json(err);
            }
        } else {
            return res.json({ error: 'Usuario no encontrado' });
        }
    }

    async addUsuario(req: Request, res: Response) {

        let usuarioData = req.body;
        const saltRounds = 2;
        const salt = await  genSaltSync(saltRounds);
        const expireIn = 24 * 60 * 60;

        usuarioData.password = await  hashSync(req.body.password, salt);

        try {
            const usuario = await getRepository(Usuario).save(usuarioData);

            const accesTocken = sign(
                {codigo: usuario.codigo },
                SECRET_KEY,
                {expiresIn: expireIn}
            );

            return res.json(usuario);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async updateUsuario(req: Request, res: Response) {
        let username = req.params.username;
        const usuario = await getRepository(Usuario).findOne(username);
        if (usuario) {
            try {
                getRepository(Usuario).merge(usuario, req.body);
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