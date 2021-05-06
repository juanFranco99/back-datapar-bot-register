import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Entidad } from "../entities/entidad";

class DolphinCrudController {
    
    /*------------RETORNA TODOS LOS DATOS SIN FILTROS-----------------------*/
    async getAllEntidades (req: Request, res: Response) {
        const entidades = await getRepository(Entidad).find();
        return res.json(entidades);
    }

    /*-----------RETORNA TODOS LOS DATOS CORRESPONDIENTES A UNA SOLA EMPRESA---------*/
    async getAllEntidadesByEmpresa (req: Request, res: Response) {
        let codigoEmpresa = req.params.codigoEmpresa;
        if(codigoEmpresa){
            console.log(codigoEmpresa)
            const entidades = await getRepository(Entidad)
                            .createQueryBuilder("entidad")
                            .where("entidad.empresa.codigo = :codigo_empresa",{codigo_empresa: codigoEmpresa})
                            .getMany();
            
            return res.json(entidades);
        }else{
            return res.json(404).json({error: 'codigo no entoncrado'});
        }
    }

    /*-------------BUSCA ENTIDAD ESPECIFICA POR ID INTERNO----------------- */
    async getEntidadByIdInterno (req: Request, res: Response) {
        let codigo = req.params.codigo;
        if (codigo) {
            try {
                
                let entidad = await getRepository(Entidad).findOne(codigo);
                return res.json(entidad);
            } catch (error) {
                return res.json(error);
            }
    
        } else {
            return res.status(404).json({ error: 'Codigo no encontrado' });
        }
    }

    /*-------------BUSCA ENTIDAD ESPECIFICA POR CODIGO DOLPHIN----------------- */
    async getEntidadByCodigoDolphin (req: Request, res: Response) {
        let codigoDolphin = req.params.codigoDolphin;
        if(codigoDolphin){
            console.log(codigoDolphin)
            const entidades = await getRepository(Entidad)
                            .createQueryBuilder("entidad")
                            .where("entidad.codigo_dolphin = :codigo_dolphin",{codigo_dolphin: codigoDolphin})
                            .getMany();
            
            return res.json(entidades);
        }else{
            return res.json(404).json({error: 'codigo no entoncrado'});
        }
    }

    /*-------------AGREGAR NUEVA ENTIDAD----------------- */
    async addEntidad (req: Request, res: Response){

        let newEntidad = getRepository(Entidad).create(req.body);
        if(newEntidad){
            try {
                const result = await getRepository(Entidad).save(newEntidad);
                return res.json(result);
            } catch (error) {
                return res.status(500).json(error);
            }
        } else {
            return res.json({error: 'Error en inserción de datos'});
        }
    }

    /*-------------ACTUALIZAR ENTIDAD----------------- */
    async updateEntidad (req: Request, res: Response) {
        let codigo = req.params.codigo;
        const entidad = await getRepository(Entidad).findOne(codigo);
        if (entidad) {
            try {
                getRepository(Entidad).merge(entidad, req.body);
                const result = await getRepository(Entidad).save(entidad);
                return res.json(result);
            } catch (error) {
                return res.status(500).json(error);
            }
    
        } else {
            return res.status(404).json({ error: 'Codigo no encontrado' });
        }
    }

    async deleteEntidad (req: Request, res: Response) {
        const codigo = req.params.codigo;
        if(codigo){
            try {
                await getRepository(Entidad).delete(codigo);
                return res.status(200).json({info: 'Entidad eliminada'})
            } catch (error) {
                return res.status(500).json(error)
            }
        }else{
            return res.status(404).json({error: 'Codigo no entonctrado'})
        }
        
    }
    
    

}

const dolphinCrudController = new DolphinCrudController();
export default dolphinCrudController;
