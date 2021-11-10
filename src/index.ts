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
import usuarioDolphinRoute from './routes/usuarioDolphin.route';
import figlet from 'figlet';

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
        this.app.use('/usuaDolphin', usuarioDolphinRoute);
    }

    showfiglet(): void{
        figlet('Datapar Bot', {
            font: 'Slant',
            horizontalLayout: 'default',
            verticalLayout: 'default',
          }, function (err, data) {
            if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
            }
            console.log(data);
            console.log('Datapar Bot is running');
          });
    }

    //Inicializar
    start() : void {
        this.app.listen(this.app.get('port'), () => {
            this.showfiglet();
        });
    }
}

const server = new Server();
server.start();