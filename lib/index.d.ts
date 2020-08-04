/**
 * @exports
 * @type {AMI}
 * @param {string} port Puerto de conexión.
 * @param {string} host Host de conexión.
 * @param {string} user Usuario AMI.
 * @param {string} password Contrasenia AMI.
 * @param {boolean} event Eventos AMI.
 */
export declare type AMI = {
    port: string;
    host: string;
    user: string;
    password: string;
    event: boolean;
};
/**
 * @exports
 * @type {PBXExtension}
 * @param {string} type Tipo de tecnologia (SIP,IAX2,Etc.).
 * @param {string} extension Numero de extension.
 * @param {string} status Estatus de la extension.
 */
export declare type PBXExtension = {
    response: string;
    data: {
        error: any;
        type: string;
        extension: string;
        status: string;
    };
};
/**
 * Originar llamada para iniciar session en la cola de llamadas.
 * @param {AMI} CONN Objeto con parametros de conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} QUEUES Colas de llamada (MQ).
 * @param {string} TYPE Tipo de tecnologia (SIP,IAX2,Etc.).
 * @param {string} SECRET Contrasenia en MD5.
 * @param {string} PAUSE Indica si inicia en pausa el agente.
 * @returns Respuesta de la ejecucion AMI.
 */
export declare function originateCall(CONN: AMI, AGENT: string, EXT: string, QUEUES: string, TYPE: string, SECRET: string, PAUSE: string): {
    response: string;
    data: any;
} | undefined;
/**
 * Agrega una extension a la cola de llamadas.
 * @async
 * @exports
 * @param {AMI} CONN Objeto con parametros de conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} QUEUE Cola de llamada (MQ).
 * @param {string} TYPE_SESSION Tipo de Session API || Manual.
 * @param {string} PAUSE Indica si inicia en pausa el agente.
 */
export declare function queueAdd(CONN: AMI, UNIQUEID: string, AGENT: string, EXT: string, QUEUE: string, PAUSE: string, TYPE_SESSION: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
/**
 * Pausar una extension de la cola de llamadas.
 * @async
 * @exports
 * @param {AMI} CONN Conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} TYPE Tipo de tecnologia (SIP,IAX2,Etc.).
 * @param {boolean} PAUSE Selecciona el estatus de pausa.
 * @param {string} REASON Motivo de la pausa.
 * @returns
 */
export declare function queuePause(CONN: AMI, AGENT: string, EXT: string, TYPE: string, PAUSE: boolean, REASON: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
/**
 * Remueve una extension de la cola de llamadas.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} QUEUE Cola de llamadas.
 * @param {string} TYPE_SESSION Tipo de session (API/MANUAL).
 */
export declare function queueRemove(CONN: AMI, AGENT: string, EXT: string, QUEUE: string, TYPE_SESSION: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
/**
 * Estatus de la extension
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @return {PBXExtension} pbx_extension.
 */
export declare function extensionState(CONN: AMI, AGENT: string, EXT: string): Promise<PBXExtension>;
/**
 * Generar un log en queuelog de Asterisk PBX.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} QUEUE Cola de llamadas.
 * @param {string} EVENT Evento a registrar.
 * @param {string} TYPE_SESSION Tipo de session (API/MANUAL).
 * @param {string} TYPE Tipo de tecnologia (SIP,IAX2,Etc.).
 */
export declare function queueLog(CONN: AMI, AGENT: string, EXT: string, QUEUE: string, EVENT: string, TYPE_SESSION: string, TYPE: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
/**
 * Crear o actualizar un registro en BBDD Asterisk.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
export declare function BDPut(CONN: AMI, FAMILY: string, KEY: string, VALUE: string): Promise<any>;
/**
 * Eliminar un registro en BBDD Asterisk.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
export declare function BDDel(CONN: AMI, FAMILY: string, KEY: string, VALUE: string): Promise<any>;
/**
 * Obtener un registro en BBDD Asterisk.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
export declare function BDGet(CONN: AMI, FAMILY: string, KEY: string, VALUE: string): Promise<any>;
/**
 * Originar llamada Click To Call.
 * @param {AMI} CONN Objeto con parametros de conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} TYPE Tipo de tecnologia (SIP,IAX2,Etc.).
 * @param {string} NUM Numero de 10 digitos a marcar.
 * @returns Respuesta de la ejecucion AMI.
 */
export declare function originateClicToCall(CONN: AMI, AGENT: string, EXT: string, PREFIX: string, NUM: string): {
    response: string;
    data: any;
} | undefined;
//# sourceMappingURL=index.d.ts.map