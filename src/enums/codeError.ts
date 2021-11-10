export enum CodeError {
    SUCESSO = 1,
    ENTIDAD_YA_REGISTRADA = 2,
    EMPRESA_NO_REGISTRADA = 3,
    EMPRESA_INHABILIDATA = 4,
    ENTIDAD_ELIMINADA = 5,
    ENTIDAD_ACTUALIZADA = 6,
    ENTIDAD_NO_ENCONTRADA = 7

}

export function getAllCodeErrors() {
    return Object.values(CodeError);
}

export function getCodeErrorDescription(codeError: any) {
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