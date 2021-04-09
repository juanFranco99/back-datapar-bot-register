import { Router } from "express";
import entidadController from "../controllers/entidad.controller";

class EntidadRoute {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void { 
        this.router.get('/', entidadController.getAllEntidades);
        this.router.get('/:codigo', entidadController.getEntidadById);
        this.router.post('/', entidadController.addEntidad);
        this.router.put('/:codigo', entidadController.updateEntidad);
        this.router.delete('/:codigo', entidadController.deleteEntidad); 
    }

}

const entidadRoute = new EntidadRoute();
export default entidadRoute.router;
