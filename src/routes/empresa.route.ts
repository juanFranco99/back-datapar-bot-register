import { Router } from "express";
import  empresaController from "../controllers/empresa.controller";

class EmpRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void { 
    
        this.router.get('/', empresaController.getAllEmpresas);
        this.router.get('/:codigo', empresaController.getEmpresaById);
        this.router.post('/', empresaController.addEmpresa);
        this.router.put('/:codigo', empresaController.updateEmpresa);
        this.router.delete('/:codigo', empresaController.deleteEmpresa);
    }
}

const empRoutes = new EmpRoutes();
export default empRoutes.router;