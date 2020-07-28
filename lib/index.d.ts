declare type AMI = {
    port: string;
    host: string;
    user: string;
    password: string;
    event: boolean;
};
export declare function originateCall(ami: AMI, AGENT: String, SECRET: String, QUEUES: String, TYPE: String, EXT: String, PAUSE: String): void;
export {};
//# sourceMappingURL=index.d.ts.map