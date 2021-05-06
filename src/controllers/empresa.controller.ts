import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Empresa } from '../entities/empresa';

class EmpresaController {

    async getAllEmpresas(req: Request, res: Response) {
        const empresas = await getRepository(Empresa).find();
        return res.json(empresas);
    }

    async getEmpresaById(req: Request, res: Response) {
        let codigo = req.params.codigo;
        if (codigo) {
            try {
                const empresa = await getRepository(Empresa).findOne(codigo);
                return res.json(empresa);
            } catch (err) {
                return res.json(err);
            }
        } else {
            return res.json({ error: 'Código no encontrado' });
        }
    }

    async addEmpresa(req: Request, res: Response) {

        let empresaData = req.body;

        try {
            const result = await getRepository(Empresa).save(empresaData);
            return res.json(result);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async updateEmpresa(req: Request, res: Response) {
        let codigo = req.params.codigo;
        const empresa = await getRepository(Empresa).findOne(codigo);
        if (empresa) {
            try {
                getRepository(Empresa).merge(empresa, req.body);
                const result = await getRepository(Empresa).save(empresa);
                return res.json(result);
            } catch (error) {
                return res.json(error);
            }

        } else {
            return res.json({ error: 'Empresa no encontrada' });
        }
    }

    async deleteEmpresa(req: Request, res: Response) {
        const codigo = req.params.codigo;
        if (codigo) {
            try {
                await getRepository(Empresa).delete(codigo);
                return res.json({ info: 'Empresa eliminada' });
            } catch (error) {
                return res.status(500).json({ error: error });
            }
        } else {
            return res.json({ error: 'Codigo no encontrado' });
        }
    }

}

const empresaController = new EmpresaController();
export default empresaController;



