export declare type AMI = {
    port: string;
    host: string;
    user: string;
    password: string;
    event: boolean;
};
export declare type PBXExtension = {
    type: string;
    extension: string;
    status: string;
};
/**
 * Originar llamada para iniciar session en la cola de llamadas.
 * @param {AMI} CONN Objeto con parametros de conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} QUEUES Colas de llamada (MQ).
 * @param {string} TYPE Tipo de tecnologia.
 * @param {string} SECRET Contrasenia en MD5.
 * @param {string} PAUSE Indica si inicia en pausa el agente.
 * @returns Respuesta de la ejecucion AMI.
 */
export declare function originateCall(CONN: AMI, AGENT: string, EXT: string, QUEUES: string, TYPE: string, SECRET: string, PAUSE: string): {
    response: string;
    data: any;
} | undefined;
/**
 * Agregar un agente a la cola de llamadas.
 * @param {AMI} CONN Objeto con parametros de conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} QUEUE Cola de llamada (MQ).
 * @param {string} TYPE_SESSION Tipo de Session API || Manual.
 * @param {string} PAUSE Indica si inicia en pausa el agente.
 * @returns "response": "success" || "error".
 */
export declare function queueAdd(CONN: AMI, UNIQUEID: string, AGENT: string, EXT: string, QUEUE: string, PAUSE: string, TYPE_SESSION: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
export declare function queuePause(CONN: AMI, AGENT: string, EXT: string, TYPE: string, PAUSE: string, REASON: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
export declare function queueRemove(CONN: AMI, AGENT: string, EXT: string, QUEUE: string, TYPE_SESSION: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
export declare function extensionState(CONN: AMI, AGENT: string, EXT: string): Promise<PBXExtension | {
    response: string;
    data: any;
}>;
export declare function queueLog(CONN: AMI, AGENT: string, EXT: string, QUEUE: string, EVENT: string, TYPE_SESSION: string, TYPE: string): Promise<{
    response: string;
    data?: undefined;
} | {
    response: string;
    data: any;
}>;
export declare function BDPut(CONN: AMI, FAMILY: string, KEY: string, VALUE: string): Promise<any>;
export declare function BDDel(CONN: AMI, FAMILY: string, KEY: string, VALUE: string): Promise<any>;
export declare function BDGet(CONN: AMI, FAMILY: string, KEY: string, VALUE: string): Promise<any>;
//# sourceMappingURL=index.d.ts.map