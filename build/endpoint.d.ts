import * as Client from './client';
export declare type vId = string | number;
export interface IAbstractEndpoint extends Client.IClient {
    baseUrl: string;
    isPaginated: boolean;
    maxPageSize: number;
    isBulk: boolean;
    supportsBulkAll: boolean;
    isLocalized: boolean;
    isAuthenticated: boolean;
    isOptionallyAuthenticated: boolean;
    credentials: boolean;
    _skipCache: boolean;
    url?: string;
    cacheTime?: number;
}
export interface IAbstractEndpointModule {
    new (parent: Client.Client | AbstractEndpoint): IAbstractEndpoint;
}
export declare function staticImplements<T>(): (constructor: T) => void;
export declare class AbstractEndpoint implements IAbstractEndpoint {
    lang: Client.vLang;
    apiKey: Client.vApiKey;
    fetch: any;
    caches: any[];
    baseUrl: string;
    isPaginated: boolean;
    maxPageSize: number;
    isBulk: boolean;
    supportsBulkAll: boolean;
    isLocalized: boolean;
    isAuthenticated: boolean;
    isOptionallyAuthenticated: boolean;
    credentials: boolean;
    _skipCache: boolean;
    url?: string;
    cacheTime?: number;
    constructor(parent: Client.Client | AbstractEndpoint);
    language(lang: Client.vLang): this;
    authenticate(apiKey: Client.vApiKey): this;
    live(): this;
    ids(): any;
    private _ids();
    get(id?: vId, url?: boolean): any;
    private _get(id, url);
    many(ids: vId[]): any;
    private _many(ids, partialRequest?);
    page(page: number, size?: number): any;
    private _page(page, size);
    all(): any;
    private _all();
    private _cacheSetSingle(key, value);
    private _cacheSetMany(values);
    private _cacheGetSingle(key, index?);
    private _cacheGetMany(keys, index?);
    private _cacheHash(id);
    private _request(url, type?);
    private _requestMany(urls, type?);
    private _buildUrl(url);
    private _sortByIdList(entries, ids);
    private _usesApiKey();
}
export default AbstractEndpoint;
