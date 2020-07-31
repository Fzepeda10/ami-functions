/**
 * @author Fernando Enrique Zepeda Castellanos.
 * @author Juan Manuel Salazar Castro.
 */
import { promisify } from 'util';
/**
 * @exports
 * @type {AMI}
 * @param {string} port Puerto de conexión.
 * @param {string} host Host de conexión.
 * @param {string} user Usuario AMI.
 * @param {string} password Contrasenia AMI.
 * @param {boolean} event Eventos AMI.
 */
export type AMI = {
    port: string,
    host: string,
    user: string,
    password: string,
    event: boolean
}
/**
 * @exports
 * @type {PBXExtension}
 * @param {string} type Tipo de tecnologia (SIP,IAX2,Etc.).
 * @param {string} extension Numero de extension.
 * @param {string} status Estatus de la extension.
 */
export type PBXExtension = {
    type: string,
    extension: string,
    status: string
}
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
export function originateCall(CONN: AMI, AGENT: string, EXT: string, QUEUES: string, TYPE: string, SECRET: string, PAUSE: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    try {
        manager.action({
            'Action': 'Originate',
            'Channel': `${TYPE}/${EXT}`,
            'Exten': 's',
            'Context': 'seguritech-login-nodejs',
            'Priority': '1',
            'CallerID': `"Seguritech Login <${EXT}>"`,
            'Timeout': '8000',
            'Account': 'Login-API',
            'Variable': {
                'AGENT': AGENT,
                'PASSWORD': SECRET,
                'AGENT_QUEUES': QUEUES,
                'EXTENSION': `${TYPE}/${EXT}`,
                'PAUSE': PAUSE + "",
                'TYPE_SESSION': 'API'
            }
        }, function () {
            manager.disconnect();
            return { response: "success" };
        });
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
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
export async function queueAdd(CONN: AMI, UNIQUEID: string, AGENT: string, EXT: string, QUEUE: string, PAUSE: string, TYPE_SESSION: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    try {
        await manager_action({
            'Action': 'QueueAdd',
            'Queue': QUEUE,
            'Interface': EXT,
            'MemberName': AGENT,
            'Paused': PAUSE
        })
        manager.disconnect();
        return { response: "success" };
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
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
export async function queuePause(CONN: AMI, AGENT: string, EXT: string, TYPE: string, PAUSE: boolean, REASON: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    try {
        await manager_action({
            'action': 'QueuePause',
            'Interface': `${TYPE}/${EXT}`,
            'Paused': PAUSE,
            'Reason': REASON
        });
        manager.disconnect();
        return { response: "success" };
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
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
export async function queueRemove(CONN: AMI, AGENT: string, EXT: string, QUEUE: string, TYPE_SESSION: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    try {
        await manager_action({ 'action': 'QueueRemove', 'Interface': "SIP/" + EXT, 'Queue': QUEUE });
        manager.disconnect();
        return { response: "success" };
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
/**
 * Estatus de la extension
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @return {PBXExtension} pbx_extension.
 */
export async function extensionState(CONN: AMI, AGENT: string, EXT: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    let pbx_extension: PBXExtension = { type: '', extension: '', status: '' };
    try {
        const manager_result = await manager_action({ 'Action': 'ExtensionState', 'Exten': EXT })
        let type = manager_result.hint.split("/");
        pbx_extension.type = type[0];
        pbx_extension.extension = manager_result.exten;
        pbx_extension.status = manager_result.statustext;
        manager.disconnect();
        return pbx_extension;
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }

}
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
export async function queueLog(CONN: AMI, AGENT: string, EXT: string, QUEUE: string, EVENT: string, TYPE_SESSION: string, TYPE: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    try {
        await manager_action({
            'Action': 'QueueLog',
            'Queue': QUEUE,
            'Event': EVENT,
            'Uniqueid': 'SEGURITECH',
            'Interface': `${TYPE}${EXT}`,
            'Message': `${AGENT}|${TYPE_SESSION}`
        });
        manager.disconnect();
        return { response: "success" };
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
/**
 * Crear o actualizar un registro en BBDD Asterisk.
 * @async 
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
export async function BDPut(CONN: AMI, FAMILY: string, KEY: string, VALUE: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    try {
        let manager_result = await manager_action({
            'Action': 'DBPut',
            'Family': FAMILY,
            'Key': KEY,
            'Val': VALUE
        });
        manager.disconnect();
        return manager_result;
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
/**
 * Eliminar un registro en BBDD Asterisk.
 * @async 
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
export async function BDDel(CONN: AMI, FAMILY: string, KEY: string, VALUE: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    try {
        let manager_result = await manager_action({
            'Action': 'DBDel',
            'Family': FAMILY,
            'Key': KEY,
            'Val': VALUE
        });
        manager.disconnect();
        return manager_result;
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
/**
 * Obtener un registro en BBDD Asterisk.
 * @async 
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
export async function BDGet(CONN: AMI, FAMILY: string, KEY: string, VALUE: string) {
    const manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    const manager_action = promisify(manager.action);
    try {
        let manager_result = await manager_action({
            'Action': 'DBGet',
            'Family': FAMILY,
            'Key': KEY,
            'Val': VALUE
        });
        manager.disconnect();
        return manager_result;
    } catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}