"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originateCall = void 0;
function originateCall(ami, AGENT, SECRET, QUEUES, TYPE, EXT, PAUSE) {
    var manager = require('asterisk-manager')(ami.port, ami.host, ami.user, ami.password, ami.event);
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
        });
    }
    catch (e) {
        manager.disconnect();
    }
}
exports.originateCall = originateCall;
//# sourceMappingURL=index.js.map