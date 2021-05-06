import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Entidad } from '../entities/entidad';

class EntidadController { 

    async getAllEntidades (req: Request, res: Response) {
        const entidades = await getRepository(Entidad).find();
        return res.json(entidades);
    }
    
    async getEntidadById (req: Request, res: Response) {
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
    
    async addEntidad (req: Request, res: Response){
        let newEntidad = getRepository(Entidad).create(req.body);
        if(newEntidad){
            try {
                const result = await getRepository(Entidad).save(newEntidad);
                return res.json(result);
            } catch (error) {
                return res.json(error);
            }
        } else {
            return res.json({error: 'Error en inserción de datos'});
        }
    }
    
    async updateEntidad (req: Request, res: Response) {
        let codigo = req.params.codigo;
        const entidad = await getRepository(Entidad).findOne(codigo);
        if (entidad) {
            try {
                getRepository(Entidad).merge(entidad, req.body);
                const result = await getRepository(Entidad).save(entidad);
                return res.json(result);
            } catch (error) {
                return res.json(error);
            }
    
        } else {
            return res.json({ error: 'Codigo no encontrado' });
        }
    }
    
    async deleteEntidad (req: Request, res: Response) {
        const codigo = req.params.codigo;
        if(codigo){
            try {
                await getRepository(Entidad).delete(codigo);
                return res.json({info: 'Entidad eliminada'})
            } catch (error) {
                return res.json(error)
            }
        }else{
            return res.json({error: 'Codigo no entonctrado'})
        }
        
    }
    
}

const entidadController = new EntidadController();
export default entidadController;