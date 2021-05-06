import { Router } from "express";
import dolphinCrudController from "../controllers/dolphin-crud.controller";

class DolphinCrudRoute {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void { 
        this.router.get('/', dolphinCrudController.getAllEntidades);/* ----BUSCA TODAS LAS ENTIDADES DE TODAS LAS EMPRESAS */
        this.router.get('/:codigoEmpresa', dolphinCrudController.getAllEntidadesByEmpresa); /* ----BUSCA TODAS LAS ENTIDADES DE AL EMPRESA */
        this.router.get('/entidad/:codigo', dolphinCrudController.getEntidadByIdInterno);/* ----BUSCA LA ENTIDAD POR ID INTERNO */
        this.router.get('/entidad/list/:codigoDolphin', dolphinCrudController.getEntidadByCodigoDolphin); /* ----BUSCA TODAS LAS ENTIDADES POR CODIGO DOLPHIN*/
        this.router.post('/entidad', dolphinCrudController.addEntidad);/*AGREGAR NUEVA ENTIDAD */
        this.router.put('/entidad/:codigo', dolphinCrudController.updateEntidad);/*ACTUALIZAR ENTIDAD */
        this.router.delete('/entidad/:codigo', dolphinCrudController.deleteEntidad); /*ELLIMINAR ENTIDAD*/
    }

}

const dolphinCrudRoutes = new DolphinCrudRoute();
export default dolphinCrudRoutes.router;
