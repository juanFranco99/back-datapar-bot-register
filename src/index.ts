import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

//-----------IMPORT ROUTES-----------//
import EmpRoutes from "./routes/empresa.route";
import EntidadRoute from "./routes/entidad.route";
import UsuarioRoutes from "./routes/usuario.route";
import authRoutes from "./routes/auth.route";
import dolphinCrudRoutes from "./routes/dolphin-crud.route";

class Server {

    app: Application;

    constructor() {
        this.app = express();
        createConnection();
        this.config();
        this.routes();
    }

    //-----------CONFIG----------------//
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    //-------------ROUTES--------------//
    routes(): void {
        this.app.use('/empresa', EmpRoutes);
        this.app.use('/entidad', EntidadRoute);
        this.app.use('/usuario', UsuarioRoutes);
        this.app.use('/login', authRoutes);
        this.app.use('/dolphin', dolphinCrudRoutes);
    }

    //Inicializar
    start() : void {
        this.app.listen(this.app.get('port'), () => {
                console.log(`Server on port`, this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();