import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

//-----------IMPORT ROUTES-----------//
import empresaRoute from "./routes/empresa.route";


//-----------CONFIG----------------//
const app = express();
createConnection();
app.set('port', process.env.PORT || 3000);

//-----------MIDDELWARES------------//
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//-------------ROUTES--------------//
app.use(empresaRoute);


app.listen(app.get('port'));
console.log('server on port ' + app.get('port'));