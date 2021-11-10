import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Empresa } from "../entities/empresa";
import { Entidad } from "../entities/entidad";
import { CodeError, getCodeErrorDescription } from "../enums/codeError";

class DolphinCrudController {

    async getAllEntidades(req: Request, res: Response) {
        const entidades = await getRepository(Entidad).find();
        return res.json(entidades);
    }

    async getEntidadById(req: Request, res: Response) {
        let codigo = req.params.codigo;
        if (codigo) {
            try {

                let entidad = await getRepository(Entidad).findOne(codigo);
                return res.json(entidad);
            } catch (error) {
                return res.json(error);
            }

        } else {
            return res.json({ error: 'Codigo no encontrado' });
        }
    }

    async addEntidad(req: Request, res: Response) {

        const codigoDolpin = req.body.codigo_dolphin;
        const telefono = req.body.telefono;
        const empresa = req.body.empresa;
        const entidad = await getRepository(Entidad)
            .createQueryBuilder("entidad")
            .where("entidad.id = :codigoDolpin and entidad.telefono = :telefono and entidad.empresa_id = :empresa ",
                { codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa })
            .getOne();

        const emp = await getRepository(Empresa)
            .createQueryBuilder("empresa")
            .where("empresa.id = :empresa",
                { empresa: empresa })
            .getOne();

        if (entidad) {
            return res.status(200).json(getCodeErrorDescription(CodeError.ENTIDAD_YA_REGISTRADA));
        } else if (!emp) {
            return res.status(404).json(getCodeErrorDescription(CodeError.EMPRESA_NO_REGISTRADA));
        } else if (!emp?.habilitado) {
            console.log(emp)
            return res.status(404).json(getCodeErrorDescription(CodeError.EMPRESA_INHABILIDATA));
        } else {
            let newEntidad = getRepository(Entidad).create(req.body);
            if (newEntidad) {
                try {
                    await getRepository(Entidad).save(newEntidad);
                    return res.status(200).json(getCodeErrorDescription(CodeError.SUCESSO));
                } catch (error) {
                    return res.status(500).json({ status: 'error', message: 'Error al registrar el telefono', error: error });
                }
            } else {
                return res.status(500).json({ status: 'error', message: 'Error al registrar el telefono' });
            }
        }
    }

    async updateEntidad(req: Request, res: Response) {
        const codigoDolpin = req.body.codigo_dolphin;
        const telefonoAntiguo = req.body.telefono_antiguo;
        const empresa = req.body.empresa;
        const entidad = await getRepository(Entidad)
            .createQueryBuilder("entidad")
            .where("entidad.id = :codigoDolpin and entidad.telefono = :telefono and entidad.empresa_id = :empresa ",
                { codigoDolpin: codigoDolpin, telefono: telefonoAntiguo, empresa: empresa })
            .getOne();

        const emp = await getRepository(Empresa)
            .createQueryBuilder("empresa")
            .where("empresa.id = :empresa",
                { empresa: empresa })
            .getOne();

        if (!emp) {
            return res.status(404).json(getCodeErrorDescription(CodeError.EMPRESA_NO_REGISTRADA));
        } else if (!emp?.habilitado) {
            return res.status(404).json(getCodeErrorDescription(CodeError.EMPRESA_INHABILIDATA));
        } else if (entidad) {
            try {
                getRepository(Entidad).merge(entidad, req.body);
                await getRepository(Entidad).save(entidad);
                return res.status(200).json(getCodeErrorDescription(CodeError.ENTIDAD_ACTUALIZADA));
            } catch (error) {
                return res.status(500).json({ status: 'error', message: 'Error al registrar el telefono' });
            }

        } else {
            return res.status(404).json(getCodeErrorDescription(CodeError.ENTIDAD_NO_ENCONTRADA));
        }
    }

    async deleteEntidad(req: Request, res: Response) {
        const header = req.headers;
        const codigoDolpin = header.codigo_dolphin;
        const telefono = header.telefono;
        const empresa = header.empresa;


        try {
            const entidad = await getRepository(Entidad)
                .createQueryBuilder("entidad")
                .where("entidad.id = :codigoDolpin and entidad.telefono = :telefono and entidad.empresa_id = :empresa ",
                    { codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa })
                .getOne();
            if (entidad) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(Entidad)
                    .where("id = :codigoDolpin and telefono = :telefono and empresa_id = :empresa ", { codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa })
                    .execute();
                return res.status(200).json(getCodeErrorDescription(CodeError.ENTIDAD_ELIMINADA))
            } else {
                return res.status(404).json(getCodeErrorDescription(CodeError.ENTIDAD_NO_ENCONTRADA))
            }
        } catch (error) {
            return res.status(500).json({ status: 'error', message: 'Error al eliminar el telefono', error: error })
        }

    }
}

const dolphinCrudController = new DolphinCrudController();
export default dolphinCrudController;
