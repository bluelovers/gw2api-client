export default function (configuration: any): {
    get: (key: any) => Promise<any>;
    set: (key: any, value: any, expiry: any) => Promise<boolean>;
    mget: (keys: any) => Promise<any>;
    mset: (values: any) => Promise<boolean>;
    flush: () => Promise<boolean>;
    _getStorage: () => {};
};
