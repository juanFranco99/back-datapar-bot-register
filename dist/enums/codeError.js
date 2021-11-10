"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeErrorDescription = exports.getAllCodeErrors = exports.CodeError = void 0;
var CodeError;
(function (CodeError) {
    CodeError[CodeError["SUCESSO"] = 1] = "SUCESSO";
    CodeError[CodeError["ENTIDAD_YA_REGISTRADA"] = 2] = "ENTIDAD_YA_REGISTRADA";
    CodeError[CodeError["EMPRESA_NO_REGISTRADA"] = 3] = "EMPRESA_NO_REGISTRADA";
    CodeError[CodeError["EMPRESA_INHABILIDATA"] = 4] = "EMPRESA_INHABILIDATA";
    CodeError[CodeError["ENTIDAD_ELIMINADA"] = 5] = "ENTIDAD_ELIMINADA";
    CodeError[CodeError["ENTIDAD_ACTUALIZADA"] = 6] = "ENTIDAD_ACTUALIZADA";
    CodeError[CodeError["ENTIDAD_NO_ENCONTRADA"] = 7] = "ENTIDAD_NO_ENCONTRADA";
})(CodeError = exports.CodeError || (exports.CodeError = {}));
function getAllCodeErrors() {
    return Object.values(CodeError);
}
exports.getAllCodeErrors = getAllCodeErrors;
function getCodeErrorDescription(codeError) {
    switch (codeError) {
        case 1:
            return {
                code: 1,
                status: 'success',
                message: 'Telefono registrado con exito'
            };
        case 2:
            return {
                code: 2,
                status: 'info',
                message: 'El telefono ya se encuentra registrado en el servicio'
            };
        case 3:
            return {
                code: 3,
                status: 'error',
                message: 'La empresa no está registrada para el servicio del bot'
            };
        case 4:
            return {
                code: 4,
                status: 'error',
                message: 'La empresa no está habilitada para el servicio del bot'
            };
        case 5:
            return {
                code: 5,
                status: 'info',
                message: 'Telefono eliminado con exito'
            };
        case 6:
            return {
                code: 6,
                status: 'info',
                message: 'Telefono actualizado con exito'
            };
        case 7:
            return {
                code: 7,
                status: 'error',
                message: 'No se ha encontrado la entidad con los datos informados'
            };
    }
}
exports.getCodeErrorDescription = getCodeErrorDescription;
