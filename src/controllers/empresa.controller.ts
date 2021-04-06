import { request, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Empresa } from "../entities/empresa";

export const getAllEmpresas = async (req: Request, res: Response): Promise<Response> => {
    const empresas = await getRepository(Empresa).find();
    return res.json(empresas);
}

export const getEmpresaById = async (req: Request, res: Response): Promise<Response> => {
    let codigo = req.params.codigo;
    if (codigo) {
        try {
            const empresa = await getRepository(Empresa).findOne(codigo);
            return res.json(empresa);
        } catch (error) {
            return res.json(error);
        }

    } else {
        return res.json({ error: 'Codigo no encontrado' });
    }
}

export const addEmpresa = async (req: Request, res: Response): Promise<Response> =>{
    let newEmpewsa = getRepository(Empresa).create(req.body);
    if(newEmpewsa){
        try {
            const result = await getRepository(Empresa).save(newEmpewsa);
            return res.json(result);
        } catch (error) {
            return res.json(error);
        }
    } else {
        return res.json({error: 'Error en inserción de datos'});
    }
}

export const updateEmpresa = async (req: Request, res: Response): Promise<Response> => {
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
        return res.json({ error: 'Codigo no encontrado' });
    }
}

export const deleteEmpresa = async (req: Request, res: Response): Promise<Response> => {
    const codigo = req.params.codigo;
    if(codigo){
        try {
            await getRepository(Empresa).delete(codigo);
            return res.json({info: 'Empresa eliminada'})
        } catch (error) {
            return res.json(error)
        }
    }else{
        return res.json({error: 'Codigo no entonctrado'})
    }
    
}

