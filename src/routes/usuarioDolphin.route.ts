import { Router } from "express";
import usuaDolphin from "../controllers/usuarioDolphin.controller";

class UsuarioDolphinRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void { 
    
        this.router.get('/', usuaDolphin.getAllUsuarios);
        /*this.router.get('/:username', usuarioController.getUsuarioById);
        this.router.post('/', usuarioController.addUsuario);
        this.router.put('/:username', usuarioController.updateUsuario);
        this.router.put('/perfil/:username', usuarioController.updatePerfil);
        this.router.delete('/:username', usuarioController.deleteUsuario);*/
    }
}

const usuarioDolphinRoutes = new UsuarioDolphinRoutes();
export default usuarioDolphinRoutes.router;