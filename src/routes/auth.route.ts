import { Router } from "express";
import  authController from "../controllers/Auth.controller";

class AuthRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void { 
    
        this.router.get('/', authController.login);
        /*this.router.get('/:username', usuarioController.getUsuarioById);
        this.router.post('/', usuarioController.addUsuario);
        this.router.put('/:username', usuarioController.updateUsuario);
        this.router.delete('/:username', usuarioController.deleteUsuario);*/
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;