export default function (): {
    get: () => Promise<any>;
    set: () => Promise<boolean>;
    mget: (keys: any) => Promise<any>;
    mset: () => Promise<boolean>;
    flush: () => Promise<boolean>;
};
