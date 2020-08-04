"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.originateClicToCall = exports.BDGet = exports.BDDel = exports.BDPut = exports.queueLog = exports.extensionState = exports.queueRemove = exports.queuePause = exports.queueAdd = exports.originateCall = void 0;
/**
 * @author Fernando Enrique Zepeda Castellanos.
 * @author Juan Manuel Salazar Castro.
 */
var util_1 = require("util");
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
function originateCall(CONN, AGENT, EXT, QUEUES, TYPE, SECRET, PAUSE) {
    var manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    try {
        manager.action({
            'Action': 'Originate',
            'Channel': TYPE + "/" + EXT,
            'Exten': 's',
            'Context': 'seguritech-login-nodejs',
            'Priority': '1',
            'CallerID': "\"Seguritech Login <" + EXT + ">\"",
            'Timeout': '8000',
            'Account': 'Login-API',
            'Variable': {
                'AGENT': AGENT,
                'PASSWORD': SECRET,
                'AGENT_QUEUES': QUEUES,
                'EXTENSION': TYPE + "/" + EXT,
                'PAUSE': PAUSE + "",
                'TYPE_SESSION': 'API'
            }
        }, function () {
            manager.disconnect();
            return { response: "success" };
        });
    }
    catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
exports.originateCall = originateCall;
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
function queueAdd(CONN, UNIQUEID, AGENT, EXT, QUEUE, PAUSE, TYPE_SESSION) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({
                            'Action': 'QueueAdd',
                            'Queue': QUEUE,
                            'Interface': EXT,
                            'MemberName': AGENT,
                            'Paused': PAUSE
                        })];
                case 2:
                    _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "success" }];
                case 3:
                    e_1 = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "error", data: e_1 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.queueAdd = queueAdd;
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
function queuePause(CONN, AGENT, EXT, TYPE, PAUSE, REASON) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({
                            'action': 'QueuePause',
                            'Interface': TYPE + "/" + EXT,
                            'Paused': PAUSE,
                            'Reason': REASON
                        })];
                case 2:
                    _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "success" }];
                case 3:
                    e_2 = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "error", data: e_2 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.queuePause = queuePause;
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
function queueRemove(CONN, AGENT, EXT, QUEUE, TYPE_SESSION) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({ 'action': 'QueueRemove', 'Interface': "SIP/" + EXT, 'Queue': QUEUE })];
                case 2:
                    _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "success" }];
                case 3:
                    e_3 = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "error", data: e_3 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.queueRemove = queueRemove;
/**
 * Estatus de la extension
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @return {PBXExtension} pbx_extension.
 */
function extensionState(CONN, AGENT, EXT) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, pbx_extension, manager_result, type, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    pbx_extension = { response: '', data: { error: '', type: '', extension: '', status: '' } };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({ 'Action': 'ExtensionState', 'Exten': EXT })];
                case 2:
                    manager_result = _a.sent();
                    type = manager_result.hint.split("/");
                    pbx_extension.response = "Success";
                    pbx_extension.data.type = type[0];
                    pbx_extension.data.extension = manager_result.exten;
                    pbx_extension.data.status = manager_result.statustext;
                    manager.disconnect();
                    return [2 /*return*/, pbx_extension];
                case 3:
                    e_4 = _a.sent();
                    pbx_extension.response = "Error";
                    pbx_extension.data.error = e_4;
                    manager.disconnect();
                    return [2 /*return*/, pbx_extension];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.extensionState = extensionState;
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
function queueLog(CONN, AGENT, EXT, QUEUE, EVENT, TYPE_SESSION, TYPE) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({
                            'Action': 'QueueLog',
                            'Queue': QUEUE,
                            'Event': EVENT,
                            'Uniqueid': 'SEGURITECH',
                            'Interface': "" + TYPE + EXT,
                            'Message': AGENT + "|" + TYPE_SESSION
                        })];
                case 2:
                    _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "success" }];
                case 3:
                    e_5 = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "error", data: e_5 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.queueLog = queueLog;
/**
 * Crear o actualizar un registro en BBDD Asterisk.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
function BDPut(CONN, FAMILY, KEY, VALUE) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, manager_result, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({
                            'Action': 'DBPut',
                            'Family': FAMILY,
                            'Key': KEY,
                            'Val': VALUE
                        })];
                case 2:
                    manager_result = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, manager_result];
                case 3:
                    e_6 = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "error", data: e_6 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.BDPut = BDPut;
/**
 * Eliminar un registro en BBDD Asterisk.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
function BDDel(CONN, FAMILY, KEY, VALUE) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, manager_result, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({
                            'Action': 'DBDel',
                            'Family': FAMILY,
                            'Key': KEY,
                            'Val': VALUE
                        })];
                case 2:
                    manager_result = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, manager_result];
                case 3:
                    e_7 = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "error", data: e_7 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.BDDel = BDDel;
/**
 * Obtener un registro en BBDD Asterisk.
 * @async
 * @export
 * @param {AMI} CONN Conexion AMI.
 * @param {string} FAMILY Familia del objeto a modificar.
 * @param {string} KEY Llave.
 * @param {string} VALUE Valor a modificar.
 */
function BDGet(CONN, FAMILY, KEY, VALUE) {
    return __awaiter(this, void 0, void 0, function () {
        var manager, manager_action, manager_result, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
                    manager_action = util_1.promisify(manager.action);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager_action({
                            'Action': 'DBGet',
                            'Family': FAMILY,
                            'Key': KEY,
                            'Val': VALUE
                        })];
                case 2:
                    manager_result = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, manager_result];
                case 3:
                    e_8 = _a.sent();
                    manager.disconnect();
                    return [2 /*return*/, { response: "error", data: e_8 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.BDGet = BDGet;
/**
 * Originar llamada Click To Call.
 * @param {AMI} CONN Objeto con parametros de conexion AMI.
 * @param {string} AGENT Agente telefonico.
 * @param {string} EXT Extension registrada en el PBX.
 * @param {string} TYPE Tipo de tecnologia (SIP,IAX2,Etc.).
 * @param {string} NUM Numero de 10 digitos a marcar.
 * @returns Respuesta de la ejecucion AMI.
 */
function originateClicToCall(CONN, AGENT, EXT, PREFIX, NUM) {
    var manager = require('asterisk-manager')(CONN.port, CONN.host, CONN.user, CONN.password, CONN.event);
    try {
        manager.action({
            'Action': 'Originate',
            'Channel': 'Local/$EXT@from-internal',
            'Exten': "" + PREFIX + NUM,
            'Context': 'from-internal',
            'Priority': '1',
            'CallerID': "\"SeguritechCC <" + NUM + ">\"",
            'Timeout': '8000',
            'Account': 'Login-API',
            'Variable': {
                'AGENT_NAME': AGENT,
                'AGENT_EXTEN': EXT
            }
        }, function () {
            manager.disconnect();
            return { response: "success" };
        });
    }
    catch (e) {
        manager.disconnect();
        return { response: "error", data: e };
    }
}
exports.originateClicToCall = originateClicToCall;
//# sourceMappingURL=index.js.map