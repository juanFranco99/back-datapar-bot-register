# Registro de datos para Datapar Bot

## Requerimientos
+ Node.js

+ PostgreSQL 11+

## Configuraciones Generales
Para configurar la base de datos modificar el archivo ormconfig.json

``` 
"type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "USUARIO",
    "password": "CONTRASEÑA",
    "database": "botdatapar",
    "entities": ["dist/entities/**/*.js"],
    "synchronize": true
```


Para instalar las dependencias del proyecto ejecutar ``` npm install ```


## Comandos basicos
+ Compilar el proyecto 
```
npm run build //compila el proyecto a js
```
+ Iniciar el servidor 
```
npm run start //llama al archivo index.js ubicado en la carpeta dist
```
+ Ejecutar servidor en modo de desarrollo

```
npm run dev //compila el proyecto a js luego ejecuta el archivo index.js
```
