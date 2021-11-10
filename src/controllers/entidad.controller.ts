import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
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
        const codigoDolpin = req.body.codigo_dolphin;
        const telefonoAntiguo = req.body.telefono_antiguo;
        const empresa = req.body.empresa;
        const entidad = await getRepository(Entidad)
                                .createQueryBuilder("entidad")
                                .where("entidad.id = :codigoDolpin and entidad.telefono = :telefono and entidad.empresa_id = :empresa ", 
                                {codigoDolpin: codigoDolpin, telefono: telefonoAntiguo, empresa: empresa})
                                .getOne();

        if (entidad) {
            try {
                getRepository(Entidad).merge(entidad, req.body);
                const result = await getRepository(Entidad).save(entidad);
                return res.status(200).json(result);
            } catch (error) {
                return res.status(500).json(error);
            }
    
        } else {
            return res.status(404).json({ error: 'Codigo no encontrado' });
        }
    }
    
    async deleteEntidad (req: Request, res: Response) {
        const codigoDolpin = req.body.codigo_dolphin;
        const telefono = req.body.telefono;
        const empresa = req.body.empresa;
        try {
            await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(Entidad)
                    .where("id = :codigoDolpin and telefono = :telefono and empresa_id = :empresa ", {codigoDolpin: codigoDolpin, telefono: telefono, empresa: empresa})
                    .execute();
            return res.status(200).json({info: 'Eliminado con exito'})
        } catch (error) {
            return res.status(500).json(error)
        }
        
    }
    
}

const entidadController = new EntidadController();
export default entidadController;