"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
//-----------IMPORT ROUTES-----------//
const empresa_route_1 = __importDefault(require("./routes/empresa.route"));
const entidad_route_1 = __importDefault(require("./routes/entidad.route"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const dolphin_crud_route_1 = __importDefault(require("./routes/dolphin-crud.route"));
const usuarioDolphin_route_1 = __importDefault(require("./routes/usuarioDolphin.route"));
const figlet_1 = __importDefault(require("figlet"));
class Server {
    constructor() {
        this.app = express_1.default();
        typeorm_1.createConnection();
        this.config();
        this.routes();
    }
    //-----------CONFIG----------------//
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //-------------ROUTES--------------//
    routes() {
        this.app.use('/empresa', empresa_route_1.default);
        this.app.use('/entidad', entidad_route_1.default);
        this.app.use('/usuario', usuario_route_1.default);
        this.app.use('/login', auth_route_1.default);
        this.app.use('/dolphin', dolphin_crud_route_1.default);
        this.app.use('/usuaDolphin', usuarioDolphin_route_1.default);
    }
    showfiglet() {
        figlet_1.default('Datapar Bot', {
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
    start() {
        this.app.listen(this.app.get('port'), () => {
            this.showfiglet();
        });
    }
}
const server = new Server();
server.start();
