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
//-----------CONFIG----------------//
const app = express_1.default();
typeorm_1.createConnection();
app.set('port', process.env.PORT || 3000);
//-----------MIDDELWARES------------//
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//-------------ROUTES--------------//
app.use(empresa_route_1.default);
app.listen(app.get('port'));
console.log('server on port ' + app.get('port'));
