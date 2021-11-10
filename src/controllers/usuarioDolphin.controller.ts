import { Request, Response } from "express";
import { createConnection, getConnection, getConnectionManager } from "typeorm";
import { Entidad } from "../entities/entidad";
import { UsuarioDolphin } from '../entities/usuarioDolphin';

class UsuarioDolphinController {
    async getAllUsuarios (req: Request, res: Response) {
        const conn = createConnection('oraconn');
        //const usuarios = await conn.getRepository(UsuarioDolphin).find();
        //return res.status(200).json(usuarios);

        const entidades = await (await conn).createEntityManager().getRepository(UsuarioDolphin).find();
        return res.json(entidades);
    }
}

const usuaDolphin = new UsuarioDolphinController();
export default usuaDolphin;