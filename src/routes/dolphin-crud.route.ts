import { Router } from "express";
import dolphinCrudController from "../controllers/dolphin-crud.controller";

class DolphinCrudRoute {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void { 
        this.router.get('/entidad', dolphinCrudController.getAllEntidades);
        this.router.get('/entidad/:codigo', dolphinCrudController.getEntidadById);
        this.router.post('/entidad', dolphinCrudController.addEntidad);
        this.router.put('/entidad', dolphinCrudController.updateEntidad);
        this.router.delete('/entidad', dolphinCrudController.deleteEntidad); 
    }

}

const dolphinCrudRoutes = new DolphinCrudRoute();
export default dolphinCrudRoutes.router;
