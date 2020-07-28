import { promisify } from 'util';
type AMI = {
    port: string,
    host: string,
    user: string,
    password: string,
    event: boolean
}
export function originateCall(ami: AMI, AGENT: String, SECRET: String, QUEUES: String, TYPE: String, EXT: String, PAUSE: String) {
    const manager = require('asterisk-manager')(ami.port, ami.host, ami.user, ami.password, ami.event);
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
        });
    } catch (e) {
        manager.disconnect();
    }
}