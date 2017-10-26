export default function (configuration: any): {
    get: (key: any) => Promise<{}>;
    set: (key: any, value: any, expiry: any) => Promise<{}>;
    mget: (keys: any) => Promise<{}>;
    mset: (values: any) => Promise<{}>;
    flush: () => Promise<{}>;
};
