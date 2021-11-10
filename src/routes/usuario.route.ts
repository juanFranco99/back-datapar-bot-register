import { Router } from "express";
import  usuarioController from "../controllers/usuario.controller";

class UsuarioRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void { 
    
        this.router.get('/', usuarioController.getAllUsuarios);
        this.router.get('/:username', usuarioController.getUsuarioById);
        this.router.post('/', usuarioController.addUsuario);
        this.router.put('/:username', usuarioController.updateUsuario);
        this.router.put('/perfil/:username', usuarioController.updatePerfil);
        this.router.delete('/:username', usuarioController.deleteUsuario);
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;